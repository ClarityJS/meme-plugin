// utils.js
export const formatCommitTime = (commitDate) => {
  return new Date(commitDate).toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false
  })
}

export const parseCommitMessage = (message) => {
  const [title, ...contentLines] = message.split('\n\n')
  const content = contentLines.join('\n\n')
  return { title: title || '', content: content || '' }
}

const utils = {
  formatCommitTime,
  parseCommitMessage
}

export default utils
