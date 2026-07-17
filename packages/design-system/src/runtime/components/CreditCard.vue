<script setup>
import { computed, onMounted, ref } from 'vue'

const gradientMesh = new URL('../assets/credit-card/gradient-mesh.svg', import.meta.url).href

const props = defineProps({
  /**
   * Tema visual do cartão (Figma Credit Card Mockup)
   * transparent | transparent-gradient | primary-dark | primary-light |
   * gray-light | gray-dark | primary-light-gradient | gray-light-gradient |
   * transparent-strip | gray-strip | gradient-strip | salmon-strip |
   * gray-strip-vertical | gradient-strip-vertical | salmon-strip-vertical |
   * transparent-gradient-strip | transparent-gradient-strip-vertical
   */
  theme: { type: String, required: false, default: 'transparent' },
  brand: { type: String, required: false, default: 'Doity' },
  holder: { type: String, required: false, default: 'OLIVIA SILVA' },
  number: { type: String, required: false, default: '1234 1234 1234 1234' },
  expiry: { type: String, required: false, default: '06/24' },
  /** Ativa tilt + shine no hover (default true) */
  interactive: { type: Boolean, required: false, default: true },
})

const rootRef = ref(null)
const tiltStyle = ref({})
const shineStyle = ref({ opacity: '0' })
const reducedMotion = ref(false)

const themeKey = computed(() => props.theme || 'transparent')

const hasStrip = computed(() => themeKey.value.includes('strip'))
const stripVertical = computed(() => themeKey.value.includes('vertical'))
const hasMesh = computed(() =>
  [
    'transparent-gradient',
    'transparent-gradient-strip',
    'transparent-gradient-strip-vertical',
    'primary-light-gradient',
    'gray-light-gradient',
  ].includes(themeKey.value),
)

const isLightText = computed(() => {
  const lightBg = [
    'primary-light',
    'primary-light-gradient',
    'gray-light',
    'gray-light-gradient',
    'gray-strip',
    'salmon-strip',
  ]
  return !lightBg.includes(themeKey.value)
})

const glass = computed(() =>
  [
    'transparent',
    'transparent-strip',
    'transparent-gradient',
    'transparent-gradient-strip',
    'transparent-gradient-strip-vertical',
    'gray-strip',
    'gray-strip-vertical',
    'salmon-strip',
    'salmon-strip-vertical',
  ].includes(themeKey.value),
)

const rootClasses = computed(() => [
  'doity-credit-card',
  `doity-credit-card--${themeKey.value}`,
  {
    'doity-credit-card--strip': hasStrip.value,
    'doity-credit-card--strip-v': stripVertical.value,
    'doity-credit-card--light-text': isLightText.value,
    'doity-credit-card--dark-text': !isLightText.value,
    'doity-credit-card--glass': glass.value,
    'doity-credit-card--interactive': props.interactive && !reducedMotion.value,
  },
])

function onPointerMove(event) {
  if (!props.interactive || reducedMotion.value || !rootRef.value) return
  const rect = rootRef.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  const rotateY = (x - 0.5) * 8
  const rotateX = (0.5 - y) * 6

  tiltStyle.value = {
    transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
  }
  shineStyle.value = {
    opacity: '1',
    background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(255 255 255 / 0.38) 0%, rgb(255 255 255 / 0) 55%)`,
  }
}

function onPointerLeave() {
  tiltStyle.value = {
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
  }
  shineStyle.value = { opacity: '0' }
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<template>
  <div
    ref="rootRef"
    :class="rootClasses"
    :style="tiltStyle"
    role="img"
    :aria-label="`Cartão ${brand} de ${holder}`"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div
      class="doity-credit-card__surface"
      aria-hidden="true"
    />

    <div
      v-if="hasStrip"
      class="doity-credit-card__strip"
      aria-hidden="true"
    />

    <img
      v-if="hasMesh"
      class="doity-credit-card__mesh"
      :src="gradientMesh"
      alt=""
      aria-hidden="true"
    >

    <span
      class="doity-credit-card__shine"
      :style="shineStyle"
      aria-hidden="true"
    />

    <div class="doity-credit-card__top">
      <span class="doity-credit-card__brand">{{ brand }}</span>
      <span
        class="doity-credit-card__paypass"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 20 24"
          width="20"
          height="24"
          fill="none"
        >
          <path
            d="M15.143 1.286a20.2 20.2 0 0 1 2.871 10.714 20.2 20.2 0 0 1-2.871 10.714M10.429 3.643a16.4 16.4 0 0 1 2.239 8.357 16.4 16.4 0 0 1-2.239 8.357M5.929 5.807a11.7 11.7 0 0 1 1.619 6.107 11.7 11.7 0 0 1-1.619 6.107M1.429 8.143A7.3 7.3 0 0 1 2.598 12a7.3 7.3 0 0 1-1.17 3.857"
            stroke="currentColor"
            stroke-width="2.57"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </div>

    <div class="doity-credit-card__bottom">
      <div class="doity-credit-card__meta">
        <span class="doity-credit-card__holder">{{ holder }}</span>
        <span class="doity-credit-card__expiry">{{ expiry }}</span>
      </div>
      <div class="doity-credit-card__row">
        <span class="doity-credit-card__number">{{ number }}</span>
        <span
          class="doity-credit-card__network"
          aria-label="Mastercard"
        >
          <svg
            viewBox="0 0 30 18"
            width="30"
            height="18"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="9"
              r="7.2"
              fill="#EB001B"
            />
            <circle
              cx="19"
              cy="9"
              r="7.2"
              fill="#F79E1B"
            />
            <path
              d="M15 3.35a7.2 7.2 0 0 1 0 11.3 7.2 7.2 0 0 1 0-11.3Z"
              fill="#FF5F00"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-credit-card {
  --doity-cc-fg: #fff;
  --doity-cc-strip: #414651;
  border: 1px solid rgb(255 255 255 / 55%);
  border-radius: 16px;
  box-shadow: 8px 10px 16px rgb(0 0 0 / 5%);
  box-sizing: border-box;
  color: var(--doity-cc-fg);
  font-family: var(--doity-font-family-sans);
  height: 190px;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  width: 316px;
}

.doity-credit-card--interactive {
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
  will-change: transform;
}

.doity-credit-card--interactive:hover {
  box-shadow: 10px 16px 28px rgb(0 0 0 / 10%);
}

.doity-credit-card__shine {
  inset: 0;
  mix-blend-mode: soft-light;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: opacity 0.35s ease;
  z-index: 3;
}

.doity-credit-card__surface {
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 0;
}

/* —— Theme surfaces (CSS gradients / solids; no broken cover images) —— */
.doity-credit-card--transparent .doity-credit-card__surface,
.doity-credit-card--transparent-strip .doity-credit-card__surface,
.doity-credit-card--transparent-gradient .doity-credit-card__surface,
.doity-credit-card--transparent-gradient-strip .doity-credit-card__surface,
.doity-credit-card--transparent-gradient-strip-vertical .doity-credit-card__surface {
  background:
    linear-gradient(135deg, rgb(255 255 255 / 72%) 0%, rgb(245 245 245 / 45%) 48%, rgb(228 228 231 / 55%) 100%),
    linear-gradient(160deg, #d4d4d8 0%, #a1a1aa 100%);
}

.doity-credit-card--primary-dark .doity-credit-card__surface {
  background: linear-gradient(135deg, #7a1020 0%, #c41e3a 42%, #ff2b34 78%, #ff6b73 100%);
}

.doity-credit-card--gray-dark .doity-credit-card__surface {
  background: linear-gradient(145deg, #525252 0%, #262626 48%, #0a0a0a 100%);
}

.doity-credit-card--primary-light .doity-credit-card__surface,
.doity-credit-card--primary-light-gradient .doity-credit-card__surface {
  background: linear-gradient(145deg, #faf5ff 0%, #f4ebff 55%, #e9d5ff 100%);
}

.doity-credit-card--gray-light .doity-credit-card__surface,
.doity-credit-card--gray-light-gradient .doity-credit-card__surface {
  background: linear-gradient(145deg, #fafafa 0%, #f5f5f5 50%, #e5e5e5 100%);
}

.doity-credit-card--salmon-strip .doity-credit-card__surface,
.doity-credit-card--salmon-strip-vertical .doity-credit-card__surface {
  background: linear-gradient(145deg, #fbeee8 0%, #f4d9d0 100%);
}

.doity-credit-card--gray-strip .doity-credit-card__surface,
.doity-credit-card--gray-strip-vertical .doity-credit-card__surface {
  background: linear-gradient(145deg, #fafafa 0%, #f0f0f0 100%);
}

.doity-credit-card--gradient-strip .doity-credit-card__surface,
.doity-credit-card--gradient-strip-vertical .doity-credit-card__surface {
  background: linear-gradient(125deg, #6366f1 0%, #a855f7 35%, #ec4899 68%, #f97316 100%);
}

.doity-credit-card--dark-text {
  --doity-cc-fg: var(--doity-color-text-secondary, #737373);
}

.doity-credit-card--light-text {
  --doity-cc-fg: var(--doity-color-text-inverse, #fff);
}

.doity-credit-card--glass {
  backdrop-filter: blur(8px);
}

.doity-credit-card__strip {
  background: var(--doity-cc-strip);
  position: absolute;
  z-index: 1;
}

.doity-credit-card--strip:not(.doity-credit-card--strip-v) .doity-credit-card__strip {
  bottom: -1px;
  left: -1px;
  right: -1px;
  top: 94px;
}

.doity-credit-card--strip-v .doity-credit-card__strip {
  bottom: -1px;
  left: -1px;
  right: 87px;
  top: -1px;
}

.doity-credit-card--gradient-strip .doity-credit-card__strip,
.doity-credit-card--gradient-strip-vertical .doity-credit-card__strip {
  background: linear-gradient(90deg, #312e81 0%, #581c87 50%, #9f1239 100%);
  opacity: 0.55;
}

.doity-credit-card__mesh {
  height: 160px;
  left: -17px;
  pointer-events: none;
  position: absolute;
  top: -17px;
  width: 160px;
  z-index: 1;
}

.doity-credit-card--transparent-gradient-strip-vertical .doity-credit-card__mesh {
  left: auto;
  right: -17px;
}

.doity-credit-card__top,
.doity-credit-card__bottom {
  position: relative;
  z-index: 2;
}

.doity-credit-card__top {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  padding: 19px 19px 0;
}

.doity-credit-card__brand {
  font-size: 16px;
  font-weight: var(--doity-font-weight-semibold, 600);
  line-height: normal;
}

.doity-credit-card__paypass {
  color: currentColor;
  display: inline-flex;
  height: 24px;
  width: 20px;
}

.doity-credit-card__bottom {
  bottom: 17px;
  left: 15px;
  position: absolute;
  right: 17px;
}

.doity-credit-card__meta {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  max-width: 193px;
}

.doity-credit-card__holder,
.doity-credit-card__expiry {
  font-size: 12px;
  font-weight: var(--doity-font-weight-semibold, 600);
  letter-spacing: 0.6px;
  line-height: normal;
  text-transform: uppercase;
}

.doity-credit-card__row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.doity-credit-card__number {
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.64px;
  line-height: normal;
}

.doity-credit-card__network {
  align-items: center;
  background: #fff;
  border-radius: 4px;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  width: 45px;
}

.doity-credit-card__network svg {
  display: block;
}

/* Strip layouts: brand/paypass dark only on light top zones */
.doity-credit-card--strip:not(.doity-credit-card--strip-v):not(.doity-credit-card--gradient-strip)
  .doity-credit-card__brand,
.doity-credit-card--strip:not(.doity-credit-card--strip-v):not(.doity-credit-card--gradient-strip)
  .doity-credit-card__paypass {
  color: var(--doity-color-text-secondary, #737373);
}

.doity-credit-card--strip .doity-credit-card__holder,
.doity-credit-card--strip .doity-credit-card__expiry,
.doity-credit-card--strip .doity-credit-card__number {
  color: #fff;
}

.doity-credit-card--strip-v .doity-credit-card__brand {
  color: #fff;
}

.doity-credit-card--strip-v:not(.doity-credit-card--gradient-strip-vertical)
  .doity-credit-card__paypass {
  color: var(--doity-color-text-secondary, #737373);
}

/* Gradientes escuros: brand + aproximação sempre brancos */
.doity-credit-card.doity-credit-card--gradient-strip .doity-credit-card__brand,
.doity-credit-card.doity-credit-card--gradient-strip .doity-credit-card__paypass,
.doity-credit-card.doity-credit-card--gradient-strip-vertical .doity-credit-card__brand,
.doity-credit-card.doity-credit-card--gradient-strip-vertical .doity-credit-card__paypass {
  color: #fff;
}

/* Transparent / glass on light canvas: ensure readable text */
.doity-credit-card--transparent,
.doity-credit-card--transparent-gradient,
.doity-credit-card--transparent-strip,
.doity-credit-card--transparent-gradient-strip,
.doity-credit-card--transparent-gradient-strip-vertical {
  --doity-cc-fg: #525252;
  border-color: rgb(255 255 255 / 70%);
}

.doity-credit-card--transparent-strip .doity-credit-card__holder,
.doity-credit-card--transparent-strip .doity-credit-card__expiry,
.doity-credit-card--transparent-strip .doity-credit-card__number,
.doity-credit-card--transparent-gradient-strip .doity-credit-card__holder,
.doity-credit-card--transparent-gradient-strip .doity-credit-card__expiry,
.doity-credit-card--transparent-gradient-strip .doity-credit-card__number,
.doity-credit-card--transparent-gradient-strip-vertical .doity-credit-card__holder,
.doity-credit-card--transparent-gradient-strip-vertical .doity-credit-card__expiry,
.doity-credit-card--transparent-gradient-strip-vertical .doity-credit-card__number {
  color: #fff;
}

@media (prefers-reduced-motion: reduce) {
  .doity-credit-card--interactive {
    transition: none;
  }

  .doity-credit-card__shine {
    display: none;
  }
}
</style>
