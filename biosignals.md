---
layout: default
title: Biosignals
permalink: /biosignals/
---

<section class="page-hero">
<div class="container">
<div class="eyebrow">PHYSIOLOGICAL COMPUTING</div>
<h1>从传感到理解</h1>
<p>ECG / PPG / EMG / EEG / Respiration / IMU：把数据质量、信号处理、检测建模与结果验证连接起来。</p>
</div>
</section>
<section class="section dark">
<div class="container">
<div class="section-head">
<div>
<div class="eyebrow">SIGNAL PIPELINE</div>
<h2>一条完整的研究流程</h2>
</div>
<p>每一步都有明确输入、可复现参数与可检查输出。</p>
</div>
<nav class="pipeline" aria-label="信号处理流程">
<a href="#acquisition">
<span>01</span>Acquisition</a>
<a href="#preprocessing">
<span>02</span>Preprocessing</a>
<a href="#features">
<span>03</span>Feature Extraction</a>
<a href="#modeling">
<span>04</span>Detection/Modeling</a>
<a href="#evaluation">
<span>05</span>Evaluation</a>
<a href="#visualization">
<span>06</span>Visualization</a>
</nav>{% include biosignal-wave.html %}</div>
</section>
<section class="section light">
<div class="container">
<div class="cards two pipeline-details">
<article id="acquisition" class="card">
<div class="card-body">
<div class="card-num">01 · Acquisition</div>
<h2>采集与记录</h2>
<p>记录传感器、通道、采样率、单位、时间戳、佩戴位置与实验条件；同步多模态时钟，并保留原始数据。</p>
<p class="deliverable">
<strong>输出</strong> · 原始波形 + 采集元数据</p>
</div>
</article>
<article id="preprocessing" class="card">
<div class="card-body">
<div class="card-num">02 · Preprocessing</div>
<h2>清洗与质量控制</h2>
<p>检查丢包、缺失、饱和与运动伪迹；按任务选择去趋势、滤波、重采样和分段，记录参数与边界处理。</p>
<p class="deliverable">
<strong>输出</strong> · 处理后信号 + 质量掩码</p>
</div>
</article>
<article id="features" class="card">
<div class="card-body">
<div class="card-num">03 · Feature Extraction</div>
<h2>时域、频域与时频表示</h2>
<p>提取峰值、间期、幅度、包络、功率谱与时频特征；明确窗口、单位、归一化和信号质量条件。</p>
<p class="deliverable">
<strong>输出</strong> · 特征表 + 窗口与参数</p>
</div>
</article>
<article id="modeling" class="card">
<div class="card-body">
<div class="card-num">04 · Detection/Modeling</div>
<h2>从基线到时序模型</h2>
<p>先建立规则或统计基线，再比较事件检测、回归、分类和深度时序模型；通过受试者分组划分数据，减少信息泄漏。</p>
<p class="deliverable">
<strong>输出</strong> · 事件时间戳 / 预测值 + 模型版本</p>
</div>
</article>
<article id="evaluation" class="card">
<div class="card-body">
<div class="card-num">05 · Evaluation</div>
<h2>验证、误差与泛化</h2>
<p>检测任务报告 precision / recall / F1 和匹配容差；回归任务报告 MAE / RMSE。按受试者、设备与信号质量分层分析，记录不确定性。</p>
<p class="deliverable">
<strong>输出</strong> · 指标 + 划分协议 + 失败案例</p>
</div>
</article>
<article id="visualization" class="card">
<div class="card-body">
<div class="card-num">06 · Visualization</div>
<h2>让结果可解释</h2>
<p>联动展示原始与处理波形、事件标记、频谱、时频图和误差分布；保留轴单位与质量提示，支持复核。</p>
<p class="deliverable">
<strong>输出</strong> · 可复核图表 + 研究笔记</p>
</div>
</article>
</div>
</div>
</section>
<section class="section white" id="signals">
<div class="container">
<div class="section-head">
<div>
<div class="eyebrow">SIGNAL ATLAS</div>
<h2>六类信号，共同的方法语言。</h2>
</div>
<p>任务决定处理方式；记录信号来源、噪声条件与验证依据。</p>
</div>
<div class="cards three">
<article id="ecg" class="card">
<div class="card-body">
<div class="card-num">ECG</div>
<h3>心电</h3>
<p>电极采集心脏电活动；关注导联、接触与工频干扰。</p>
<p>基线漂移 → QRS / R 峰 → RR 间期；以事件标注验证漏检与误检。</p>
<a href="{{ '/labs/ecg-filtering.html' | relative_url }}">查看实验规划 →</a>
</div>
</article>
<article id="ppg" class="card">
<div class="card-body">
<div class="card-num">PPG</div>
<h3>光电容积脉搏</h3>
<p>光学传感器记录血容量变化；关注接触压力、环境光与运动影响。</p>
<p>质量评估 → 脉搏峰 → 心率估计；检查运动段误差与有效覆盖率。</p>
<a href="{{ '/labs/ppg-heart-rate.html' | relative_url }}">查看实验规划 →</a>
</div>
</article>
<article id="emg" class="card">
<div class="card-body">
<div class="card-num">EMG</div>
<h3>肌电</h3>
<p>记录肌肉电活动；关注电极位置、串扰和动作同步。</p>
<p>去噪 → 整流 / RMS 包络 → 激活区间；比较包络平滑与时间分辨率。</p>
<a href="{{ '/labs/emg-envelope.html' | relative_url }}">查看实验规划 →</a>
</div>
</article>
<article id="eeg" class="card">
<div class="card-body">
<div class="card-num">EEG</div>
<h3>脑电</h3>
<p>多通道脑电记录；保留参考方式、通道位置与事件标记。</p>
<p>伪迹检查 → 功率谱 / 时频图 → 频带特征；关注眼动、肌电与坏道。</p>
<a href="{{ '/labs/eeg-spectrum.html' | relative_url }}">查看实验规划 →</a>
</div>
</article>
<article id="respiration" class="card">
<div class="card-body">
<div class="card-num">Respiration</div>
<h3>呼吸</h3>
<p>呼吸带或气流传感记录呼吸周期；明确测量来源与单位。</p>
<p>去趋势 → 周期检测 → 呼吸频率与周期变化；标注暂停和低质量片段。</p>
<a href="{{ '/biosignals/#modeling' | relative_url }}">查看处理流程 →</a>
</div>
</article>
<article id="imu" class="card">
<div class="card-body">
<div class="card-num">IMU</div>
<h3>惯性运动</h3>
<p>加速度计与陀螺仪记录运动；校准坐标轴、单位、偏置与时间同步。</p>
<p>重力分量 / 运动特征 → 活动识别；辅助解释 ECG / PPG 的运动伪迹。</p>
<a href="{{ '/biosignals/#preprocessing' | relative_url }}">查看处理流程 →</a>
</div>
</article>
</div>
<div class="quote">当前生理信号实验为规划入口；波形仅用于概念展示。后续实验将明确数据来源、处理参数和适用范围。</div>
<a class="btn" href="{{ '/research/#physiological-computing' | relative_url }}">返回 Physiological Computing 研究路线 →</a>
</div>
</section>
