---
layout: default
title: Research
permalink: /research/
---

<section class="page-hero">
<div class="container">
<div class="eyebrow">RESEARCH MAP</div>
<h1>两条路线，一个共同方法层。</h1>
<p>Computational Physics 与 Physiological Computing 分别从科学规律和人体传感出发，在 data-driven scientific computing 汇合。</p>
</div>
</section>
<section class="section light">
<div class="container research-stack">
<article id="computational-physics" class="research-band">
<div class="research-band-media">
<img src="{{ '/assets/img/pde-field.svg' | relative_url }}" alt="计算物理标量场">
</div>
<div class="research-band-copy">
<div class="eyebrow">ROUTE 01 · COMPUTATIONAL PHYSICS</div>
<h2>从方程到可计算的世界</h2>
<p>物理假设 → 控制方程 → 离散求解 → 数值验证 → 数据驱动建模。</p>
<h3 id="physics-pde">Physics & PDE</h3>
<p>守恒律、Heat / Diffusion、Wave、Poisson / Laplace、Advection–diffusion 与 Navier–Stokes；明确初边值条件与建模假设。</p>
<h3 id="numerics">Numerical Simulation</h3>
<p>FDM / FEM / Spectral、时间推进、稳定性与网格收敛；先验证传统求解器，再比较代理模型与神经算子。</p>
<a href="{{ '/labs/#simulation' | relative_url }}">进入计算物理实验 →</a>
</div>
</article>
<article id="physiological-computing" class="research-band">
<div class="research-band-media">
<img src="{{ '/assets/img/biosignal-wave.svg' | relative_url }}" alt="生理计算示意波形">
</div>
<div class="research-band-copy">
<div class="eyebrow">ROUTE 02 · PHYSIOLOGICAL COMPUTING</div>
<h2>从传感数据到可验证的理解</h2>
<p>采集 → 预处理 → 特征提取 → 检测 / 建模 → 评估 → 可视化。</p>
<h3>Biosignals & Signal Processing</h3>
<p>ECG / PPG / EMG / EEG / Respiration / IMU；研究信号质量、时域频域特征、事件检测、时序建模与多模态融合。</p>
<h3>Evaluation & Reproducibility</h3>
<p>建立可解释基线，按受试者划分数据；检验跨设备、跨场景泛化，记录漏检、误检、误差和低质量片段。</p>
<a href="{{ '/biosignals/' | relative_url }}">查看生理信号完整流程 →</a>
</div>
</article>
</div>
</section>
<section class="section dark" id="ai-science">
<div class="container">
<div class="section-head">
<div>
<div class="eyebrow">CONVERGENCE · DATA-DRIVEN SCIENTIFIC COMPUTING</div>
<h2>AI for Science & Signals</h2>
</div>
<p>AI 是连接两条路线的方法层：利用结构、数据与验证，建立可靠的计算模型。</p>
</div>
<div class="convergence">
<div>
<h3>Computational Physics</h3>
<p>方程 · 网格 · 数值解</p>
</div>
<div class="convergence-core">
<h3>Data-driven<br>scientific computing</h3>
<p>结构 + 数据 + 可验证计算</p>
</div>
<div>
<h3>Physiological Computing</h3>
<p>传感 · 波形 · 事件</p>
</div>
</div>
<div class="cards three method-cards">
<article>
<h3>Represent & Learn</h3>
<p>统计学习、深度时序网络、神经算子与多模态表示。</p>
</article>
<article>
<h3>Constrain & Explain</h3>
<p>物理约束、信号先验、可解释特征与不确定性分析。</p>
</article>
<article>
<h3>Compare & Validate</h3>
<p>与经典数值方法、信号处理基线比较精度、效率、鲁棒性与泛化。</p>
</article>
</div>
<a class="btn secondary" href="{{ '/labs/#ai' | relative_url }}">探索共同方法 →</a>
</div>
</section>
