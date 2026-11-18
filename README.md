# 🧰 Practical Utility Tools · 万能上午工具箱 (Vue3 版)

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Tools](https://img.shields.io/badge/Tools-22-blue)
![Games](https://img.shields.io/badge/Games-9-red)

**基于 Vue3 + Vite 构建的浏览器端工具箱 + 小游戏合集。模块化、组件化、可扩展。**

[功能一览](#-功能一览) · [快速开始](#-快速开始) · [项目结构](#-项目结构) · [技术栈](#-技术栈)

</div>

---

## ✨ 项目特色

- **⚡ Vue3 + Vite** —— 组件化开发，按需懒加载，秒级启动
- **🎨 清新蓝绿主题** —— 统一蓝绿渐变背景 + 每个工具专属水印，视觉舒适
- **🔒 本地安全** —— 所有计算、压缩、加解密都在浏览器本地完成，**绝不上传数据**
- **📱 响应式布局** —— 左侧导航 + 右侧详情，桌面/移动端都有良好体验
- **🪶 轻量构建** —— 生产构建仅 **78 KB（gzip 31 KB）**，每个工具独立懒加载

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装 & 运行

```bash
# 克隆仓库
git clone https://gitee.com/LightMoon_Moon/practical-utility-tools.git
cd practical-utility-tools

# 安装依赖
npm install

# 开发模式（热更新，自动打开浏览器）
npm run dev

# 生产构建（输出到 dist/）
npm run build

# 预览构建产物
npm run preview
```

---

## 📦 功能一览

### 🧮 计算工具 (4)

| 图标 | 名称 | 亮点 |
|:----:|:----:|------|
| 🧮 | 计算器 | 递归下降语法分析，支持括号和运算符优先级 |
| 💱 | 进制转换 | 十/二/八/十六进制双向互转 |
| 🎲 | 随机数生成器 | 指定范围和数量 |
| 📊 | 排序可视化 | 冒泡/快排动画演示 |

### 📅 日期时间 (3)

| 图标 | 名称 | 亮点 |
|:----:|:----:|------|
| 📅 | 日期计算器 | 两个日期相差天数 / 推算 N 天后的日期 |
| ⏱️ | 秒表倒计时 | 秒表（精确到10ms）/ 倒计时 / 计次 Lap |
| ⏰ | 时间戳转换 | 实时显示当前时间戳、秒/毫秒互转 |

### 📝 文本处理 (5)

| 图标 | 名称 | 亮点 |
|:----:|:----:|------|
| 📝 | 字数统计 | 中英文字数 / 字频 Top10 |
| 🔐 | 加密解密 | 凯撒密码 + 异或加密 |
| 🔗 | URL编解码 | URL + Base64 四合一 |
| 🔍 | 正则测试器 | 实时匹配高亮 + 常用正则提示 |
| 😊 | Emoji编解码 | Emoji ↔ 码点 四向互转 |

### ✨ 生成器 (3)

| 图标 | 名称 | 亮点 |
|:----:|:----:|------|
| 🔑 | 密码生成器 | Web Crypto API 真随机 |
| 🆔 | UUID v4 | 批量生成标准 128 位 UUID |
| 🎨 | 颜色转换器 | HEX ↔ RGB ↔ HSL 三向实时联动 |

### 📁 文件媒体 (3)

| 图标 | 名称 | 亮点 |
|:----:|:----:|------|
| 🖼️ | 图片压缩 | 本地 Canvas，可调质量/尺寸 |
| 🧩 | JSON格式化 | 一键美化 / 压缩 / 校验 |
| 📄 | Markdown预览 | 左右分栏实时渲染 |

### 💪 生活助手 (4)

| 图标 | 名称 | 亮点 |
|:----:|:----:|------|
| 💪 | BMI计算器 | 健康分类 + 理想体重范围 |
| 📐 | 单位换算 | 6 大类单位互转 |
| 🎓 | 学生成绩管理 | 增删改查 + 排序 + 本地存储 |
| 🌐 | IP/数字互转 | IPv4 ↔ 十进制 ↔ 二进制 ↔ 十六进制 |

### 🎮 小游戏 (9)

| 图标 | 名称 | 玩法 |
|:----:|:----:|------|
| 🎯 | **猜数字** | 1-100 随机数，提示大/小 |
| ❌⭕ | **井字棋** | 双人对战 + 人机对战 |
| 🐍 | **贪吃蛇** | Canvas 彩色版 |
| ✊✌️🖐 | **石头剪刀布** | 人机对战 |
| 🎲 | **2048** | 经典合并游戏，本地存最高分 |
| 🧱 | **俄罗斯方块** | 7 种标准方块，Canvas 高性能渲染 |
| 🃏 | **翻牌记忆** | 3 难度可选 |
| 💣 | **扫雷** | 3 难度可选 |
| 🔨 | **打地鼠** | 30 秒限时 |

---

## 📂 项目结构

```
practical-utility-tools/
├── src/
│   ├── App.vue                 # 根组件（左导航 + 右详情）
│   ├── main.js                 # 入口文件
│   ├── style.css               # 全局样式（蓝绿主题 + 水印）
│   ├── data/
│   │   └── tools.js             # 工具配置（分类、水印、ID）
│   ├── components/
│   │   ├── Sidebar/
│   │   │   └── index.vue       # 左侧导航（分组折叠 + 搜索）
│   │   ├── Home/
│   │   │   └── index.vue       # 首页（分类卡片）
│   │   └── ToolView/
│   │       └── index.vue       # 右侧详情（动态组件懒加载）
│   ├── tools/                  # 22 个工具组件（独立懒加载）
│   │   ├── Calculator.vue
│   │   ├── HexConvert.vue
│   │   ├── Random.vue
│   │   ├── SortVisual.vue
│   │   ├── DateCalc.vue
│   │   ├── Stopwatch.vue
│   │   ├── Timestamp.vue
│   │   ├── WordCount.vue
│   │   ├── Encrypt.vue
│   │   ├── UrlCodec.vue
│   │   ├── RegexTester.vue
│   │   ├── EmojiCodec.vue
│   │   ├── PwdGen.vue
│   │   ├── UuidGen.vue
│   │   ├── ColorPicker.vue
│   │   ├── ImgCompress.vue
│   │   ├── JsonFormat.vue
│   │   ├── Markdown.vue
│   │   ├── Bmi.vue
│   │   ├── UnitConvert.vue
│   │   ├── Student.vue
│   │   └── IpConvert.vue
│   └── games/                  # 9 个游戏组件（独立懒加载）
│       ├── Guess.vue
│       ├── Ttt.vue
│       ├── Snake.vue
│       ├── Rps.vue
│       ├── Game2048.vue
│       ├── Tetris.vue
│       ├── Memory.vue
│       ├── Mine.vue
│       └── Whack.vue
├── index.html                  # 入口 HTML
├── package.json                # 依赖配置
├── vite.config.js              # Vite 配置
├── .gitignore
└── README.md
```

---

## 🛠️ 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| **框架** | Vue 3.5 | Composition API + `<script setup>` |
| **构建** | Vite 6.0 | 极速冷启动 / HMR / 代码分割 |
| **标记** | HTML5 | 语义化标签 |
| **样式** | CSS3 | 渐变 / 毛玻璃 / 响应式 |
| **异步组件** | `defineAsyncComponent` | 每个工具/游戏独立懒加载 |
| **存储** | Web localStorage | 学生成绩 / 2048 最高分 |
| **加密** | Web Crypto API | 真随机密码生成 |
| **渲染** | HTML5 Canvas | 贪吃蛇 / 俄罗斯方块 / 排序可视化 |

---

## 📈 构建产物

```
dist/
├── index.html                    # 入口
└── assets/
    ├── index-xxxx.js             # 主入口（78 KB / gzip 31 KB）
    ├── Sidebar-xxxx.js           # 侧栏懒加载（~1 KB）
    ├── Home-xxxx.js              # 首页懒加载（~1 KB）
    ├── ToolView-xxxx.js          # 详情懒加载（~1 KB）
    └── [ToolName]-xxxx.js        # 每个工具独立懒加载（~0.6 KB 起）
```

每个工具/游戏的代码**独立打包、按需加载**，首次进入只加载主入口 + 当前点击的工具。

---

## 🔌 如何添加新工具

只需 3 步：

**1. 创建组件** —— 在 `src/tools/` 或 `src/games/` 下新建 `.vue`：
```vue
<template>
  <div>
    <input v-model="val" />
    <button class="btn btn-primary" @click="run">执行</button>
    <div class="result-box">{{ result }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const val = ref('')
const result = ref('')
const run = () => { result.value = 'Hello ' + val.value }
</script>
```

**2. 注册配置** —— 在 `src/data/tools.js` 的 `TOOLS` 数组里加一条：
```js
{ id: 'toolHello', cat: 'calc', icon: '👋', title: 'Hello', desc: '示例工具' },
```

**3. 懒加载** —— 在 `src/components/ToolView/index.vue` 的 `componentMap` 里加一行：
```js
toolHello: defineAsyncComponent(() => import('../../tools/Hello.vue')),
```

完成！侧栏自动出现新工具、分类卡片自动计数、点击直接加载。

---

## 📝 更新日志

### v2.0.0 (2026-11-18)

- 🎉 **重大重构**：从单文件 HTML 迁移到 **Vue3 + Vite** 组件化架构
- ⚡ 性能提升：按需懒加载，每个工具独立打包
- 🎨 样式保留：清新蓝绿主题 + 卡片水印 + 响应式布局
- 📦 项目结构规范化：`tools/` + `games/` + `components/` + `data/`
- 🛠️ 扩展性大幅提升：新增工具只需 3 步

### v1.0.0 (2026-11-18)

- ✅ 初始版本发布
- ✅ 31 个实用工具 + 9 款内置小游戏
- ✅ 清新蓝绿渐变主题
- ✅ 所有按钮事件通过自动化体检（48/48 OK）

---

## 🤝 参与贡献

1. Fork 本仓库
2. 新建 `Feat_xxx` 分支
3. 提交代码
4. 新建 Pull Request

---

## 📄 许可证

[MIT License](./LICENSE) © 2026 LightMoon
