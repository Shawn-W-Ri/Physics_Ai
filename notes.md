<section class="page-hero">
  <div class="container">
    <div class="eyebrow">RESEARCH LOG</div>
    <h1>学习与研究笔记</h1>
    <p>推导、实验、代码、论文阅读和阶段性复盘。</p>
  </div>
</section>

<section class="section">
  <div class="container">

{% assign statistics_posts = site.posts | where: "category", "STATISTICS" %}
<div class="notes-group" id="statistics">
  <div class="eyebrow">STATISTICS</div>
  <h2>统计学</h2>
  <div class="post-list">
    {% if statistics_posts.size > 0 %}
      {% for post in statistics_posts %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <div>
          <span class="pill">{{ post.category }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
        </div>
        <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      </a>
      {% endfor %}
    {% else %}
      <p>暂无统计学笔记。</p>
    {% endif %}
  </div>
</div>

{% assign ml_posts = site.posts | where: "category", "MACHINE-LEARNING" %}
<div class="notes-group" id="machine-learning">
  <div class="eyebrow">MACHINE LEARNING</div>
  <h2>机器学习</h2>
  <div class="post-list">
    {% if ml_posts.size > 0 %}
      {% for post in ml_posts %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <div>
          <span class="pill">{{ post.category }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
        </div>
        <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      </a>
      {% endfor %}
    {% else %}
      <p>暂无机器学习笔记。</p>
    {% endif %}
  </div>
</div>

{% assign dl_posts = site.posts | where: "category", "DEEP-LEARNING" %}
<div class="notes-group" id="deep-learning">
  <div class="eyebrow">DEEP LEARNING</div>
  <h2>深度学习</h2>
  <div class="post-list">
    {% if dl_posts.size > 0 %}
      {% for post in dl_posts %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <div>
          <span class="pill">{{ post.category }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
        </div>
        <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      </a>
      {% endfor %}
    {% else %}
      <p>暂无深度学习笔记。</p>
    {% endif %}
  </div>
</div>

{% assign sciml_posts = site.posts | where: "category", "SCI-ML" %}
<div class="notes-group" id="scientific-ml">
  <div class="eyebrow">SCIENTIFIC ML</div>
  <h2>科学机器学习</h2>
  <div class="post-list">
    {% if sciml_posts.size > 0 %}
      {% for post in sciml_posts %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <div>
          <span class="pill">{{ post.category }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
        </div>
        <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      </a>
      {% endfor %}
    {% else %}
      <p>暂无 Scientific ML 笔记。</p>
    {% endif %}
  </div>
</div>

{% assign pde_posts = site.posts | where: "category", "PDE" %}
<div class="notes-group" id="pde">
  <div class="eyebrow">PDE / NUMERICAL METHODS</div>
  <h2>偏微分方程与数值方法</h2>
  <div class="post-list">
    {% if pde_posts.size > 0 %}
      {% for post in pde_posts %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <div>
          <span class="pill">{{ post.category }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
        </div>
        <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      </a>
      {% endfor %}
    {% else %}
      <p>暂无 PDE / 数值方法笔记。</p>
    {% endif %}
  </div>
</div>
