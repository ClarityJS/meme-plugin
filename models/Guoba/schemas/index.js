import { Config } from '../../../components/index.js'
import access from './access.js'
import meme from './meme.js'
import protect from './protect.js'
import other from './other.js'

export const schemas = [
  meme,
  access,
  protect,
  other
].flat()

export function getConfigData () {
  return {
    meme: Config.meme,
    other: Config.other,
    access: Config.access,
    protect: Config.protect
  }
}

export function setConfigData (data, { Result }) {
  for (let key in data) {
    Config.modify(...key.split('.'), data[key])
  }
  return Result.ok({}, '保存成功辣ε(*´･ω･)з')
}
