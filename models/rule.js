import Meme from './meme.js'
import Utils from './utils.js'
import { Config } from '../components/index.js'
import FormData from 'form-data'
import Args from './args.js'
import Tools from './tools.js'

const Rule = {
  /**
  * 表情处理逻辑
  */
  async meme (e, memeKey, memeInfo, userText) {
    const { params_type } = memeInfo || {}

    const {
      min_texts,
      max_texts,
      min_images,
      max_images,
      default_texts,
      args_type
    } = params_type

    const formData = new FormData()
    let images = []
    let finalTexts = []
    let argsString = null

    try {
      /**
      * 针对仅图片类型表情作特殊处理
      */
      if (min_texts === 0 && max_texts === 0 && args_type === null && userText) {
        const isValidInput = /^@\s*\d+(\s*@\s*\d+)*$/.test(userText.trim())
        if (!isValidInput) {
          return false
        }
      }

      /**
      * 通用处理
      */
      let userAvatars = []
      const atMatches = userText.matchAll(/@\s*(\d+)/g)
      for (const match of atMatches) {
        userAvatars.push(match[1])
      }
      userText = userText.replace(/@\s*\d+/g, '').trim()

      /**
      * 处理 args 参数类型表情
      */
      if (args_type !== null) {
        const argsMatch = userText.match(/#(.+)/)
        if (argsMatch) {
          const message = argsMatch[1].trim()
          if (message) {
            argsString = Args.handle(memeKey, message)
            formData.append('args', argsString)
          }
          userText = userText.replace(/#.+/, '').trim()
        }
      }

      /**
      * 处理图片类型表情
      */
      if (!(min_images === 0 && max_images === 0)) {

        if (userAvatars.length > 0) {
          const avatarBuffers = await Utils.getAvatar(userAvatars)
          if (avatarBuffers) {
            avatarBuffers.forEach(avatarList => {
              if (Array.isArray(avatarList)) {
                avatarList.forEach(avatar => {
                  if (avatar) images.push(avatar)
                })
              } else if (avatarList) {
                images.push(avatarList)
              }
            })
          }

          if (images.length < min_images) {
            const triggerAvatar = await Utils.getAvatar([e.user_id])
            if (triggerAvatar && Array.isArray(triggerAvatar) && triggerAvatar[0]) images.unshift(triggerAvatar[0])
          }
        } else {
          const fetchedImages = await Utils.getImage(e, userText, max_images)
          images = fetchedImages
          if (images.length < min_images) {
            const triggerAvatar = await Utils.getAvatar([e.user_id])
            if (triggerAvatar && Array.isArray(triggerAvatar) && triggerAvatar[0]) images.unshift(triggerAvatar[0])
          }
        }

        if (Config.protect.enable && min_images === 2) {
          const ats = e.message.filter((m) => m.type === 'at').map((at) => at.qq)
          const manualAtQQs = [...userText.matchAll(/@(\d{5,11})/g)].map(
            (match) => match[1]
          )
          const allAtQQs = [...new Set([...ats, ...manualAtQQs])]

          let isMaster = false
          let isUserAuthorized = false
          let isProtectedMeme = false

          if (Config.protect.master) {
            const masterQQ = Array.isArray(Config.protect.MasterQQ)
              ? Config.protect.MasterQQ
              : [Config.protect.MasterQQ]

            isMaster = allAtQQs.some((userId) => masterQQ.includes(userId))
          }

          if (Config.protect.userEnable) {
            const authorizedUsers = Config.protect.user || []
            isUserAuthorized = allAtQQs.some((userId) => authorizedUsers.includes(userId))
          }


          const protectedMemeKeys = await Promise.all(
            Config.protect.list.map(async (item) => await Tools.keywordToKey(item) || item)
          )
          isProtectedMeme = protectedMemeKeys.includes(memeKey)

          if (isProtectedMeme && (isMaster || isUserAuthorized)) {
            images.reverse().forEach((buffer, index) => {
              formData.append('images', buffer, `image${index}.jpg`)
            })
          } else {
            images.forEach((buffer, index) => {
              formData.append('images', buffer, `image${index}.jpg`)
            })
          }
        } else {
          images.forEach((buffer, index) => {
            formData.append('images', buffer, `image${index}.jpg`)
          })
        }

        if (images.length < min_images) {
          return e.reply(`该表情至少需要 ${min_images} 张图片`, true)
        }

        images = images.slice(0, max_images)
      }

      /**
      * 处理文本类型表情
      */
      if (!(min_texts === 0 && max_texts === 0)) {
        if (userText) {
          const splitTexts = userText.split('/').map((text) => text.trim())
          finalTexts = splitTexts.slice(0, max_texts)
        }

        const ats = e.message.filter((m) => m.type === 'at').map((at) => at.qq)

        if (finalTexts.length === 0 && Config.meme.userName) {
          if (ats.length >= 1) {
            const User = ats[0]
            const Nickname = await Utils.getNickname(User, e)
            finalTexts.push(Nickname)
          } else {
            const Nickname = await Utils.getNickname(e.sender.user_id, e)
            finalTexts.push(Nickname)
          }
        } else if (
          finalTexts.length === 0 &&
         default_texts &&
         default_texts.length > 0
        ) {
          const randomIndex = Math.floor(Math.random() * default_texts.length)
          finalTexts.push(default_texts[randomIndex])
        }

        if (finalTexts.length < min_texts) {
          return e.reply(`该表情至少需要 ${min_texts} 个文字描述`, true)
        }

        finalTexts.forEach((text) => {
          formData.append('texts', text)
        })
      }

      /**
      * 检查是否包含所需的内容
      */
      if (min_images > 0 && images.length === 0) {
        return e.reply(`该表情至少需要 ${min_images} 张图片`, true)
      }

      if (min_texts > 0 && finalTexts.length < min_texts) {
        return e.reply(`该表情至少需要 ${min_texts} 个文字描述`, true)
      }

      const endpoint = `memes/${memeKey}/`
      const result = await Meme.request(
        endpoint,
        formData,
        'POST',
        'arraybuffer'
      )

      if (Buffer.isBuffer(result)) {
        const base64Image = await Utils.bufferToBase64(result)
        await e.reply(
          segment.image(`base64://${base64Image}`),
          Config.meme.reply
        )
      } else {
        await e.reply(segment.image(result), Config.meme.reply)
      }

      return true
    } catch (error) {
      logger.error(`[清语表情] 表情生成失败: ${error.message}`)
      await e.reply(`生成表情包失败: ${error.message}`)
      return true
    }
  }

}

export default Rule
