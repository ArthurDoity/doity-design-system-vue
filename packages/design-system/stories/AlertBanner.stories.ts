import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import AlertBanner from '../src/runtime/components/AlertBanner.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('AlertBanner', AlertBanner),
  title: 'Components/Feedback/Alert Banner',
} satisfies Meta<typeof AlertBanner>

export default meta
type Story = StoryObj

export const AllVariants: Story = {
  parameters: storyUsage(`<DoityAlertBanner
  variant="success"
  badge="Sucesso"
  message="Você atualizou seu perfil e detalhes"
/>`),
  render: () => ({
    components: { AlertBanner },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <AlertBanner variant="primary" badge="Novo recurso" message="Acabamos de lançar um novo recurso" />
        <AlertBanner variant="gray" badge="Novo recurso" message="Acabamos de lançar um novo recurso" />
        <AlertBanner variant="error" badge="Erro" message="Houve um problema com essa ação" />
        <AlertBanner variant="warning" badge="Aviso" message="Apenas para avisar que isso pode ser um problema" />
        <AlertBanner variant="success" badge="Sucesso" message="Você atualizou seu perfil e detalhes" />

        <AlertBanner variant="primary" badge="Novo recurso" message="Acabamos de lançar um novo recurso" show-arrow href="#" />
        <AlertBanner
          variant="error"
          badge-position="trailing"
          badge="Corrigir agora"
          message="Houve um problema com essa ação"
          show-arrow
        />
        <AlertBanner
          variant="success"
          badge-position="trailing"
          badge="Sucesso"
          message="Você atualizou seu perfil e detalhes"
          size="lg"
        />
      </div>
    `,
  }),
}

/** Hover nos com seta / CTA + entrada animada */
export const Interactive: Story = {
  parameters: storyUsage(`<DoityAlertBanner
  variant="error"
  badge-position="trailing"
  badge="Corrigir agora"
  message="Houve um problema com essa ação"
  show-arrow
  @click="onFix"
/>`),
  render: () => ({
    components: { AlertBanner },
    setup() {
      const show = ref(false)
      async function trigger() {
        if (show.value) {
          show.value = false
          await new Promise((r) => setTimeout(r, 220))
        }
        show.value = true
      }
      return { show, trigger }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;min-height:100px">
        <button
          type="button"
          style="cursor:pointer;padding:8px 12px;border-radius:8px;border:1px solid #e4e4e7;background:#fff"
          @click="trigger"
        >
          Mostrar banner
        </button>
        <AlertBanner
          v-model="show"
          variant="error"
          badge-position="trailing"
          badge="Corrigir agora"
          message="Houve um problema com essa ação"
          show-arrow
        />
        <AlertBanner
          variant="primary"
          badge="Novo recurso"
          message="Acabamos de lançar um novo recurso"
          show-arrow
          href="#"
        />
        <p style="margin:0;color:#737373;font-size:12px">Passe o mouse nos banners com seta/CTA para ver o hover.</p>
      </div>
    `,
  }),
}
