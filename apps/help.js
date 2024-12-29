import lodash from 'lodash'
import { Render, Data, Version, Config } from '../components/index.js'
import Theme from '../config/system/theme_system.js'

export class help extends plugin {
  constructor () {
    super({
      name: '清语表情:帮助',
      event: 'message',
      priority: -Infinity,
      rule: [
        {
          reg: '^#?(清语表情|clarity-meme|meme|表情)(命令|帮助|菜单|help|说明|功能|指令|使用说明)$',
          fnc: 'help'
        },
        {
          reg: '^#?(清语表情|clarity-meme)(版本|版本信息|version|versioninfo)$',
          fnc: 'versionInfo'
        }
      ]
    })
  }

  async help (e) {
    if (!Config.meme.Enable) return false
    let custom = {}
    let help = {}
    let { diyCfg, sysCfg } = await Data.importCfg('help')

    if (lodash.isArray(help.helpCfg)) {
      custom = {
        helpList: help.helpCfg,
        helpCfg: {}
      }
    } else {
      custom = help
    }

    let helpConfig = lodash.defaults(
      diyCfg.helpCfg || {},
      custom.helpCfg,
      sysCfg.helpCfg
    )
    let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList

    let helpGroup = []

    lodash.forEach(helpList, (group) => {
      if (group.auth && group.auth === 'master' && !e.isMaster) {
        return true
      }

      lodash.forEach(group.list, (help) => {
        let icon = help.icon * 1
        if (!icon) {
          help.css = 'display:none'
        } else {
          let x = (icon - 1) % 10
          let y = (icon - x - 1) / 10
          help.css = `background-position:-${x * 50}px -${y * 50}px`
        }
      })

      helpGroup.push(group)
    })
    let themeData = await Theme.getThemeData(
      diyCfg.helpCfg || {},
      sysCfg.helpCfg || {}
    )
    const img = Render.render(
      'help/index',
      {
        helpCfg: helpConfig,
        helpGroup,
        ...themeData,
        element: 'default'
      }
    )
    await e.reply(img)
  }

  async versionInfo (e) {
    const img = Render.render(
      'help/version-info',
      {
        currentVersion: Version.ver,
        changelogs: Version.logs,
        elem: 'elem'
      }
    )
    await e.reply(img)
  }
}
