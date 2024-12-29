import { Render, Config } from '../components/index.js'
import { Tools } from '../models/index.js'

export class stats extends plugin {
  constructor () {
    super({
      name: '清语表情:统计',
      event: 'message',
      priority: -Infinity,
      rule: [
        {
          reg: /^#?(清语表情|clarity-meme|meme)?统计$/i,
          fnc: 'stats'
        }
      ]
    })
  }

  async stats (e) {
    if (!Config.meme.Enable) return false
    const keys = await redis.keys('Yz:clarity-meme:stats:*')

    let total = 0
    const statsData = []

    for (const key of keys) {
      const memeKey = key.split(':').pop()
      const count = parseInt(await redis.get(key)) || 0
      total += count

      const keywords = await Tools.getKeywords(memeKey)
      if (!keywords || keywords.length === 0) continue
      statsData.push({ keywords, count })
    }

    statsData.sort((a, b) => b.count - a.count)

    const img = await Render.render('meme/stats', {
      total,
      emojiList: statsData
    })
    await e.reply(img)
    return true
  }
}
