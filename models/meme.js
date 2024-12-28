import { Data, Config } from '../components/index.js'
import Tools from './tools.js'
import Request from './request.js'

const Meme = {
  infoMap: null,
  loaded: false,
  baseUrl: null,

  /**
   * 获取表情包请求地址
   * @returns {string}
   */
  async getBaseUrl () {
    if (this.baseUrl) {
      return this.baseUrl
    }

    if (Config.meme.url) {
      this.baseUrl = Config.meme.url.replace(/\/+$/, '')
      return this.baseUrl
    }

    let Url = 'https://meme.wuliya.cn'

    try {
      const isAbroad = await Tools.isAbroad()
      if (isAbroad) {
        Url = 'https://meme.wuliya.xin'
      }
    } catch (error) {
      logger.error(`获取IP地址出错，使用默认 URL: ${error.message}`)
    }

    this.baseUrl = Url
    return this.baseUrl
  },

  /**
   * 加载表情包数据
   * @returns {Promise<void>}
   */
  async load () {
    if (this.loaded) {
      return
    }

    try {
      if (!Config.meme.url) {
        await Tools.downloadMemeData()
        this.infoMap = Data.readJSON('data/meme.json')
      } else {
        await Tools.generateMemeData()
        this.infoMap = Data.readJSON('data/custom/meme.json')
      }

      if (!this.infoMap || typeof this.infoMap !== 'object') {
        logger.error('加载表情包详情失败')
        return
      }
      this.loaded = true
    } catch (error) {
      logger.error(`加载表情包数据出错: ${error.message}`)
    }
  },

  /**、
   * 获取表情包键值
   */
  getKey (keyword) {
    if (!this.loaded) {
      this.load()
    }
    for (const [key, value] of Object.entries(this.infoMap)) {
      if (value.keywords.includes(keyword)) {
        return key
      }
    }
    return null
  },

  /**
 * 获取表情包信息
 * @param {string} memeKey
 */
  getInfo (memeKey) {
    if (!this.loaded) {
      this.load()
    }
    return this.infoMap?.[memeKey] || null
  },

  /**
   * 发送表情包请求
   * @param {string} endpoint 请求地址
   * @param {object} params 请求参数
   * @param {string} method 请求方法
   * @param {string} responseType 响应类型
   */
  async request (endpoint, params = {}, method = 'GET', responseType) {
    try {
      const baseUrl = await this.getBaseUrl()
      const url = `${baseUrl}/${endpoint}`
      if (method.toUpperCase() === 'GET') {
        return await Request.get(url, params)
      } else if (method.toUpperCase() === 'POST') {
        return await Request.post(url, params, responseType)
      } else {
        throw new Error('不支持的请求方法')
      }
    } catch (error) {
      logger.error(`请求 ${endpoint} 失败: ${error.message}`)
      throw error
    }
  },

  /**
 * 获取表情包预览图片地址
 * @param {string} memeKey
 */
  async getPreviewUrl (memeKey) {
    if (!memeKey) {
      logger.error('表情键值不能为空')
      return null
    }
    const baseUrl = await this.getBaseUrl()
    const previewUrl = `${baseUrl}/memes/${memeKey}/preview`
    return previewUrl
  }
}

export default Meme
