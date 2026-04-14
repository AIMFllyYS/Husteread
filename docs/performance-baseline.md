# HUSTERead 性能基线记录

## 采样时间
- 2026-04-14

## 采样环境
- 本地开发机（Windows）
- Node + Next.js 16.2.1
- 命令：`npm run build`

## 采样结论
- 构建可通过，静态路由正常生成：首页、活动、文章、论坛、图库等关键页面均可预渲染。
- 发现历史问题并已修复：
  - `src/lib/utils.ts` 缺少 `formatDate` 导出，导致 dashboard 页面构建失败。
  - `src/lib/supabase.ts` 的 service client 类型声明不匹配，导致 TypeScript 构建报错。

## 卡顿根因（优化前）
- 列表与表格中存在高成本布局动画（`layout`、`AnimatePresence` 与 masonry/table 叠加）。
- 页面中存在多处 `transition-all`，导致不必要的样式计算与重绘。
- 背景与氛围层使用高成本滤镜/混合（SVG turbulence/displacement、`mix-blend-mode`、重噪声）。
- 图库使用原生 `img`，未利用 Next 图片优化链路。

## 本轮优化落地点
- P0（动画与布局）
  - 论坛和文章页移除高成本布局动画。
  - 论坛和文章页搜索增加防抖，降低频繁重排。
  - 活动页将边框宽度/全属性动画替换为 `opacity/transform` 为主的过渡。
- P1（特效降本）
  - `EtheralShadow` 改为轻量实现，支持性能档位与 reduced-motion 降级。
  - 全局噪声纹理改为轻量渐变点阵。
  - `Navbar` 去除高成本毛玻璃依赖，保留视觉层次。
- P2（资源与拆分）
  - 首页和活动页对 `EtheralShadow` 使用动态导入。
  - 图库切换为 `next/image`，并配置远程图片域名。

## 后续基线采样建议
- Lighthouse（移动端）每次采样 3 次取中位数：
  - 首页 `/`
  - 论坛 `/forum`
  - 文章 `/articles`
  - 图库 `/gallery`
- Chrome Performance 录制关键交互：
  - 首页首屏滚动 10 秒
  - 论坛输入搜索 5 次
  - 文章页切换分类 + 搜索
  - 图库连续滚动 + 多次 hover

