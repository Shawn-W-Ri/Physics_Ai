# Even · Simulation × AI

这是一个可以直接部署到 **GitHub Pages** 的个人研究网站，目标是长期记录与展示：

- 物理仿真、ODE/PDE、数值方法、FDM/FEM/CFD
- 统计、机器学习、深度学习
- Scientific Machine Learning、PINNs、DeepONet、Fourier Neural Operator、Surrogate Modeling
- 论文阅读、项目复盘、每日研究日志

## 你拿到的内容

### 网站页面
- `index.md`：首页
- `research.md`：研究方向
- `notes.md`：文章 / 笔记列表
- `about.md`：个人介绍
- `labs/`：交互实验室

### 已包含的交互实验

Simulation / Numerics：
1. Heat Equation
2. Wave Equation
3. Poisson Relaxation
4. Taylor–Green Vortex
5. 1D FEM Poisson

AI / Scientific ML：
6. Linear Regression
7. Neural Network nonlinear approximation
8. PINN PDE residual intuition
9. DeepONet operator-learning intuition
10. Fourier Neural Operator spectral intuition
11. Surrogate Modeling

> 这些浏览器 Labs 是教学 / 概念型演示，不是科研级高精度求解器。

## 第一次上线：GitHub Pages

### 推荐方式：用户名主页

1. GitHub 新建仓库：`<你的用户名>.github.io`
2. 把本项目的**全部文件**上传到仓库根目录。
3. 进入仓库：`Settings → Pages`
4. `Source` 选择 `Deploy from a branch`
5. Branch 选择 `main`
6. Folder 选择 `/ (root)`
7. 保存。

这样站点通常会发布为：

`https://<你的用户名>.github.io`

### 如果你使用普通仓库名

例如仓库叫 `even-research-site`，把 `_config.yml`：

```yml
baseurl: ""
```

改成：

```yml
baseurl: "/even-research-site"
```

## 每天怎么维护

你平时几乎只需要操作 `_posts/`。

### 1. 复制模板

复制根目录：

`POST_TEMPLATE.md`

### 2. 改名

格式必须是：

`YYYY-MM-DD-title.md`

例如：

`_posts/2026-08-08-pinn-heat-equation.md`

### 3. 写文章

```yml
---
layout: post
title: "PINN 求解热方程"
date: 2026-08-08
category: SCI-ML
excerpt: "比较 PINN 与传统数值方法。"
---
```

正文用 Markdown：

```markdown
## Problem

考虑：

$$
\frac{\partial u}{\partial t}=\alpha\frac{\partial^2u}{\partial x^2}.
$$

## Method

今天测试有限差分与 PINN……

## Result

- FDM 更稳定
- PINN 更灵活
- 下一步比较计算成本
```

提交到 GitHub 后，Jekyll 会自动把文章加入网站。

## 本地预览

项目已经包含 `Gemfile`。电脑安装 Ruby 后，在项目目录：

```bash
bundle install
bundle exec jekyll serve
```

然后打开 Jekyll 在终端给出的本地地址。

## 最常修改的文件

| 目标 | 文件 |
|---|---|
| 改网站名称 | `_config.yml` |
| 改首页 | `index.md` |
| 改研究方向 | `research.md` |
| 改个人介绍 | `about.md` |
| 每日发文章 | `_posts/*.md` |
| 新增交互实验 | `labs/*.html` |
| 改颜色 / 布局 | `assets/css/style.css` |
| 改导航 / Footer | `_layouts/default.html` |

详细入门见 `GETTING_STARTED.md`，日常维护见 `MAINTENANCE.md`。
