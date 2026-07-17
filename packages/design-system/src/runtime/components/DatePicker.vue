<script setup>
import { computed, ref, watch } from 'vue'
import Button from './Button.vue'
import Input from './Input.vue'

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]
const MONTHS_SHORT = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
]

const props = defineProps({
  /** single: ISO date string | null — range: { start, end } */
  modelValue: { type: [String, Object, null], required: false, default: null },
  /** single | range (Figma = range) */
  mode: { type: String, required: false, default: 'range' },
  cancelLabel: { type: String, required: false, default: 'Cancelar' },
  confirmLabel: { type: String, required: false, default: 'Aplicar' },
  /** Esconde inputs de início/fim */
  hideInputs: { type: Boolean, required: false, default: false },
  /** Esconde footer com ações */
  hideActions: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['update:modelValue', 'change', 'confirm', 'cancel'])

function parseISO(value) {
  if (!value || typeof value !== 'string') return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  if (Number.isNaN(d.getTime())) return null
  return d
}

function toISO(date) {
  if (!date) return null
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function sameDay(a, b) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

function formatDisplay(date) {
  if (!date) return ''
  return `${date.getDate()} de ${MONTHS_SHORT[date.getMonth()]} de ${date.getFullYear()}`
}

function parseDisplay(text) {
  if (!text) return null
  const m = /^(\d{1,2})\s+de\s+([a-zç]+)\s+de\s+(\d{4})$/i.exec(text.trim())
  if (!m) return parseISO(text)
  const monthIdx = MONTHS_SHORT.findIndex(s => s === m[2].toLowerCase())
  if (monthIdx < 0) return null
  const d = new Date(Number(m[3]), monthIdx, Number(m[1]))
  return Number.isNaN(d.getTime()) ? null : d
}

const isRange = computed(() => props.mode !== 'single')

const draftStart = ref(null)
const draftEnd = ref(null)
const draftSingle = ref(null)
const viewDate = ref(startOfDay(new Date()))
const monthDir = ref(0)
const selecting = ref('start')
const startInput = ref('')
const endInput = ref('')
const singleInput = ref('')

function syncFromModel() {
  if (isRange.value) {
    const start = parseISO(props.modelValue?.start ?? null)
    const end = parseISO(props.modelValue?.end ?? null)
    draftStart.value = start
    draftEnd.value = end
    startInput.value = formatDisplay(start)
    endInput.value = formatDisplay(end)
    selecting.value = start && !end ? 'end' : 'start'
    if (start) viewDate.value = startOfDay(start)
  }
  else {
    const single = parseISO(typeof props.modelValue === 'string' ? props.modelValue : null)
    draftSingle.value = single
    singleInput.value = formatDisplay(single)
    if (single) viewDate.value = startOfDay(single)
  }
}

syncFromModel()

watch(() => props.modelValue, syncFromModel, { deep: true })
watch(() => props.mode, syncFromModel)

const monthLabel = computed(
  () => `${MONTHS[viewDate.value.getMonth()]} de ${viewDate.value.getFullYear()}`,
)

const today = computed(() => startOfDay(new Date()))

const calendarDays = computed(() => {
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()
  const first = new Date(year, month, 1)
  // Monday-first: Sun=0 → 6, Mon=1 → 0
  const startPad = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevDays = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = 0; i < 42; i++) {
    let day
    let inMonth = true
    if (i < startPad) {
      day = prevDays - startPad + i + 1
      inMonth = false
      cells.push({
        key: `p-${day}`,
        date: new Date(year, month - 1, day),
        label: day,
        inMonth,
      })
    }
    else if (i >= startPad + daysInMonth) {
      day = i - startPad - daysInMonth + 1
      inMonth = false
      cells.push({
        key: `n-${day}`,
        date: new Date(year, month + 1, day),
        label: day,
        inMonth,
      })
    }
    else {
      day = i - startPad + 1
      cells.push({
        key: `c-${day}`,
        date: new Date(year, month, day),
        label: day,
        inMonth: true,
      })
    }
  }
  return cells
})

function dayState(date) {
  const d = startOfDay(date)
  const isToday = sameDay(d, today.value)

  if (!isRange.value) {
    const selected = sameDay(d, draftSingle.value)
    return { isToday, selected, rangeStart: false, rangeEnd: false, inRange: false }
  }

  const start = draftStart.value ? startOfDay(draftStart.value) : null
  const end = draftEnd.value ? startOfDay(draftEnd.value) : null
  const rangeStart = sameDay(d, start)
  const rangeEnd = sameDay(d, end)
  const inRange = !!(start && end && d > start && d < end)
  const selected = rangeStart || rangeEnd

  return { isToday, selected, rangeStart, rangeEnd, inRange }
}

function emitDraft() {
  if (isRange.value) {
    const payload = {
      start: toISO(draftStart.value),
      end: toISO(draftEnd.value),
    }
    emit('update:modelValue', payload)
    emit('change', payload)
  }
  else {
    const payload = toISO(draftSingle.value)
    emit('update:modelValue', payload)
    emit('change', payload)
  }
}

function selectDay(cell) {
  const d = startOfDay(cell.date)

  if (!isRange.value) {
    draftSingle.value = d
    singleInput.value = formatDisplay(d)
    emitDraft()
    return
  }

  if (selecting.value === 'start' || !draftStart.value || (draftStart.value && draftEnd.value)) {
    draftStart.value = d
    draftEnd.value = null
    startInput.value = formatDisplay(d)
    endInput.value = ''
    selecting.value = 'end'
    emitDraft()
    return
  }

  if (d < startOfDay(draftStart.value)) {
    draftEnd.value = draftStart.value
    draftStart.value = d
    startInput.value = formatDisplay(draftStart.value)
    endInput.value = formatDisplay(draftEnd.value)
  }
  else {
    draftEnd.value = d
    endInput.value = formatDisplay(d)
  }
  selecting.value = 'start'
  emitDraft()
}

function shiftMonth(delta) {
  monthDir.value = delta
  const next = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + delta, 1)
  viewDate.value = next
  window.setTimeout(() => {
    monthDir.value = 0
  }, 320)
}

function onStartBlur() {
  const parsed = parseDisplay(startInput.value)
  if (parsed) {
    draftStart.value = startOfDay(parsed)
    startInput.value = formatDisplay(parsed)
    viewDate.value = startOfDay(parsed)
    if (draftEnd.value && draftEnd.value < draftStart.value) {
      draftEnd.value = null
      endInput.value = ''
    }
    emitDraft()
  }
  else {
    startInput.value = formatDisplay(draftStart.value)
  }
}

function onEndBlur() {
  const parsed = parseDisplay(endInput.value)
  if (parsed) {
    draftEnd.value = startOfDay(parsed)
    endInput.value = formatDisplay(parsed)
    if (draftStart.value && draftEnd.value < draftStart.value) {
      const tmp = draftStart.value
      draftStart.value = draftEnd.value
      draftEnd.value = tmp
      startInput.value = formatDisplay(draftStart.value)
      endInput.value = formatDisplay(draftEnd.value)
    }
    emitDraft()
  }
  else {
    endInput.value = formatDisplay(draftEnd.value)
  }
}

function onSingleBlur() {
  const parsed = parseDisplay(singleInput.value)
  if (parsed) {
    draftSingle.value = startOfDay(parsed)
    singleInput.value = formatDisplay(parsed)
    viewDate.value = startOfDay(parsed)
    emitDraft()
  }
  else {
    singleInput.value = formatDisplay(draftSingle.value)
  }
}

function onInputsFocusOut(event) {
  const root = event.currentTarget
  if (root.contains(event.relatedTarget)) return
  if (isRange.value) {
    onStartBlur()
    onEndBlur()
  }
  else {
    onSingleBlur()
  }
}

function onConfirm() {
  emitDraft()
  emit('confirm', isRange.value
    ? { start: toISO(draftStart.value), end: toISO(draftEnd.value) }
    : toISO(draftSingle.value))
}

function onCancel() {
  syncFromModel()
  emit('cancel')
}
</script>

<template>
  <div
    class="doity-date-picker"
    role="dialog"
    :aria-label="isRange ? 'Selecionar intervalo de datas' : 'Selecionar data'"
  >
    <div class="doity-date-picker__body">
      <div class="doity-date-picker__calendar">
        <div class="doity-date-picker__month">
          <button
            type="button"
            class="doity-date-picker__nav"
            aria-label="Mês anterior"
            @click="shiftMonth(-1)"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <p
            class="doity-date-picker__month-label"
            :class="{
              'doity-date-picker__month-label--from-left': monthDir === 1,
              'doity-date-picker__month-label--from-right': monthDir === -1,
            }"
          >
            {{ monthLabel }}
          </p>

          <button
            type="button"
            class="doity-date-picker__nav"
            aria-label="Próximo mês"
            @click="shiftMonth(1)"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="!hideInputs"
          class="doity-date-picker__inputs"
          @focusout="onInputsFocusOut"
        >
          <template v-if="isRange">
            <Input
              v-model="startInput"
              size="sm"
              placeholder="Data inicial"
              aria-label="Data inicial"
            />
            <span class="doity-date-picker__dash" aria-hidden="true">–</span>
            <Input
              v-model="endInput"
              size="sm"
              placeholder="Data final"
              aria-label="Data final"
            />
          </template>
          <Input
            v-else
            v-model="singleInput"
            size="sm"
            placeholder="Data"
            aria-label="Data"
          />
        </div>

        <div class="doity-date-picker__grid">
          <div class="doity-date-picker__weekdays">
            <span
              v-for="day in WEEKDAYS"
              :key="day"
              class="doity-date-picker__weekday"
            >{{ day }}</span>
          </div>

          <div
            class="doity-date-picker__days"
            :class="{
              'doity-date-picker__days--slide-left': monthDir === 1,
              'doity-date-picker__days--slide-right': monthDir === -1,
            }"
          >
            <button
              v-for="cell in calendarDays"
              :key="cell.key"
              type="button"
              class="doity-date-picker__cell"
              :class="{
                'doity-date-picker__cell--outside': !cell.inMonth,
                'doity-date-picker__cell--today': dayState(cell.date).isToday && !dayState(cell.date).selected,
                'doity-date-picker__cell--selected': dayState(cell.date).selected,
                'doity-date-picker__cell--range-start': dayState(cell.date).rangeStart,
                'doity-date-picker__cell--range-end': dayState(cell.date).rangeEnd,
                'doity-date-picker__cell--in-range': dayState(cell.date).inRange,
              }"
              :aria-pressed="dayState(cell.date).selected || dayState(cell.date).inRange"
              :aria-label="formatDisplay(cell.date)"
              @click="selectDay(cell)"
            >
              <span class="doity-date-picker__day">{{ cell.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!hideActions"
      class="doity-date-picker__footer"
    >
      <div class="doity-date-picker__actions">
        <Button
          hierarchy="outline"
          size="md"
          class="doity-date-picker__action"
          @click="onCancel"
        >
          {{ cancelLabel }}
        </Button>
        <Button
          hierarchy="primary"
          size="md"
          class="doity-date-picker__action"
          @click="onConfirm"
        >
          {{ confirmLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-date-picker {
  background: var(--doity-color-background-primary, #fff);
  border-radius: var(--doity-radius-xl, 12px);
  box-shadow: var(--doity-shadow-xl);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  overflow: hidden;
  width: 328px;
}

.doity-date-picker__body {
  padding: 20px 24px;
}

.doity-date-picker__calendar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.doity-date-picker__month {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 280px;
}

.doity-date-picker__nav {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: var(--doity-radius-button-lg, 10px);
  box-shadow: var(--doity-shadow-xs, 0 1px 2px rgba(10, 13, 18, 0.1));
  color: var(--doity-color-text-primary, #0a0a0a);
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  height: 36px;
  justify-content: center;
  padding: 0;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease;
  width: 36px;
}

.doity-date-picker__nav:hover {
  background: var(--doity-color-background-secondary, #fafafa);
}

.doity-date-picker__nav:active {
  transform: scale(0.94);
}

.doity-date-picker__month-label {
  color: var(--doity-color-text-secondary, #737373);
  font-size: 16px;
  font-weight: var(--doity-font-weight-semibold, 600);
  line-height: 24px;
  margin: 0;
  text-align: center;
}

.doity-date-picker__month-label--from-left {
  animation: doity-dp-label-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-date-picker__month-label--from-right {
  animation: doity-dp-label-right 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-date-picker__inputs {
  align-items: center;
  display: flex;
  gap: 8px;
  width: 280px;
}

.doity-date-picker__inputs :deep(.doity-input) {
  flex: 1 1 0;
  min-width: 0;
}

.doity-date-picker__dash {
  color: var(--doity-color-text-tertiary, #737373);
  flex-shrink: 0;
  font-size: 16px;
  line-height: 24px;
}

.doity-date-picker__grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.doity-date-picker__weekdays,
.doity-date-picker__days {
  display: grid;
  grid-template-columns: repeat(7, 40px);
  width: 280px;
}

.doity-date-picker__weekday {
  align-items: center;
  color: var(--doity-color-text-secondary, #737373);
  display: flex;
  font-size: 14px;
  font-weight: var(--doity-font-weight-medium, 500);
  height: 40px;
  justify-content: center;
  line-height: 20px;
}

.doity-date-picker__days--slide-left {
  animation: doity-dp-days-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-date-picker__days--slide-right {
  animation: doity-dp-days-right 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-date-picker__cell {
  background: transparent;
  border: 0;
  cursor: pointer;
  height: 40px;
  padding: 0;
  position: relative;
  width: 40px;
}

.doity-date-picker__day {
  align-items: center;
  border-radius: 20px;
  color: var(--doity-color-text-secondary, #737373);
  display: flex;
  font-size: 14px;
  font-weight: var(--doity-font-weight-regular, 400);
  height: 40px;
  justify-content: center;
  line-height: 20px;
  position: relative;
  transition:
    background 0.22s cubic-bezier(0.33, 1, 0.68, 1),
    color 0.22s cubic-bezier(0.33, 1, 0.68, 1),
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  width: 40px;
  z-index: 1;
}

.doity-date-picker__cell--outside .doity-date-picker__day {
  color: var(--doity-color-text-tertiary, #a3a3a3);
}

.doity-date-picker__cell:hover .doity-date-picker__day {
  background: var(--doity-color-background-secondary, #f5f5f5);
}

.doity-date-picker__cell--today .doity-date-picker__day {
  background: var(--doity-color-background-secondary, #f5f5f5);
  font-weight: var(--doity-font-weight-medium, 500);
}

.doity-date-picker__cell--in-range {
  background: var(--doity-color-background-brand, #fff1f2);
}

.doity-date-picker__cell--in-range .doity-date-picker__day {
  background: transparent;
  color: var(--doity-color-action-primary-default, #ff2b34);
  font-weight: var(--doity-font-weight-medium, 500);
}

.doity-date-picker__cell--range-start::after,
.doity-date-picker__cell--range-end::before {
  background: var(--doity-color-background-brand, #fff1f2);
  bottom: 0;
  content: '';
  position: absolute;
  top: 0;
  z-index: 0;
}

.doity-date-picker__cell--range-start:not(.doity-date-picker__cell--range-end)::after {
  left: 50%;
  right: 0;
}

.doity-date-picker__cell--range-end:not(.doity-date-picker__cell--range-start)::before {
  left: 0;
  right: 50%;
}

.doity-date-picker__cell--selected .doity-date-picker__day,
.doity-date-picker__cell--range-start .doity-date-picker__day,
.doity-date-picker__cell--range-end .doity-date-picker__day {
  animation: doity-dp-select 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  background: var(--doity-color-action-primary-default, #ff2b34);
  color: var(--doity-color-text-inverse, #fff);
  font-weight: var(--doity-font-weight-medium, 500);
}

.doity-date-picker__cell--selected:hover .doity-date-picker__day,
.doity-date-picker__cell--range-start:hover .doity-date-picker__day,
.doity-date-picker__cell--range-end:hover .doity-date-picker__day {
  background: var(--doity-color-action-primary-default, #ff2b34);
}

.doity-date-picker__footer {
  border-top: 1px solid var(--doity-color-border-secondary, #e9eaeb);
  padding: 16px 24px;
}

.doity-date-picker__actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.doity-date-picker__action {
  flex: 1 1 0;
  min-width: 0;
}

.doity-date-picker__actions :deep(.doity-button) {
  width: 100%;
}

@keyframes doity-dp-select {
  0% { transform: scale(0.86); }
  55% { transform: scale(1.06); }
  100% { transform: scale(1); }
}

@keyframes doity-dp-label-left {
  0% { opacity: 0; transform: translateX(8px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes doity-dp-label-right {
  0% { opacity: 0; transform: translateX(-8px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes doity-dp-days-left {
  0% { opacity: 0.35; transform: translateX(12px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes doity-dp-days-right {
  0% { opacity: 0.35; transform: translateX(-12px); }
  100% { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .doity-date-picker__nav,
  .doity-date-picker__day {
    transition: none;
  }

  .doity-date-picker__month-label--from-left,
  .doity-date-picker__month-label--from-right,
  .doity-date-picker__days--slide-left,
  .doity-date-picker__days--slide-right,
  .doity-date-picker__cell--selected .doity-date-picker__day,
  .doity-date-picker__cell--range-start .doity-date-picker__day,
  .doity-date-picker__cell--range-end .doity-date-picker__day {
    animation: none;
  }
}
</style>
