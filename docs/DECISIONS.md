# DECISIONS.md

> 轻量 ADR（Architecture/Decision Record）。
> 目标：把“为什么这么做”写清楚，避免反复争论。

## Status Legend
- proposed
- accepted
- superseded
- rejected

---

## D-001 先做 MVP 闭环，不做大而全
- Date: 2026-03-01
- Status: accepted
- Context:
  cards 目标用户是 4 岁儿童，核心价值是快速进入学习状态。
- Decision:
  第一阶段只做：词库导入/管理 → 随机抽卡 → flip → 认识/不认识记录。
- Consequences:
  - 正面：最快得到可用产品与真实反馈。
  - 负面：统计、SRS、多语言会延后。
- Revisit when:
  MVP 稳定后（M3+）再评估扩展优先级。

## D-002 数据库选 SQLite（MVP）
- Date: 2026-03-01
- Status: accepted
- Context:
  目标是快速迭代、低部署复杂度、单实例本地优先。
- Decision:
  使用 SQLite 作为 MVP 后端数据库。
- Consequences:
  - 正面：实现与运维成本低。
  - 负面：并发与扩展上限有限。
- Revisit when:
  出现多用户高并发/多实例部署需求时，评估迁移 PostgreSQL。

## D-003 Mobile-first + 大卡片交互优先
- Date: 2026-03-01
- Status: accepted
- Context:
  使用场景以手机竖屏为主，操作人群是低龄儿童。
- Decision:
  以手机竖屏体验为第一优先；桌面端为兼容而非主设计目标。
- Consequences:
  - 正面：目标用户体验聚焦。
  - 负面：桌面管理端体验可能较基础。
- Revisit when:
  家长端管理复杂度显著提升时，再增强桌面端信息密度。

## D-004 数据源采用“内置高频词 + 用户CSV”双轨
- Date: 2026-03-01
- Status: accepted
- Context:
  需要即开即用，也要支持个性化词库。
- Decision:
  MVP 提供内置词库（Dolch pre-primer/primer）+ 用户 CSV 导入。
- Consequences:
  - 正面：兼顾开箱即用和灵活扩展。
  - 负面：需要维护 CSV 校验与错误提示。
- Revisit when:
  引入第三方词库包或社区词库时。

---

## Template

## D-XXX 决策标题
- Date:
- Status: proposed | accepted | superseded | rejected
- Context:
- Decision:
- Consequences:
  - 正面：
  - 负面：
- Revisit when:
- Supersedes: (optional)

## D-005 从中英释义路径切换为 phonics-first
- Date: 2026-03-01
- Status: accepted
- Context:
  当前目标是低龄英语启蒙，重点在读音规则与识读，不是中英翻译记忆。
- Decision:
  主学习路径改为 `word + IPA/sound-out`，不再以中文释义为核心。
- Consequences:
  - 正面：学习目标更聚焦 phonics。
  - 负面：失去中英释义辅助，需要额外模式时再扩展。
- Revisit when:
  用户明确需要 bilingual 模式时。

## D-006 配置项集中到 Settings，主页面保持极简
- Date: 2026-03-01
- Status: accepted
- Context:
  低龄用户主页面需要低干扰，常驻配置项会增加认知负担。
- Decision:
  deck、dark mode、字母筛选、词长范围、卡片数量全部放入 Settings 弹层；主页面仅保留学习动作。
- Consequences:
  - 正面：学习路径更清晰，页面更干净。
  - 负面：配置动作多一步打开弹层。
- Revisit when:
  若配置项使用频次极高，再评估局部外露。

## D-007 词库采用 Fry 1000 并进行 IPA 批量回填
- Date: 2026-03-01
- Status: accepted
- Context:
  需要一个规模足够、可直接练习的高频词库。
- Decision:
  引入 Fry 1000 作为核心词库，并完成 phonics/IPA 批量补齐。
- Consequences:
  - 正面：可立即扩展练习规模，减少空白字段。
  - 负面：IPA 质量仍需后续抽样校验。
- Revisit when:
  接入更权威词典源时，进行二次校正。
