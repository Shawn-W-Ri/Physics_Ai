---
layout: default
title: Research
permalink: /research/
---

<section class="page-hero">
  <div class="container narrow">
    <div class="eyebrow">RESEARCH MAP</div>
    <h1>研究方向</h1>
    <p>围绕一个核心问题展开：如何把物理规律转成可计算模型，再把数值方法、统计学习和深度学习接入同一条科学计算工作流。</p>
  </div>
</section>

<section class="section light">
  <div class="container research-stack">
    <article id="physics-pde" class="research-band">
      <div class="research-band-media"><img src="{{ '/assets/img/pde-field.svg' | relative_url }}" alt="PDE 标量场"></div>
      <div class="research-band-copy">
        <div class="eyebrow">01 · PHYSICS / PDE</div>
        <h2>从物理假设到控制方程</h2>
        <p>重点不是只会套公式，而是理解“物理假设 → 控制方程 → 初边值条件 → 可计算模型”这条链路。</p>
        <ul>
          <li>Heat / Diffusion equation</li><li>Wave equation</li><li>Poisson / Laplace equation</li><li>Advection–diffusion</li><li>Navier–Stokes</li><li>连续介质与守恒律</li>
        </ul>
      </div>
    </article>

    <article id="numerics" class="research-band">
      <div class="research-band-media"><img src="{{ '/assets/img/numerics-mesh.svg' | relative_url }}" alt="数值网格"></div>
      <div class="research-band-copy">
        <div class="eyebrow">02 · NUMERICAL SIMULATION</div>
        <h2>把连续问题变成稳定、可验证的离散计算</h2>
        <p>不仅关注“算出一个结果”，还要追踪离散误差、稳定性、收敛性与实现复杂度。</p>
        <ul>
          <li>Finite Difference Method</li><li>Finite Element Method</li><li>Spectral Methods</li><li>ODE time integration</li><li>Stability / convergence</li><li>Verification / validation</li>
        </ul>
      </div>
    </article>

    <article id="ai-science" class="research-band">
      <div class="research-band-media"><img src="{{ '/assets/img/sciml-network.svg' | relative_url }}" alt="Scientific ML 网络"></div>
      <div class="research-band-copy">
        <div class="eyebrow">03 · AI FOR SCIENCE</div>
        <h2>让数据驱动模型服从科学问题的结构</h2>
        <p>关注 AI 与传统数值方法的互补：函数逼近、反问题、代理模型、算子学习与物理约束训练。</p>
        <ul>
          <li>Regression / uncertainty</li><li>Surrogate modeling</li><li>Deep neural networks</li><li>PINNs</li><li>DeepONet / FNO</li><li>Inverse problems</li>
        </ul>
      </div>
    </article>

    <div class="quote">我更关心一个方法为什么有效、什么时候会失效，以及它与经典数值方法相比到底换来了什么。</div>
  </div>
</section>
