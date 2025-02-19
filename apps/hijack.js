import chalk from 'chalk'

import { Config } from '#components'

let dailyNoteByWidget
try {
  dailyNoteByWidget = (await import('../../earth-k-plugin/apps/emoticon.js')).dailyNoteByWidget
} catch (error) {
  logger.warn(chalk.cyan('[清语表情] 土块插件未加载，跳过劫持'))
}

if (Config.other.hijackRes) {
  try {
    dailyNoteByWidget.prototype.accept = async function () {
      logger.info(chalk.yellow('[清语表情:表情包] 已劫持土块插件表情包'))
    }
  }catch (error) {
    logger.error('[清语表情:表情包] 劫持土块插件表情包失败')
  }
}
