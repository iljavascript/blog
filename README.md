# iljs.top

一个基于 **Vite + React + React Router** 构建的个人博客与工具站点，部署在 Cloudflare Pages，并通过 GitHub 自动化持续部署。

---

## 🌐 在线地址

👉 https://iljs.top

---

## 🚀 技术栈

* React 18
* Vite
* React Router
* styled-components
* Cloudflare Pages（部署）
* GitHub（源码托管）

---

## 🧱 项目结构

```
blog/
├── public/          静态资源
├── src/
│   ├── pages/       页面
│   ├── components/  组件
│   ├── styles/      样式
│   └── App.jsx      路由入口
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚙️ 本地开发

```bash
npm install
npm run dev
```

访问：

```
http://localhost:5173
```

---

## 📦 构建

```bash
npm run build
```

生成目录：

```
dist/
```

---

## ☁️ 部署方式

本项目采用：

```
GitHub → Cloudflare Pages → iljs.top
```

自动流程：

```
git push → 自动构建 → 自动部署 → 全局 CDN 生效
```

---

## 🧭 路由说明

使用 React Router：

* `/` 首页
* `/moment` 时光
* `/note` 笔记
* `/demo` 示例
* `/tool` 工具
* `/project` 项目

---

## ⚠️ 注意事项

### 1. SPA 刷新问题（重要）

部署环境需要配置：

```
/* → /index.html → 200
```

否则子路由刷新会 404。

---

### 2. 静态资源路径

生产环境已适配 Cloudflare Pages。

---

## 📌 作者

iljavascript

---

## 🧠 项目理念

简单、快速、可持续更新的个人前端空间。

---

## 📄 License

MIT
