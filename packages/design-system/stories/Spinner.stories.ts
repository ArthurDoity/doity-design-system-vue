import type { Meta, StoryObj } from '@storybook/vue3'
import Spinner from '../src/runtime/components/Spinner.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Spinner', Spinner, {
    argTypes: {
      type: { control: 'select', options: ['circle', 'spokes'] },
      size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
      color: {
        control: 'select',
        options: ['default', 'brand', 'red', 'green', 'blue', 'yellow', 'success', 'error', 'warning', 'muted', 'white'],
      },
    },
  }),
  title: 'Components/Feedback/Spinner',
  args: {
    type: 'circle',
    size: 'md',
    color: 'default',
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  parameters: storyUsage('<DoitySpinner size="md" />'),
}

export const Sizes: Story = {
  name: 'Sizes (12–32)',
  parameters: storyUsage(`<DoitySpinner size="xs" />
<DoitySpinner size="sm" />
<DoitySpinner size="md" />
<DoitySpinner size="lg" />`),
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;gap:20px;align-items:center">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    `,
  }),
}

export const Colors: Story = {
  parameters: storyUsage(`<DoitySpinner color="red" />
<DoitySpinner color="green" />
<DoitySpinner color="blue" />
<DoitySpinner color="yellow" />`),
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;gap:20px;align-items:center">
        <Spinner color="red" size="md" />
        <Spinner color="green" size="md" />
        <Spinner color="blue" size="md" />
        <Spinner color="yellow" size="md" />
        <Spinner color="brand" size="md" />
        <Spinner color="muted" size="md" />
      </div>
    `,
  }),
}

export const Spokes: Story = {
  name: 'Type spokes',
  parameters: storyUsage('<DoitySpinner type="spokes" size="md" />'),
  args: { type: 'spokes', size: 'md' },
  render: (args) => ({
    components: { Spinner },
    setup: () => ({ args }),
    template: `
      <div style="display:flex;gap:20px;align-items:center">
        <Spinner v-bind="args" size="xs" />
        <Spinner v-bind="args" size="sm" />
        <Spinner v-bind="args" size="md" />
        <Spinner v-bind="args" size="lg" />
      </div>
    `,
  }),
}

/** Linha de status com spinner */
export const ProcessingRow: Story = {
  name: 'Processing row',
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:inline-flex;align-items:center;gap:16px;padding:16px;border-radius:8px;background:rgba(245,245,245,0.5);font:500 14px/20px Inter,system-ui">
        <Spinner size="sm" color="default" />
        <span style="font-weight:500;color:#0a0a0a">Processing payment...</span>
        <span style="font-weight:400;color:#0a0a0a;margin-left:auto">$100.00</span>
      </div>
    `,
  }),
}

/** Spinner em botões loading */
export const InButtons: Story = {
  name: 'In buttons',
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <Button hierarchy="primary" size="sm" loading>Loading...</Button>
        <Button hierarchy="outline" size="sm" loading>Loading...</Button>
        <Button hierarchy="secondary" size="sm" loading>Loading...</Button>
      </div>
    `,
  }),
}

/** Spinner em badges */
export const InBadges: Story = {
  name: 'In badges',
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:8px;background:#171717;color:#fafafa;font:500 12px/16px Inter,system-ui">
          <Spinner size="xs" color="white" />
          Syncing
        </span>
        <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:8px;background:#f5f5f5;color:#0a0a0a;font:500 12px/16px Inter,system-ui">
          <Spinner size="xs" color="default" />
          Updating
        </span>
        <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:8px;border:1px solid #e5e5e5;background:#fff;color:#0a0a0a;font:500 12px/16px Inter,system-ui">
          <Spinner size="xs" color="default" />
          Processing
        </span>
      </div>
    `,
  }),
}

/** Spinner em input / textarea */
export const InInput: Story = {
  name: 'In input',
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:448px">
        <div style="display:flex;align-items:center;height:36px;border:1px solid #e5e5e5;border-radius:8px;box-shadow:0 1px 1px rgba(0,0,0,0.1);opacity:0.5;background:#fff">
          <span style="flex:1;padding:4px 8px 4px 12px;color:#737373;font:400 14px/20px Inter,system-ui">Send a message...</span>
          <span style="padding:6px 12px 6px 0;display:inline-flex"><Spinner size="sm" color="muted" /></span>
        </div>
        <div style="border:1px solid #e5e5e5;border-radius:8px;box-shadow:0 1px 2px rgba(0,0,0,0.1);background:#fff;overflow:hidden">
          <div style="padding:12px;min-height:64px;color:#737373;font:400 14px/20px Inter,system-ui;opacity:0.5">Send a message...</div>
          <div style="display:flex;align-items:center;gap:8px;padding:6px 12px 12px">
            <Spinner size="sm" color="muted" />
            <span style="color:#737373;font:400 14px/20px Inter,system-ui">Validating...</span>
            <span style="margin-left:auto;display:inline-flex;align-items:center;justify-content:center;height:24px;width:24px;border-radius:8px;background:#171717;color:#fff;font-size:12px">↑</span>
          </div>
        </div>
      </div>
    `,
  }),
}

/** Empty state / processing */
export const EmptyState: Story = {
  name: 'Empty / processing',
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:48px;border:1px dashed #e5e5e5;border-radius:10px;max-width:600px;text-align:center">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;max-width:384px">
          <div style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;background:#f5f5f5">
            <Spinner size="sm" color="default" />
          </div>
          <p style="margin:0;font:500 18px/28px Inter,system-ui;color:#0a0a0a">Processing your request</p>
          <p style="margin:0;font:400 14px/20px Inter,system-ui;color:#737373">Please wait while we process your request. Do not refresh the page.</p>
        </div>
        <button type="button" style="height:32px;padding:0 12px;border:1px solid #e5e5e5;border-radius:6px;background:#fff;box-shadow:0 1px 1px rgba(0,0,0,0.1);font:500 14px/20px Inter,system-ui;cursor:pointer">Cancel</button>
      </div>
    `,
  }),
}

