<script setup>
import { computed } from 'vue'

/**
 * Charts do Figma (Line/Bar, Pie, Progress, Circle/Gauge, Activity, Radar).
 *
 * data (simples): [{ label, value }] ou [{ label, values: number[] }] (stacked)
 * series (multi): [{ name, values: number[], color? }] + categories?: string[]
 */
const props = defineProps({
  /** bar | line | area | pie | donut | progress | circle | half-circle | activity | radar */
  type: { type: String, required: false, default: 'bar' },
  data: { type: Array, required: false, default: () => [] },
  series: { type: Array, required: false, default: () => [] },
  categories: { type: Array, required: false, default: () => [] },
  height: { type: Number, required: false, default: 240 },
  /** false | top | right | bottom */
  legend: { type: [Boolean, String], required: false, default: false },
  showAxis: { type: Boolean, required: false, default: true },
  xAxisLabel: { type: String, required: false, default: '' },
  yAxisLabel: { type: String, required: false, default: '' },
  showValues: { type: Boolean, required: false, default: false },
  stacked: { type: Boolean, required: false, default: false },
  /** 0–0.75 — raio do furo (pie/donut) */
  hole: { type: Number, required: false, default: 0.5 },
  /** 0–100 — progress / circle / half-circle */
  value: { type: Number, required: false, default: 0 },
  label: { type: String, required: false, default: '' },
  /** Valor central (activity / circle) — se omitido usa value */
  centerValue: { type: [String, Number], required: false, default: undefined },
  /** xxs | xs | sm | md | lg */
  size: { type: String, required: false, default: 'md' },
  /** plain | trailing | bottom | floating-top | floating-bottom */
  progressVariant: { type: String, required: false, default: 'plain' },
  yTicks: { type: Number, required: false, default: 5 },
  curve: { type: Boolean, required: false, default: true },
})

const SERIES_COLORS = [
  'var(--doity-color-brand-500, #FF2B34)',
  'var(--doity-color-brand-300, #FF9DA1)',
  'var(--doity-color-brand-700, #C80D15)',
  'var(--doity-color-brand-400, #FF646B)',
  'var(--doity-color-brand-200, #FFC5C7)',
  'var(--doity-color-brand-600, #ED151E)',
]

const BAR_STACK = [
  'var(--doity-color-brand-700, #C80D15)',
  'var(--doity-color-brand-500, #FF2B34)',
  'var(--doity-color-brand-300, #FF9DA1)',
]

const SIZE_PX = {
  xxs: 64,
  xs: 160,
  sm: 200,
  md: 240,
  lg: 280,
}

const SIZE_STROKE = {
  xxs: 6,
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
}

const SIZE_FONT = {
  xxs: { value: 14, label: 12 },
  xs: { value: 24, label: 12 },
  sm: { value: 30, label: 12 },
  md: { value: 36, label: 14 },
  lg: { value: 48, label: 14 },
}

const isCartesian = computed(() => ['bar', 'line', 'area'].includes(props.type))
const isRadialProgress = computed(() => ['circle', 'half-circle'].includes(props.type))
const isProgress = computed(() => props.type === 'progress')
const isPie = computed(() => props.type === 'pie' || props.type === 'donut')
const isActivity = computed(() => props.type === 'activity')
const isRadar = computed(() => props.type === 'radar')

const normalized = computed(() => {
  if (props.series?.length) {
    const cats = props.categories?.length
      ? props.categories
      : props.series[0].values.map((_, i) => String(i + 1))
    return {
      categories: cats,
      series: props.series.map((s, i) => ({
        name: s.name ?? `Series ${i + 1}`,
        values: s.values ?? [],
        color: s.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
      })),
    }
  }

  const rows = props.data || []
  if (!rows.length) return { categories: [], series: [] }

  const hasValues = rows.some(r => Array.isArray(r.values))
  if (hasValues) {
    const maxLen = Math.max(...rows.map(r => (r.values || [r.value ?? 0]).length))
    const series = Array.from({ length: maxLen }, (_, si) => ({
      name: `Series ${si + 1}`,
      values: rows.map(r => (r.values ? (r.values[si] ?? 0) : si === 0 ? (r.value ?? 0) : 0)),
      color: (props.stacked ? BAR_STACK : SERIES_COLORS)[si % SERIES_COLORS.length],
    }))
    return {
      categories: rows.map(r => r.label ?? ''),
      series,
    }
  }

  return {
    categories: rows.map(r => r.label ?? ''),
    series: [{
      name: 'Series 1',
      values: rows.map(r => r.value ?? 0),
      color: rows[0]?.color ?? SERIES_COLORS[0],
    }],
  }
})

const legendItems = computed(() => {
  if (isPie.value || isActivity.value || isRadar.value) {
    const palette = isActivity.value ? BAR_STACK : SERIES_COLORS
    return (props.data?.length ? props.data : normalized.value.series).map((item, i) => ({
      name: item.label ?? item.name ?? `Series ${i + 1}`,
      color: item.color ?? palette[i % palette.length],
    }))
  }
  return normalized.value.series.map(s => ({ name: s.name, color: s.color }))
})

const showLegend = computed(() => {
  if (props.legend === false || props.legend === 'false') return false
  if (props.legend === true) return 'right'
  return props.legend || false
})

const maxValue = computed(() => {
  const { series } = normalized.value
  if (!series.length) return 1
  if (props.stacked && props.type === 'bar') {
    const len = series[0].values.length
    let max = 1
    for (let i = 0; i < len; i++) {
      const sum = series.reduce((acc, s) => acc + (s.values[i] ?? 0), 0)
      if (sum > max) max = sum
    }
    return max
  }
  return Math.max(1, ...series.flatMap(s => s.values))
})

const yTickValues = computed(() => {
  const max = niceMax(maxValue.value)
  const steps = Math.max(1, props.yTicks)
  return Array.from({ length: steps + 1 }, (_, i) => Math.round((max / steps) * (steps - i)))
})

const plotMax = computed(() => yTickValues.value[0] || maxValue.value)

function niceMax(n) {
  if (n <= 0) return 1
  const exp = 10 ** Math.floor(Math.log10(n))
  const m = Math.ceil(n / exp)
  return m * exp
}

function formatTick(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`.replace('.0k', 'k')
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const progressPct = computed(() => Math.min(100, Math.max(0, props.value)))

const displayCenter = computed(() => {
  if (props.centerValue !== undefined && props.centerValue !== null) return String(props.centerValue)
  if (isActivity.value) return formatTick(Math.round(props.value || maxValue.value))
  return `${Math.round(progressPct.value)}%`
})

const radialSize = computed(() => SIZE_PX[props.size] ?? SIZE_PX.md)
const radialStroke = computed(() => SIZE_STROKE[props.size] ?? SIZE_STROKE.md)
const radialFonts = computed(() => SIZE_FONT[props.size] ?? SIZE_FONT.md)

/* ─── Cartesian helpers ─── */
const plotW = 1000
const plotH = 192

function xAt(i, n) {
  if (n <= 1) return plotW / 2
  return (i / (n - 1)) * plotW
}

function yAt(v) {
  return plotH - (v / plotMax.value) * plotH
}

function linePath(values, { area = false } = {}) {
  const n = values.length
  if (!n) return ''
  const pts = values.map((v, i) => [xAt(i, n), yAt(v)])
  if (!props.curve || n < 3) {
    let d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')
    if (area) d += ` L${pts[n - 1][0]},${plotH} L${pts[0][0]},${plotH} Z`
    return d
  }
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(n - 1, i + 2)]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
  }
  if (area) d += ` L${pts[n - 1][0]},${plotH} L${pts[0][0]},${plotH} Z`
  return d
}

const barLayout = computed(() => {
  const { categories, series } = normalized.value
  const n = categories.length || 1
  const gap = 0.35
  const groupW = plotW / n
  const barW = groupW * (1 - gap)
  const stacked = props.stacked && series.length > 1

  return categories.map((label, i) => {
    if (stacked) {
      let acc = 0
      const segments = series.map((s) => {
        const v = s.values[i] ?? 0
        const h = (v / plotMax.value) * plotH
        const y = plotH - acc - h
        acc += h
        return { y, h, color: s.color, value: v }
      })
      return {
        label,
        x: i * groupW + (groupW - barW) / 2,
        width: barW,
        segments,
      }
    }
    const count = series.length
    const innerGap = 2
    const w = (barW - innerGap * (count - 1)) / count
    const segments = series.map((s, si) => {
      const v = s.values[i] ?? 0
      const h = Math.max(2, (v / plotMax.value) * plotH)
      return {
        x: i * groupW + (groupW - barW) / 2 + si * (w + innerGap),
        y: plotH - h,
        width: w,
        h,
        color: s.color,
        value: v,
      }
    })
    return { label, segments, grouped: true }
  })
})

/* ─── Pie ─── */
const pieHole = computed(() => {
  if (props.type === 'donut') return props.hole > 0 ? props.hole : 0.5
  if (props.type === 'pie') return props.hole > 0 ? props.hole : 0
  return props.hole ?? 0.5
})

const pieSlices = computed(() => {
  const items = props.data?.length
    ? props.data.map((d, i) => ({
        label: d.label ?? `Series ${i + 1}`,
        value: d.value ?? 0,
        color: d.color ?? SERIES_COLORS[i % SERIES_COLORS.length],
      }))
    : normalized.value.series.map((s, i) => ({
        label: s.name,
        value: s.values.reduce((a, b) => a + b, 0),
        color: s.color,
      }))

  const total = items.reduce((a, b) => a + b.value, 0) || 1
  let angle = -Math.PI / 2
  const R = 100
  const r = R * pieHole.value

  return items.map((item) => {
    const slice = (item.value / total) * Math.PI * 2
    const start = angle
    const end = angle + slice
    angle = end
    return {
      ...item,
      path: donutArc(100, 100, R, r, start, end),
      pct: Math.round((item.value / total) * 100),
    }
  })
})

function polar(cx, cy, r, a) {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function donutArc(cx, cy, R, r, start, end) {
  const large = end - start > Math.PI ? 1 : 0
  const [x1, y1] = polar(cx, cy, R, start)
  const [x2, y2] = polar(cx, cy, R, end)
  if (r <= 0) {
    return `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} Z`
  }
  const [x3, y3] = polar(cx, cy, r, end)
  const [x4, y4] = polar(cx, cy, r, start)
  return `M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${r},${r} 0 ${large} 0 ${x4},${y4} Z`
}

/* ─── Circle / half-circle ─── */
const circleGeom = computed(() => {
  const size = radialSize.value
  const stroke = radialStroke.value
  const half = props.type === 'half-circle'
  const r = (size - stroke) / 2 - 2
  const cx = size / 2
  const cy = size / 2
  const C = 2 * Math.PI * r
  const pct = progressPct.value / 100

  if (half) {
    const halfC = Math.PI * r
    return {
      size,
      width: size,
      height: size / 2 + stroke,
      cx,
      cy,
      r,
      stroke,
      trackDash: `${halfC} ${C}`,
      trackOffset: 0,
      progressDash: `${halfC * pct} ${C}`,
      progressOffset: 0,
      rotate: 180,
      viewBox: `0 0 ${size} ${size / 2 + stroke / 2}`,
      half: true,
    }
  }

  return {
    size,
    width: size,
    height: size,
    cx,
    cy,
    r,
    stroke,
    trackDash: `${C}`,
    trackOffset: 0,
    progressDash: `${C * pct} ${C}`,
    progressOffset: 0,
    rotate: -90,
    viewBox: `0 0 ${size} ${size}`,
    half: false,
  }
})

/* ─── Activity (concentric) ─── */
const activityRings = computed(() => {
  const size = radialSize.value
  const stroke = Math.max(8, radialStroke.value - 2)
  const gap = stroke * 0.45
  const cx = size / 2
  const cy = size / 2
  const items = props.data?.length
    ? props.data
    : normalized.value.series.map((s, i) => ({
        label: s.name,
        value: Array.isArray(s.values)
          ? (s.values.reduce((a, b) => a + b, 0) / Math.max(1, s.values.length))
          : 0,
        color: s.color,
      }))

  const maxR = size / 2 - stroke / 2 - 4
  return items.slice(0, 3).map((item, i) => {
    const r = maxR - i * (stroke + gap)
    const C = 2 * Math.PI * r
    const pct = Math.min(1, Math.max(0, (item.value ?? 0) / 100))
    return {
      ...item,
      color: item.color ?? BAR_STACK[i % BAR_STACK.length],
      cx,
      cy,
      r,
      stroke,
      C,
      dash: `${C * pct} ${C}`,
      offset: C * 0.25,
      size,
    }
  })
})

/* ─── Radar ─── */
const radarGeom = computed(() => {
  const size = 320
  const cx = size / 2
  const cy = size / 2
  const levels = 5
  const items = props.data?.length
    ? props.data
    : normalized.value.categories.map((label, i) => ({
        label,
        value: normalized.value.series[0]?.values[i] ?? 0,
      }))
  const n = Math.max(3, items.length)
  const maxR = size / 2 - 36
  const max = Math.max(1, ...items.map(d => d.value ?? 0))

  const angleAt = i => -Math.PI / 2 + (i / n) * Math.PI * 2

  const grids = Array.from({ length: levels }, (_, li) => {
    const r = ((li + 1) / levels) * maxR
    const pts = Array.from({ length: n }, (_, i) => {
      const [x, y] = polar(cx, cy, r, angleAt(i))
      return `${x},${y}`
    }).join(' ')
    return pts
  })

  const rays = Array.from({ length: n }, (_, i) => {
    const [x, y] = polar(cx, cy, maxR, angleAt(i))
    return { x1: cx, y1: cy, x2: x, y2: y }
  })

  const labels = items.map((item, i) => {
    const [x, y] = polar(cx, cy, maxR + 22, angleAt(i))
    return { ...item, x, y }
  })

  const poly = items.map((item, i) => {
    const r = ((item.value ?? 0) / max) * maxR
    const [x, y] = polar(cx, cy, r, angleAt(i))
    return `${x},${y}`
  }).join(' ')

  return { size, grids, rays, labels, poly, cx, cy }
})

const uid = `doity-chart-${Math.random().toString(36).slice(2, 9)}`
</script>

<template>
  <div
    class="doity-chart"
    :class="[
      `doity-chart--${type}`,
      {
        'doity-chart--legend-top': showLegend === 'top',
        'doity-chart--legend-right': showLegend === 'right',
        'doity-chart--legend-bottom': showLegend === 'bottom',
      },
    ]"
  >
    <!-- Legend top -->
    <div
      v-if="showLegend === 'top' && legendItems.length"
      class="doity-chart__legend doity-chart__legend--horizontal"
    >
      <div
        v-for="(item, i) in legendItems"
        :key="i"
        class="doity-chart__legend-item"
      >
        <span class="doity-chart__swatch" :style="{ background: item.color }" />
        <span>{{ item.name }}</span>
      </div>
    </div>

    <div class="doity-chart__body">
      <!-- Cartesian -->
      <div
        v-if="isCartesian"
        class="doity-chart__cartesian"
        :style="{ height: `${height}px` }"
      >
        <div
          v-if="showAxis && yAxisLabel"
          class="doity-chart__y-title"
          aria-hidden="true"
        >
          <span>{{ yAxisLabel }}</span>
        </div>

        <div class="doity-chart__cartesian-main">
          <div class="doity-chart__plot-wrap">
            <div
              v-if="showAxis"
              class="doity-chart__y-axis"
            >
              <div
                v-for="(tick, i) in yTickValues"
                :key="i"
                class="doity-chart__y-row"
              >
                <span class="doity-chart__y-tick">{{ formatTick(tick) }}</span>
                <span class="doity-chart__grid-line" />
              </div>
            </div>

            <div class="doity-chart__plot">
              <svg
                class="doity-chart__svg"
                :viewBox="`0 0 ${plotW} ${plotH}`"
                preserveAspectRatio="none"
                role="img"
              >
                <defs>
                  <linearGradient
                    v-for="(s, si) in normalized.series"
                    :id="`${uid}-fill-${si}`"
                    :key="`g-${si}`"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" :stop-color="s.color" stop-opacity="0.35" />
                    <stop offset="100%" :stop-color="s.color" stop-opacity="0.02" />
                  </linearGradient>
                </defs>

                <template v-if="type === 'bar'">
                  <template
                    v-for="(group, gi) in barLayout"
                    :key="gi"
                  >
                    <template v-if="group.grouped">
                      <rect
                        v-for="(seg, si) in group.segments"
                        :key="si"
                        :x="seg.x"
                        :y="seg.y"
                        :width="seg.width"
                        :height="seg.h"
                        :fill="seg.color"
                        rx="0"
                      />
                    </template>
                    <template v-else>
                      <rect
                        v-for="(seg, si) in group.segments"
                        :key="si"
                        :x="group.x"
                        :y="seg.y"
                        :width="group.width"
                        :height="seg.h"
                        :fill="seg.color"
                      />
                    </template>
                  </template>
                </template>

                <template v-else>
                  <path
                    v-if="type === 'area' || normalized.series.length === 1"
                    :d="linePath(normalized.series[0].values, { area: true })"
                    :fill="`url(#${uid}-fill-0)`"
                    stroke="none"
                  />
                  <path
                    v-for="(s, si) in normalized.series"
                    :key="si"
                    :d="linePath(s.values)"
                    fill="none"
                    :stroke="s.color"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    vector-effect="non-scaling-stroke"
                  />
                </template>
              </svg>
            </div>
          </div>

          <div
            v-if="showAxis"
            class="doity-chart__x-axis"
          >
            <span
              v-for="(cat, i) in normalized.categories"
              :key="i"
              class="doity-chart__x-tick"
            >{{ cat }}</span>
          </div>
          <div
            v-if="showAxis && xAxisLabel"
            class="doity-chart__x-title"
          >
            {{ xAxisLabel }}
          </div>
        </div>
      </div>

      <!-- Pie / Donut -->
      <div
        v-else-if="isPie"
        class="doity-chart__pie"
        :style="{ width: `${radialSize}px`, height: `${radialSize}px` }"
      >
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          role="img"
        >
          <path
            v-for="(slice, i) in pieSlices"
            :key="i"
            :d="slice.path"
            :fill="slice.color"
          />
        </svg>
      </div>

      <!-- Progress linear -->
      <div
        v-else-if="isProgress"
        class="doity-chart__progress"
        :class="`doity-chart__progress--${progressVariant}`"
      >
        <div class="doity-chart__progress-row">
          <div class="doity-chart__progress-track">
            <div
              class="doity-chart__progress-fill"
              :style="{ width: `${progressPct}%` }"
            />
            <span
              v-if="progressVariant.startsWith('floating') || progressPct === 0"
              class="doity-chart__progress-dot"
              :style="{ left: `${progressPct}%` }"
            />
            <span
              v-if="progressVariant === 'floating-top'"
              class="doity-chart__progress-tip doity-chart__progress-tip--top"
              :style="{ left: `${progressPct}%` }"
            >{{ Math.round(progressPct) }}%</span>
            <span
              v-if="progressVariant === 'floating-bottom'"
              class="doity-chart__progress-tip doity-chart__progress-tip--bottom"
              :style="{ left: `${progressPct}%` }"
            >{{ Math.round(progressPct) }}%</span>
          </div>
          <span
            v-if="progressVariant === 'trailing'"
            class="doity-chart__progress-label"
          >{{ Math.round(progressPct) }}%</span>
        </div>
        <span
          v-if="progressVariant === 'bottom'"
          class="doity-chart__progress-label doity-chart__progress-label--bottom"
        >{{ Math.round(progressPct) }}%</span>
      </div>

      <!-- Circle / half-circle -->
      <div
        v-else-if="isRadialProgress"
        class="doity-chart__radial"
        :style="{ width: `${circleGeom.width}px` }"
      >
        <svg
          :viewBox="circleGeom.viewBox"
          :width="circleGeom.width"
          :height="circleGeom.half ? circleGeom.size / 2 + radialStroke : circleGeom.size"
          role="img"
        >
          <g :transform="`rotate(${circleGeom.rotate} ${circleGeom.cx} ${circleGeom.cy})`">
            <circle
              :cx="circleGeom.cx"
              :cy="circleGeom.cy"
              :r="circleGeom.r"
              fill="none"
              stroke="var(--doity-color-background-tertiary, #f5f5f5)"
              :stroke-width="circleGeom.stroke"
              stroke-linecap="round"
              :stroke-dasharray="circleGeom.trackDash"
              :stroke-dashoffset="circleGeom.trackOffset"
            />
            <circle
              :cx="circleGeom.cx"
              :cy="circleGeom.cy"
              :r="circleGeom.r"
              fill="none"
              stroke="var(--doity-color-brand-500, #ff2b34)"
              :stroke-width="circleGeom.stroke"
              stroke-linecap="round"
              :stroke-dasharray="circleGeom.progressDash"
              :stroke-dashoffset="circleGeom.progressOffset"
            />
          </g>
        </svg>
        <div
          class="doity-chart__radial-center"
          :class="{ 'doity-chart__radial-center--half': circleGeom.half }"
        >
          <span
            v-if="label && size !== 'xxs'"
            class="doity-chart__radial-label"
            :style="{ fontSize: `${radialFonts.label}px` }"
          >{{ label }}</span>
          <span
            class="doity-chart__radial-value"
            :style="{ fontSize: `${radialFonts.value}px` }"
          >{{ displayCenter }}</span>
        </div>
        <span
          v-if="label && size === 'xxs'"
          class="doity-chart__radial-caption"
        >{{ label }}</span>
      </div>

      <!-- Activity gauge -->
      <div
        v-else-if="isActivity"
        class="doity-chart__activity"
        :style="{ width: `${radialSize}px`, height: `${radialSize}px` }"
      >
        <svg
          :viewBox="`0 0 ${radialSize} ${radialSize}`"
          width="100%"
          height="100%"
          role="img"
        >
          <template
            v-for="(ring, i) in activityRings"
            :key="i"
          >
            <circle
              :cx="ring.cx"
              :cy="ring.cy"
              :r="ring.r"
              fill="none"
              stroke="var(--doity-color-background-tertiary, #f5f5f5)"
              :stroke-width="ring.stroke"
            />
            <circle
              :cx="ring.cx"
              :cy="ring.cy"
              :r="ring.r"
              fill="none"
              :stroke="ring.color"
              :stroke-width="ring.stroke"
              stroke-linecap="round"
              :stroke-dasharray="ring.dash"
              :stroke-dashoffset="ring.offset"
              :transform="`rotate(-90 ${ring.cx} ${ring.cy})`"
            />
          </template>
        </svg>
        <div class="doity-chart__radial-center">
          <span
            v-if="label"
            class="doity-chart__radial-label"
            :style="{ fontSize: `${radialFonts.label}px` }"
          >{{ label }}</span>
          <span
            class="doity-chart__radial-value"
            :style="{ fontSize: `${Math.max(20, radialFonts.value - 6)}px` }"
          >{{ displayCenter }}</span>
        </div>
      </div>

      <!-- Radar -->
      <div
        v-else-if="isRadar"
        class="doity-chart__radar"
      >
        <svg
          :viewBox="`0 0 ${radarGeom.size} ${radarGeom.size}`"
          width="100%"
          height="100%"
          role="img"
        >
          <polygon
            v-for="(g, i) in radarGeom.grids"
            :key="i"
            :points="g"
            fill="none"
            stroke="var(--doity-color-border-default, #e5e5e5)"
            stroke-width="1"
          />
          <line
            v-for="(ray, i) in radarGeom.rays"
            :key="`r-${i}`"
            :x1="ray.x1"
            :y1="ray.y1"
            :x2="ray.x2"
            :y2="ray.y2"
            stroke="var(--doity-color-border-default, #e5e5e5)"
            stroke-width="1"
          />
          <polygon
            :points="radarGeom.poly"
            fill="var(--doity-color-brand-500, #ff2b34)"
            fill-opacity="0.15"
            stroke="var(--doity-color-brand-500, #ff2b34)"
            stroke-width="2"
          />
          <text
            v-for="(lb, i) in radarGeom.labels"
            :key="`l-${i}`"
            :x="lb.x"
            :y="lb.y"
            text-anchor="middle"
            dominant-baseline="middle"
            class="doity-chart__radar-label"
          >{{ lb.label }}</text>
        </svg>
      </div>
    </div>

    <!-- Legend right / bottom -->
    <div
      v-if="(showLegend === 'right' || showLegend === 'bottom') && legendItems.length"
      class="doity-chart__legend"
      :class="showLegend === 'right' ? 'doity-chart__legend--vertical' : 'doity-chart__legend--horizontal'"
    >
      <div
        v-for="(item, i) in legendItems"
        :key="i"
        class="doity-chart__legend-item"
      >
        <span class="doity-chart__swatch" :style="{ background: item.color }" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-chart {
  box-sizing: border-box;
  color: var(--doity-color-text-primary, #181d27);
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: 16px;
  width: 100%;
}

.doity-chart--legend-right {
  align-items: flex-start;
  flex-direction: row;
  gap: 16px;
}

.doity-chart__body {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
}

.doity-chart--legend-right .doity-chart__body {
  flex: 0 0 auto;
  width: auto;
}

/* Legend */
.doity-chart__legend {
  display: flex;
  gap: 13px;
}

.doity-chart__legend--vertical {
  flex-direction: column;
  gap: 4px;
}

.doity-chart__legend--horizontal {
  flex-wrap: wrap;
  justify-content: flex-start;
}

.doity-chart--legend-top .doity-chart__legend--horizontal {
  justify-content: flex-end;
}

.doity-chart__legend-item {
  align-items: center;
  color: var(--doity-color-chart-axis-label, #535862);
  display: inline-flex;
  font-size: 14px;
  font-weight: 400;
  gap: 8px;
  line-height: 20px;
  white-space: nowrap;
}

.doity-chart__swatch {
  background: var(--doity-color-brand-500, #ff2b34);
  border-radius: 9999px;
  display: inline-block;
  flex-shrink: 0;
  height: 8px;
  width: 8px;
}

/* Cartesian */
.doity-chart__cartesian {
  display: flex;
  gap: 4px;
  min-height: 160px;
  width: 100%;
}

.doity-chart__y-title {
  align-items: center;
  color: var(--doity-color-chart-axis-label, #535862);
  display: flex;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 500;
  justify-content: center;
  line-height: 18px;
  width: 18px;
}

.doity-chart__y-title span {
  transform: rotate(-90deg);
  white-space: nowrap;
}

.doity-chart__cartesian-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.doity-chart__plot-wrap {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  position: relative;
}

.doity-chart__y-axis {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}

.doity-chart__y-row {
  align-items: center;
  display: flex;
  gap: 8px;
  width: 100%;
}

.doity-chart__y-tick {
  color: var(--doity-color-chart-axis-label, #535862);
  flex-shrink: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  width: 36px;
}

.doity-chart__grid-line {
  background: var(--doity-color-border-default, #f5f5f5);
  flex: 1;
  height: 1px;
}

.doity-chart__plot {
  flex: 1;
  margin-left: 44px;
  min-height: 120px;
  position: relative;
  z-index: 1;
}

.doity-chart__svg {
  display: block;
  height: 100%;
  overflow: visible;
  width: 100%;
}

.doity-chart__x-axis {
  color: var(--doity-color-chart-axis-label, #535862);
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  line-height: 18px;
  margin-left: 44px;
  padding: 8px 8px 0;
}

.doity-chart__x-tick {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doity-chart__x-title {
  color: var(--doity-color-chart-axis-label, #535862);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-left: 44px;
  padding-top: 8px;
  text-align: center;
}

/* Pie */
.doity-chart__pie {
  flex-shrink: 0;
}

/* Progress */
.doity-chart__progress {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 28px;
  width: 100%;
}

.doity-chart__progress--plain,
.doity-chart__progress--trailing,
.doity-chart__progress--bottom {
  padding-top: 0;
}

.doity-chart__progress--floating-bottom {
  padding-bottom: 28px;
  padding-top: 0;
}

.doity-chart__progress-row {
  align-items: center;
  display: flex;
  gap: 12px;
  width: 100%;
}

.doity-chart__progress-track {
  background: var(--doity-color-background-tertiary, #f5f5f5);
  border-radius: 9999px;
  flex: 1;
  height: 8px;
  position: relative;
}

.doity-chart__progress--plain .doity-chart__progress-track {
  height: 10px;
}

.doity-chart__progress-fill {
  background: var(--doity-color-brand-500, #ff2b34);
  border-radius: inherit;
  height: 100%;
  max-width: 100%;
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-chart__progress-dot {
  background: var(--doity-color-brand-500, #ff2b34);
  border-radius: 50%;
  height: 10px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
}

.doity-chart__progress-tip {
  background: #fff;
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 8%);
  color: var(--doity-color-text-primary, #181d27);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  padding: 2px 8px;
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
}

.doity-chart__progress-tip--top {
  bottom: calc(100% + 10px);
}

.doity-chart__progress-tip--bottom {
  top: calc(100% + 10px);
}

.doity-chart__progress-label {
  color: var(--doity-color-chart-axis-label, #535862);
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.doity-chart__progress-label--bottom {
  align-self: flex-end;
  font-size: 12px;
}

/* Radial */
.doity-chart__radial,
.doity-chart__activity {
  display: grid;
  place-items: center;
  position: relative;
}

.doity-chart__radial-center {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  left: 50%;
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
}

.doity-chart__radial-center--half {
  top: 72%;
}

.doity-chart__radial-label {
  color: var(--doity-color-chart-axis-label, #535862);
  font-weight: 500;
  line-height: 1.2;
}

.doity-chart__radial-value {
  color: var(--doity-color-text-primary, #181d27);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.doity-chart__radial-caption {
  color: var(--doity-color-chart-axis-label, #535862);
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  text-align: center;
}

/* Radar */
.doity-chart__radar {
  aspect-ratio: 1;
  max-width: 360px;
  width: 100%;
}

.doity-chart__radar-label {
  fill: var(--doity-color-chart-axis-label, #535862);
  font-family: var(--doity-font-family-sans);
  font-size: 12px;
  font-weight: 500;
}

@media (prefers-reduced-motion: reduce) {
  .doity-chart__progress-fill {
    transition: none;
  }
}
</style>
