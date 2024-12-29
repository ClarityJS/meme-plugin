import { Version } from '../../components/index.js'

const repo = {
  async getRepo () {
    const localPath = Version.Plugin_Path

    try {
      const command = `git -C "${localPath}" config --get remote.origin.url`
      const remoteUrlRaw = await Bot.exec(command, { quiet: true })

      let remoteUrl = ''
      if (typeof remoteUrlRaw === 'object') {
        remoteUrl = remoteUrlRaw.stdout || JSON.stringify(remoteUrlRaw)
      } else {
        remoteUrl = String(remoteUrlRaw).trim()
      }

      const match = remoteUrl.match(/(?:https?:\/\/.+?\/)?(?:https?:\/\/)?github\.com[:\/]([^\/]+)\/([^\/]+?)(?:\.git)?$/)
      if (!match) {
        throw new Error(`无法解析远程仓库地址: ${remoteUrl}`)
      }

      const currentBranchCommand = `git -C "${localPath}" rev-parse --abbrev-ref HEAD`
      const currentBranchRaw = await Bot.exec(currentBranchCommand, { quiet: true })

      let currentBranch = ''
      if (typeof currentBranchRaw === 'object') {
        currentBranch = currentBranchRaw.stdout || JSON.stringify(currentBranchRaw)
      } else {
        currentBranch = String(currentBranchRaw).trim()
      }

      return { owner: match[1], repo: match[2], currentBranch }
    } catch (error) {
      throw new Error(`获取远程仓库地址或当前分支失败: ${error.message}`)
    }
  }
}

export default repo
