import { Config, Version } from '#components'
import { Meme, Utils } from '#models'

let memeRegExp, argRegExp

/**
 * 生成正则表达式
 * @param {Function} getKeywords 获取关键词的函数
 * @returns {RegExp | null}
 */
const createRegex = async (getKeywords) => {
  const keywords = await getKeywords()
  if (!keywords) return null

  const prefix = Config.meme.forceSharp ? '^#' : '^#?'
  const escapedKeywords = keywords.map((keyword) =>
    keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  return new RegExp(`${prefix}(${escapedKeywords.join('|')})(.*)`, 'i')
}

memeRegExp = await createRegex(Utils.Tools.getAllKeyWords)
argRegExp = await createRegex(Utils.Tools.getArgAllKeyWords)

export class meme extends plugin {
  constructor () {
    super({
      name: '清语表情:表情包生成',
      event: 'message',
      priority: -Infinity,
      rule: []
    })

    this.rule.push(
      {
        reg: memeRegExp,
        fnc: 'meme'
      },
      {
        reg: argRegExp,
        fnc: 'arg'
      }
    )
  }

  /**
   * 更新正则
   */
  async updateRegExp () {
    memeRegExp = await createRegex(Utils.Tools.getAllKeyWords)
    argRegExp = await createRegex(Utils.Tools.getArgAllKeyWords)

    this.rule = [
      {
        reg: memeRegExp,
        fnc: 'meme'
      },
      {
        reg: argRegExp,
        fnc: 'arg'
      }
    ]

    return true
  }

  async meme (e) {
    return this.validatePrepareMeme(e, memeRegExp, Utils.Tools.getKey)
  }

  async arg (e) {
    return this.validatePrepareMeme(e, argRegExp, Utils.Tools.getArgKey, true)
  }

  /**
   * 通用处理函数, 用于验证权限获取需要的参数之类的
   */
  async validatePrepareMeme (e, regExp, getKeyFunc, isArg = false) {
    if (!Config.meme.enable) return false
    const message = (e.msg || '').trim()
    const match = message.match(regExp)
    if (!match) return false

    const matchedKeyword = match[1]
    const userText = match[2]?.trim() || ''
    if (!matchedKeyword) return false

    const memeKey = await getKeyFunc(matchedKeyword)
    if (!memeKey) return false

    /** 用户权限检查 */
    if (!this.checkUserAccess(e.user_id)) return false

    /* 黑名单检查 */
    if (Config.access.blackListEnable && (await Utils.Tools.isBlacklisted(matchedKeyword))) {
      logger.info(`[清语表情] 该表情 "${matchedKeyword}" 在禁用列表中，跳过生成`)
      return false
    }

    const params = await Utils.Tools.getParams(memeKey)
    if (!params) return false

    /* 防误触发 */
    if (params.min_texts === 0 && params.max_texts === 0 && userText) {
      const trimmedText = userText.trim()
      if (!/^(@\s*\d+\s*)+$/.test(trimmedText) && !/^(#\S+\s+[^#]+)(\s+#\S+\s+[^#]+)*$/.test(trimmedText)) {
        return false
      }
    }

    const extraData = isArg ? { Arg: await Utils.Tools.getArgInfo(matchedKeyword) } : {}

    return this.makeMeme(e, memeKey, params, userText, isArg, extraData)
  }

  /**
   * 用户权限检查
   */
  checkUserAccess (userId) {
    if (!Config.access.enable) return true

    if (
      (Config.access.mode === 0 && !Config.access.userWhiteList.includes(userId)) ||
      (Config.access.mode === 1 && Config.access.userBlackList.includes(userId))
    ) {
      logger.info(`[${Version.Plugin_AliasName}] 用户 ${userId} 没有权限，跳过生成`)
      return false
    }
    return true
  }

  /**
   * 调用 Meme 生成方法
   */
  async makeMeme (e, memeKey, params, userText, isArg, extraData) {
    try {
      const result = await Meme.make(
        e,
        memeKey,
        params.min_texts,
        params.max_texts,
        params.min_images,
        params.max_images,
        params.default_texts,
        params.args_type,
        userText,
        isArg,
        extraData
      )
      await e.reply(segment.image(result), Config.meme.reply)
      return true
    } catch (error) {
      logger.error(error.message)
      if (Config.meme.errorReply) {
        await e.reply(`[${Version.Plugin_AliasName}] 生成表情失败, 错误信息: ${error.message}`)
      }
      return false
    }
  }
}
