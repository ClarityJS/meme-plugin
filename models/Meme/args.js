import _ from 'lodash'

import { Utils } from '#models'

async function handleArgs (e, memeKey, userText, allUsers, formData, isArg, { Arg }) {
  const argsArray = {}

  if (isArg) {
    argsArray[Arg.name] = Arg.value
  } else {
    const argsMatches = userText.match(/#(\S+)\s+([^#]+)/g)
    if (argsMatches) {
      for (const match of argsMatches) {
        const [ _, key, value ] = match.match(/#(\S+)\s+([^#]+)/)
        argsArray[key] = value.trim()
      }
    }
  }

  const argsResult = isArg
    ? { success: true, argsString: JSON.stringify({ [Arg.name]: Arg.value }) }
    : await handle(e, memeKey, allUsers, argsArray)
  if (!argsResult.success) {
    return {
      success: argsResult.success,
      message: argsResult.message
    }
  }

  formData.append('args', argsResult.argsString)

  return {
    success: true,
    text: userText.replace(/#(\S+)\s+([^#]+)/g, '').trim()
  }
}

async function handle (e, key, allUsers, args) {
  if (!args) {
    args = {}
  }

  const argsObj = {}
  const paramInfos = await Utils.Tools.getParamInfo(key)

  if (!paramInfos || paramInfos.length === 0) {
    return {
      success: false,
      message: '未找到任何参数信息'
    }
  }

  const paramMap = paramInfos.reduce((acc, { name }) => {
    acc[name] = true
    return acc
  }, {})

  for (const [ argName, argValue ] of Object.entries(args)) {
    if (!paramMap[argName]) {
      return {
        success: false,
        message: `该参数表情不存在参数 ${argName}`
      }
    }
    argsObj[argName] = argValue
  }

  const userInfos = [
    {
      text: await Utils.Common.getNickname(e, allUsers[0] || e.sender.user_id),
      gender: await Utils.Common.getGender(e, allUsers[0] || e.sender.user_id)
    }
  ]

  return {
    success: true,
    argsString: JSON.stringify({
      user_infos: userInfos,
      ...argsObj
    })
  }
}


export { handle, handleArgs }
