import Meme from '../meme.js'

export default (() => {
  return Array.from(new Set(
    Object.values(Meme.infoMap || {}).flatMap(info => info.keywords)
  )).map(keyword => ({ label: keyword, value: Meme.getKey(keyword) }))
})()