# 5 分钟开始使用

## A. 最省事：直接用 GitHub 网页维护

1. 注册 / 登录 GitHub。
2. 新建仓库：推荐 `<你的GitHub用户名>.github.io`。
3. 把本项目根目录中的所有文件上传到仓库根目录。
4. 打开仓库 `Settings → Pages`。
5. `Source` 选择 `Deploy from a branch`，Branch 选 `main`，目录选 `/ (root)`。
6. 保存。以后每次修改并提交文件，网站会自动重建。

## B. 每天发一篇笔记

1. 复制 `POST_TEMPLATE.md`。
2. 改名为 `_posts/YYYY-MM-DD-title.md`，例如 `_posts/2026-08-08-wave-equation.md`。
3. 修改文章头部的 `title/date/category/excerpt`。
4. 用 Markdown 写正文；公式用 `$...$` 或 `$$...$$`。
5. 提交到 GitHub。完成。

## C. 本地预览（可选）

需要 Ruby。进入项目目录：

```bash
bundle install
bundle exec jekyll serve
```

浏览器打开终端输出的本地地址（Jekyll 默认通常是 `http://127.0.0.1:4000`）。

## D. 修改网站名字和个人信息

- 网站标题、简介：`_config.yml`
- 首页：`index.md`
- 研究方向：`research.md`
- 个人介绍：`about.md`
- 导航与页面骨架：`_layouts/default.html`
- 样式：`assets/css/style.css`
- 交互实验：`labs/*.html`

## E. 普通仓库名时

如果仓库不是 `<username>.github.io`，而是例如 `even-research-site`，把 `_config.yml` 中：

```yml
baseurl: ""
```

改成：

```yml
baseurl: "/even-research-site"
```

## F. 实验室说明

Labs 是教学/概念型浏览器实验，适合展示思路、写学习笔记和做作品集。它们不是高精度科研求解器。真正科研计算建议把 Python / Julia / MATLAB / C++ 代码放到单独仓库，再从网站文章链接过去。
