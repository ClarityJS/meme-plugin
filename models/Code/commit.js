import Request from '../request.js'
import gitApi from './gitApi.js'
import { formatCommitTime, parseCommitMessage } from './utils.js'

const commit = {
  async getLatestCommit (owner, repo, branch) {
    try {
      const apiBase = await gitApi.getGitApi()
      const url = `${apiBase}/repos/${owner}/${repo}/commits/${branch}`
      const commit = await Request.get(url)

      const author = {
        login: commit.author?.login || '',
        avatar_url: commit.author?.avatar_url || ''
      }

      const committer = {
        login: commit.committer?.login || '',
        avatar_url: commit.committer?.avatar_url || ''
      }

      const { title, content } = parseCommitMessage(commit.commit.message)

      return {
        sha: commit.sha,
        author,
        committer,
        message: {
          title,
          content
        },
        commitTime: formatCommitTime(commit.commit.committer.date),
        commitUrl: commit.html_url
      }
    } catch (error) {
      throw new Error(`获取分支 ${branch} 的最近一次提交记录失败: ${error.message}`)
    }
  }
}

export default commit
