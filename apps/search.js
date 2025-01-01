import { Config } from '../components/index.js'
import { Tools } from '../models/index.js'

export class search extends plugin {
  constructor () {
    super({
      name: '清语表情:搜索',
      event: 'message',
      priority: -Infinity,
      rule: [{
        reg: /^#?(清语表情|clarity[\s-]?meme|表情|meme)搜索\s*(.+)\s*$/i,
        fnc: 'search'
      }]
    })
  }

  async search (e) {
    if (!Config.meme.Enable) return false
    try {
      const match = e.msg.match(this.rule[0].reg)
      const keyword = match[2].trim()

      if (!keyword) {
        await e.reply('请提供搜索的表情关键字', true)
        return true
      }

      const infoMap = Tools.getInfoMap()
      if (!infoMap) {
        await e.reply('表情数据未加载，请稍后重试', true)
        return true
      }

      let results = new Set()

      // 精确匹配
      if (infoMap.hasOwnProperty(keyword)) {
        infoMap[keyword].keywords.forEach(kw => results.add(kw))
      }

      // 模糊搜索
      for (const [key, info] of Object.entries(infoMap)) {
        for (const kw of info.keywords) {
          if (kw.toLowerCase().includes(keyword.toLowerCase())) {
            results.add(kw)
          }
        }
      }

      if (results.size === 0) {
        await e.reply(`未找到与"${keyword}"相关的表情`, true)
        return true
      }

      const sortedResults = [...results].sort()
      const replyMessage = sortedResults
        .map((kw, index) => `${index + 1}. ${kw}`)
        .join('\n')

      await e.reply(replyMessage, true)
      return true

    } catch (error) {
      logger.error(`表情搜索失败: ${error}`)
      await e.reply('搜索时发生错误，请稍后重试', true)
      return true
    }
  }
}
