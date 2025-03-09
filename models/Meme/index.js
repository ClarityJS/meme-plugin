import { Config } from '#components'
import { Utils } from '#models'

import { handle, handleArgs } from './args.js'
import { handleImages } from './images.js'
import { handleTexts } from './texts.js'

async function make (
  e,
  memeKey,
  min_texts,
  max_texts,
  min_images,
  max_images,
  default_texts,
  args_type,
  userText) {
  const formData = new FormData()

  const quotedUser = e.source?.user_id?.toString() ?? null

  const allUsers = [
    ...new Set([
      ...(e.message.some(m => m?.type === 'reply') ? []
        : e.message.filter(m => m?.type === 'at').map(at => at?.qq?.toString() ?? '')),
      ...[ ...userText.matchAll(/@\s*(\d+)/g) ].map(match => match[1] ?? '')
    ])
  ].filter(id => id && id !== quotedUser)
  if (userText) {
    userText = userText.replace(/@\s*\d+/g, '').trim()
  }else{
    userText = ''
  }


  try {
    /**
     * 处理参数类型
     */
    if (args_type != null) {
      const args = await handleArgs(e, memeKey, userText, allUsers, formData)
      if (!args.success) {
        throw new Error(args.message)
      }
      userText = args.text
    }

    /**
     * 处理图片类型
     */
    if (max_images !== 0) {
      const images = await handleImages(e, memeKey, userText, min_images, max_images, allUsers, formData)
      if (!images.success) {
        throw new Error(images.message)
      }
      userText = images.userText
    }

    /**
     * 处理文字类型
     */
    if (max_texts !== 0) {
      let finalTexts = await handleTexts(e, userText, min_texts, max_texts, default_texts, allUsers, formData)
      if (!finalTexts.success) {
        throw new Error(finalTexts.message)
      }
    }

    const result = await Utils.Tools.request(memeKey, formData, 'arraybuffer')
    if (!result.success) throw new Error(result.message)
    if(Config.stat.enable){
      const stat = await Utils.Common.getStat(memeKey)
      await Utils.Common.addStat(memeKey, stat+1)
    }
    const base64Image = await Utils.Common.getImageBase64(result.data, true)

    return base64Image
  } catch (error) {
    logger.error(error.message)
    let errorMessage
    try {
      const parsedError = JSON.parse(error.message)
      errorMessage = parsedError.detail
    } catch (parseError) {
      errorMessage = error.message
    }

    throw new Error(errorMessage)
  }
}

export { handle, handleArgs, handleImages, handleTexts, make }
