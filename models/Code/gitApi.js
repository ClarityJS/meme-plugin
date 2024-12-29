import Tools from '../tools.js'

const gitApi = {
  async getGitApi () {
    const isAbroad = await Tools.isAbroad()
    return isAbroad ? 'https://api.github.com' : 'https://gh.llkk.cc/https://api.github.com'
  }
}

export default gitApi
