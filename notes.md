---
layout: default
title: Notes
permalink: /notes/
---
<section class="page-hero"><div class="container"><div class="eyebrow">RESEARCH LOG</div><h1>学习与研究笔记</h1><p>推导、实验、代码、论文阅读和阶段性复盘。</p></div></section>
<section class="section"><div class="container"><div class="post-list">
{% for post in site.posts %}
<a class="post-row" href="{{ post.url | relative_url }}">
  <div><span class="pill">{{ post.category | default: 'NOTE' }}</span><h3>{{ post.title }}</h3><p>{{ post.excerpt | strip_html | truncate: 150 }}</p></div>
  <time>{{ post.date | date: "%Y-%m-%d" }}</time>
</a>
{% endfor %}
</div></div></section>
