import Version from './Version.js'
import Config from './Config.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'

function scale (pct = 1) {
  const renderScale = Config.other.renderScale || 100
  const scale = Math.min(2, Math.max(0.5, renderScale / 100))
  pct = pct * scale
  return `style=transform:scale(${pct})`
}

const Render = {
  /**
   *
   * @param {string} path html模板路径
   * @param {*} params 模板参数
   * @param {*} cfg 渲染参数
   * @param {boolean} multiPage 是否分页截图，默认false
   * @returns
   */
  async render (path, params) {
    path = path.replace(/.html$/, '')
    const savePath = `/${path.replace('html/', '')}`
    const data = {
      _Plugin_name: Version.Plugin_Name,
      _res_path: `${Version.Plugin_Path}/resources`.replace(/\\/g, '/'),
      _layout_path: `${Version.Plugin_Path}/resources/common/layout/`.replace(/\\/g, '/'),
      defaultLayout: `${Version.Plugin_Path}/resources/common/layout/default.html`.replace(/\\/g, '/'),
      elemLayout: `${Version.Plugin_Path}/resources/common/layout/elem.html`.replace(/\\/g, '/'),
      sys: {
        scale: scale(params?.scale || 1)
      },
      copyright: `${Version.name}<span class="version"> ${Version.bot}</span> & ${Version.Plugin_Name}<span class="version"> ${Version.ver}`,
      pageGotoParams: {
        waitUntil: 'load'
      },
      tplFile: `${Version.Plugin_Path}/resources/${path}.html`,
      pluResPath: `${Version.Plugin_Path}/resources/`,
      saveId: path.split('/').pop(),
      imgType: 'jpeg',
      multiPage: true,
      multiPageHeight: 12000,
      ...params
    }
    return await puppeteer.screenshots(`${Version.Plugin_Name}${savePath}`, data)
  }
}

export default Render
