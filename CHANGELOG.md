# 变更日志

## [1.8.1](https://github.com/wuliya336/clarity-meme/compare/v1.8.0...v1.8.1) (2025-01-16)

### 🔧 其他更新

* 更新自动发布工作流，改用 release-it 进行版本发布 ([e2a5cd4](https://github.com/wuliya336/clarity-meme/commit/e2a5cd4d0d08aa61e9bb1482073e57d28855116f))

### ♻️ 重构

* **Meme:** 优化 images.js 中的图片处理逻辑 ([b238cda](https://github.com/wuliya336/clarity-meme/commit/b238cda3e03dfaa8fc63e72ab88cf28913415250))

## [1.8.0](https://github.com/wuliya336/clarity-meme/compare/v1.7.12...v1.8.0) (2025-01-15)

### ✨ 新功能

* **models:** 添加表情保护功能并优化图片处理逻辑 ([cfbb3a5](https://github.com/wuliya336/clarity-meme/commit/cfbb3a5796bd1a5bc8347c129b7d4370d7d26a87))

### 📚 文档更新

* 更新 README 中的任务列表 ([7a0256d](https://github.com/wuliya336/clarity-meme/commit/7a0256dfc0f3a4a043c0ec975aefa648de2f5a80))

### 🔧 其他更新

* **pre-commit:** 将自动更新计划从每日更改为每周 ([0ea0506](https://github.com/wuliya336/clarity-meme/commit/0ea050644ba838f4fb21cd3ede04e5035ea84ec5))

### ♻️ 重构

* **models:** 优化 tools.js 中的请求处理逻辑 ([cb05843](https://github.com/wuliya336/clarity-meme/commit/cb05843f29799841f340c84f1ed83c37ddc96367))

### ⚡ 性能优化

* **models:** 优化请求模块的重试机制和错误处理 ([1f78a7b](https://github.com/wuliya336/clarity-meme/commit/1f78a7bf1240d54ba0dd47dce705f0b24398aa3b))
* 优化字体加载策略 ([367c3cc](https://github.com/wuliya336/clarity-meme/commit/367c3ccbc1dccb4e423c0c5084911a53094d8ea5))

## [1.7.12](https://github.com/wuliya336/clarity-meme/compare/v1.7.11...v1.7.12) (2025-01-14)

### ♻️ 重构

* **models:** 重构表情包生成逻辑 ([a04a9e0](https://github.com/wuliya336/clarity-meme/commit/a04a9e0f53ebb743f6673165c051a9ff3a519cb3))

## [1.7.11](https://github.com/wuliya336/clarity-meme/compare/v1.7.10...v1.7.11) (2025-01-14)

### 🐛 修复

* **workflow:** 跳过版本更新当更新pre-commit依赖时 ([d8c186b](https://github.com/wuliya336/clarity-meme/commit/d8c186b5973332a6a9b15e0e0aa3c55bdffbbf1e))

### ♻️ 重构

* **Meme:** 重构表情生成逻辑 ([88d7108](https://github.com/wuliya336/clarity-meme/commit/88d71084dfac3909b44ca46fc8040be65fc41180))
* **models:** 优化用户头像获取流程 ([580f1f7](https://github.com/wuliya336/clarity-meme/commit/580f1f7caa7bcd43a9546e03ea5974190f78663f))

## [1.7.10](https://github.com/wuliya336/clarity-meme/compare/v1.7.9...v1.7.10) (2025-01-13)

### 🐛 修复

* **models:** 优化头像获取逻辑 ([b186553](https://github.com/wuliya336/clarity-meme/commit/b186553c2f8e6d68c0eb5116b648e8bf03c1b8ff))

### ♻️ 重构

* **meme:** 调整防误触机制并优化代码结构 ([0b53f40](https://github.com/wuliya336/clarity-meme/commit/0b53f40f8788bafccebba70a38c59311c44859bd))

## [1.7.9](https://github.com/wuliya336/clarity-meme/compare/v1.7.8...v1.7.9) (2025-01-13)

### 🐛 修复

* **meme:** 针对仅图片类型添加特殊处理以防误触发 ([e06bee5](https://github.com/wuliya336/clarity-meme/commit/e06bee598c8546cee62c05d8ed71d24b5426e1b9))
* **random:** 更新表情生成逻辑以使用新的Meme类 ([1c499e0](https://github.com/wuliya336/clarity-meme/commit/1c499e0e955a69290ef22c205b5b47a4abefc356))

### ♻️ 重构

* **meme:** 重构表情包生成逻辑 ([a6b95ac](https://github.com/wuliya336/clarity-meme/commit/a6b95ac0c058696d4721d59342953a27baf9c411))

## [1.7.8](https://github.com/wuliya336/clarity-meme/compare/v1.7.7...v1.7.8) (2025-01-12)

### 🐛 修复

* **models:** 修复表情回复中 base64 图片格式的处理 ([12e56c6](https://github.com/wuliya336/clarity-meme/commit/12e56c612f7211add21e023411c774447840a27b))

### ♻️ 重构

* **Meme:** 重构文字处理逻辑 ([8403425](https://github.com/wuliya336/clarity-meme/commit/84034251f9a5a6a972fe128fbc065a2c721151dc))
* **models:** 优化获取用户昵称功能 ([a2c157a](https://github.com/wuliya336/clarity-meme/commit/a2c157a3fca2fe430f845bb083dc6e29c11e6e22))

## [1.7.7](https://github.com/wuliya336/clarity-meme/compare/v1.7.6...v1.7.7) (2025-01-11)

### 🐛 修复

* **apps:** 修复表情预览图片加载失败的问题 ([da238cf](https://github.com/wuliya336/clarity-meme/commit/da238cf65f6c84c341c25fcc774a2f1a474aae49))

### 🎨 代码风格

* 调整背景图显示方式 ([8444e91](https://github.com/wuliya336/clarity-meme/commit/8444e915f40931d87a767a40a325d298a8580a37))

## [1.7.6](https://github.com/wuliya336/clarity-meme/compare/v1.7.5...v1.7.6) (2025-01-11)

### ♻️ 重构

* **models:** 重构模型层逻辑 ([f7f51c9](https://github.com/wuliya336/clarity-meme/commit/f7f51c9d5bbe89b770899ba05a60892ed0d71415))
* **models:** 重构表情包生成逻辑 ([b910acc](https://github.com/wuliya336/clarity-meme/commit/b910acce3e050f37ea49deb8ae68405e4fb73b26))

## [1.7.5](https://github.com/wuliya336/clarity-meme/compare/v1.7.3...v1.7.5) (2025-01-11)

### ♻️ 重构

* **admin:** 更新管理面板标题和背景 ([aecb932](https://github.com/wuliya336/clarity-meme/commit/aecb932445b0addd726050fa40724da1233fcd3b))
* 重构版本发布流程并优化相关功能 ([3c8916d](https://github.com/wuliya336/clarity-meme/commit/3c8916d294e943f6679c030aa1f9ba8834a7defa))

## [1.7.4](https://github.com/wuliya336/clarity-meme/compare/v1.7.3...v1.7.4) (2025-01-10)

### ♻️ 重构

* 重构版本发布流程并优化相关功能 ([a0f4978](https://github.com/wuliya336/clarity-meme/commit/a0f4978529544495cd4e2a71f62b683603b126a2))

## [1.7.3](https://github.com/wuliya336/clarity-meme/compare/v1.7.2...v1.7.3) (2025-01-10)
* **models:** 增加请求重试机制并增加超时配置 ([0da418a](https://github.com/wuliya336/clarity-meme/commit/0da418a1ddfb0c6838b969479f63191c7f225273))
* 
## [1.7.2](https://github.com/wuliya336/clarity-meme/compare/v1.7.1...v1.7.2) (2025-01-09)

### ♻️ 重构

* **resources:** 更新字体资源为在线链接 ([0da91d3](https://github.com/wuliya336/clarity-meme/commit/0da91d357a43c626bda4db1a2e194f9a8331428c))
* **resources:** 更新背景图资源 ([1d4fb6c](https://github.com/wuliya336/clarity-meme/commit/1d4fb6c49e83242a78a98af598c2c8aec20c1bc9))

## [1.7.1](https://github.com/wuliya336/clarity-meme/compare/v1.7.0...v1.7.1) (2025-01-06)

### 🐛 修复

* **list:** 修复表情总数计算逻辑 ([c642ae8](https://github.com/wuliya336/clarity-meme/commit/c642ae88f33d6dd20cf5b7434da889aefa8d1621))

### 🔧 其他更新

* **models:** 添加 police_warn 模型支持, 新增表情`警方提醒` ([696fab3](https://github.com/wuliya336/clarity-meme/commit/696fab30fd1e14bd0e96fbb5f0399e56d7685921))

### 🔄 持续集成

* 优化版本发布条件和代码检出 ([5b42d14](https://github.com/wuliya336/clarity-meme/commit/5b42d14fee1d21e7a2892563270e8c2fc25fd31b))

## [1.7.0](https://github.com/wuliya336/clarity-meme/compare/v1.6.3...v1.7.0) (2025-01-04)

### ✨ 新功能

* **models:** 优化 args 参数处理逻辑, 适配多参数 ([d6119ff](https://github.com/wuliya336/clarity-meme/commit/d6119ffa921e114282679aaa7c750e785e39914d))

### 🔄 持续集成

* 优化自动发布版本的条件判断 ([619863c](https://github.com/wuliya336/clarity-meme/commit/619863cef37f61259c62973aefe68bf2aeed13f7))

## [1.6.3](https://github.com/wuliya336/clarity-meme/compare/v1.6.2...v1.6.3) (2025-01-03)

### 🐛 修复

* **components:** 修复使用外置渲染karin-puppeteer无法正常输出 ([b6b910d](https://github.com/wuliya336/clarity-meme/commit/b6b910df24c6bfbb7bbe14438daa2138b43136ff))
* **models/Code:** 修复在Miao-Yunzai下无法正常执行检查插件更新 ([53344f0](https://github.com/wuliya336/clarity-meme/commit/53344f0b06724e497d0fd688ebb40eb69eb488e5))

### ♻️ 重构

* **models:** 添加新的角色选择功能并优化描述文案 ([1b9dd6e](https://github.com/wuliya336/clarity-meme/commit/1b9dd6ec4b336fc6bd8fb5779b92f6f943113cc3))

### 🔄 持续集成

* 排除 GitHub Actions 机器人触发自动发布 ([49d3bc1](https://github.com/wuliya336/clarity-meme/commit/49d3bc1214bbe8a8d6062d5b42c5712dcbfbe510))

## [1.6.2](https://github.com/wuliya336/clarity-meme/compare/v1.6.1...v1.6.2) (2025-01-02)

### ♻️ 重构

* **config:** 更新 stats.yaml 配置键名 ([ee7f86f](https://github.com/wuliya336/clarity-meme/commit/ee7f86f33f0ee28d4206d0eab1a2186b81bb1849))
* **models:** 重构模型层代码 ([3a93f2f](https://github.com/wuliya336/clarity-meme/commit/3a93f2f32c33a3b25f8fac0078a9e308d5b09526))

### 🔄 持续集成

* 优化版本发布流程 ([5bcad35](https://github.com/wuliya336/clarity-meme/commit/5bcad353ee0bcc0efb68c1bfa1975bb238272493))

## [1.6.1](https://github.com/wuliya336/clarity-meme/compare/v1.6.0...v1.6.1) (2025-01-01)
### 🐛 修复

* 修复设置界面不正常显示统计设置 ([e5060778b53525bf0a797c765c0fda767ee7db6c](https://github.com/wuliya336/clarity-meme/commit/e5060778b53525bf0a797c765c0fda767ee7db6c))

## [1.6.0](https://github.com/wuliya336/clarity-meme/compare/v1.5.1...v1.6.0) (2025-01-01)

### ✨ 新功能

* 添加发布脚本并优化更新功能 ([2a022e5](https://github.com/wuliya336/clarity-meme/commit/2a022e5d329cf2bd4a75908496d6338d3384531d))

### 🐛 修复

* 修正获取变更内容的 awk 命令以正确提取 CHANGELOG ([e9e68bf](https://github.com/wuliya336/clarity-meme/commit/e9e68bfb293fe73f8cd908bb616d9b393aacc3ea))

### 🔄 持续集成

* 更新 CHANGELOG.md 格式并调整版本检查逻辑 ([9e853c3](https://github.com/wuliya336/clarity-meme/commit/9e853c383ffd33f8ab3d1acb6d237b7b099933d7))

## 1.5.0 
- 此版本已完成大部分功能 

## 1.4.0 ~ 1.4.6
- `新增` 功能`每日凌晨自动更新表情包数据`
- `优化` 更新推送逻辑
- `新增` 功能`表情调用统计`
- `优化` 头像获取逻辑以适配其他适配器
- 从此版本开始，更新表情包数据无需再重启`BOT`了
- `新增`并`完善` 表情包数据更新逻辑
- 修复 `引用消息` 在 `引用自身` 时获取错误
- 优化部分代码结构
- 修改传入艾特用户昵称触发方式

## 1.3.0
- 细节优化

## 1.2.0
- 修复并完善功能 `表情保护`
- 优化部分代码结构

## 1.1.1 ~ 1.2.0
- `新增` 表情 `企鹅摇头` 
- `修复` 部分已知 `bug`
- `完善` 模块 `获取昵称`
- `修复` 功能 `设置` 部分渲染
- `新增` 支持 `默认文本` 自动传入 `艾特用户`
- `修复` 模块 `引用消息图片获取`
- `新增` 插件表情包地址支持 `海外地区` 
- `优化` 默认表情包请求地址选择
- `新增` 设置 `表情保护` 
- `新增设置 `用户保护`
- `新增`设置 `默认表情`
- `完善` 使用 `请求` 不走 `代理`
- `新增` 设置 `禁用表情列表` 开关
- `新增` 设置 `名单限制` 开关
- `新增` 设置 `名单限制模式`
- `新增` 设置 `用户白名单`
- `新增` 设置 `用户黑名单`
- `优化` 插件 `表情包请求地址获取`
- `完善` 自定义地址的表情包数据
- `优化` 表情包数据获取
- `完善` 锅巴面板配置
- `新增` 设置 `表情黑名单`
- `优化` 部分 `引用消息` 场景
- `优化` 请求地址获取方法
- `新增` 支持获取引用消息

## 1.0.0 ~ 1.1.0
- 初版发布 
- 暂时只写了 `文本` 和 `图片` 类型表情兼容
- 新增搜索功能表情包 
- 优化设置模块
- 新增适配 `锅巴面板` 
- 优化部分模块
- 优化路径处理
- 新增自定义表情包功能 
- 优化统一加载逻辑
- 优化部分模块
- 新增预览图片功能 
- 优化列表渲染逻辑 
- 新增随机表情功能 
- 新增 args 参数支持 
- 新增默认文本方案 
- 优化不同类型表情包的规则
- 修复图片类型表情包匹配
