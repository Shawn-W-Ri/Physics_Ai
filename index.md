---
layout: default
title: Home
---

<section class="hero">
  <div class="container hero-grid">
    <div>
      <div class="eyebrow">COMPUTATIONAL SCIENCE × BIOSIGNALS × AI</div>
      <h1>从方程到信号，<br>
<span class="gradient">从仿真到智能。</span>
</h1>
      <p class="hero-copy">围绕物理建模、数值计算、生理信号处理与 Scientific Machine Learning，探索从科学规律、传感数据到智能模型的完整计算链路。</p>
      <div class="hero-actions">
        <a class="btn primary" href="{{ '/labs/' | relative_url }}">探索交互实验 →</a>
        <a class="btn secondary" href="{{ '/notes/' | relative_url }}">浏览研究笔记</a>
      </div>
      <div class="hero-tags">
        <span>PDE</span>
<span>Numerical Simulation</span>
<span>PINNs</span>
<span>Neural Operators</span>
<span>Biosignals</span>
<span>Time Series</span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="visual-shell">
        <img src="{{ '/assets/img/hero-simulation.svg' | relative_url }}" alt="PDE 标量场与等值线的抽象仿真图" />
      </div>
      <div class="visual-badge">
<b>Current track</b>
<span>Physics + Biosignals → Scientific AI</span>
</div>
      <div class="visual-stat">
<strong>11</strong>
<small>现有交互实验 · 另有 5 项规划</small>
</div>
    </div>
  </div>
</section>

<section class="metric-strip">
  <div class="container metrics">
    <div class="metric">
<b>Physics & PDE</b>
<span>从守恒律到控制方程</span>
</div>
    <div class="metric">
<b>Numerical Methods</b>
<span>FDM · FEM · Spectral</span>
</div>
    <div class="metric">
<b>Biosignals</b>
<span>ECG · PPG · EMG · EEG · RESP · IMU</span>
</div>
    <div class="metric">
<b>Scientific AI</b>
<span>Physics + Signals + Learning</span>
</div>
  </div>
</section>

<section class="section light">
<div class="container">
<div class="section-head">
<div>
<div class="eyebrow">RESEARCH TRACKS</div>
<h2>两条研究路线，<br>四个相连的方向。</h2>
</div>
<p>从物理方程与人体信号出发，以数值计算、信号处理和 AI 为共同方法，形成可解释、可验证、可复现的研究链路。</p>
</div>
<div class="cards four">
<article class="card">
<div class="card-media">
<img src="{{ '/assets/img/pde-field.svg' | relative_url }}" alt="Physics & PDE 研究示意" loading="lazy">
</div>
<div class="card-body">
<div class="card-num">01 · RESEARCH TRACK</div>
<h3>Physics & PDE</h3>
<p>
<strong>从物理假设到控制方程</strong>
<br>热传导、波动、流体与守恒律：建立可解释的科学模型。</p>
<a href="{{ '/research/#physics-pde' | relative_url }}">探索方向 →</a>
</div>
</article>
<article class="card">
<div class="card-media">
<img src="{{ '/assets/img/numerics-mesh.svg' | relative_url }}" alt="Numerical Simulation 研究示意" loading="lazy">
</div>
<div class="card-body">
<div class="card-num">02 · RESEARCH TRACK</div>
<h3>Numerical Simulation</h3>
<p>
<strong>离散、求解与验证</strong>
<br>FDM / FEM / Spectral；理解误差、稳定性与收敛性。</p>
<a href="{{ '/research/#numerics' | relative_url }}">探索方向 →</a>
</div>
</article>
<article class="card">
<div class="card-media">
<img src="{{ '/assets/img/biosignal-wave.svg' | relative_url }}" alt="Biosignals 研究示意" loading="lazy">
</div>
<div class="card-body">
<div class="card-num">03 · RESEARCH TRACK</div>
<h3>Biosignals</h3>
<p>
<strong>从人体传感到信号理解</strong>
<br>ECG / PPG / EMG / EEG / Respiration / IMU：连接采集、处理与检测。</p>
<a href="{{ '/biosignals/' | relative_url }}">探索方向 →</a>
</div>
</article>
<article class="card">
<div class="card-media">
<img src="{{ '/assets/img/sciml-network.svg' | relative_url }}" alt="AI for Science & Signals 研究示意" loading="lazy">
</div>
<div class="card-body">
<div class="card-num">04 · RESEARCH TRACK</div>
<h3>AI for Science & Signals</h3>
<p>
<strong>让数据与科学结构相遇</strong>
<br>PINNs、神经算子、时间序列与多模态学习，连接物理问题和生理计算。</p>
<a href="{{ '/research/#ai-science' | relative_url }}">探索方向 →</a>
</div>
</article>
</div>
</div>
</section>
<section class="section dark" id="biosignal-spotlight">
<div class="container spotlight">
<div>
<div class="eyebrow">BIOSIGNAL SPOTLIGHT</div>
<h2>读懂波形，<br>也理解波形背后的过程。</h2>
<p>从传感器到时序模型，关注信号质量、特征、检测与验证。六类信号，共享一条可追溯的处理流程。</p>
<div class="hero-tags">
<span>ECG</span>
<span>PPG</span>
<span>EMG</span>
<span>EEG</span>
<span>Respiration</span>
<span>IMU</span>
</div>
<div class="hero-actions">
<a class="btn primary" href="{{ '/biosignals/' | relative_url }}">探索 Biosignals →</a>
<a class="btn secondary" href="{{ '/labs/#biosignal' | relative_url }}">查看实验规划</a>
</div>
</div>{% include biosignal-wave.html %}</div>
</section>
<section class="section white">
  <div class="container">
    <div class="section-head">
      <div>
<div class="eyebrow">FEATURED LABS</div>
<h2>不是只写结论，<br>把概念做成可以玩的实验。</h2>
</div>
      <a href="{{ '/labs/' | relative_url }}">查看 11 个实验与 5 项规划 →</a>
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
          <div class="feature-copy">
<span class="pill">PDE · FDM</span>
<h3>Heat Equation</h3>
<p>扩散系数、初值与有限差分。</p>
<a href="{{ '/labs/heat-equation.html' | relative_url }}">打开实验 →</a>
</div>
        </article>
        <article class="feature-card">
          <img src="{{ '/assets/img/sciml-network.svg' | relative_url }}" alt="PINN 实验封面">
          <div class="feature-copy">
<span class="pill">SCIENTIFIC ML</span>
<h3>PINN Residual</h3>
<p>理解如何把 PDE residual 变成训练目标。</p>
<a href="{{ '/labs/pinn.html' | relative_url }}">打开实验 →</a>
</div>
        </article>
      </div>
    </div>
  </div>
</section>

<section class="section light">
  <div class="container">
    <div class="section-head">
      <div>
<div class="eyebrow">LATEST NOTES</div>
<h2>最近更新</h2>
</div>
      <a href="{{ '/notes/' | relative_url }}">全部笔记 →</a>
    </div>
    <div class="post-list">
      {% for post in site.posts limit:5 %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <div>
<span class="pill">{{ post.category | default: 'NOTE' }}</span>
<h3>{{ post.title }}</h3>
<p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
</div>
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
<div class="eyebrow">SHARED METHOD</div>
<h2>让每一次计算，<br>都有可追溯的证据。</h2>
<p>从问题定义到可视化，保留假设、数据来源、参数、验证结果与失败案例。</p>
</div>
<div class="steps">
<div>
<b>01</b>
<span>Define · 物理问题 / 生理信号任务</span>
</div>
<div>
<b>02</b>
<span>Compute · 数值方法 / 信号处理</span>
</div>
<div>
<b>03</b>
<span>Learn · 数据驱动建模</span>
</div>
<div>
<b>04</b>
<span>Validate · 误差 / 泛化 / 可复现性</span>
</div>
</div>
</div>
</div>
</section>
