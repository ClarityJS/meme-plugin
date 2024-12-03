import { plugin, logger } from '../components/Base/index.js'
import { Meme } from '../models/index.js'

export class meme extends plugin {
  constructor () {
    super({
      name: '星点表情:表情包',
      event: 'message',
      priority: 100,
      rule: []
    })

    Meme.load()

    if (Meme.keyMap) {
      this.rule = Object.keys(Meme.keyMap).map((keyword) => ({
        reg: new RegExp(`^#?(${keyword})(.*)`, 'i'),
        fnc: 'meme'
      }))
    } else {
      logger.error(`[星点表情] 初始化失败`)
    }
  }

  async meme (e) {
    const message = e.msg.trim()

    const matchedKeyword = Object.keys(Meme.keyMap).find((key) => message.startsWith(key))

    if (!matchedKeyword) {
      return false
    }

    const memeKey = Meme.getKey(matchedKeyword)
    const memeInfo = Meme.getInfo(memeKey)

    if (!memeKey || !memeInfo) {
      logger.error(`[星点表情] 表情包键值或信息加载失败: ${matchedKeyword}`)
      e.reply(`未找到相关表情包: ${matchedKeyword}`)
      return false
    }

    const { max_texts, min_images } = memeInfo.params_type || {}

    if (max_texts > 0) {
      // 文本规则处理
      return await Meme.text(e, memeKey, matchedKeyword, message)
    } else if (min_images > 0) {
      // 图片规则处理
      return await Meme.image(e, memeKey, memeInfo)
    }

    return false
  }
}
