# Cards 项目 PRD（v0.3）

## 1. 项目概述

### 1.1 项目名
Cards

### 1.2 背景
面向 4 岁小朋友的 **phonics 启蒙**学习工具。通过“单词卡片 + 点击翻面 + 发音播放 + 简单前后切卡”的低门槛交互，让孩子在手机上做高频、轻量、可重复练习。

### 1.3 产品目标
- 提供 **mobile-first** 学习体验（优先手机竖屏）。
- 支持家长/使用者选择词库并按难度筛选。
- 通过 `word ↔ IPA / sound-out` 建立读音规则感。
- 保持主页面极简，降低低龄用户操作负担。

---

## 2. 用户与场景

### 2.1 目标用户
- 主用户：4 岁小朋友（学习者）
- 次用户：家长（词库与参数设置者）

### 2.2 核心场景
1. 打开应用，直接看到大卡片。
2. 点击卡片翻面，查看 IPA / sound-out。
3. 点击 `Sound` 听当前单词读音。
4. 用 `Prev / Next` 连续学习。
5. 在 Settings 中调整字母、词长范围、卡片数量、词库。

---

## 3. 当前 MVP 范围（已落地）

### 3.1 学习主界面（极简）
- 大卡片展示（点击即可 flip）
- 底部仅保留：`Prev` / `Next` / `Sound`
- 无常驻复杂筛选控件

### 3.2 设置弹层（Settings）
- 词库选择（deck）
- Dark mode 开关
- 字母筛选（A-Z）
- 词长范围（min-max 双端 slider）
- 卡片数量选择（5/10/15/20）

### 3.3 数据与后端
- SQLite 本地数据库
- `GET /api/decks`
- `GET /api/decks/:id/cards`（支持 `startsWith`, `minLen`, `maxLen`, `limit`）
- 词库：Starter Deck + Fry 1000
- Fry 1000 已完成 IPA 批量回填（本地可用）

---

## 4. 数据模型（当前实现）

```sql
CREATE TABLE decks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deck_id INTEGER NOT NULL,
  word TEXT NOT NULL,
  phonics TEXT,
  example TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(deck_id) REFERENCES decks(id)
);
```

---

## 5. 交互与视觉原则
- 风格：Muji-like（低噪音、克制、自然色）
- 结构：学习操作与配置操作分层（主界面 vs Settings）
- 信息层级：word 最大，phonics 次级，辅助信息最少
- 可用性：单手可操作，按钮数量最小化

---

## 6. 已知限制
- IPA 为批量回填结果，后续仍可做质量校正
- 目前无用户登录与多端同步
- 尚未提供家长管理页（增删词库/导入）

---

## 7. 下一步（v0.3 之后）
1. 增加 IPA / sound-out 显示模式切换
2. 增加词库导入入口（CSV）
3. 增加轻量学习进度（不打扰主流程）
4. 评估家长管理页与词库维护流程
