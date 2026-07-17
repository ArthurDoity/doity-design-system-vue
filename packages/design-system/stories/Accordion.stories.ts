import type { Meta, StoryObj } from '@storybook/vue3'
import Accordion from '../src/runtime/components/Accordion.vue'
import AccordionItem from '../src/runtime/components/AccordionItem.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const productBody = `
  <p>Nosso produto principal combina tecnologia de ponta com um design elegante. Construído com materiais de alta qualidade, oferece desempenho e confiabilidade incomparáveis.</p>
  <p>Os principais recursos incluem capacidades de processamento avançadas e uma interface de usuário intuitiva projetada para iniciantes e especialistas.</p>
`

const meta = {
  ...doityStoryMeta('Accordion', Accordion),
  title: 'Components/Layout/Accordion',
} satisfies Meta

export default meta
type Story = StoryObj

/** Fechado + aberto — chevron */
export const Default: Story = {
  parameters: storyUsage(`<DoityAccordion>
  <DoityAccordionItem title="Informações do Produto">
    <p>…</p>
  </DoityAccordionItem>
  <DoityAccordionItem title="Informações do Produto" :open="true">
    <p>…</p>
  </DoityAccordionItem>
</DoityAccordion>`),
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <Accordion style="max-width:472px">
        <AccordionItem title="Informações do Produto">
          ${productBody}
        </AccordionItem>
        <AccordionItem title="Informações do Produto" :open="true">
          ${productBody}
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const Closed: Story = {
  name: 'Fechado',
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <Accordion style="max-width:472px">
        <AccordionItem title="Informações do Produto">
          ${productBody}
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const Opened: Story = {
  name: 'Aberto',
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <Accordion style="max-width:472px">
        <AccordionItem title="Informações do Produto" :open="true">
          ${productBody}
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const Multiple: Story = {
  name: 'Vários itens',
  parameters: storyUsage(`<DoityAccordion multiple>
  <DoityAccordionItem title="…" :open="true">…</DoityAccordionItem>
  <DoityAccordionItem title="…">…</DoityAccordionItem>
</DoityAccordion>`),
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <Accordion multiple style="max-width:472px">
        <AccordionItem title="Informações do Produto" :open="true">
          ${productBody}
        </AccordionItem>
        <AccordionItem title="Envio e devoluções">
          <p>Entregamos em todo o Brasil. Devoluções em até 30 dias com nota fiscal.</p>
        </AccordionItem>
        <AccordionItem title="Item desabilitado" disabled>
          <p>Conteúdo não acessível.</p>
        </AccordionItem>
      </Accordion>
    `,
  }),
}
