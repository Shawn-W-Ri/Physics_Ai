# 科研助手接入 Physics_Ai

本文说明科研助手与现有 Jekyll 网站的集成、自动更新和验收方式。配置文件本身不代表已发布或定时任务已执行；运行状态以 GitHub Actions 记录、生产部署结果和公开数据版本为准。

## 接入方式

新增 `research-compass/` 静态页面，保留现有 Jekyll 网站。该目录的 HTML 不含 YAML front matter，脚本、样式、图标、JSON 都使用相对路径。预计正式地址为 `https://www.aiphysics.me/research-compass/`，需要部署与访问验证后才能确认可用。

文件放置：

- `research-compass/`：四功能网页与种子资料。
- `tools/research_compass/`：Python 标准库抓取器、来源配置、测试及上线读回验证器。
- `.github/workflows/research-compass-daily.yml`：每日任务，计划北京时间 08:00；另支持指定路径的 `main` 分支推送和手动触发。GitHub 可能延迟计划任务。
- `_config.yml`：保留现有导航和构建排除项，增加科研助手入口及开发文件排除项；自定义域名配置使用 `url: https://www.aiphysics.me`、空 `baseurl`。
- `vercel.json`：将公开目录 JSON 的精确路径重写到 GitHub `main` 分支的原始文件，使日常数据更新独立于网站重新构建。
- `_data/research-compass-source-state.json`：首次真实运行后生成，仅保存源状态与内容指纹，不保存完整网页。

包内 `_config.yml` 已基于集成时的仓库配置保留现有 `nav`、`exclude` 并加入下列导航项。后续升级应与仓库最新配置合并，避免覆盖其他站点改动：

```yaml
  - title: 科研助手
    url: /research-compass/
```

开发用的 `tools/`、本说明和 `research-compass/catalog.json` 应保留在 Jekyll `exclude` 中；排除目录 JSON 是为了避免构建产物中的静态文件抢占重写路由。页面资源使用相对路径；若以后变更域名或改为子路径托管，应同时调整 Jekyll 的 `url`、`baseurl`、导航链接、重写规则和工作流的公开数据地址，并重新验证页面及资源路径。

## 数据发布路径

首次网站部署必须包含 `vercel.json` 的精确重写规则：

```text
/research-compass/catalog.json
→ https://raw.githubusercontent.com/Shawn-W-Ri/Physics_Ai/main/research-compass/catalog.json
```

该路径设置 `x-vercel-enable-rewrite-caching: 0` 和 `Cache-Control: no-store`。前端仍读取本站的 `./catalog.json`；每日 GitHub Actions 将生成数据提交到仓库后，公开路径通过重写获取仓库内容，无需为每次数据更新重新构建 Vercel。GitHub 原始文件的传播可能有延迟，因此任务仍须从公开地址读回并核对本次 `update.revision`。

上述机制依赖包含重写规则的部署已生效，不能替代首次发布验收。后续修改应用脚本、样式、页面或托管配置仍需新的部署。工作流使用 GitHub 提供的自动令牌写入仓库，不要求用户另行提供个人令牌或 Vercel 令牌。

## 每日更新的实际含义

文献通过公开 API 获取题名、日期、标识符和原始链接；团队官网、招聘、访问及资助页面分别抓取和比较内容变化。相关新链接作为候选收录。没有可靠结构化信息的页面不能仅凭 HTTP 200 自动判定“开放”。

抓取时间、内容变化时间和申请状态核验时间分开记录。首次获取网页指纹也不表示重新核验了种子资料。已有机会内容发生变化时转为待复核，不自动延长原来的核验有效期。来源失败保留既有条目并显示失败状态。截止日、资格和经费仍以原公告为准。

四类来源不是全球所有团队和项目的完整索引。论文 API、官方网页和招聘系统均可能限流、改版或需要 JavaScript；每日检查会显式显示未成功的来源，不能据此宣称全量核验完成。

## GitHub 与现有部署

1. 核对实际托管平台、域名绑定、生产分支、项目根目录、构建命令和产物目录，并检查 Vercel 项目实际关联的 Git 仓库是否为 `Shawn-W-Ri/Physics_Ai`。域名可访问或重写配置存在均不证明 Git 关联正确；如仍关联其他仓库，需在应用代码后续自动部署前单独修正并验证。
2. 将增量文件集成进仓库，测试、审查，再按已授权的上线任务提交。默认分支必须允许该工作流写入生成数据；如有分支保护，按仓库规则调整，不能强推。
3. 工作流放在默认分支，启用 GitHub Actions。向 `main` 推送工作流本身或 `tools/research_compass/**` 的变更会触发运行，可用于首次云端验收；也可使用 `workflow_dispatch` 手动运行。生成的目录和状态文件不在推送触发路径内，避免自动提交递归运行。推送和手动运行均不作为定时执行证据。
4. 完成包含页面、`vercel.json` 和 Jekyll 排除项的首次部署，验证公开 JSON 路径确实读取 GitHub `main` 的原始文件。日常数据提交不依赖 Vercel 再次构建；应用代码变更仍需验证对应的新部署。机器人提交不得冒用用户身份。
5. 工作流默认从 `https://www.aiphysics.me/research-compass/catalog.json` 读回公开数据，无需额外设置变量。迁移域名或子路径时，可用仓库变量 `RESEARCH_COMPASS_PUBLIC_URL` 覆盖；该变量不是秘密。任务会轮询公开 JSON，只有 `update.revision` 与本次任务一致才确认线上数据已更新。
6. 观察首次实际 `schedule` 运行及线上读回。定时执行证据只在真实定时运行后写入；准备好 cron 文件不能代表任务已经运行。

这套目录数据发布方式使用 Vercel 外部重写。若以后迁移到 GitHub Pages，必须另行设计数据发布路径：Pages 不执行 `vercel.json`，且 `GITHUB_TOKEN` 自动提交不会触发 Pages 的分支构建，可将构建和 `deploy-pages` 接入更新流程。任何迁移都需重新验收公开 JSON 版本，不把令牌或 Deploy Hook URL 写入仓库。

公开仓库 60 天没有活动时，GitHub 可能自动禁用计划任务。计划也可能排队延迟；界面以最近实际运行时间为准，不承诺准点执行。

## 本地检查

无需 npm 即可测试此次新增功能：

```sh
python -m unittest discover -s tools/research_compass -p 'test_*.py'
node tools/research_compass/frontend-smoke.cjs
```

上述测试不等于浏览器视觉验收或线上抓取验收。上线后还应检查手机/电脑布局、四功能切换、官方来源链接、目录更新失败时的保留行为，以及生产域名下的 JSON 版本。

抓取器测试使用离线样例，覆盖来源变化、失败保留、动态轮换、跨时区截止时间和运行事件来源；真实来源是否可访问须查看云端运行结果。初始目录不预置定时执行证据，只有实际定时事件成功抓取来源后才记录 `schedule.enabled` 和 `lastScheduledRunAt`。

用户收藏、申请进度、个人笔记、英语练习记录保存在浏览器本地，可导出备份；手机和电脑之间目前不自动同步。不向联系人发送消息。

## 官方依据

- Jekyll 静态文件：https://jekyllrb.com/docs/static-files/
- GitHub 定时事件：https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule
- GitHub 自动令牌的触发限制：https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow
- GitHub Pages 发布来源：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Vercel GitHub 集成：https://vercel.com/docs/git/vercel-for-github
