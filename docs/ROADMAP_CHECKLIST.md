# ROADMAP_CHECKLIST.md

> 用 checklist 驱动执行。每次迭代更新状态与日期。

Legend: [ ] todo  [~] doing  [x] done  [-] dropped

## M1 基础可运行
- [x] 初始化仓库与基础文档（PRD）
- [ ] 确定技术栈（React+Vite+Express or Next.js）
- [x] 前端基础页面骨架（首页/学习页） (2026-03-01)
- [x] SQLite schema 落地 (2026-03-01)
- [x] 静态卡片 flip 动效可用 (2026-03-01)
- [ ] 内置最小 seed 词库（Dolch pre-primer）

## M2 MVP 闭环
- [x] Settings 弹层整合配置项（deck/dark mode/letter/length/count） (2026-03-01)
- [x] 学习主界面极简化（仅卡片 + Prev/Next/Sound） (2026-03-01)
- [ ] deck CRUD API
- [ ] card CRUD API
- [ ] CSV 导入（模板+错误提示）
- [x] 随机抽卡 API (2026-03-01)
- [x] 认识/不认识记录 API (2026-03-01)
- [x] 学习页接入真实 API (2026-03-01)
- [x] 手机端可连续学习 5 分钟体验验证 (2026-03-01, LAN mobile test)

## M3 内容与体验增强
- [x] Fry 1000 词库导入并可选 (2026-03-01)
- [x] Fry 1000 IPA 批量回填 (2026-03-01)
- [x] 扩展内置词库（Dolch primer / Fry 100） (2026-03-01, extended to Fry 1000)
- [x] 音频播放体验优化 (2026-03-01, Sound button + Web Speech)
- [ ] 家长视角基础统计
- [x] 交互细节优化（反馈、动效、可访问性） (2026-03-01, Muji UI + Settings modal + Prev/Next/Sound + dual-range slider)

## M4 数据智能化
- [ ] SRS 抽卡策略（轻量）
- [ ] 主题词库（动物/食物/颜色）
- [ ] 图片/音频覆盖率提升

## M5 生态扩展
- [ ] 多语言词库
- [ ] 词库包版本化导入
- [ ] 版权与内容审核流程

## Open Questions（持续清单）
- [ ] MVP 是否上登录/PIN？
- [ ] 音频策略：Web TTS vs 预置 audio_url
- [ ] 图片策略：用户上传 vs 外部素材
- [ ] 词库许可边界（未来是否商用）
