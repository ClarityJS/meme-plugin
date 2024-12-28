import { Version, Config } from '../components/index.js'
import { update as Update } from '../../other/update.js'
import { Tools, checkRepo, Meme } from '../models/index.js'
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
    if(Config.other.checkRepo){
      this.task = {
        name: '清语表情:仓库更新检测',
        cron: '0 0/20 * * * ?',
        log: false,
        fnc: () => {
          this.check(true)
        }
      }
    }
  }

  async checkUpdate (e = this.e) {
    await this.check(false, e)
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

  async check (isTask = false, e = this.e) {
    try {
      const result = await checkRepo.isUpToDate()
      const latestCommit = result.latestCommit
      const remoteSHA = latestCommit.sha
      const shaKey = `Yz:clarity-meme:update:commit:${result.branchName}`
      let storedSHA = await redis.get(shaKey)

      if (!storedSHA) {
        storedSHA = result.localVersion
        await redis.set(shaKey, storedSHA)
      }

      if (storedSHA === remoteSHA) {
        if (!isTask) {
          await e.reply('当前已是最新版本，无需更新。')
        }
        return
      }

      const commitInfo = [
        '[清语表情更新推送]',
        `提交者：${latestCommit.committer.login}`,
        `时间：${latestCommit.commitTime}`,
        `提交信息：${latestCommit.message.title}`,
        `地址：${latestCommit.commitUrl}`
      ].join('\n')

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
            await Bot.pickUser(qq).sendMsg(commitInfo)
            break
          } catch (sendError) {
          }
        }
      } else {
        await e.reply(commitInfo)
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
