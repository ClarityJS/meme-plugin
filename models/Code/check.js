import gitRepo from './gitRepo.js'
import commit from './commit.js'

const check = {
  async version (localPath) {
    try {
      const { owner, repo, currentBranch } = await gitRepo.getRepo()
      const localVersionCommand = `git -C "${localPath}" rev-parse HEAD`
      const localVersionRaw = await Bot.exec(localVersionCommand, { quiet: true })

      let localVersion = ''
      if (typeof localVersionRaw === 'object') {
        localVersion = localVersionRaw.stdout || JSON.stringify(localVersionRaw)
      } else {
        localVersion = String(localVersionRaw).trim()
      }

      const latestCommit = await commit.getLatestCommit(owner, repo, currentBranch)
      const isUpToDate = localVersion === latestCommit.sha

      return {
        isUpToDate,
        localVersion,
        branchVersion: latestCommit.sha,
        branchName: currentBranch,
        latestCommit
      }
    } catch (error) {
      throw new Error(`版本检测失败: ${error.message}`)
    }
  }
}

export default check
