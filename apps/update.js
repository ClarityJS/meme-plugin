import chalk from 'chalk'

import { Config, Render, Version } from '#components'
import { Code, Utils } from '#models'

import pluginsLoader from '../../../lib/plugins/loader.js'
import { update as Update } from '../../other/update.js'
import { meme } from './meme.js'

export class update extends plugin {
  constructor () {
    super({
      name: '清语表情:更新',
      event: 'message',
      priority: -Infinity,
      rule: [
        {
          reg: /^#?(清语表情|meme-plugin)(插件)?(强制)?更新$/i,
          fnc: 'update'
        },
        {
          reg: /^#?(清语表情|meme-plugin)更新日志$/i,
          fnc: 'updateLog'
        },
        {
          reg: /^#?(清语表情|meme(-plugin)?)(强制)?更新(表情包)?(资源|数据)?$/i,
          fnc: 'updateRes'
        },
        {
          reg: /^#?(清语表情|meme-plugin)检查更新$/i,
          fnc: 'checkUpdate'
        }
      ]
    })

    this.task = []

    if (Config.other.checkRepo) {
      this.task.push({
        name: '清语表情:仓库更新检测',
        cron: Config.other.checkRepoCron,
        fnc: async () => {
          await this.checkUpdate(null, true)
        }
      })
    }

    if (Config.other.autoUpdateRes) {
      this.task.push({
        name: '清语表情:表情包数据每日更新',
        cron: Config.other.autoUpdateResCron,
        fnc: async () => {
          await this.updateRes(null, true)
        }
      })
    }

    this.e = {
      isMaster: true,
      logFnc: '[清语表情]自动更新]',
      msg: `#更新${Version.Plugin_Name}`,
      reply: async (msg) => {
        const masters = Object.keys(Config.masterQQ)
        for (const master of masters) {
          if (master.toString().length > 11) {
            logger.info(chalk.yellow(`[${Version.Plugin_AliasName}] 更新推送跳过 QQBot`))
            continue
          }
          try {
            await Bot.pickFriend(master).sendMsg(msg)
            await Bot.sleep(2000)
          } catch (err) {
            logger.error(`[${Version.Plugin_AliasName}] 向好友 ${master} 发送消息时出错：`, err)
          }
        }
      }
    }

    if (Config.other.autoUpdate) {
      this.task.push({
        name: '清语表情:自动更新',
        cron: Config.other.autoUpdateCron,
        fnc: () => this.update(this.e)
      })
    }
  }

  async update (e) {
    const Type = e.msg.includes('强制') ? '#强制更新' : '#更新'
    if (e) e.msg = Type + Version.Plugin_Name
    const up = new Update(e)
    up.e = e
    return up.update()
  }

  async updateLog (e = this.e) {
    if (e) e.msg = '#更新日志' + Version.Plugin_Name
    const up = new Update(e)
    up.e = e
    return up.updateLog()
  }

  async updateRes (e, isTask = false) {
    if (!isTask && !e.isMaster) {
      await e.reply('只有主人才能更新表情包数据')
      return
    }

    if (!isTask && e) {
      await e.reply('开始更新表情包数据中, 请稍后...')
    }

    try {
      const forceUpdate = !isTask && e && e.msg.includes('强制')

      await Promise.all([
        Utils.Tools.generateMemeData(forceUpdate),
        Utils.Tools.generateArgData()
      ])
      const Plugin = new meme()
      const pluginName = Plugin.name
      const pluginKey = pluginsLoader.priority.find((p) => {
        if (p.plugin) {
          return p.plugin.name === pluginName
        } else if (p.class) {
          return p.name === pluginName
        }
        return false
      })
      let pluginInfo
      if (pluginKey.plugin) {
        pluginInfo = pluginKey.plugin
      } else {
        pluginInfo = new pluginKey.class()
      }
      await pluginInfo.updateRegExp()

      if (!isTask && e) {
        await e.reply('表情包数据更新完成')
      }
      logger.mark(chalk.rgb(255, 165, 0)('✅ 表情包数据更新完成 🎉'))
      return true
    } catch (error) {
      if (!isTask && e) {
        await e.reply(`表情包数据更新失败: ${error.message}`)
      }
      logger.error(`表情包数据更新出错: ${error.message}`)
      return false
    }
  }


  async checkUpdate (e, isTask = false) {
    try {
      if (!Config.other.checkRepo && (isTask || e.isMaster))return
      const { owner, repo, branchName } = await Code.gitRepo.getRepo()
      const localCommit = await Code.commit.getLocalCommit(Version.Plugin_Path)
      const remoteCommit = await Code.commit.getRemoteCommit(owner, repo, branchName)
      const commitSha = await Code.gitRepo.getBranchSha(branchName)

      if(!await Code.gitRepo.getAllBranch()){
        logger.info(`${chalk.yellow(`[${Version.Plugin_AliasName}] 没有分支信息, 初始化分支信息`)}`)
        await Code.gitRepo.addBranchInfo(branchName, localCommit.sha)
      }
      if(isTask){
        if (commitSha === remoteCommit.sha) {
          logger.debug(chalk.rgb(255, 165, 0)('✅ 当前版本已经是最新版本 🎉'))
          return
        } else if (localCommit.commitTime === remoteCommit.commitTime){
          logger.debug(chalk.cyan('🔄 当前版本已经是最新版本, 但数据库数据未更新, 开始更新数据库的数据'))
          await Code.gitRepo.addBranchInfo(branchName, localCommit.sha)
          return
        }
      }

      const commitInfo = {
        committer: remoteCommit.committer.login,
        commitTime: remoteCommit.commitTime,
        title: remoteCommit.message.title,
        content: remoteCommit.message.content,
        commitUrl: remoteCommit.commitUrl
      }

      const img = await Render.render('code/index', {
        commitInfo,
        branchName
      })

      if (isTask && commitSha !== remoteCommit.sha) {
        const masterQQs = Config.masterQQ.filter(qq => {
          const qqStr = String(qq)
          return qqStr.length <= 11 && qqStr !== 'stdin'
        })

        if (masterQQs.length > 0) {
          for (let qq of masterQQs) {
            try {
              await Bot.pickFriend(qq).sendMsg(img)
              await Bot.sleep(2000)
              break
            } catch (sendError) {
              logger.info(`发送消息给 ${qq} 失败: ${sendError.message}`)
            }
          }
        }
      } else if (!isTask && e) {
        await e.reply(img)
      }
      await Code.gitRepo.addBranchInfo(branchName, remoteCommit.sha)

    } catch (error) {
      logger.error(`更新检查失败: ${error.message}`)
      if (!isTask && e) {
        await e.reply(`更新检查失败: ${error.message}`)
      }
    }
  }


}
