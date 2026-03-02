# AGENTS.md (cards repo)

> 这是给 Coding Agents（Codex / Claude Code / Gemini CLI / 人类协作者）看的执行规范。目标：小步快跑、可回滚、持续可用。

## 0. Product Context (必读)
- 项目：**cards**（4岁儿童 mobile-first 学习卡片）
- 后端：SQLite
- 体验优先级：
  1) 手机上顺手（单手操作）
  2) 卡片翻转流畅
  3) 学习流程极简（看卡→翻卡→下一张）

## 1. North Star
每次改动都要回答：
- 是否让孩子更容易连续学 5 分钟？
- 是否让家长更容易准备词库？
- 是否保持代码更易维护？

如果不能明确提升其中之一，先别做。

## 2. Working Style (Boris-like, practical)
1. **Thin slice first**：先做一条可运行的最小闭环，再扩展。
2. **No big-bang rewrite**：禁止大重构后一次性提交。
3. **One PR, one intent**：一个 PR 只解决一个主要目标。
4. **Show, don’t claim**：用截图/录屏/测试结果证明功能有效。
5. **Prefer boring tech**：优先稳定方案，避免过度工程。
6. **Leave breadcrumbs**：每次重要决策写入 `docs/LESSONS.md`。

## 3. Scope Guardrails
### 3.1 当前必须做（MVP）
- 词库 CRUD（最少创建 + 导入 + 列表）
- 随机抽卡
- 卡片 flip
- 认识/不认识记录

### 3.2 暂缓（除非明确要求）
- 复杂权限系统
- 多租户架构
- 复杂动画引擎
- 云原生部署优化

## 4. Definition of Done
一个任务只有满足以下条件才算完成：
- [ ] 功能可在手机视口实际操作
- [ ] 有最小测试（单测/集成至少一种）
- [ ] 不破坏现有 PRD 中的 MVP 路径
- [ ] 更新文档（至少一处：PRD / ROADMAP_CHECKLIST / LESSONS）
- [ ] 给出验证步骤（如何在本地复现）

## 5. File/Module Conventions
- 新增功能先找对应目录，不要平铺散落。
- 组件尽量“可替换、可测试”，避免巨型页面文件。
- 数据层接口命名保持一致（deck/card/review）。
- 数据库变更必须配套 migration/变更说明。

## 6. Data Source Rules
- 内置词库优先：Dolch pre-primer / primer。
- 用户 CSV 为第一等公民：失败要有清晰报错行号/字段名。
- 对外部素材（图片/音频）记录来源与可用范围。

## 7. PR Template (for agents)
每个 PR 描述至少包含：
1. **Why**：为什么做
2. **What**：改了什么
3. **How to verify**：验证步骤
4. **Risk/Rollback**：风险与回滚方式
5. **Docs updated**：更新了哪些文档

## 8. Collaboration Protocol
- 开工前：在 issue/任务里写 3-5 条实现计划。
- 进行中：遇到阻塞先给两个备选方案，不要长时间卡住。
- 完成后：把教训写进 `docs/LESSONS.md`，把状态打到 `docs/ROADMAP_CHECKLIST.md`。

## 9. Update Discipline
以下文档必须长期维护：
- `docs/PRD.md`：需求与边界
- `docs/ROADMAP_CHECKLIST.md`：阶段进度
- `docs/LESSONS.md`：问题与经验沉淀

> Rule: 代码变更如果影响行为，至少更新上述文档之一。
