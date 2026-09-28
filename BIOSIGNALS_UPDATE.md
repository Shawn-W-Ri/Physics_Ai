# Computational Science × Biosignals × AI 更新说明

基于 2026-09-28 下载的 https://github.com/Shawn-W-Ri/Physics_Ai main 分支源码制作。交付为本地完整源码与压缩包；没有向远程仓库提交或发布。

## 完成内容

- Home：指定 Hero、2×2 Research Tracks、Biosignal Spotlight、现有实验和最新笔记。
- Research：Computational Physics / Physiological Computing 两条路线，在 data-driven scientific computing 汇合；保留原有 physics-pde、numerics、ai-science 锚点。
- Biosignals：Acquisition → Preprocessing → Feature Extraction → Detection/Modeling → Evaluation → Visualization，覆盖 ECG、PPG、EMG、EEG、Respiration、IMU。
- Labs：保留全部 11 个原有演示，新增 BIOSIGNAL 分类和 5 个独立规划页。规划页不包含尚未实现的交互算法，均明确标记状态。
- Notes：增加 BIOSIGNAL 分类与空状态；未来文章设置 category: BIOSIGNAL 自动归档。
- 全站：导航、副标题、页脚、可访问菜单、键盘焦点、减少动态效果偏好及移动端布局。
- 设计：延续现有暗色 Hero、浅色卡片、青紫高亮、科学 SVG 和圆角设计；Spotlight 与信号流程为暗色区域。没有新增前端运行依赖、第三方 Jekyll 插件或构建工具。

## 使用方式

1. 完整包：将 Physics_Ai-full.zip 解压后的内容放入仓库根目录。不要再套一层 Physics_Ai 文件夹。
2. 仅覆盖改动：将 Physics_Ai-changes.zip 解压到已有仓库根目录，合并同名目录并替换同名文件。未修改的实验、文章和图片仍由原仓库提供。
3. GitHub Pages 的分支发布设置使用 main / root；页面构建以 GitHub Pages 的实际构建结果为准。
4. 当前 _config.yml 配置 url: https://shawn-w-ri.github.io、baseurl: /Physics_Ai，适用于该项目仓库。若使用根域名、用户名主页或根路径 Vercel 部署，设置实际 url 并将 baseurl 改为 ""。所有内部链接使用 relative_url。
5. 本地安装好 Ruby / Bundler 后，在仓库目录执行 bundle install 和 bundle exec jekyll serve；若使用项目 baseurl，访问 /Physics_Ai/。

## 后续维护

- _data/biosignal_labs.yml 管理生理信号实验目录的标题、链接、说明和状态。
- _includes/biosignal-lab-cards.html 渲染目录卡片。
- _includes/biosignal-wave.html 复用波形图；assets/img/biosignal-wave.svg 是示意图，不是实测记录。
- 将实验规划页替换为实际实现后，同时更新目录状态与首页/实验页数量文案。
- 主样式仍由 _layouts/default.html 内嵌 _includes/site.css；assets/css/style.css 是原仓库保留的旧样式文件，当前布局不引用它。

## 验证范围

- YAML 配置与数据可解析；LiquidJS 兼容预览渲染 26 个页面，分别检查空 baseurl 和 /Physics_Ai。
- 对项目路径预览检查所有内部页面、资源链接与锚点，无失效链接。
- 浏览器检查首页、Research、Biosignals、Labs、ECG 规划页、Notes 在 1440 / 768 / 390 / 320 像素视口下无横向溢出。
- 确认桌面 Research Tracks 为 2×2，手机导航可展开并用 Escape 关闭。
- 本机没有 Ruby / Jekyll，因此没有执行原生 Jekyll 构建；LiquidJS 预览不能代替 GitHub Pages 构建验证。没有验证原有 11 个演示的科学计算精度。

## 修改文件（11）

- about.md
- assets/js/main.js
- index.md
- labs/index.html
- notes.md
- POST_TEMPLATE.md
- README.md
- research.md
- _config.yml
- _includes/site.css
- _layouts/default.html

## 新增文件（11）

- assets/img/biosignal-wave.svg
- biosignals.md
- labs/ecg-filtering.html
- labs/eeg-spectrum.html
- labs/emg-envelope.html
- labs/ppg-heart-rate.html
- labs/r-peak-detection.html
- _data/biosignal_labs.yml
- _includes/biosignal-lab-cards.html
- _includes/biosignal-wave.html
- BIOSIGNALS_UPDATE.md
