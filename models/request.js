import { Config, Version } from '../components/index.js'
import axios from 'axios'
import FormData from 'form-data'

const Request = {
  /**
   * 通用请求方法
   */
  async request (url, method = 'GET', params = {}, responseType = null) {
    const retry = Config.meme.retry
    let attempt = 0

    while (attempt < retry) {
      try {
        const options = {
          method: method.toUpperCase(),
          url,
          headers: {
            'User-Agent': Version.Plugin_Name
          },
          timeout: Config.meme.timeout * 1000,
          proxy: false
        }

        if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'HEAD') {
          options.params = params
        } else if (method.toUpperCase() === 'POST') {
          options.data = params
          if (params instanceof FormData) {
            options.headers = {
              ...options.headers,
              ...params.getHeaders()
            }
          }
        }

        if (responseType) {
          options.responseType = responseType
        }

        const response = await axios(options)
        return responseType === 'arraybuffer' ? Buffer.from(response.data) : response.data
      } catch (error) {
        attempt++
        if (attempt >= retry) {
          logger.error(error.message)
          if (error.response) {
            throw {
              status: error.response.status,
              message: error.response.statusText || error.message,
              data: error.response.data
            }
          } else {
            throw {
              status: 500,
              message: '网络错误'
            }
          }
        }
      }
    }
  },

  /**
   * GET 请求
   */
  async get (url, params = {}, responseType = null) {
    return await this.request(url, 'GET', params, responseType)
  },

  /**
   * POST 请求
   */
  async post (url, params = {}, responseType = null) {
    return await this.request(url, 'POST', params, responseType)
  },

  /**
   * HEAD 请求
   */
  async head (url, params = {}) {
    return await this.request(url, 'HEAD', params)
  }
}

export default Request
