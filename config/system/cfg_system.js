export const cfgSchema = {
  meme: {
    title: '表情设置',
    cfg: {
      Enable: {
        title: '默认表情',
        key: '默认表情',
        desc: '是否设置为默认表情',
        def: true,
        type: 'boolean',
        fileName: 'meme'
      },
      url: {
        title: '自定义地址',
        key: '自定义地址',
        desc: '设置表情包的地址，留空时使用自带',
        type: 'string',
        fileName: 'meme'
      },
      forceSharp: {
        title: '强制触发',
        key: '强制触发',
        def: false,
        desc: '是否强制使用#触发, 开启后必须使用#触发',
        type: 'boolean',
        fileName: 'meme'
      },
      cache: {
        title: '缓存',
        key: '缓存',
        def: true,
        desc: '是否开启头像缓存',
        type: 'boolean',
        fileName: 'meme'
      },
      reply: {
        title: '引用回复',
        key: '引用回复',
        def: false,
        desc: '是否开启引用回复',
        type: 'boolean',
        fileName: 'meme'
      },
      userName: {
        title: '用户昵称',
        key: '用户昵称',
        def: false,
        desc: '是否开启使用用户昵称，不开则默认使用表情名称',
        type: 'boolean',
        fileName: 'meme'
      }
    }
  },
  access: {
    title: '名单设置',
    cfg: {
      enable: {
        title: '名单限制',
        key: '名单限制',
        desc: '是否开启名单限制',
        def: false,
        type: 'boolean',
        fileName: 'access'
      },
      blackListEnable: {
        title: '禁用表情列表',
        key: '禁用表情列表',
        desc: '是否开启黑名单',
        def: false,
        type: 'boolean',
        fileName: 'access'
      },
      mode: {
        title: '名单模式',
        key: '名单模式',
        desc: '名单模式，仅在开启名单限制启用，0为白名单，1为黑名单',
        type: 'number',
        fileName: 'access'
      },
      userWhiteList: {
        title: '用户白名单',
        key: '用户白名单',
        desc: '白名单，白名单模式时生效',
        type: 'list'
      },
      userBlackList: {
        title: '用户黑名单',
        key: '用户黑名单',
        desc: '用户黑名单，黑名单模式时生效',
        type: 'list',
        fileName: 'access'
      },
      blackList: {
        title: '禁用表情列表',
        key: '禁用表情列表',
        desc: '禁用表情列表',
        type: 'list',
        fileName: 'access'
      }
    }
  },
  protect: {
    title: '表情保护设置',
    cfg: {
      enable: {
        title: '是否开启表情保护',
        key: '是否开启表情保护',
        desc: '是否开启表情保护功能',
        def: false,
        type: 'boolean',
        fileName: 'protect'
      },
      master: {
        title: '主人保护',
        key: '主人保护',
        desc: '是否开启主人保护功能',
        def: false,
        type: 'boolean',
        fileName: 'protect'
      },
      userEnable: {
        title: '用户保护',
        key: '用户保护',
        desc: '是否开启用户保护功能',
        def: false,
        type: 'boolean',
        fileName: 'protect'
      },
      user: {
        title: '保护用户',
        key: '保护用户',
        desc: '其他用户的保护列表',
        type: 'list',
        fileName: 'protect'
      },
      list: {
        title: '保护表情列表',
        key: '保护表情列表',
        desc: '主人的保护列表',
        type: 'list',
        fileName: 'protect'
      }
    }
  },
  stats: {
    title: '统计设置',
    cfg: {
      enable: {
        title: '表情统计',
        key: '表情统计',
        desc: '是否开启表情统计',
        def: true,
        type: 'boolean',
        fileName: 'meme'
      }
    },
    other: {
      title: '其他设置',
      cfg: {
        checkRepo: {
          title: '仓库更新检测',
          key: '仓库更新检测',
          type: 'boolean',
          def: true,
          desc: '是否开启仓库更新检测',
          fileName: 'other'
        },
        renderScale: {
          title: '渲染精度',
          key: '渲染精度',
          type: 'number',
          def: 100,
          input: (n) => Math.min(200, Math.max(50, n * 1 || 100)),
          desc: '可选值50~200，建议100。设置高精度会提高图片的精细度，但因图片较大可能会影响渲染与发送速度',
          fileName: 'other'
        }
      }
    }
  }
}