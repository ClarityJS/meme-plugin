import { Meme, Rule, Tools } from '../models/index.js'
import { Config } from '../components/index.js'

export class random extends plugin {
  constructor () {
    super({
      name: '清语表情:随机表情包',
      event: 'message',
      priority: -Infinity,
      rule: [
        {
          reg: /^#?(清语表情|clarity-meme)?随机(表情|meme)(包)?$/i,
          fnc: 'random'
        }
      ]
    })
  }

  async random (e) {
    if (!Config.meme.Enable) return false
    try {
      const memeKeys = Object.keys(Tools.getInfoMap())
      if (memeKeys.length === 0) {
        return true
      }

      const memeKey = memeKeys[Math.floor(Math.random() * memeKeys.length)]
      const memeInfo = Tools.getInfo(memeKey)

      if (!memeInfo) {
        return true
      }

      const { min_texts, max_texts, min_images, max_images, args_type } =
        memeInfo.params_type || {}

      const isValid =
        (min_texts === 1 && max_texts === 1) ||
        (min_images === 1 && max_images === 1) ||
        (min_texts === 1 && min_images === 1) ||
        (args_type && (min_texts === 1 || min_images === 1))

      if (!isValid) {
        return true
      }

      await Rule.meme(e, memeKey, memeInfo, '')
    } catch (error) {
      logger.error(`[清语表情] 随机表情处理失败: ${error.message}`)
      await e.reply(`生成随机表情时出错: ${error.message}`, true)
    }
  }
}
