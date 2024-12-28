import list from '../list.js'

export default [
  {
    component: 'SOFT_GROUP_BEGIN',
    label: '表情保护设置'
  },
  {
    field: 'protect.enable',
    label: '表情保护',
    component: 'Switch',
    bottomHelpMessage: '是否开启表情保护功能'
  },
  {
    field: 'protect.master',
    label: '主人保护',
    component: 'Switch',
    bottomHelpMessage: '是否开启主人保护功能'
  },
  {
    field: 'protect.userEnable',
    label: '用户保护',
    component: 'Switch',
    bottomHelpMessage: '是否开启用户保护功能'
  },
  {
    field: 'protect.user',
    label: '用户保护列表',
    component: 'GTags',
    bottomHelpMessage: '其他用户的保护列表'
  },
  {
    field: 'protect.list',
    label: '表情保护列表',
    component: 'Select',
    bottomHelpMessage: '设置表情保护列表',
    componentProps: {
      options: await list(),
      mode: 'multiple',
      allowClear: true
    }
  }
]