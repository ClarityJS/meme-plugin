import { Config, Render } from '../components/index.js'
import lodash from 'lodash'

let keys = lodash.map(Config.getCfgSchemaMap(), (i) => i.key)
let sysCfgReg = new RegExp(`^#清语表情设置\\s*(${keys.join('|')})?\\s*(.*)`)

export class setting extends plugin {
  constructor () {
    super({
      name: '清语表情:设置',
      event: 'message',
      priority: -Infinity,
      rule: [
        {
          reg: sysCfgReg,
          fnc: 'setting'
        }
      ]
    })
  }

  async setting (e) {
    if (!this.e.isMaster) return true

    let regRet = sysCfgReg.exec(e.msg) || []
    let cfgSchemaMap = Config.getCfgSchemaMap()
    let cfgKey = regRet[1]
    let val = regRet[2]?.trim() || ''

    if (cfgKey === '全部') {
      let enableAll = !/关闭/.test(val)
      for (const key of keys) {
        let schema = cfgSchemaMap[key]
        if (schema && typeof schema.def === 'boolean') {
          if (key === '全部') {
            await redis.set('Yz:sweet-star:setAll', enableAll ? 1 : 0)
          } else {
            Config.modify(schema.fileName, schema.cfgKey, enableAll)
          }
        }
      }
    } else if (cfgKey) {
      let cfgSchema = cfgSchemaMap[cfgKey]
      if (cfgSchema.type === 'list') {
        let currentList = Config.getDefOrConfig(cfgSchema.fileName)?.[cfgSchema.cfgKey] || []
        if (!Array.isArray(currentList)) {
          currentList = []
        }

        if (/^添加/.test(val)) {
          let itemToAdd = val.replace(/^添加\s*/, '').trim()
          if (!currentList.includes(itemToAdd)) {
            currentList.push(itemToAdd)
            Config.modify(cfgSchema.fileName, cfgSchema.cfgKey, currentList)
          }
        } else if (/^删除/.test(val)) {
          let itemToRemove = val.replace(/^删除\s*/, '').trim()
          currentList = currentList.filter((item) => item !== itemToRemove)
          Config.modify(cfgSchema.fileName, cfgSchema.cfgKey, currentList)
        }
      } else {
        if (cfgSchema.input) {
          val = cfgSchema.input(val)
        } else {
          switch (cfgSchema.type) {
            case 'number':
              val = val * 1 || cfgSchema.def
              break
            case 'boolean':
              val = !/关闭/.test(val)
              break
            case 'string':
              val = val || cfgSchema.def
              break
            default:
              val = val || cfgSchema.def
              break
          }
        }
        Config.modify(cfgSchema.fileName, cfgSchema.cfgKey, val)
      }
    }

    let schema = Config.getCfgSchema()
    let cfg = Config.getCfg()
    cfg.setAll = (await redis.get('Yz:sweet-star:setAll')) == 1

    const img =  Render.render(
      'admin/index',
      {
        schema,
        cfg
      }
    )
    await e.reply(img)
  }
}
