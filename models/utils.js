import fs from 'fs'
import { Version, Data, Config } from '../components/index.js'
import Request from './request.js'

const Utils = {

  /**
   * 获取图片 Buffer
   */
  async getImageBuffer (imageUrl) {
    if (!imageUrl) throw new Error('图片地址不能为空')

    logger.debug(`[清语表情] 开始下载图片: ${imageUrl}`)

    try {
      const buffer = await Request.get(imageUrl, {}, 'arraybuffer')
      logger.debug(`[清语表情] 图片下载完成: ${imageUrl}`)
      return buffer
    } catch (error) {
      logger.error(`[清语表情] 图片下载失败: ${error.message}`)
      throw error
    }
  },

  /**
   * 将图片 Buffer 转换为 Base64
   */
  async bufferToBase64 (buffer) {
    if (!buffer) throw new Error('图片 Buffer 不能为空')

    logger.debug('[清语表情] 开始转换 Buffer 为 Base64')
    try {
      const base64Data = buffer.toString('base64')
      logger.debug('[清语表情] Base64 转换完成')
      return base64Data
    } catch (error) {
      logger.error(`[清语表情] Base64 转换失败: ${error.message}`)
      throw error
    }
  },

  /**
   * 获取用户 QQ 头像
   */
  async getAvatar (qqList) {
    if (!qqList) throw new Error('QQ 号不能为空')
    if (!Array.isArray(qqList)) qqList = [qqList]

    const avatarUrl = (qq) => `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`

    if (!Config.meme.cache) {
      return
    }

    const cacheDir = `${Version.Plugin_Path}/data/avatar`
    if (!fs.existsSync(cacheDir)) {
      Data.createDir('data/avatar', '', false)
      logger.debug(`[清语表情] 创建头像缓存目录: ${cacheDir}`)
    }

    const downloadAvatar = async (qq) => {
      const cachePath = `${cacheDir}/avatar_${qq}.jpg`
      const remoteAvatarUrl = avatarUrl(qq)

      if (fs.existsSync(cachePath)) {
        try {
          const localStats = fs.statSync(cachePath)
          const remoteHeaders = await Request.head(remoteAvatarUrl)
          const remoteLastModified = new Date(remoteHeaders['last-modified'])
          const localLastModified = localStats.mtime

          if (localLastModified >= remoteLastModified) {
            logger.debug(`[清语表情] 使用已缓存头像: QQ=${qq}, Path=${cachePath}`)
            return fs.readFileSync(cachePath)
          }
        } catch (error) {
          logger.error(`[清语表情] 检查远程头像文件信息失败: QQ=${qq}, 错误: ${error.message}`)
        }
      }

      logger.debug(`[清语表情] 开始下载头像: QQ=${qq}, URL: ${remoteAvatarUrl}`)
      try {
        const buffer = await Request.get(remoteAvatarUrl, {}, 'arraybuffer')
        if (buffer && Buffer.isBuffer(buffer)) {
          fs.writeFileSync(cachePath, buffer)
          return buffer
        } else {
          throw new Error('头像下载返回了无效的数据')
        }
      } catch (error) {
        logger.error(`[清语表情] 下载头像失败: QQ=${qq}, 错误: ${error.message}`)
        throw error
      }
    }


    const results = await Promise.all(qqList.map((qq) => downloadAvatar(qq)))
    return results
  },

  /**
 * 获取用户昵称
 */
  async getNickname (qq, e) {
    if (!qq || !e) {
      return '未知'
    }

    try {
      const adapter = Bot[e.self_id]?.version?.name || '未知'
      if (adapter !== 'ICQQ') {
        if (e.isGroup) {
          const group = Bot.pickGroup(e.group_id)
          const memberMap = await group.getMemberMap()
          for (const [userId, memberInfo] of memberMap) {
            if (userId === parseInt(qq)) {
              return memberInfo.card || memberInfo.nickname || '未知'
            }
          }
        }

        const user = Bot.pickUser(qq)
        const userInfo = await user.getInfo()
        return userInfo?.nickname || '未知'
      }

      if (e.isGroup) {
        const group = Bot.pickGroup(e.group_id)
        const memberMap = await group.getMemberMap()
        for (const [userId, memberInfo] of memberMap) {
          if (userId === parseInt(qq)) {
            return memberInfo.card || memberInfo.nickname || '未知'
          }
        }
        return '未知'
      } else {
        return e.nickname || '未知'
      }
    } catch (error) {
      return '未知'
    }
  },

  /**
   * 获取图片
   **/
  async getImage (e, userText, max_images) {
    const imagesInMessage = e.message
      .filter((m) => m.type === 'image')
      .map((img) => img.url)
    const ats = e.message.filter((m) => m.type === 'at').map((at) => at.qq)
    const manualAtQQs = [...userText.matchAll(/@(\d{5,11})/g)].map(
      (match) => match[1]
    )

    const quotedImages = await this.getQuotedImages(e)

    let images = []
    let tasks = []

    /**
     * 获取引用消息中的图片
     */
    if (quotedImages.length > 0) {
      quotedImages.forEach((item) => {
        if (Buffer.isBuffer(item)) {
          images.push(item)
        } else {
          tasks.push(this.getImageBuffer(item))
        }
      })
    }

    /**
     * 获取消息中的图片
     */
    if (imagesInMessage.length > 0) {
      tasks.push(
        ...imagesInMessage.map((imageUrl) => this.getImageBuffer(imageUrl))
      )
    }

    /**
     * 艾特用户头像（长按艾特）
     */
    if (quotedImages.length === 0 && ats.length > 0) {
      const avatarBuffers = await this.getAvatar(ats)
      avatarBuffers.forEach((avatarList) => {
        if (Array.isArray(avatarList)) {
          avatarList.forEach((avatar) => {
            if (avatar) images.push(avatar)
          })
        } else if (avatarList) {
          images.push(avatarList)
        }
      })
    }

    /**
     * 手动艾特用户头像（@+数字）
     */
    if (manualAtQQs.length > 0) {
      const avatarBuffers = await this.getAvatar(manualAtQQs)
      avatarBuffers.forEach((avatarList) => {
        if (Array.isArray(avatarList)) {
          avatarList.forEach((avatar) => {
            if (avatar) images.push(avatar)
          })
        } else if (avatarList) {
          images.push(avatarList)
        }
      })
    }

    const results = await Promise.allSettled(tasks)
    results.forEach((res) => {
      if (res.status === 'fulfilled' && res.value) {
        images.push(res.value)
      }
    })

    return images.slice(0, max_images)
  },


  /**
 * 获取引用消息
 */
  async getQuotedImages (e) {
    let source = null


    if (e.getReply) {
      source = await e.getReply()
    } else if (e.source) {
      if (e.group?.getChatHistory) {
        source = (await e.group.getChatHistory(e.source.seq, 1)).pop()
      } else if (e.friend?.getChatHistory) {
        source = (await e.friend.getChatHistory(e.source.time, 1)).pop()
      }
    }

    if (!source || !source.message || !Array.isArray(source.message)) {
      return []
    }

    const imgArr = source.message
      .filter((msg) => msg.type === 'image')
      .map((img) => img.url)

    const hasOtherTypes = source.message.some((msg) => msg.type !== 'image')
    const isSelfMessage = source.sender?.user_id === e.sender.user_id

    if (isSelfMessage && imgArr.length > 0) {
      return imgArr
    }

    if (imgArr.length > 0 && !hasOtherTypes) {
      return imgArr
    }

    if (source.sender?.user_id) {
      try {
        const avatarBuffers = await this.getAvatar([source.sender.user_id])
        if (Array.isArray(avatarBuffers) && avatarBuffers.length > 0) {
          return avatarBuffers
        }
      } catch (error) {
        logger.error(`[清语表情] 获取引用消息失败: ${error.message}`)
      }
    }

    return []
  }


}

export default Utils
