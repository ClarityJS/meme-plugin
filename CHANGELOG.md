# 变更日志

## [1.11.0](https://github.com/ClarityJS/meme-plugin/compare/v1.10.4...v1.11.0) (2025-02-14)

### ✨ 新功能

* **database:** 重构表情包数据存储和获取方式 ([2fec709](https://github.com/ClarityJS/meme-plugin/commit/2fec709943f97de2a31f6625a79e03f02563115f))
* **meme:** 添加表情生成错误回复配置项 ([302d1dd](https://github.com/ClarityJS/meme-plugin/commit/302d1ddfb5d421f9247b719ae0197e46fe633767))

### 🐛 修复

* **info:** 修复标签列表为空时的处理逻辑 ([cd072c7](https://github.com/ClarityJS/meme-plugin/commit/cd072c702caea9c7cc2f4b52b1b322100a97473e))
* **meme:** 修复获取默认文本的异步处理逻辑 ([04602a9](https://github.com/ClarityJS/meme-plugin/commit/04602a93dc774159f78f7e100753b6d36cec5bea))
* **meme:** 修复表情包相关函数返回值和参数处理 ([cfa47fb](https://github.com/ClarityJS/meme-plugin/commit/cfa47fb70fe9b4b7466801d41b9d0749e442cc05))
* **meme:** 表情包资源更新逻辑 ([0685ccd](https://github.com/ClarityJS/meme-plugin/commit/0685ccd66c9d713a130f95393b32ff27e8b1e204))

### ♻️ 重构

* **expression:** 重构表情相关功能 ([d80f17f](https://github.com/ClarityJS/meme-plugin/commit/d80f17f57bb0e78acdab95b276ba69d15c8c7ce1))
* **help:** 重构帮助插件 ([7a7cd82](https://github.com/ClarityJS/meme-plugin/commit/7a7cd82314dc9a29d6aec8c845eb788cf3150227))
* **help:** 重构帮助插件并适配新版样式 ([693917f](https://github.com/ClarityJS/meme-plugin/commit/693917f4c38205a663a1882e09c9ff3fe48eee67))
* **models:** 优化图像获取逻辑和条件判断 ([c55414c](https://github.com/ClarityJS/meme-plugin/commit/c55414c4404a188a33edc600924626d3af91ee93))
* **models:** 优化头像下载功能并移除默认头像 ([584a7d0](https://github.com/ClarityJS/meme-plugin/commit/584a7d0b478d13e5090c0e23c7a70cb644f40c75))
* **update:** 优化代码结构和功能 ([5e4d3db](https://github.com/ClarityJS/meme-plugin/commit/5e4d3dbefb41ac9c2b1406518ad147bb79dec7ea))
* **update:** 重构更新检查功能 ([1dde7b2](https://github.com/ClarityJS/meme-plugin/commit/1dde7b239fcc3c03ced8093ea25330a249bec643))
* **update:** 重构自动更新功能并优化配置 ([89dc997](https://github.com/ClarityJS/meme-plugin/commit/89dc9979b21c42d6ee93a734d50329ec1b40f92c))

## [1.10.4](https://github.com/ClarityJS/meme-plugin/compare/v1.10.3...v1.10.4) (2025-02-13)

### 🐛 修复

* **utils/common:** 修复请求参数，确保正确获取图片数据 ([08ef12a](https://github.com/ClarityJS/meme-plugin/commit/08ef12a7571446c496e87774630e3c449744d457))

### ♻️ 重构

* **apps:** 优化更新流程并重构代码 ([faf3198](https://github.com/ClarityJS/meme-plugin/commit/faf31986a12213a16f819be08ed0cf9c5f28be55))
* **Meme:** 重构表情包生成逻辑 ([7bae9ec](https://github.com/ClarityJS/meme-plugin/commit/7bae9ec039f6355a79a192002bdaa0e1550c4c25))
* **models:** 重构 models 层代码 ([fe43bfd](https://github.com/ClarityJS/meme-plugin/commit/fe43bfd8e34dae3c0f2611925b59c9207a8f7aad))
* **models:** 重构 Utils 工具类 ([d12cd92](https://github.com/ClarityJS/meme-plugin/commit/d12cd9237353ad5e7542bb03fe8deca20d789766))

## [1.10.3](https://github.com/ClarityJS/meme-plugin/compare/v1.10.2...v1.10.3) (2025-02-10)

### 🐛 修复

* **models/Meme:** 优化错误信息处理逻辑 ([186608d](https://github.com/ClarityJS/meme-plugin/commit/186608d4c3154a0699a80bc43c0f05e2587e099e))
* **models:** 修复引用消息源逻辑 ([a229f6f](https://github.com/ClarityJS/meme-plugin/commit/a229f6f699bed9c1ba3f4a480ca25fe025c11f7c))

### ♻️ 重构

* **models:** 优化表情包数据加载和请求逻辑 ([0224643](https://github.com/ClarityJS/meme-plugin/commit/0224643d5487d809e20fa2d2e60412e2c5cb076e))
* **models:** 重构表情包生成相关代码 ([402a21f](https://github.com/ClarityJS/meme-plugin/commit/402a21f814857d998cfb862f8a0bbf7240977728))

## [1.10.2](https://github.com/ClarityJS/meme-plugin/compare/v1.10.1...v1.10.2) (2025-02-06)

### ♻️ 重构

* **meme:** 优化防误触发处理逻辑 ([cdc3c36](https://github.com/ClarityJS/meme-plugin/commit/cdc3c36c8244a21fb5bc0f371f76b51824a2ca33))

## [1.10.1](https://github.com/ClarityJS/meme-plugin/compare/v1.10.0...v1.10.1) (2025-02-03)

### 🐛 修复

* **Utils:** 添加 Config 模块的引用 ([1d6d9e8](https://github.com/ClarityJS/meme-plugin/commit/1d6d9e87a610b83922dc5b3d8b56db256cb519c7))

## [1.10.0](https://github.com/ClarityJS/meme-plugin/compare/v1.9.0...v1.10.0) (2025-02-03)

### ✨ 新功能

* **meme:** 添加引用消息中图片的获取功能 ([e18d344](https://github.com/ClarityJS/meme-plugin/commit/e18d344e1f1fc3d0c8e45f3b40ae0134908ef512))

### 🐛 修复

* **Meme:** 在获取用户头像时添加事件参数 ([4e29034](https://github.com/ClarityJS/meme-plugin/commit/4e29034425dc67602eb53c7a7b027031ff1f89f8))

### 🔧 其他更新

* **cfg:** 添加引用图片配置功能 ([c153082](https://github.com/ClarityJS/meme-plugin/commit/c153082fc0134519bf84c62a5e1249f1061bc162))

### ♻️ 重构

* **Utils:** 调整 getAvatar 和 getNickname 方法参数顺序 ([b09d4bc](https://github.com/ClarityJS/meme-plugin/commit/b09d4bc63f4149a7231185cd6da75e9fc3519648))

## [1.9.0](https://github.com/ClarityJS/meme-plugin/compare/v1.8.10...v1.9.0) (2025-02-01)

### ✨ 新功能

* **Utils:** 优化头像获取功能 ([a90579e](https://github.com/ClarityJS/meme-plugin/commit/a90579e1f5d31c45b335b6457ab2cd54b9332eb9))

## [1.8.10](https://github.com/ClarityJS/meme-plugin/compare/v1.8.9...v1.8.10) (2025-02-01)

### ♻️ 重构

* **models:** 优化 getBaseUrl 方法 ([ed3d2ce](https://github.com/ClarityJS/meme-plugin/commit/ed3d2ceb6d95dbea31c6a5413a406b6cd1cfb81f))
* **models:** 重构表情包数据处理逻辑 ([d4f3b11](https://github.com/ClarityJS/meme-plugin/commit/d4f3b112b60dd78d12ae88ba1121ba7ece163dfb))
* **utils:** 优化 getBaseUrl 方法的默认值处理 ([9ef001e](https://github.com/ClarityJS/meme-plugin/commit/9ef001edf93fea83275793d4ffeda7b3351e43b0))

## [1.8.9](https://github.com/ClarityJS/meme-plugin/compare/v1.8.8...v1.8.9) (2025-01-31)

### 🐛 修复

* **tools:** 添加加载状态检查以防止未加载数据访问 ([78260df](https://github.com/ClarityJS/meme-plugin/commit/78260dfee2a0a1dde5b4a54157e5bada42107c12))

### 📚 文档更新

* **README:** 添加快捷指令实现的待办事项 ([c433b68](https://github.com/ClarityJS/meme-plugin/commit/c433b68b264b0838bfc3ed925f6e476606754e3a))

### ♻️ 重构

* **admin:** 重构配置系统并优化设置命令 ([8c7eabb](https://github.com/ClarityJS/meme-plugin/commit/8c7eabb620519007246e69c71416aae8968c73fa))
* **components:** 优化版本日志格式和样式 ([d65963f](https://github.com/ClarityJS/meme-plugin/commit/d65963f4cd8a43e0d4c646dbf1c269abc2ab2171))
* **components:** 重构配置模块并优化请求处理 ([ae20fa4](https://github.com/ClarityJS/meme-plugin/commit/ae20fa4c5b1bdba3bbdfa261b5df7ca96c000973))
* **meme:** 优化表情包生成逻辑和正则表达式处理 ([4741205](https://github.com/ClarityJS/meme-plugin/commit/4741205ab7a2ff5fd3077d686634f8fd9d9f0639))
* **plugin:** 重构表情插件配置和信息结构 ([4f27ee3](https://github.com/ClarityJS/meme-plugin/commit/4f27ee35e1099ef1f671dc25cac71f5840e1f495))

### ⚡ 性能优化

* **models:** 优化表情包数据获取效率 ([b89c9ff](https://github.com/ClarityJS/meme-plugin/commit/b89c9ff57f940eea1b266b0637960db6ea7f7c36))

## [1.8.8](https://github.com/ClarityJS/meme-plugin/compare/v1.8.7...v1.8.8) (2025-01-28)

### ♻️ 重构

* **meme:** 重构表情包相关功能 ([3dfab98](https://github.com/ClarityJS/meme-plugin/commit/3dfab98d478e90faaf885a17a505e132a59fdc56))
* **models:** 重构参数处理逻辑 ([7e1bd41](https://github.com/ClarityJS/meme-plugin/commit/7e1bd417e65187f3e1e48461281db52b3a8e6798))
* 重命名项目并优化 README 文档 ([98293c8](https://github.com/ClarityJS/meme-plugin/commit/98293c898573604f63ad4659ff5efdd39fd9fff3))

## [1.8.7](https://github.com/ClarityJS/meme-plugin/compare/v1.8.6...v1.8.7) (2025-01-25)

### 🐛 修复

* **info:** 更新获取图片 Base64 方法的调用路径 ([6b692a2](https://github.com/ClarityJS/meme-plugin/commit/6b692a22eda866677b27eec8c8708882a4e40ecd))
* **Utils:** 更新 isAbroad 方法以支持多个 URL 进行 IP 地区检测 ([317a58c](https://github.com/ClarityJS/meme-plugin/commit/317a58cd9a0fc8b494a4903d3c3de03293a96885))

### 📚 文档更新

* **README:** 更新 README 格式，添加居中显示和介绍部分 ([bc4f866](https://github.com/ClarityJS/meme-plugin/commit/bc4f866ba13a662bbef5e13177e01b0292c01c69))
* **README:** 更新标题格式为居中显示 ([26e5c56](https://github.com/ClarityJS/meme-plugin/commit/26e5c56d93ef4c6b45829b6b476376e4ab78b077))

## [1.8.6](https://github.com/ClarityJS/meme-plugin/compare/v1.8.5...v1.8.6) (2025-01-25)

### 🐛 修复

* **components:** 修正版权信息中的插件名称和版本显示 ([bcb0d31](https://github.com/ClarityJS/meme-plugin/commit/bcb0d312c12564d40c4fd04f204f73704d30d947))
* **index:** 修正导入路径，将 Tools 更改为 Utils ([ab515df](https://github.com/ClarityJS/meme-plugin/commit/ab515dfad83e99f95a324da4cfb04a831eb90d6a))
* **models:** 修正 Help 模块的导入路径大小写 ([4602666](https://github.com/ClarityJS/meme-plugin/commit/46026665c578b380472c969a22c992e96be6cd98))
* **Utils:** 更新 JSON 文件路径以正确保存表情包数据 ([087fa9c](https://github.com/ClarityJS/meme-plugin/commit/087fa9cd46b5e5dfdd5143ffcbeb431b5de78068))
* 将 Tools 模块更改为 Utils，修正相关导入路径 ([5a1f7bc](https://github.com/ClarityJS/meme-plugin/commit/5a1f7bc7029763bfb2882c7d3a4798fbd0093d65))

### 🎨 代码风格

* **components:** 移除 elem.html 布局文件并更新版本信息引用 ([52c2f70](https://github.com/ClarityJS/meme-plugin/commit/52c2f708e8d6cbd32a470233cc0d71301e9a5d81))
* **fonts:** 添加字体并更新相关样式 ([1cb3df0](https://github.com/ClarityJS/meme-plugin/commit/1cb3df01f7009547b4cec9b65745ae0c6e3694c3))

### 🔧 其他更新

* **deps:** bump actions/stale from 5 to 9 ([#6](https://github.com/ClarityJS/meme-plugin/issues/6)) ([cb76514](https://github.com/ClarityJS/meme-plugin/commit/cb76514e61fc2388e26e4a8db6f6db6b0c5c7e47))

### ♻️ 重构

* **components:** 重构 Data 组件 ([970e98c](https://github.com/ClarityJS/meme-plugin/commit/970e98c267909aaa70f5d3e8132d669cac63c088))
* **components:** 重构版本信息显示逻辑 ([03db200](https://github.com/ClarityJS/meme-plugin/commit/03db2006937ddeeb182d510ff56294523dffa4b4))
* **help:** 重构帮助系统模块 ([46c51cc](https://github.com/ClarityJS/meme-plugin/commit/46c51ccc44ac5d645e71593be8ed33d94e527b0f))
* **index:** 重构初始化流程并优化日志输出 ([dfc892d](https://github.com/ClarityJS/meme-plugin/commit/dfc892d1df69c91bea5cda6ad22be6028aa8e8e0))
* **models:** 重构 Meme 模型的参数处理逻辑 ([855945b](https://github.com/ClarityJS/meme-plugin/commit/855945b219492867000f4dd7132864b615e6716b))
* **models:** 重构 Utils 工具模块 ([69b7dcd](https://github.com/ClarityJS/meme-plugin/commit/69b7dcd094e9ca038c5eb569a5747380e9363180))

### 🔄 持续集成

* **dependabot:** 更新 node 版本至 20.x ([f18228e](https://github.com/ClarityJS/meme-plugin/commit/f18228ed194e840c77a8c71db6a016484cd2af36))
* **dependabot:** 更新配置以管理 npm 和 GitHub Actions 依赖 ([709e92d](https://github.com/ClarityJS/meme-plugin/commit/709e92d72cb45ddc4179f668fcd4686aa0645399))
* 优化 GitHub Actions 工作流 ([cd72680](https://github.com/ClarityJS/meme-plugin/commit/cd726808cc1f560f96c524ab62363c8e8df55af9))
* 移除 Dependabot 配置文件 ([f9707eb](https://github.com/ClarityJS/meme-plugin/commit/f9707ebbb27d1753bfbabbf0c4b0c368e4882c00))
* 移除版本关闭流程中的分支删除步骤 ([09a21ac](https://github.com/ClarityJS/meme-plugin/commit/09a21ac287625c101005d7289f6ee84d2ec51407))

## [1.8.5](https://github.com/ClarityJS/meme-plugin/compare/v1.8.4...v1.8.5) (2025-01-23)

### 🐛 修复

* **workflows:** 修复release发布 ([a3d5684](https://github.com/ClarityJS/meme-plugin/commit/a3d568493b58c8ab5596d814e5c0b54488fd5ad4))

## [1.8.4](https://github.com/ClarityJS/meme-plugin/compare/v1.8.2...v1.8.4) (2025-01-23)

### 🐛 修复

* **admin:** 修复设置配置 ([cbdd0d6](https://github.com/ClarityJS/meme-plugin/commit/cbdd0d6de4875c1ed76fc75c0d42d846bc16c269))
* **update:** 修复在`Miao-Yunzai`下的更新资源功能 ([847ad1b](https://github.com/ClarityJS/meme-plugin/commit/847ad1b73cd36212a8fbd8b2d61bce8621f3abf5))
* **workflows:** 修复版本标签创建和强制删除分支的逻辑 ([10e82e8](https://github.com/ClarityJS/meme-plugin/commit/10e82e865f035aca3557cfcf2ce7fa1fa4e7cd91))

### 📚 文档更新

* **README:** 更新文档内容和格式 ([3e72d35](https://github.com/ClarityJS/meme-plugin/commit/3e72d35c8e6be3225d2693fb456408024a89f764))
* **README:** 添加 emoji 合成到待办事项 ([37ce20e](https://github.com/ClarityJS/meme-plugin/commit/37ce20e40da6f7905278c478aeed896731738319))

### ♻️ 重构

* **Meme:** 重构表情命令处理逻辑 ([757278b](https://github.com/ClarityJS/meme-plugin/commit/757278b794b3bd8e3b5e4efaf792a3b8463090a5))
* **models:** 重构 Meme 模型的参数处理逻辑 ([536a69d](https://github.com/ClarityJS/meme-plugin/commit/536a69dbb82f2eb11fc7100f221baf58ef85d4b4))

## [1.8.3](https://github.com/ClarityJS/meme-plugin/compare/v1.8.2...v1.8.3) (2025-01-23)

### 🐛 修复

* **admin:** 修复设置配置 ([cbdd0d6](https://github.com/ClarityJS/meme-plugin/commit/cbdd0d6de4875c1ed76fc75c0d42d846bc16c269))
* **update:** 修复在`Miao-Yunzai`下的更新资源功能 ([847ad1b](https://github.com/ClarityJS/meme-plugin/commit/847ad1b73cd36212a8fbd8b2d61bce8621f3abf5))

### 📚 文档更新

* **README:** 更新文档内容和格式 ([3e72d35](https://github.com/ClarityJS/meme-plugin/commit/3e72d35c8e6be3225d2693fb456408024a89f764))
* **README:** 添加 emoji 合成到待办事项 ([37ce20e](https://github.com/ClarityJS/meme-plugin/commit/37ce20e40da6f7905278c478aeed896731738319))

### ♻️ 重构

* **Meme:** 重构表情命令处理逻辑 ([757278b](https://github.com/ClarityJS/meme-plugin/commit/757278b794b3bd8e3b5e4efaf792a3b8463090a5))
* **models:** 重构 Meme 模型的参数处理逻辑 ([536a69d](https://github.com/ClarityJS/meme-plugin/commit/536a69dbb82f2eb11fc7100f221baf58ef85d4b4))

## [1.8.2](https://github.com/wuliya336/clarity-meme/compare/v1.8.1...v1.8.2) (2025-01-20)

### 🐛 修复

* **meme:** 修复防误触发逻辑 ([6f2df92](https://github.com/wuliya336/clarity-meme/commit/6f2df92a2e31f0e754ba77c30491e93f57c4cf28))
* **meme:** 修正禁用表情处理逻辑 ([3102636](https://github.com/wuliya336/clarity-meme/commit/3102636e7d3b5a6e33e665cf813d21cc17f03861))
* **models:** 优化错误处理逻辑 ([ff32b3c](https://github.com/wuliya336/clarity-meme/commit/ff32b3c803a8c7289d3a1d70cb0ea496c02625f1))
* **random:** 修复随机表情匹配逻辑 ([7b7fb52](https://github.com/wuliya336/clarity-meme/commit/7b7fb52a5f9923bbdbaa28dc0c9e75a6dc1e1d1a))

### ♻️ 重构

* **meme:** 重构表情包功能代码 ([a1353a5](https://github.com/wuliya336/clarity-meme/commit/a1353a589373529686f20a79364f2b43315576a5))
* **models:** 优化引用消息处理逻辑 ([e08354e](https://github.com/wuliya336/clarity-meme/commit/e08354e64a154b0e75d9233c5b82391db54c752f))
* **models:** 优化用户头像处理逻辑 ([20b82ed](https://github.com/wuliya336/clarity-meme/commit/20b82ed157b65eae59f28fa6aa7a42b604b79cbe))
* **models:** 调整渲染精度设置并添加自动更新开关 ([03b83da](https://github.com/wuliya336/clarity-meme/commit/03b83da74e148e6e9a9b5942a651cf292253c31c))
* **models:** 重构 Utils 类中的图片处理方法 ([958fb9a](https://github.com/wuliya336/clarity-meme/commit/958fb9afb961f5cc47514c640e26dffac1a7e558))
* **models:** 重构图片处理逻辑 ([3c4c39e](https://github.com/wuliya336/clarity-meme/commit/3c4c39ea75e5f09c1120595ed2bd548dde57f6ec))
* **models:** 重构工具模块中的 isAbroad 方法 ([35af59d](https://github.com/wuliya336/clarity-meme/commit/35af59dda35aea966cc611eea9162ebb46308d83))

### 🔄 持续集成

* 优化 GitHub Actions 工作流配置 ([a809021](https://github.com/wuliya336/clarity-meme/commit/a8090210ccd465395bea013f91f0bfc7296b033e))
* 优化工作流文件 ([d2c3b16](https://github.com/wuliya336/clarity-meme/commit/d2c3b16e34f6d3ffd0c6f4da4ae8d569b807cbca))
* 更新版本发布工作流，调整提交信息格式 ([6972b3e](https://github.com/wuliya336/clarity-meme/commit/6972b3e78092c1f2506c8053438ad53ee83180a2))

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
