import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import FileUpload from '../src/runtime/components/FileUpload.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('FileUpload', FileUpload, {
    argTypes: {
      status: { control: 'select', options: ['uploading', 'complete'] },
      fileName: { control: 'text' },
      meta: { control: 'text' },
      progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
      showPercentage: { control: 'boolean' },
    },
    args: {
      status: 'uploading',
      fileName: 'Downloading...',
      meta: '129 MB / 1000 MB',
      progress: 45,
      cancelLabel: 'Cancel',
    },
  }),
  title: 'Components/Upload/File Upload',
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof FileUpload>

export const Uploading: Story = {
  parameters: storyUsage(`<DoityFileUpload
  status="uploading"
  file-name="Downloading..."
  meta="129 MB / 1000 MB"
  :progress="45"
  cancel-label="Cancel"
  @cancel="onCancel"
/>`),
  render: (args) => ({
    components: { FileUpload },
    setup: () => ({ args }),
    template: '<FileUpload v-bind="args" />',
  }),
}

export const Complete: Story = {
  args: {
    status: 'complete',
    fileName: 'documento.docx',
    progress: 100,
  },
  parameters: storyUsage(`<DoityFileUpload
  status="complete"
  file-name="documento.docx"
  meta="129 MB / 1000 MB"
  @remove="onRemove"
/>`),
  render: (args) => ({
    components: { FileUpload },
    setup: () => ({ args }),
    template: '<FileUpload v-bind="args" />',
  }),
}

export const WithPercentage: Story = {
  name: 'Com porcentagem',
  args: {
    fileName: 'documento.docx',
    progress: 13,
    showPercentage: true,
    cancelLabel: 'Cancelar',
  },
  parameters: storyUsage(`<DoityFileUpload
  status="uploading"
  file-name="documento.docx"
  meta="129 MB / 1000 MB"
  :progress="13"
  show-percentage
/>`),
}

export const TransitionDemo: Story = {
  name: 'Transição uploading → complete',
  parameters: storyUsage(`<DoityFileUpload :status="status" :progress="progress" … />`),
  render: () => ({
    components: { FileUpload, Button },
    setup() {
      const status = ref<'uploading' | 'complete'>('uploading')
      const progress = ref(35)
      const fileName = ref('Downloading...')

      function complete() {
        progress.value = 100
        fileName.value = 'documento.docx'
        status.value = 'complete'
      }

      function reset() {
        status.value = 'uploading'
        progress.value = 35
        fileName.value = 'Downloading...'
      }

      return { status, progress, fileName, complete, reset }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <FileUpload
          :status="status"
          :file-name="fileName"
          meta="129 MB / 1000 MB"
          :progress="progress"
          cancel-label="Cancel"
        />
        <div style="display:flex;gap:8px">
          <Button hierarchy="primary" size="sm" :disabled="status === 'complete'" @click="complete">
            Concluir
          </Button>
          <Button hierarchy="outline" size="sm" @click="reset">
            Resetar
          </Button>
        </div>
      </div>
    `,
  }),
}

export const AllStates: Story = {
  parameters: storyUsage(`<DoityFileUpload status="uploading" :progress="45" file-name="Downloading..." meta="129 MB / 1000 MB" />
<DoityFileUpload status="complete" file-name="documento.docx" meta="129 MB / 1000 MB" />`),
  render: () => ({
    components: { FileUpload },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start">
        <FileUpload
          status="uploading"
          file-name="Downloading..."
          meta="129 MB / 1000 MB"
          :progress="45"
          cancel-label="Cancel"
        />
        <FileUpload
          status="complete"
          file-name="documento.docx"
          meta="129 MB / 1000 MB"
        />
      </div>
    `,
  }),
}
