export default [
  {
    component: 'SOFT_GROUP_BEGIN',
    label: '其他设置'
  },
  {
    field: 'other.renderScale',
    label: '渲染精度',
    component: 'InputNumber',
    bottomHelpMessage: '可选值50~200，建议100。设置高精度会提高图片的精细度，但因图片较大可能会影响渲染与发送速度',
    required: true,
    componentProps: {
      min: 50,
      max: 200,
      placeholder: '请输入渲染精度'
    }
  },
  {
    field: 'other.checkRepo',
    label: '仓库更新检测',
    component: 'Switch',
    bottomHelpMessage: '是否开启仓库更新检测'
  },
  {
    field: 'other.autoUpdate',
    label: '自动更新',
    component: 'Switch',
    bottomHelpMessage: '是否开启自动更新'
  },
  {
    field: 'other.autoUpdateCron',
    label: '自动更新Cron表达式',
    bottomHelpMessage: '定时自动更新Cron表达式,重启生效',
    component: 'EasyCron',
    componentProps: {
      placeholder: '请输入Cron表达式'
    }
  }
]