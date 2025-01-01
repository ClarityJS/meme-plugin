import fs from 'fs'
import Meme from './meme.js'
import { Data, Version, Config } from '../components/index.js'
import Request from './request.js'

const Tools = {
  async isAbroad () {
    const urls = [
      'https://blog.cloudflare.com/cdn-cgi/trace',
      'https://developers.cloudflare.com/cdn-cgi/trace'
    ]

    try {
      const response = await Promise.any(urls.map(url => Request.get(url, {}, 'text')))
      const traceMap = Object.fromEntries(
        response.split('\n').filter(line => line).map(line => line.split('='))
      )
      return traceMap.loc !== 'CN'
    } catch (error) {
      logger.error(`获取IP所在地区错误: ${error.message}`)
      return false
    }
  },

  /**
   * 获取远程表情包数据
   */
  async downloadMemeData (forceUpdate = false) {
    try {
      const filePath = `${Version.Plugin_Path}/data/meme.json`
      Data.createDir('data')
      if (fs.existsSync(filePath) && !forceUpdate) {
        return
      }
      if (forceUpdate && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      const response = await Request.get('https://pan.wuliya.cn/d/Yunzai-Bot/data/meme.json')
      Data.writeJSON('data/meme.json', response)
    } catch (error) {
      logger.error(`下载远程表情包数据失败: ${error.message}`)
      throw error
    }
  },

  /**
   * 生成本地表情包数据
   */
  async generateMemeData (forceUpdate = false) {
    try {
      const filePath = `${Version.Plugin_Path}/data/custom/meme.json`
      Data.createDir('data/custom', '', false)
      if (fs.existsSync(filePath) && !forceUpdate) {
        return
      }
      if (forceUpdate && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      const baseUrl = await Meme.getBaseUrl()
      if (!baseUrl) {
        throw new Error('无法获取基础URL')
      }
      const keysResponse = await Request.get(`${baseUrl}/memes/keys`)
      const memeData = {}

      for (const key of keysResponse) {
        const infoResponse = await Request.get(`${baseUrl}/memes/${key}/info`)
        memeData[key] = infoResponse
      }

      Data.writeJSON('data/custom/meme.json', memeData, 2)
    } catch (error) {
      logger.error(`生成本地表情包数据失败: ${error.message}`)
      throw error
    }
  },

  /**
   * 获取 Meme.infoMap
   */
  getInfoMap () {
    return Meme.infoMap
  },

  /**
   * 获取表情包信息
   */
  getInfo (memeKey) {
    const infoMap = this.getInfoMap()
    return infoMap?.[memeKey] || null
  },

  /**
   * 将关键字转换为表情包键
   */
  getKey (keyword) {
    for (const [key, value] of Object.entries(Meme.infoMap)) {
      if (value.keywords.includes(keyword)) {
        return key
      }
    }
    return null
  },

  /**
   * 获取表情包关键字
   */
  getKeywords (memeKey) {
    const memeInfo = Meme.infoMap?.[memeKey]
    return memeInfo?.keywords || null
  },

  /**
   * 检查是否在禁用表情列表中
   */
  async isBlacklisted (input) {
    const blacklistedKeys = await Promise.all(
      Config.access.blackList.map(async (item) => {
        return await this.getKey(item) || item
      })
    )

    if (blacklistedKeys.includes(input)) {
      return true
    }

    const memeKey = await this.getKey(input)
    return blacklistedKeys.includes(memeKey)
  }
}

export default Tools
