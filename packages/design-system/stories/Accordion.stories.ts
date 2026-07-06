import type { Meta, StoryObj } from '@storybook/vue3'
import Accordion from '../src/runtime/components/Accordion.vue'
import AccordionItem from '../src/runtime/components/AccordionItem.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Accordion', Accordion),
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <Accordion style="max-width:480px">
        <AccordionItem title="O que é o Doity Design System?" :open="true">
          Pacote Vue/Nuxt com tokens CSS centralizados sincronizados com o Figma.
        </AccordionItem>
        <AccordionItem title="Como atualizar tokens?">
          Execute <code>pnpm tokens:sync</code> com seu FIGMA_ACCESS_TOKEN.
        </AccordionItem>
        <AccordionItem title="Item desabilitado" disabled>
          Conteúdo não acessível.
        </AccordionItem>
      </Accordion>
    `,
  }),
}
