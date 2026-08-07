---
layout: default
title: Home
---

<section class="hero">
  <div class="container hero-grid">
    <div>
      <div class="eyebrow">PERSONAL RESEARCH NOTEBOOK · 2026</div>
      <h1>从方程到模型，<br><span>从仿真到智能。</span></h1>
      <p class="hero-copy">这里记录我在物理仿真、偏微分方程、数值计算，以及统计学习、机器学习、深度学习与 Scientific Machine Learning 交叉方向上的学习、实验与思考。</p>
      <div class="hero-actions">
        <a class="btn primary" href="{{ '/notes/' | relative_url }}">浏览研究笔记 →</a>
        <a class="btn secondary" href="{{ '/labs/' | relative_url }}">打开交互实验</a>
      </div>
      <div class="hero-tags">
        <span>PDE</span><span>Numerical Simulation</span><span>PINNs</span><span>Statistics</span><span>Deep Learning</span>
      </div>
    </div>
    <div class="hero-card">
      <div class="terminal-bar"><i></i><i></i><i></i></div>
      <pre><code># today.py
problem = "heat equation"
method  = "finite difference"
model   = "physics-informed NN"

while curious:
    derive()
    simulate()
    compare()
    write_note()

print("理解，比结论更重要。")</code></pre>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div><div class="eyebrow">FOCUS AREAS</div><h2>我主要研究什么</h2></div>
      <p>把数学、物理、计算与 AI 放在同一条工作流里。</p>
    </div>
    <div class="cards three">
      <article class="card">
        <div class="card-num">01</div>
        <h3>Physics & PDE</h3>
        <p>经典力学、连续介质、热传导、扩散、波动方程、Navier–Stokes，以及它们背后的建模假设。</p>
        <a href="{{ '/research/#physics-pde' | relative_url }}">查看方向 →</a>
      </article>
      <article class="card">
        <div class="card-num">02</div>
        <h3>Numerical Simulation</h3>
        <p>有限差分、有限元、谱方法、ODE/PDE 离散化、稳定性、误差分析与高性能计算。</p>
        <a href="{{ '/research/#numerics' | relative_url }}">查看方向 →</a>
      </article>
      <article class="card">
        <div class="card-num">03</div>
        <h3>AI for Science</h3>
        <p>统计建模、机器学习、深度学习、PINNs、Neural Operators、Surrogate Models 与不确定性量化。</p>
        <a href="{{ '/research/#ai-science' | relative_url }}">查看方向 →</a>
      </article>
    </div>
  </div>
</section>

<section class="section alt">
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

<section class="section">
  <div class="container split-callout">
    <div>
      <div class="eyebrow">DAILY WORKFLOW</div>
      <h2>每天维护，不需要改网页代码。</h2>
      <p>你只需要在 <code>_posts</code> 文件夹新建一个 Markdown 文件，GitHub Pages 会自动生成新文章、更新首页和文章列表。</p>
    </div>
    <div class="steps">
      <div><b>1</b><span>复制文章模板</span></div>
      <div><b>2</b><span>写 Markdown + LaTeX</span></div>
      <div><b>3</b><span>提交到 GitHub</span></div>
      <div><b>4</b><span>网站自动更新</span></div>
    </div>
  </div>
</section>
