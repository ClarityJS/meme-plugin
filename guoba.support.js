import { Guoba } from './models/index.js'

export function supportGuoba () {
  return {
    pluginInfo: Guoba.pluginInfo,
    configInfo: Guoba.configInfo
  }
}