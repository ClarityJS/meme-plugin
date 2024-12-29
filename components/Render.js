import Version from './Version.js'
import Config from './Config.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'

function scale (pct = 1) {
  const renderScale = Config.other.renderScale || 100
  const scaleValue = Math.min(2, Math.max(0.5, renderScale / 100))
  return `style=transform:scale(${pct * scaleValue})`
}

const Render = {
  /**
   * 渲染并截图
   * @param {string} path - HTML 模板路径
   * @param {*} params - 模板参数
   * @param {Object} [options] - 配置选项
   * @param {string} [options.type='buffer'] - 返回类型：'buffer' 或 'base64'
   * @returns {Promise<Buffer|string>} - 图片数据（Buffer 或 Base64 格式）
   */
  async render (path, params = {}, options = { type: 'buffer' }) {
    const { type = 'buffer' } = options
    const normalizedPath = path.replace(/.html$/, '')
    const savePath = `/${normalizedPath.replace('html/', '')}`
    const basePath = `${Version.Plugin_Path}/resources`.replace(/\\/g, '/')

    const data = {
      _Plugin_name: Version.Plugin_Name,
      _res_path: basePath,
      _layout_path: `${basePath}/common/layout/`,
      defaultLayout: `${basePath}/common/layout/default.html`,
      elemLayout: `${basePath}/common/layout/elem.html`,
      sys: {
        scale: scale(params.scale || 1)
      },
      copyright: `${Version.name}<span class="version"> ${Version.bot}</span> & ${Version.Plugin_Name}<span class="version"> ${Version.ver}`,
      pageGotoParams: {
        waitUntil: 'load'
      },
      tplFile: `${basePath}/${normalizedPath}.html`,
      pluResPath: basePath,
      saveId: normalizedPath.split('/').pop(),
      imgType: 'jpeg',
      multiPage: true,
      multiPageHeight: 12000,
      ...params
    }

    const [result] = await puppeteer.screenshots(`${Version.Plugin_Name}${savePath}`, data)
    const fileBuffer = result.file

    if (type === 'base64') {
      return segment.image(`base64://${fileBuffer.toString('base64')}`)
    }
    return segment.image(fileBuffer)
  }
}

export default Render
