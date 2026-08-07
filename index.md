---
layout: default
title: Home
---

<section class="hero">
  <div class="container hero-grid">
    <div>
      <div class="eyebrow">PERSONAL COMPUTATIONAL SCIENCE LAB · 2026</div>
      <h1>从方程到模型，<br><span class="gradient">从仿真到智能。</span></h1>
      <p class="hero-copy">围绕物理仿真、偏微分方程、数值计算与 Scientific Machine Learning，持续记录推导、实验、代码和研究思考。</p>
      <div class="hero-actions">
        <a class="btn primary" href="{{ '/labs/' | relative_url }}">探索交互实验 →</a>
        <a class="btn secondary" href="{{ '/notes/' | relative_url }}">浏览研究笔记</a>
      </div>
      <div class="hero-tags">
        <span>PDE</span><span>Numerical Simulation</span><span>PINNs</span><span>Neural Operators</span><span>Statistics</span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="visual-shell">
        <img src="{{ '/assets/img/hero-simulation.svg' | relative_url }}" alt="PDE 标量场与等值线的抽象仿真图" />
      </div>
      <div class="visual-badge"><b>Current track</b><span>PDE → Numerics → Scientific ML</span></div>
      <div class="visual-stat"><strong>11</strong><small>interactive labs</small></div>
    </div>
  </div>
</section>

<section class="metric-strip">
  <div class="container metrics">
    <div class="metric"><b>Physics & PDE</b><span>从守恒律到控制方程</span></div>
    <div class="metric"><b>Numerical Methods</b><span>FDM · FEM · Spectral</span></div>
    <div class="metric"><b>Scientific ML</b><span>PINN · DeepONet · FNO</span></div>
    <div class="metric"><b>Research Log</b><span>持续沉淀可复现笔记</span></div>
  </div>
</section>

<section class="section light">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">RESEARCH TRACKS</div><h2>把数学、物理、计算与 AI<br>放进同一条研究链路。</h2></div>
      <p>不是分散地“学几门课”，而是从科学问题出发：建立模型、离散求解、验证结果，再研究数据驱动方法能在哪些环节真正创造价值。</p>
    </div>

    <div class="cards three">
      <article class="card">
        <div class="card-media"><img src="{{ '/assets/img/pde-field.svg' | relative_url }}" alt="偏微分方程标量场示意图"></div>
        <div class="card-body">
          <div class="card-num">01 · PHYSICS / PDE</div>
          <h3>从物理假设到控制方程</h3>
          <p>热传导、扩散、波动、Poisson、Navier–Stokes 与连续介质中的守恒律。</p>
          <a href="{{ '/research/#physics-pde' | relative_url }}">查看研究方向 →</a>
        </div>
      </article>

      <article class="card">
        <div class="card-media"><img src="{{ '/assets/img/numerics-mesh.svg' | relative_url }}" alt="数值计算网格示意图"></div>
        <div class="card-body">
          <div class="card-num">02 · NUMERICAL SIMULATION</div>
          <h3>离散、求解、误差与验证</h3>
          <p>有限差分、有限元、谱方法、时间推进、稳定性、收敛性与可复现实验。</p>
          <a href="{{ '/research/#numerics' | relative_url }}">查看研究方向 →</a>
        </div>
      </article>

      <article class="card">
        <div class="card-media"><img src="{{ '/assets/img/sciml-network.svg' | relative_url }}" alt="Scientific Machine Learning 神经算子示意图"></div>
        <div class="card-body">
          <div class="card-num">03 · SCIENTIFIC ML</div>
          <h3>让机器学习理解科学结构</h3>
          <p>统计学习、深度网络、PINNs、Neural Operators、代理模型与反问题。</p>
          <a href="{{ '/research/#ai-science' | relative_url }}">查看研究方向 →</a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="section white">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">FEATURED LABS</div><h2>不是只写结论，<br>把概念做成可以玩的实验。</h2></div>
      <a href="{{ '/labs/' | relative_url }}">查看全部 11 个实验 →</a>
    </div>

    <div class="feature-grid">
      <article class="feature-card tall">
        <img src="{{ '/assets/img/lab-wave.svg' | relative_url }}" alt="波动方程交互实验封面">
        <div class="feature-copy">
          <span class="pill">SIMULATION · FEATURED</span>
          <h3>Wave Equation Playground</h3>
          <p>观察波速、时间推进与 CFL 条件如何改变传播过程，把抽象的数值稳定性变成直觉。</p>
          <a href="{{ '/labs/wave-equation.html' | relative_url }}">打开实验 →</a>
        </div>
      </article>
      <div class="feature-side">
        <article class="feature-card">
          <img src="{{ '/assets/img/pde-field.svg' | relative_url }}" alt="热方程实验封面">
          <div class="feature-copy"><span class="pill">PDE · FDM</span><h3>Heat Equation</h3><p>扩散系数、初值与有限差分。</p><a href="{{ '/labs/heat-equation.html' | relative_url }}">打开实验 →</a></div>
        </article>
        <article class="feature-card">
          <img src="{{ '/assets/img/sciml-network.svg' | relative_url }}" alt="PINN 实验封面">
          <div class="feature-copy"><span class="pill">SCIENTIFIC ML</span><h3>PINN Residual</h3><p>理解如何把 PDE residual 变成训练目标。</p><a href="{{ '/labs/pinn.html' | relative_url }}">打开实验 →</a></div>
        </article>
      </div>
    </div>
  </div>
</section>

<section class="section light">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">LATEST NOTES</div><h2>最近更新</h2></div>
      <a href="{{ '/notes/' | relative_url }}">全部笔记 →</a>
    </div>
    <div class="post-list">
      {% for post in site.posts limit:5 %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <div><span class="pill">{{ post.category | default: 'NOTE' }}</span><h3>{{ post.title }}</h3><p>{{ post.excerpt | strip_html | truncate: 120 }}</p></div>
        <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      </a>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section white">
  <div class="container">
    <div class="workflow">
      <div>
        <div class="eyebrow" style="color:#8d98a9">DAILY WORKFLOW</div>
        <h2>每天维护，<br>只需要写 Markdown。</h2>
        <p>把网站当成长期研究日志。新增一篇笔记、提交一次 Git，首页、文章列表和归档就会自动更新。</p>
      </div>
      <div class="steps">
        <div><b>01</b><span>复制 POST_TEMPLATE.md</span></div>
        <div><b>02</b><span>写 Markdown + LaTeX + 实验结果</span></div>
        <div><b>03</b><span>Commit 到 GitHub</span></div>
        <div><b>04</b><span>GitHub Pages 自动重新发布</span></div>
      </div>
    </div>
  </div>
</section>
