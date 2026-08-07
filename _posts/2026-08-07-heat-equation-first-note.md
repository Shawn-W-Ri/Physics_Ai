---
layout: post
title: "从热方程开始：PDE、离散化与稳定性"
date: 2026-08-07
category: PDE
excerpt: "用一维热方程建立从物理建模到有限差分离散的第一条完整链路。"
---

考虑一维热传导方程：

$$
\frac{\partial u}{\partial t}=\alpha\frac{\partial^2u}{\partial x^2}.
$$

这里 $u(x,t)$ 表示温度，$\alpha$ 是热扩散系数。用前向欧拉离散时间、中心差分离散空间，可以得到显式格式：

$$
u_i^{n+1}=u_i^n+r(u_{i+1}^n-2u_i^n+u_{i-1}^n),\quad r=\alpha\frac{\Delta t}{\Delta x^2}.
$$

这一格式最关键的不是“会写出来”，而是理解稳定性约束：在一维情况下通常要求 $r\le 1/2$。

## 今天的理解

- PDE 的数值求解本质上是在控制离散误差与计算成本之间做平衡。
- 稳定性条件不是技巧，而是算法对时间步长与空间网格尺度的结构性要求。
- 后续可以把同一个问题交给 PINN，再比较精度、成本和泛化能力。

[→ 打开 Heat Equation 交互实验]({{ '/labs/heat-equation.html' | relative_url }})
