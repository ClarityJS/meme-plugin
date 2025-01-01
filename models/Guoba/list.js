import Tools from '../tools.js'

export default function list () {
  return Array.from(new Set(
    Object.values(Tools.getInfoMap() || {}).flatMap(info => info.keywords)
  )).map(keyword => ({ label: keyword, value: keyword }))
}