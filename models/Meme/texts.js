import { Config } from '#components'
import { Utils } from '#models'

async function handleTexts (e, userText, min_texts, max_texts, default_texts, allUsers, formData) {

  let finalTexts = []

  if (userText) {
    const splitTexts = userText.split('/').map((text) => text.trim())
    finalTexts = splitTexts.slice(0, max_texts)
  }

  if (finalTexts.length === 0 && Config.meme.userName) {
    if (allUsers.length >= 1) {
      const User = allUsers[0]
      const Nickname = await Utils.getNickname(User, e)
      finalTexts.push(Nickname)
    } else {
      const Nickname = await Utils.getNickname(e.sender.user_id, e)
      finalTexts.push(Nickname)
    }
  }

  if (
    finalTexts.length < min_texts &&
    default_texts &&
    default_texts.length > 0
  ) {
    while (finalTexts.length < min_texts) {
      const randomIndex = Math.floor(Math.random() * default_texts.length)
      finalTexts.push(default_texts[randomIndex])
    }
  }

  if (finalTexts.length < min_texts) {
    return false
  }

  finalTexts.slice(0, max_texts).forEach((text) => {
    formData.append('texts', text)
  })

  return true
}

export { handleTexts }
