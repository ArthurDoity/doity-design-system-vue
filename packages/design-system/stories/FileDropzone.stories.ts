import type { Meta, StoryObj } from '@storybook/vue3'
import FileDropzone from '../src/runtime/components/FileDropzone.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('FileDropzone', FileDropzone, {
    argTypes: {
      active: { control: 'boolean' },
      actionLabel: { control: 'text' },
      dropLabel: { control: 'text' },
      hint: { control: 'text' },
      accept: { control: 'text' },
      multiple: { control: 'boolean' },
      disabled: { control: 'boolean' },
    },
    args: {
      actionLabel: 'Clique para adicionar',
      dropLabel: 'ou arraste e solte',
      hint: '.doc ou .docx (Máx. 10MB)',
      accept: '.doc,.docx',
      multiple: false,
      disabled: false,
    },
  }),
  title: 'Components/Upload/File Dropzone',
} satisfies Meta<typeof FileDropzone>

export default meta
type Story = StoryObj<typeof FileDropzone>

export const Default: Story = {
  parameters: storyUsage(`<DoityFileDropzone
  hint=".doc ou .docx (Máx. 10MB)"
  @select="onSelect"
/>`),
  render: args => ({
    components: { FileDropzone },
    setup: () => ({ args }),
    template: '<FileDropzone v-bind="args" />',
  }),
}

export const Active: Story = {
  args: { active: true },
  parameters: storyUsage(`<DoityFileDropzone :active="true" />`),
  render: args => ({
    components: { FileDropzone },
    setup: () => ({ args }),
    template: '<FileDropzone v-bind="args" />',
  }),
}

export const AllStates: Story = {
  parameters: storyUsage(`<DoityFileDropzone />
<DoityFileDropzone :active="true" />`),
  render: () => ({
    components: { FileDropzone },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start">
        <FileDropzone />
        <FileDropzone :active="true" />
      </div>
    `,
  }),
}
