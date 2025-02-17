import _ from 'lodash'

import { Utils } from '#models'

async function handleArgs (e, memeKey, userText, allUsers, formData) {
  const argsMatches = userText.match(/#(\S+)\s+([^#]+)/g)
  const argsArray = {}

  if (argsMatches) {
    for (const match of argsMatches) {
      const [_, key, value] = match.match(/#(\S+)\s+([^#]+)/)
      argsArray[key] = value.trim()
    }

    const argsString = await handle(e, memeKey, allUsers, argsArray)
    if (argsString.success === false) {
      return {
        success: argsString.success,
        message: argsString.message
      }
    }
    formData.append('args', argsString)
  }

  return {
    text: userText.replace(/#(\S+)\s+([^#]+)/g, '').trim()
  }
}

async function handle (e, key, allUsers, args) {
  if (!args) {
    args = {}
  }

  const argsObj = {}

  for (const [argName, argValue] of Object.entries(args)) {
    const paramType = await Utils.Tools.getParamType(key, argName)

    if (!paramType) {
      return {
        success: false,
        message: `参数名 ${argName} 不存在`
      }
    }

    if (paramType === 'integer') {
      const intValue = parseInt(argValue)
      argsObj[argName] = intValue
    } else {
      argsObj[argName] = argValue
    }
  }

  const userInfos = [
    {
      text: await Utils.Common.getNickname(e, allUsers[0] || e.sender.user_id),
      gender: await Utils.Common.getGender(e, allUsers[0] || e.sender.user_id)
    }
  ]
  return JSON.stringify({
    user_infos: userInfos,
    ...argsObj
  })
}

export { handle, handleArgs }
