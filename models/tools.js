import fs from 'fs'
import Meme from './meme.js'
import { Data, Version, Config } from '../components/index.js'
import Request from './request.js'


const Tools = {
  async isAbroad (){
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
        logger.debug('远程表情包数据已存在，跳过下载')
        return
      }
      if (forceUpdate && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      const response = await Request.get('https://pan.wuliya.cn/d/Yunzai-Bot/data/meme.json')
      Data.writeJSON('data/meme.json', response)
      logger.debug('远程表情包数据下载完成')
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
        logger.debug('本地表情包数据已存在，跳过生成')
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
      logger.debug('本地表情包数据生成完成')
    } catch (error) {
      logger.error(`生成本地表情包数据失败: ${error.message}`)
      throw error
    }
  },
  /**
   * 关键词转键值
   */
  async keywordToKey (keyword) {
    for (const [key, value] of Object.entries(Meme.infoMap)) {
      if (value.keywords.includes(keyword)) {
        return key
      }
    }
    return null
  },
  /**
   * 检查是否在禁用表情列表中
   */
  async isBlacklisted (input) {
    const blacklistedKeys = await Promise.all(
      Config.access.blackList.map(async (item) => {
        return await this.keywordToKey(item) || item
      })
    )

    if (blacklistedKeys.includes(input)) {
      return true
    }

    const memeKey = await this.keywordToKey(input)
    return blacklistedKeys.includes(memeKey)
  }

}
export default Tools