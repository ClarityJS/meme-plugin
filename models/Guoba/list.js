import Meme from '../meme.js';

export default function list() {
  return Array.from(new Set(
    Object.values(Meme.infoMap || {}).flatMap(info => info.keywords)
  )).map(keyword => ({ label: keyword, value: keyword }));
}