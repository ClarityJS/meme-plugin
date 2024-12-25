import { Version, Config } from '../components/index.js'
import { update as Update } from '../../other/update.js'
import { Restart } from '../../other/restart.js'
import { Tools, checkRepo } from '../models/index.js'

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
          reg: /^#?(清语表情|clarity-meme)?更新资源$/i,
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
    try {
      if (!Config.meme.url) {
        await Tools.downloadMemeData(true)
      } else {
        await Tools.generateMemeData(true)
      }

      if (Config.other.restart) {
        await e.reply('表情包数据更新成功，正在重启...')
        new Restart(this.e).restart()
      } else {
        await e.reply('表情包数据更新成功，请重启后生效')
        return
      }
    } catch (error) {
      logger.error(`表情包数据更新出错: ${error.message}`)
      await e.reply(`表情包数据更新失败: ${error.message}`)
    }
  }

  async check (isTask = false, e = this.e) {
    try {
      const result = await checkRepo.isUpToDate()

      if (!result.isUpToDate) {
        const latestCommit = result.latestCommit
        const commitInfo = [
          '[清语表情更新推送]',
          `提交者：${latestCommit.committer.login}`,
          `时间：${latestCommit.commitTime}`,
          `提交信息：${latestCommit.message.title}`,
          `地址：${latestCommit.commitUrl}`
        ].join('\n')

        if (isTask) {
          const masterQQs = Config.masterQQ?.filter((qq) => qq !== 'stdin')
          if (masterQQs?.length) {
            const firstMasterQQ = masterQQs[0]
            await Bot.pickUser(firstMasterQQ).sendMsg(commitInfo)
          }
        } else {
          await e.reply(commitInfo)
        }
      } else {
        if (!isTask) {
          await e.reply('当前已是最新版本，无需更新。')
        }
      }
    } catch (error) {
      logger.error(`检测版本时出错: ${error.message}`)
      if (!isTask) {
        await e.reply(`检查更新时出错：${error.message}`)
      }
    }
  }

}
