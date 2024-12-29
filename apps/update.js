import { Version, Config, Render } from '../components/index.js'
import { update as Update } from '../../other/update.js'
import { Tools, Code, Meme } from '../models/index.js'
import { meme } from './meme.js'
import pluginsLoader from '../../../lib/plugins/loader.js'

export class update extends plugin {
  constructor () {
    super({
      name: '清语表情:更新',
      event: 'message',
      priority: -Infinity,
      rule: [
        {
          reg: /^#?(清语表情|clarity-meme)(插件)?(强制)?更新$/i,
          fnc: 'update'
        },
        {
          reg: /^#?(清语表情|clarity-meme)?更新日志$/i,
          fnc: 'updateLog'
        },
        {
          reg: /^#?(清语表情|clarity-meme)?更新(表情包)?(资源|数据)$/i,
          fnc: 'updateRes'
        },
        {
          reg: /^#?(清语表情|clarity-meme)?检查更新$/i,
          fnc: 'checkUpdate'
        }
      ]
    })
    if (Config.other.checkRepo) {
      this.task = {
        name: '清语表情:仓库更新检测',
        cron: '0 0/20 * * * ?',
        log: false,
        fnc: () => {
          this.checkUpdate(true)
        }
      }
    }
  }
  async update (e = this.e) {
    const Type = e.msg.includes('强制') ? '#强制更新' : '#更新'
    e.msg = Type + Version.Plugin_Name
    const up = new Update(e)
    up.e = e
    return up.update()
  }

  async updateLog (e = this.e) {
    e.msg = '#更新日志' + Version.Plugin_Name
    const up = new Update(e)
    up.e = e
    return up.updateLog()
  }

  async updateRes (e) {
    if (!e.isMaster) {
      await e.reply('只有主人才能更新表情包数据')
      return
    }

    await e.reply('开始更新表情包数据中, 请稍后...')

    try {
      if (!Config.meme.url) {
        await Tools.downloadMemeData(true)
      } else {
        await Tools.generateMemeData(true)
      }

      Meme.loaded = false
      await Meme.load()
      const Plugin = new meme()
      const pluginName = Plugin.name
      const pluginKey = pluginsLoader.priority.find((p) => p.plugin.name === pluginName)

      pluginKey.plugin.rulesInitialized = false

      await pluginKey.plugin.initRules()

      await e.reply('表情包数据更新完成')
    } catch (error) {
      logger.error(`表情包数据更新出错: ${error.message}`)
      await e.reply(`表情包数据更新失败: ${error.message}`)
    }
  }

  async checkUpdate (isTask = false, e = this.e) {
    try {
      const { owner, repo, currentBranch } = await Code.gitRepo.getRepo()
      const result = await Code.check.version(Version.Plugin_Path, owner, repo, currentBranch)
      const latestCommit = result.latestCommit
      const remoteSHA = latestCommit.sha
      const shaKey = `Yz:clarity-meme:update:commit:${result.branchName}`
      let storedSHA = await redis.get(shaKey)

      if (!storedSHA) {
        storedSHA = result.localVersion
        await redis.set(shaKey, storedSHA)
      }

      if (storedSHA === remoteSHA) {
        if (storedSHA !== remoteSHA) {
          await redis.set(shaKey, remoteSHA)
        }

        if (isTask) {
          await e.reply('当前已是最新版本，无需更新。')
        }
        return
      }

      const commitInfo = {
        committer: latestCommit.committer.login,
        commitTime: latestCommit.commitTime,
        title: latestCommit.message.title,
        content: latestCommit.message.content,
        commitUrl: latestCommit.commitUrl
      }

      const img = await Render.render('code/index',
        {
          commitInfo,
          branchName: result.branchName
        }
      )

      if (isTask) {
        const masterQQs = Config.masterQQ.filter(qq => {
          const qqStr = String(qq)
          return qqStr.length <= 11 && qqStr !== 'stdin'
        })

        if (masterQQs.length === 0) {
          return
        }

        for (let qq of masterQQs) {
          try {
            await Bot.pickUser(qq).sendMsg(img)
            break
          } catch (sendError) {
            logger.info(`发送消息给 ${qq} 失败: ${sendError.message}`)
          }
        }
      } else {
        await e.reply(img)
      }

      await redis.set(shaKey, remoteSHA)
    } catch (error) {
      logger.error(`检测版本时出错: ${error.message}`)
      if (!isTask) {
        await e.reply(`检查更新时出错：${error.message}`)
      }
    }
  }


}
