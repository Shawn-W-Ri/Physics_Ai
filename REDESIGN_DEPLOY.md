# 新版视觉与重新部署

这版已经做了两类修改：

1. 视觉重设计：深色 Hero、玻璃导航、大字号标题、科学可视化封面、卡片化 Research / Labs、移动端布局。
2. GitHub Pages 样式可靠性修复：主 CSS 通过 Jekyll `_includes/site.css` 直接嵌入每个页面，避免项目站点因为 `baseurl` 配置错误而出现“裸 HTML”。

## 替换线上网站

最简单方法：

1. 下载新版 ZIP 并解压。
2. 打开你的 GitHub 网站仓库。
3. 删除旧文件，或直接上传新版中的同名文件覆盖旧文件。
4. Commit changes。
5. 等待 GitHub Pages 重新部署，通常几分钟后刷新网站。

重点确保这些新版文件已经上传：

- `_layouts/default.html`
- `_includes/site.css`
- `index.md`
- `research.md`
- `about.md`
- `labs/index.html`
- `assets/img/` 下全部 SVG

## 如果你的仓库不是 `用户名.github.io`

例如网站地址是：

`https://用户名.github.io/my-research-site/`

新版会在浏览器中自动识别 GitHub Pages 的仓库路径，并修正站内链接与图片路径；CSS 因为已经内嵌，不受这个问题影响。

更标准的做法仍然是在 `_config.yml` 中把：

```yaml
baseurl: ""
```

改成：

```yaml
baseurl: "/my-research-site"
```

如果仓库就叫 `用户名.github.io`，保持 `baseurl: ""` 即可。

## 图片

所有主视觉都是本地 SVG 文件，不依赖外部图库：

- `hero-simulation.svg`
- `pde-field.svg`
- `numerics-mesh.svg`
- `sciml-network.svg`
- `lab-wave.svg`
- `ml-regression.svg`
- `vortex.svg`
- `fno-spectrum.svg`

因此不会出现第三方图片失效、加载缓慢或版权来源不清的问题。
