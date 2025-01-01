import fs from 'fs'
import _ from 'lodash'
import Data from './Data.js'
import cfg from '../../../lib/config/config.js'
import { fileURLToPath } from 'url'
import { join, dirname, basename } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const Path = process.cwd()
const Plugin_Path = join(__dirname, '..').replace(/\\/g, '/')
const Plugin_Name = basename(Plugin_Path)

let packageJson = {}
packageJson = Data.readJSON('package.json', `${Path}`)

let changelogs = []
let currentVersion = ''
const versionCount = 3

const getLine = (line) => {
  return line
    .replace(/^\s*[\*\-]\s*/, '')
    .replace(/\s*`([^`]+)`/g, '<span class="cmd">$1</span>')
    .replace(/\*\*([^*]+)\*\*/g, '<span class="strong">$1</span>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="link">$1</span>')
}
const CHANGELOG_path = `${Plugin_Path}/CHANGELOG.md`



try {
  if (fs.existsSync(CHANGELOG_path)) {
    const logs = fs.readFileSync(CHANGELOG_path, 'utf8') || ''
    const lines = logs.replace(/\t/g, '   ').split('\n')
    let temp = {}
    let lastCategory = {}

    _.forEach(lines, (line) => {
      if (changelogs.length >= versionCount) return false

      const versionMatch = /^##?\s*\[?([0-9a-zA-Z\\.~\s]+)]?(?:$([^)]+)$)?/.exec(line.trim())
      if (versionMatch && versionMatch[1]) {
        if (temp.version) {
          changelogs.push(temp)
        }
        temp = {
          version: versionMatch[1].trim(),
          logs: []
        }

        lastCategory = {}
        return
      }

      const categoryMatch = /^###\s+(.*)/.exec(line.trim())
      if (categoryMatch && categoryMatch[1]) {
        lastCategory = { title: getLine(categoryMatch[1]), logs: [] }
        temp.logs.push(lastCategory)
        return
      }

      const logMatch = /^\s*[\*\-]\s+(.*)/.exec(line)
      if (logMatch && logMatch[1]) {
        const logItem = getLine(logMatch[1])
        if (lastCategory.logs) {
          lastCategory.logs.push(logItem)
        } else {
          temp.logs.push({ title: '', logs: [logItem] })
        }
        return
      }
    })

    if (temp.version && changelogs.length < versionCount) {
      changelogs.push(temp)
    }

    // 设置 currentVersion 为最新版本
    if (changelogs.length > 0) {
      currentVersion = changelogs[0].version
      changelogs[0].version += ' <span class="new"></span>' // 添加 NEW 标志
    }
  }
} catch (err) {
  console.error('Error reading CHANGELOG:', err)
}


// 设置 Bot 名称
let BotName = cfg.package.name
if (BotName === 'miao-yunzai') {
  BotName = 'Miao-Yunzai'
} else if (BotName === 'yunzai') {
  BotName = 'Yunzai-Bot'
} else if (BotName === 'trss-yunzai') {
  BotName = 'TRSS-Yunzai'
} else {
  BotName = _.capitalize(BotName)
}

// 导出对象
const Version = {
  get ver () {
    return currentVersion
  },
  get name () {
    return BotName
  },
  get bot () {
    return packageJson.version
  },
  get logs () {
    return changelogs
  },
  get Path () {
    return Path
  },
  get Plugin_Name () {
    return Plugin_Name
  },
  get Plugin_Path () {
    return Plugin_Path
  }
}

export default Version

