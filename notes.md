---
layout: default
title: Notes
permalink: /notes/
description: "学习与研究笔记：统计学、机器学习、深度学习、Scientific ML、PDE 与数值方法。"
---

{% assign statistics_posts = site.posts | where: "category", "STATISTICS" %}
{% assign ml_posts = site.posts | where: "category", "MACHINE-LEARNING" %}
{% assign dl_posts = site.posts | where: "category", "DEEP-LEARNING" %}
{% assign sciml_posts = site.posts | where: "category", "SCI-ML" %}
{% assign pde_posts = site.posts | where: "category", "PDE" %}
{% assign latest_post = site.posts.first %}

<style>   .notes-page {     --notes-bg: #f6f7f9;     --notes-card: rgba(255, 255, 255, 0.82);     --notes-dark: #080b10;     --notes-text: #111318;     --notes-muted: #6f7681;     --notes-line: rgba(17, 19, 24, 0.08);     --notes-shadow: 0 24px 70px rgba(18, 24, 40, 0.08);     --notes-radius: 30px;     background: var(--notes-bg);     overflow: hidden;   }    .notes-page * {     box-sizing: border-box;   }    .notes-hero {     position: relative;     overflow: hidden;     padding: 94px 0 66px;     color: #fff;     background:       radial-gradient(circle at 82% 14%, rgba(133, 112, 255, 0.24), transparent 28%),       radial-gradient(circle at 17% 82%, rgba(72, 213, 255, 0.16), transparent 30%),       linear-gradient(135deg, #07090d 0%, #0a0e15 55%, #0d1018 100%);     border-radius: 0 0 38px 38px;   }    .notes-hero::before {     content: "";     position: absolute;     inset: 0;     opacity: 0.22;     background-image:       linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),       linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);     background-size: 64px 64px;     pointer-events: none;   }    .notes-hero::after {     content: "";     position: absolute;     width: 520px;     height: 520px;     right: -180px;     bottom: -330px;     border-radius: 50%;     background: radial-gradient(circle, rgba(86, 213, 255, 0.22), transparent 68%);     pointer-events: none;   }    .notes-hero-inner {     position: relative;     z-index: 1;     display: grid;     grid-template-columns: minmax(0, 1fr) 280px;     gap: 48px;     align-items: end;   }    .notes-kicker {     display: inline-flex;     align-items: center;     gap: 10px;     margin-bottom: 18px;     color: #98a4b5;     font-size: 11px;     font-weight: 800;     letter-spacing: 0.16em;     text-transform: uppercase;   }    .notes-kicker::before {     content: "";     width: 7px;     height: 7px;     border-radius: 50%;     background: #7de8ff;     box-shadow: 0 0 0 5px rgba(125, 232, 255, 0.08);   }    .notes-hero h1 {     max-width: 900px;     margin: 0;     font-size: clamp(52px, 7vw, 90px);     line-height: 0.96;     letter-spacing: -0.06em;     font-weight: 780;   }    .notes-hero h1 span {     display: inline-block;     background: linear-gradient(110deg, #ffffff 8%, #8ee7ff 43%, #b7a9ff 76%, #ffffff);     -webkit-background-clip: text;     background-clip: text;     color: transparent;   }    .notes-hero-copy {     max-width: 760px;     margin: 26px 0 0;     color: #aab5c4;     font-size: 17px;     line-height: 1.8;   }    .notes-stats {     display: grid;     grid-template-columns: 1fr 1fr;     gap: 10px;   }    .notes-stat {     padding: 18px;     border: 1px solid rgba(255, 255, 255, 0.11);     border-radius: 20px;     background: rgba(255, 255, 255, 0.055);     backdrop-filter: blur(16px);     -webkit-backdrop-filter: blur(16px);   }    .notes-stat:first-child {     grid-column: 1 / -1;   }    .notes-stat strong {     display: block;     font-size: 28px;     line-height: 1;     letter-spacing: -0.04em;   }    .notes-stat span {     display: block;     margin-top: 8px;     color: #93a0b2;     font-size: 10px;     font-weight: 700;     letter-spacing: 0.12em;     text-transform: uppercase;   }    .notes-subnav-wrap {     position: sticky;     top: 68px;     z-index: 30;     background: rgba(246, 247, 249, 0.82);     border-bottom: 1px solid rgba(17, 19, 24, 0.06);     backdrop-filter: blur(20px) saturate(180%);     -webkit-backdrop-filter: blur(20px) saturate(180%);   }    .notes-subnav {     display: flex;     gap: 8px;     padding: 12px 0;     overflow-x: auto;     scrollbar-width: none;   }    .notes-subnav::-webkit-scrollbar {     display: none;   }    .notes-subnav a {     flex: 0 0 auto;     display: inline-flex;     align-items: center;     gap: 8px;     min-height: 38px;     padding: 0 13px;     border: 1px solid rgba(17, 19, 24, 0.07);     border-radius: 999px;     background: rgba(255, 255, 255, 0.72);     color: #3f4650;     text-decoration: none;     font-size: 12px;     font-weight: 720;     transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;   }    .notes-subnav a:hover {     transform: translateY(-1px);     background: #fff;     border-color: rgba(17, 19, 24, 0.14);   }    .notes-subnav b {     display: grid;     place-items: center;     min-width: 22px;     height: 22px;     padding: 0 6px;     border-radius: 999px;     background: #edf0f5;     color: #717783;     font-size: 10px;   }    .notes-main {     padding: 72px 0 110px;   }    .notes-feature {     position: relative;     overflow: hidden;     display: grid;     grid-template-columns: minmax(0, 1.3fr) minmax(250px, 0.7fr);     gap: 42px;     align-items: center;     margin-bottom: 70px;     padding: 40px;     border: 1px solid rgba(17, 19, 24, 0.07);     border-radius: 30px;     background: #fff;     box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset;   }    .notes-feature::after {     content: "";     position: absolute;     width: 360px;     height: 360px;     right: -140px;     top: -210px;     border-radius: 50%;     background: radial-gradient(circle, rgba(133, 112, 255, 0.13), transparent 70%);     pointer-events: none;   }    .notes-feature-label {     display: inline-flex;     align-items: center;     gap: 8px;     margin-bottom: 16px;     color: #6d7480;     font-size: 11px;     font-weight: 800;     letter-spacing: 0.16em;     text-transform: uppercase;   }    .notes-feature-label::before {     content: "";     width: 7px;     height: 7px;     border-radius: 50%;     background: #8570ff;     box-shadow: 0 0 0 5px rgba(133, 112, 255, 0.09);   }    .notes-feature h2 {     max-width: 780px;     margin: 0;     color: var(--notes-text);     font-size: clamp(30px, 4vw, 46px);     line-height: 1.08;     letter-spacing: -0.045em;   }    .notes-feature p {     max-width: 760px;     margin: 16px 0 0;     color: var(--notes-muted);     font-size: 15px;     line-height: 1.7;   }    .notes-feature-meta {     position: relative;     z-index: 1;     display: grid;     gap: 13px;     padding-left: 30px;     border-left: 1px solid var(--notes-line);   }    .notes-feature-meta span {     display: block;     color: #7b828d;     font-size: 10px;     font-weight: 700;     letter-spacing: 0.12em;     text-transform: uppercase;   }    .notes-feature-meta strong {     display: block;     margin-top: 3px;     color: #171a20;     font-size: 14px;   }    .notes-feature-link {     display: inline-flex;     align-items: center;     gap: 8px;     width: max-content;     margin-top: 8px;     color: #111318;     text-decoration: none;     font-size: 13px;     font-weight: 800;   }    .notes-feature-link .arrow {     transition: transform 0.2s ease;   }    .notes-feature-link:hover .arrow {     transform: translateX(4px);   }    .notes-directory-head {     display: grid;     grid-template-columns: minmax(0, 1fr) minmax(280px, 430px);     gap: 40px;     align-items: end;     margin-bottom: 34px;   }    .notes-directory-head .label {     color: #838a94;     font-size: 11px;     font-weight: 800;     letter-spacing: 0.16em;     text-transform: uppercase;   }    .notes-directory-head h2 {     margin: 8px 0 0;     color: var(--notes-text);     font-size: clamp(34px, 4vw, 52px);     line-height: 1;     letter-spacing: -0.045em;   }    .notes-directory-head p {     margin: 0;     color: var(--notes-muted);     font-size: 14px;     line-height: 1.7;   }    .notes-topics {     display: grid;     gap: 22px;   }    .notes-topic {     scroll-margin-top: 150px;     position: relative;     overflow: hidden;     display: grid;     grid-template-columns: 270px minmax(0, 1fr);     min-height: 260px;     border: 1px solid var(--notes-line);     border-radius: var(--notes-radius);     background: var(--notes-card);     box-shadow: 0 1px 0 rgba(255, 255, 255, 0.95) inset;     transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;   }    .notes-topic:hover {     transform: translateY(-3px);     border-color: rgba(17, 19, 24, 0.13);     box-shadow: var(--notes-shadow);   }    .notes-topic-side {     position: relative;     overflow: hidden;     padding: 32px 30px;     color: #fff;     background: #0b0e13;   }    .notes-topic-side::before {     content: "";     position: absolute;     width: 250px;     height: 250px;     right: -130px;     bottom: -120px;     border-radius: 50%;     background: radial-gradient(circle, var(--topic-glow), transparent 68%);   }    .notes-topic-side::after {     content: "";     position: absolute;     inset: 0;     opacity: 0.15;     background-image:       linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),       linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);     background-size: 34px 34px;     pointer-events: none;   }    .notes-topic-no,   .notes-topic-name,   .notes-topic-count {     position: relative;     z-index: 1;   }    .notes-topic-no {     color: #778292;     font-size: 10px;     font-weight: 800;     letter-spacing: 0.18em;   }    .notes-topic-name {     margin-top: 48px;   }    .notes-topic-name .eyebrow {     color: #929cab;     font-size: 11px;     font-weight: 700;     letter-spacing: 0.13em;   }    .notes-topic-name h3 {     margin: 9px 0 0;     font-size: 29px;     line-height: 1.06;     letter-spacing: -0.04em;   }    .notes-topic-count {     position: absolute;     left: 30px;     bottom: 30px;     display: flex;     align-items: center;     gap: 8px;     color: #8e98a7;     font-size: 11px;     font-weight: 700;     letter-spacing: 0.07em;   }    .notes-topic-count b {     color: #fff;     font-size: 13px;   }    .notes-topic-posts {     padding: 10px 30px;   }    .notes-entry {     display: grid;     grid-template-columns: 42px minmax(0, 1fr) auto;     gap: 16px;     align-items: center;     padding: 22px 4px;     border-bottom: 1px solid var(--notes-line);     color: inherit;     text-decoration: none;     transition: padding 0.2s ease, background 0.2s ease;   }    .notes-entry:last-child {     border-bottom: 0;   }    .notes-entry:hover {     padding-left: 12px;     padding-right: 12px;     background: rgba(245, 247, 250, 0.8);   }    .notes-entry-index {     display: grid;     place-items: center;     width: 36px;     height: 36px;     border: 1px solid rgba(17, 19, 24, 0.08);     border-radius: 11px;     background: #f6f7f9;     color: #7a808b;     font-size: 10px;     font-weight: 800;   }    .notes-entry h4 {     margin: 0;     color: var(--notes-text);     font-size: 18px;     line-height: 1.3;     letter-spacing: -0.02em;   }    .notes-entry p {     max-width: 720px;     margin: 7px 0 0;     color: var(--notes-muted);     font-size: 13px;     line-height: 1.6;   }    .notes-entry time {     white-space: nowrap;     color: #7a8089;     font-size: 11px;     letter-spacing: 0.04em;   }    .notes-empty {     display: flex;     align-items: center;     justify-content: space-between;     gap: 24px;     min-height: 180px;     padding: 34px 4px;   }    .notes-empty strong {     display: block;     color: var(--notes-text);     font-size: 18px;     letter-spacing: -0.02em;   }    .notes-empty p {     margin: 7px 0 0;     color: var(--notes-muted);     font-size: 13px;   }    .notes-empty-mark {     color: #d7dbe2;     font-size: 44px;     font-weight: 250;     line-height: 1;   }    .notes-topic.stats { --topic-glow: rgba(82, 214, 255, 0.30); }   .notes-topic.ml { --topic-glow: rgba(57, 119, 255, 0.32); }   .notes-topic.dl { --topic-glow: rgba(139, 124, 255, 0.32); }   .notes-topic.sciml { --topic-glow: rgba(168, 255, 120, 0.24); }   .notes-topic.pde { --topic-glow: rgba(255, 184, 92, 0.25); }    @media (max-width: 920px) {     .notes-hero-inner {       grid-template-columns: 1fr;       gap: 34px;     }      .notes-stats {       max-width: 420px;     }      .notes-feature {       grid-template-columns: 1fr;       gap: 26px;     }      .notes-feature-meta {       padding: 24px 0 0;       border-left: 0;       border-top: 1px solid var(--notes-line);     }      .notes-directory-head {       grid-template-columns: 1fr;       gap: 14px;     }      .notes-topic {       grid-template-columns: 220px minmax(0, 1fr);     }   }    @media (max-width: 700px) {     .notes-hero {       padding: 70px 0 48px;       border-radius: 0 0 24px 24px;     }      .notes-hero h1 {       font-size: clamp(46px, 15vw, 64px);     }      .notes-subnav-wrap {       top: 62px;     }      .notes-main {       padding: 52px 0 80px;     }      .notes-feature {       margin-bottom: 52px;       padding: 28px 24px;       border-radius: 24px;     }      .notes-topic {       grid-template-columns: 1fr;       border-radius: 24px;     }      .notes-topic-side {       min-height: 180px;       padding: 25px 24px;     }      .notes-topic-name {       margin-top: 28px;     }      .notes-topic-count {       left: auto;       right: 24px;       bottom: 24px;     }      .notes-topic-posts {       padding: 6px 20px;     }      .notes-entry {       grid-template-columns: 36px minmax(0, 1fr);       gap: 13px;       padding: 20px 0;     }      .notes-entry time {       grid-column: 2;       margin-top: -5px;     }      .notes-entry p {       display: none;     }   }    @media (prefers-reduced-motion: reduce) {     .notes-page *,     .notes-page *::before,     .notes-page *::after {       transition: none !important;     }   } </style>

<div class="notes-page">

  <section class="notes-hero">     <div class="container notes-hero-inner">       <div>         <div class="notes-kicker">RESEARCH NOTEBOOK · 2026</div>         <h1>把学习变成一套<br><span>可检索的研究系统。</span></h1>         <p class="notes-hero-copy">           从统计学到机器学习，从深度学习到 Scientific ML，再回到 PDE 与数值方法。           这里记录推导、实验、代码、论文阅读，以及真正值得保留下来的阶段性结论。         </p>       </div>

  <div class="notes-stats" aria-label="Notes statistics">
    <div class="notes-stat">
      <strong>{{ site.posts.size }}</strong>
      <span>Total Notes</span>
    </div>

    <div class="notes-stat">
      <strong>05</strong>
      <span>Tracks</span>
    </div>

    <div class="notes-stat">
      <strong>
        {% if latest_post %}
          {{ latest_post.date | date: "%m.%d" }}
        {% else %}
          —
        {% endif %}
      </strong>
      <span>Latest</span>
    </div>
  </div>
</div>

  </section>

  <div class="notes-subnav-wrap">     <div class="container">       <nav class="notes-subnav" aria-label="Notes categories">         <a href="#statistics">           统计学           <b>{{ statistics_posts.size }}</b>         </a>

    <a href="#machine-learning">
      机器学习
      <b>{{ ml_posts.size }}</b>
    </a>

    <a href="#deep-learning">
      深度学习
      <b>{{ dl_posts.size }}</b>
    </a>

    <a href="#scientific-ml">
      Scientific ML
      <b>{{ sciml_posts.size }}</b>
    </a>

    <a href="#pde">
      PDE / 数值方法
      <b>{{ pde_posts.size }}</b>
    </a>
  </nav>
</div>

  </div>

  <section class="notes-main">     <div class="container">

  {% if latest_post %}
  <article class="notes-feature">
    <div>
      <div class="notes-feature-label">Latest Note</div>
      <h2>{{ latest_post.title }}</h2>
      <p>{{ latest_post.excerpt | strip_html | truncate: 210 }}</p>
    </div>

    <div class="notes-feature-meta">
      <div>
        <span>Category</span>
        <strong>{{ latest_post.category | default: "NOTE" }}</strong>
      </div>

      <div>
        <span>Published</span>
        <strong>{{ latest_post.date | date: "%Y · %m · %d" }}</strong>
      </div>

      <a class="notes-feature-link" href="{{ latest_post.url | relative_url }}">
        阅读最新笔记
        <span class="arrow">→</span>
      </a>
    </div>
  </article>
  {% endif %}

  <div class="notes-directory-head">
    <div>
      <div class="label">KNOWLEDGE DIRECTORY</div>
      <h2>研究脉络</h2>
    </div>

    <p>
      不按时间把所有内容堆在一起，而是按知识结构组织。
      每一条研究线都可以持续增长；以后新增文章，只需要设置对应的 category。
    </p>
  </div>

  <div class="notes-topics">

    <section class="notes-topic stats" id="statistics">
      <div class="notes-topic-side">
        <div class="notes-topic-no">01 / FOUNDATIONS</div>

        <div class="notes-topic-name">
          <div class="eyebrow">STATISTICS</div>
          <h3>统计学</h3>
        </div>

        <div class="notes-topic-count">
          <b>{{ statistics_posts.size }}</b> NOTES
        </div>
      </div>

      <div class="notes-topic-posts">
        {% if statistics_posts.size > 0 %}

          {% for post in statistics_posts %}
          <a class="notes-entry" href="{{ post.url | relative_url }}">
            <span class="notes-entry-index">{{ forloop.index }}</span>

            <div>
              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt | strip_html | truncate: 135 }}</p>
            </div>

            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
          </a>
          {% endfor %}

        {% else %}

          <div class="notes-empty">
            <div>
              <strong>这一条研究线还在等待第一篇笔记。</strong>
              <p>在 _posts 中新增文章，并设置 category: STATISTICS。</p>
            </div>

            <span class="notes-empty-mark">+</span>
          </div>

        {% endif %}
      </div>
    </section>

    <section class="notes-topic ml" id="machine-learning">
      <div class="notes-topic-side">
        <div class="notes-topic-no">02 / LEARNING</div>

        <div class="notes-topic-name">
          <div class="eyebrow">MACHINE LEARNING</div>
          <h3>机器学习</h3>
        </div>

        <div class="notes-topic-count">
          <b>{{ ml_posts.size }}</b> NOTES
        </div>
      </div>

      <div class="notes-topic-posts">
        {% if ml_posts.size > 0 %}

          {% for post in ml_posts %}
          <a class="notes-entry" href="{{ post.url | relative_url }}">
            <span class="notes-entry-index">{{ forloop.index }}</span>

            <div>
              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt | strip_html | truncate: 135 }}</p>
            </div>

            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
          </a>
          {% endfor %}

        {% else %}

          <div class="notes-empty">
            <div>
              <strong>机器学习笔记即将从这里开始。</strong>
              <p>建议从 Linear Regression、Logistic Regression、Model Evaluation 建立主线。</p>
            </div>

            <span class="notes-empty-mark">+</span>
          </div>

        {% endif %}
      </div>
    </section>

    <section class="notes-topic dl" id="deep-learning">
      <div class="notes-topic-side">
        <div class="notes-topic-no">03 / REPRESENTATION</div>

        <div class="notes-topic-name">
          <div class="eyebrow">DEEP LEARNING</div>
          <h3>深度学习</h3>
        </div>

        <div class="notes-topic-count">
          <b>{{ dl_posts.size }}</b> NOTES
        </div>
      </div>

      <div class="notes-topic-posts">
        {% if dl_posts.size > 0 %}

          {% for post in dl_posts %}
          <a class="notes-entry" href="{{ post.url | relative_url }}">
            <span class="notes-entry-index">{{ forloop.index }}</span>

            <div>
              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt | strip_html | truncate: 135 }}</p>
            </div>

            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
          </a>
          {% endfor %}

        {% else %}

          <div class="notes-empty">
            <div>
              <strong>这里会记录从神经网络到现代深度学习的路径。</strong>
              <p>在文章 Front Matter 中设置 category: DEEP-LEARNING 即可自动归档。</p>
            </div>

            <span class="notes-empty-mark">+</span>
          </div>

        {% endif %}
      </div>
    </section>

    <section class="notes-topic sciml" id="scientific-ml">
      <div class="notes-topic-side">
        <div class="notes-topic-no">04 / SCIENTIFIC AI</div>

        <div class="notes-topic-name">
          <div class="eyebrow">SCIENTIFIC ML</div>
          <h3>科学机器学习</h3>
        </div>

        <div class="notes-topic-count">
          <b>{{ sciml_posts.size }}</b> NOTES
        </div>
      </div>

      <div class="notes-topic-posts">
        {% if sciml_posts.size > 0 %}

          {% for post in sciml_posts %}
          <a class="notes-entry" href="{{ post.url | relative_url }}">
            <span class="notes-entry-index">{{ forloop.index }}</span>

            <div>
              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt | strip_html | truncate: 135 }}</p>
            </div>

            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
          </a>
          {% endfor %}

        {% else %}

          <div class="notes-empty">
            <div>
              <strong>PINNs、operator learning 与 surrogate modeling 会聚集在这里。</strong>
              <p>新增文章时使用 category: SCI-ML。</p>
            </div>

            <span class="notes-empty-mark">+</span>
          </div>

        {% endif %}
      </div>
    </section>

    <section class="notes-topic pde" id="pde">
      <div class="notes-topic-side">
        <div class="notes-topic-no">05 / NUMERICS</div>

        <div class="notes-topic-name">
          <div class="eyebrow">PDE · NUMERICS</div>
          <h3>偏微分方程<br>与数值方法</h3>
        </div>

        <div class="notes-topic-count">
          <b>{{ pde_posts.size }}</b> NOTES
        </div>
      </div>

      <div class="notes-topic-posts">
        {% if pde_posts.size > 0 %}

          {% for post in pde_posts %}
          <a class="notes-entry" href="{{ post.url | relative_url }}">
            <span class="notes-entry-index">{{ forloop.index }}</span>

            <div>
              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt | strip_html | truncate: 135 }}</p>
            </div>

            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
          </a>
          {% endfor %}

        {% else %}

          <div class="notes-empty">
            <div>
              <strong>PDE、FDM、FEM 与计算物理笔记会出现在这里。</strong>
              <p>新增文章时使用 category: PDE。</p>
            </div>

            <span class="notes-empty-mark">+</span>
          </div>

        {% endif %}
      </div>
    </section>

  </div>
</div>
