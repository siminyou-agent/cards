# LESSONS.md

> 记录「踩坑-原因-修复-预防」。短、实、可复用。

## Template

### YYYY-MM-DD - 标题
- Context:
- What happened:
- Root cause:
- Fix:
- Prevention:
- Links: (PR / commit / issue)

---

## Seed Notes

### 2026-03-01 - 先建可运行闭环再扩展
- Context: cards 项目初始化。
- What happened: 需求点很多（词库、动画、音频、SRS、多语言）。
- Root cause: 容易一开始过度设计。
- Fix: 锁定 MVP 闭环（导入词库→随机抽卡→flip→记录）。
- Prevention: 新需求先放 roadmap，按里程碑逐步进入。
- Links: docs/PRD.md


### 2026-03-01 - 局域网测试要默认监听 0.0.0.0
- Context: 需要手机在同一 Wi-Fi 访问 MVP。
- What happened: 仅 localhost 可访问，手机打不开。
- Root cause: 服务默认未强调 LAN 暴露 + 网络环境可能有隔离。
- Fix: 服务监听 `0.0.0.0`，并提供局域网访问地址。
- Prevention: 每次移动端联调前先验证 `localhost` + `LAN IP` 两条链路。
- Links: server.js

### 2026-03-01 - 需求变更到 phonics 时要同步数据与文案
- Context: 从中英词义卡切换为全英文 phonics 学习。
- What happened: 需要同时调整 seed 数据、DB 字段、UI 文案。
- Root cause: 初版模型偏“翻译记忆”，不完全匹配 phonics 场景。
- Fix: 改为 `word + phonics + sound-out` 展示，移除中文学习路径。
- Prevention: 新需求先更新 PRD 再改实现，避免字段漂移。
- Links: server.js, public/index.html, docs/PRD.md


### 2026-03-01 - UI 调整优先用主题变量，便于快速切换风格
- Context: 需要把界面改成更 modern，并加入 dark mode。
- What happened: 配色和组件样式需要全局联动。
- Root cause: 早期样式是硬编码色值，切主题成本高。
- Fix: 抽成 CSS 变量，增加 `body.dark` 主题覆盖；右上角加月亮/太阳切换。
- Prevention: 后续新页面继续复用主题变量，不直接写死颜色。
- Links: public/index.html


### 2026-03-01 - 低龄引导比自由探索更重要
- Context: 4岁用户在词卡学习中需要更明确入口。
- What happened: 直接随机抽卡缺少“我从哪里开始”的引导。
- Root cause: 初版交互偏开发视角，不够教学流程化。
- Fix: 增加 A-Z 首字母选择引导，按字母过滤词卡。
- Prevention: 后续新增学习模式时，优先提供低认知负担的入口。
- Links: public/index.html, server.js


### 2026-03-01 - 主学习页保持极简，筛选放设置抽屉
- Context: 用户希望主页面尽量干净，减少分心元素。
- What happened: A-Z 与 dark mode 常驻会增加视觉负担。
- Root cause: 将配置项与学习操作混在同一层。
- Fix: 把 dark mode、字母筛选、长度和数量统一放进 Settings 弹层。
- Prevention: 后续新增控制项默认先评估是否应放入设置层。
- Links: public/index.html


### 2026-03-01 - Fry 词库先用规则分段补齐 phonics 占位
- Context: Fry 1000 数据只有 word 字段，学习页出现 phonics pending。
- What happened: 缺少可读的发音分段影响体验。
- Root cause: 词库源未包含 IPA/phonics 字段。
- Fix: 用常见字母组合规则（sh/ch/th/oo/ea...）生成 `phonics` 与 `example`。
- Prevention: 后续接入权威发音字典时批量回填 IPA。
- Links: data/cards.db


### 2026-03-01 - 外部词典 API 不稳定时要有本地 IPA 回填兜底
- Context: 尝试批量回填 Fry 1000 的 IPA。
- What happened: 首次 API 路径回填失败（0/1000），随后改用本地 `eng_to_ipa` 完成 1000/1000。
- Root cause: 免费词典接口返回/覆盖不稳定，不适合一次性全量依赖。
- Fix: 本地库批处理回填，结果可控。
- Prevention: 批量任务优先本地可重复方案，远程 API 作为补充。
- Links: data/cards.db
