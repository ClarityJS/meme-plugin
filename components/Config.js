
import YAML from 'yaml'
import chokidar from 'chokidar'
import fs from 'node:fs'
import YamlReader from './YamlReader.js'
import _ from 'lodash'
import Version from './Version.js'
import { cfgSchema } from '../config/system/cfg_system.js'
import cfg from '../../../lib/config/config.js'

class Config {
  constructor () {
    this.config = {}
    this.oldConfig = {}
    /** 监听文件 */
    this.watcher = { config: {}, defSet: {} }

    this.initCfg()
  }

  /** 初始化配置 */
  initCfg () {
    let path = `${Version.Plugin_Path}/config/config/`
    if (!fs.existsSync(path)) fs.mkdirSync(path)
    let pathDef = `${Version.Plugin_Path}/config/defSet/`
    const files = fs
      .readdirSync(pathDef)
      .filter((file) => file.endsWith('.yaml'))
    for (let file of files) {
      if (!fs.existsSync(`${path}${file}`)) {
        fs.copyFileSync(`${pathDef}${file}`, `${path}${file}`)
      }
      this.watch(`${path}${file}`, file.replace('.yaml', ''), 'config')
    }
  }

  /** 主人QQ */
  get masterQQ () {
    return cfg.masterQQ
  }

  /** 表情设置 */
  get meme () {
    return this.getDefOrConfig('meme')
  }

  /**
   * 权限设置
   */
  get access (){
    return this.getDefOrConfig('access')
  }

  /**
   * 保护设置
   */
  get protect () {
    return this.getDefOrConfig('protect')
  }

  /**
   * 统计设置
   */
  get stats () {
    return this.getDefOrConfig('stats')
  }

  /** 其他设置 */
  get other () {
    return this.getDefOrConfig('other')
  }

  /** 默认配置和用户配置 */
  getDefOrConfig (name) {
    let def = this.getdefSet(name)
    let config = this.getConfig(name)
    return { ...def, ...config }
  }

  /** 默认配置 */
  getdefSet (name) {
    return this.getYaml('defSet', name)
  }

  /** 用户配置 */
  getConfig (name) {
    return this.getYaml('config', name)
  }

  /**
   * 获取配置yaml
   * @param type 默认跑配置-defSet，用户配置-config
   * @param name 名称
   */
  getYaml (type, name) {
    let file = `${Version.Plugin_Path}/config/${type}/${name}.yaml`
    let key = `${type}.${name}`

    if (this.config[key]) return this.config[key]

    this.config[key] = YAML.parse(fs.readFileSync(file, 'utf8'))

    this.watch(file, name, type)

    return this.config[key]
  }

  /** 监听配置文件 */
  watch (file, name, type = 'defSet') {
    let key = `${type}.${name}`
    if (!this.oldConfig[key]) {
      this.oldConfig[key] = _.cloneDeep(this.config[key])
    }
    if (this.watcher[key]) return

    const watcher = chokidar.watch(file)
    watcher.on('change', async (path) => {
      delete this.config[key]
      if (typeof Bot == 'undefined') return
      logger.mark(`[清语表情][修改配置文件][${type}][${name}]`)

      if (name == 'config') {
        const oldConfig = this.oldConfig[key]
        delete this.oldConfig[key]
        const newConfig = this.getYaml(type, name)
        const object = this.findDifference(oldConfig, newConfig)
        // console.log(object);
        for (const key in object) {
          if (Object.hasOwnProperty.call(object, key)) {
            const value = object[key]
            const arr = key.split('.')
            if (arr[0] !== 'servers') continue
            let data = newConfig.servers[arr[1]]
            if (typeof data === 'undefined') data = oldConfig.servers[arr[1]]
            const target = {
              type: null,
              data
            }
            if (
              typeof value.newValue === 'object' &&
              typeof value.oldValue === 'undefined'
            ) {
              target.type = 'add'
            } else if (
              typeof value.newValue === 'undefined' &&
              typeof value.oldValue === 'object'
            ) {
              target.type = 'del'
            } else if (
              value.newValue === true &&
              (value.oldValue === false ||
                typeof value.oldValue === 'undefined')
            ) {
              target.type = 'close'
            } else if (
              value.newValue === false &&
              (value.oldValue === true || typeof value.oldValue === 'undefined')
            ) {
              target.type = 'open'
            }

            await modifyWebSocket(target)
          }
        }
      }
    })

    this.watcher[key] = watcher
  }

  getCfgSchemaMap () {
    let ret = {}
    _.forEach(cfgSchema, (cfgGroup) => {
      _.forEach(cfgGroup.cfg, (cfgItem, cfgKey) => {
        ret[cfgItem.key] = cfgItem
        cfgItem.cfgKey = cfgKey
      })
    })
    return ret
  }

  getCfgSchema () {
    return cfgSchema
  }

  getCfg () {
    let other = this.getDefOrConfig('other')
    let meme = this.getDefOrConfig('meme')
    let access = this.getDefOrConfig('access')
    let protect = this.getDefOrConfig('protect')
    return {
      ...other,
      ...meme,
      ...access,
      ...protect
    }
  }

  /**
   * @description: 修改设置
   * @param {String} name 文件名
   * @param {String} key 修改的key值
   * @param {String|Number} value 修改的value值
   * @param {'config'|'defSet'} type 配置文件或默认
   */
  modify (name, key, value, type = 'config') {
    let path = `${Version.Plugin_Path}/config/${type}/${name}.yaml`
    new YamlReader(path).set(key, value)
    this.oldConfig[key] = _.cloneDeep(this.config[key])
    delete this.config[`${type}.${name}`]
  }

  /**
   * @description: 修改配置数组
   * @param {String} name 文件名
   * @param {String|Number} key key值
   * @param {String|Number} value value
   * @param {'add'|'del'} category 类别 add or del
   * @param {'config'|'defSet'} type 配置文件或默认
   */
  modifyarr (name, key, value, category = 'add', type = 'config') {
    let path = `${Version.Plugin_Path}/config/${type}/${name}.yaml`
    let yaml = new YamlReader(path)
    if (category == 'add') {
      yaml.addIn(key, value)
    } else {
      let index = yaml.jsonData[key].indexOf(value)
      yaml.delete(`${key}.${index}`)
    }
  }

  setArr (name, key, item, value, type = 'config') {
    let path = `${Version.Plugin_Path}/config/${type}/${name}.yaml`
    let yaml = new YamlReader(path)
    let arr = yaml.get(key).slice()
    arr[item] = value
    yaml.set(key, arr)
  }

  /**
   * @description 对比两个对象不同的值
   * @param {*} oldObj
   * @param {*} newObj
   * @param {*} parentKey
   * @returns
   */
  findDifference (obj1, obj2, parentKey = '') {
    const result = {}
    for (const key in obj1) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        const diff = this.findDifference(obj1[key], obj2[key], fullKey)
        if (!_.isEmpty(diff)) {
          Object.assign(result, diff)
        }
      } else if (!_.isEqual(obj1[key], obj2[key])) {
        result[fullKey] = { oldValue: obj1[key], newValue: obj2[key] }
      }
    }
    for (const key in obj2) {
      if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key
        result[fullKey] = { oldValue: undefined, newValue: obj2[key] }
      }
    }
    return result
  }
}
export default new Config()
