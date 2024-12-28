export default [
  {
    component: 'SOFT_GROUP_BEGIN',
    label: '其他设置'
  },
  {
    field: 'other.renderScale',
    label: '渲染精度',
    component: 'InputNumber',
    bottomHelpMessage:
          '可选值50~200，建议100。设置高精度会提高图片的精细度，但因图片较大可能会影响渲染与发送速度',
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
  }
]