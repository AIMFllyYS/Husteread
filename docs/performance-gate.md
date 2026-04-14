# HUSTERead 性能门禁

## 目标指标（首轮）
- LCP <= 2.5s
- INP <= 200ms
- TBT <= 200ms
- CLS <= 0.1

## 适用页面
- `/`
- `/activities`
- `/articles`
- `/forum`
- `/gallery`

## 门禁规则
- 每次涉及视觉或交互的改动，必须提供至少一组“优化前后对比”数据。
- 若任一关键页面出现下列情况之一，禁止合并：
  - LCP 回退超过 15%
  - INP 回退超过 20%
  - 产生明显长任务（Long Task > 200ms）且数量显著增加
- 若为高风险视觉特效改动，必须在低性能档位（`perf-tier-2`）下验证滚动与输入流畅性。

## 执行流程
1. 本地构建：`npm run build`
2. 关键交互手动回归：
   - 首页滚动
   - 论坛搜索
   - 文章筛选
   - 图库滚动 + hover
3. Lighthouse（移动端）采样并记录。
4. 将结果追加到 `docs/performance-baseline.md`。

## 编码约束
- 禁止在长列表场景滥用 `layout` 动画。
- 禁止使用 `transition-all` 作为默认过渡方案。
- 优先使用 `transform` 和 `opacity` 动画。
- 大面积 `mix-blend-mode`、`backdrop-filter` 必须有降级方案。
- 复杂背景特效必须支持 `prefers-reduced-motion` 降级。

