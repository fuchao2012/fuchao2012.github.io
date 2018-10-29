# 先会用再会造

年轻时考虑的更是搞清楚某件事来龙去脉，以期举一反三。

人到中年，所用之工具尽皆晚辈所创造，用之有耻。

数据可视化这件事已做了多年，是时候学以造之。

## 用例分类

多数使用库表情景皆为简洁图表，所图拿来即用。特殊图表所用稀少，所图精简又满足需求。

> 以热力图跟踪点击，调整简单图表与特殊图表之位置，

### 简单图表

* 线图
* 饼图
* 柱图
* 地图

### 特殊图表

* 3D图
* K线
* 关系图
* 树图

## 技术愿景

* 数据模型与图形双向绑定
* 极简渲染模型，极速初始化（chart-shell）
* 便于定义交互（点击、动态加载）
* 在线编辑分三个区域成右倒品字形，左上为数据源，左下为配置项，右半为预览，有如编辑器一般可折叠就更佳了

## 数据驱动核心

据我现在所知，g2/echarts 均已开源，尽可以用来参考。

g2依赖 antv 中大部分实现，绘制依赖antv/g。

```json
"dependencies": {
    "@antv/component": "~0.1.3",
    "@antv/adjust": "~0.0.7",
    "@antv/attr": "~0.0.7",
    "@antv/coord": "~0.0.3",
    "@antv/g": "~3.3.3",
    "@antv/scale": "~0.0.9",
    "@antv/util": "~1.2.5",
    "venn.js": "~0.2.20",
    "wolfy87-eventemitter": "~5.1.0"
  }
```

### ZRender

echarts 只依赖 zrender, ZRender 是二维绘图引擎，它提供 Canvas、SVG、VML 等多种渲染方式。

```json
 "dependencies": {
    "zrender": "4.0.5"
  }
```

ZRender是一个轻量级的Canvas类库，MVC封装，数据驱动，提供类Dom事件模型，让canvas绘图大不同！

MVC核心封装实现图形仓库、视图渲染和交互控制：

* Storage(M) : shape数据CURD管理
* Painter(V) : canvas 元素生命周期管理，视图渲染，绘画，更新控制
* Handler(C) : 事件交互处理，实现完整dom事件模拟封装
* shape : 图形实体，分而治之的图形策略，可定义扩展
* tool : 绘画扩展相关实用方法，工具及脚手架

![zrender.png](https://i.loli.net/2018/10/23/5bce97b41d806.png)

### billboardjs

刚发现的一个开源项目 [billboard.js](https://github.com/naver/billboard.js)也是手撸代码的小哥。

这小哥就单独使用d3来实现绘制，有些勇气的

```json
 "dependencies": {
    "d3": "^5.7.0"
  },
```
看了介绍发现有个更有意思的库叫 [c3.js](https://github.com/c3js/c3)相比来说，我觉得这个更靠谱一些，有点c,c++, c#一脉相承的感觉

### toucharts

一个好的图表应用成功的关键有三个

1. 绚丽的用例
2. 简明的交互
3. 简单的使用

[tauCharts](https://github.com/TargetProcess/tauCharts/) 被infoWorld评上了奖，感觉能够火一把