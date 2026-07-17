import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Table from '../src/runtime/components/Table.vue'
import TableCell from '../src/runtime/components/TableCell.vue'
import TableHeaderCell from '../src/runtime/components/TableHeaderCell.vue'
import Badge from '../src/runtime/components/Badge.vue'
import Avatar from '../src/runtime/components/Avatar.vue'
import AvatarGroup from '../src/runtime/components/AvatarGroup.vue'
import AvatarLabelGroup from '../src/runtime/components/AvatarLabelGroup.vue'
import Button from '../src/runtime/components/Button.vue'
import Checkbox from '../src/runtime/components/Checkbox.vue'
import Input from '../src/runtime/components/Input.vue'
import Pagination from '../src/runtime/components/Pagination.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const IconCopy = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><rect x="5.5" y="5.5" width="7" height="7" rx="1.2" stroke="currentColor" stroke-width="1.33"/><path d="M10.5 5.5V4.2A1.2 1.2 0 0 0 9.3 3H4.2A1.2 1.2 0 0 0 3 4.2v5.1A1.2 1.2 0 0 0 4.2 10.5H5.5" stroke="currentColor" stroke-width="1.33"/></svg>`,
}
const IconDownload = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M8 2.667v7.333M8 10l-2.667-2.667M8 10l2.667-2.667M3.333 12.667h9.334" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconTrash = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M2.667 4h10.666M6 4V2.667h4V4M6.667 7.333v4M9.333 7.333v4M3.667 4l.666 8.667A1.333 1.333 0 0 0 5.66 14h4.68a1.333 1.333 0 0 0 1.327-1.333L12.333 4" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconEdit = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M11.333 2.667a1.414 1.414 0 0 1 2 2L5.333 12.667 2.667 13.333l.666-2.666 8-8Z" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconMore = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><circle cx="8" cy="3.5" r="1.2" fill="currentColor"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="12.5" r="1.2" fill="currentColor"/></svg>`,
}
const IconPlus = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M8 3.333v9.334M3.333 8h9.334" stroke="currentColor" stroke-width="1.33" stroke-linecap="round"/></svg>`,
}
const IconFilter = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M2.667 4h10.666M4.667 8h6.666M6.667 12h2.666" stroke="currentColor" stroke-width="1.33" stroke-linecap="round"/></svg>`,
}
const IconFile = {
  template: `<svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"><path d="M6 2.5h5.5L14.5 5.5V16a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 16V4A1.5 1.5 0 0 1 6 2.5Z" stroke="currentColor" stroke-width="1.33"/><path d="M11.5 2.5V5.5H14.5" stroke="currentColor" stroke-width="1.33" stroke-linejoin="round"/></svg>`,
}

const members = [
  { name: 'Olivia Silva', handle: '@olivia', email: 'olivia@doity.com', role: 'Designer de Produto', tags: 4, src: 'https://i.pravatar.cc/80?u=olivia' },
  { name: 'Phoenix Baker', handle: '@phoenix', email: 'phoenix@doity.com', role: 'Gerente de Produto', tags: 4, src: 'https://i.pravatar.cc/80?u=phoenix' },
  { name: 'Lana Steiner', handle: '@lana', email: 'lana@doity.com', role: 'Desenvolvedor Frontend', tags: 4, src: 'https://i.pravatar.cc/80?u=lana' },
  { name: 'Demi Wilkinson', handle: '@demi', email: 'demi@doity.com', role: 'Desenvolvedor Backend', tags: 4, src: 'https://i.pravatar.cc/80?u=demi' },
  { name: 'Candice Wu', handle: '@candice', email: 'candice@doity.com', role: 'Desenvolvedor Fullstack', tags: 4 },
  { name: 'Natali Craig', handle: '@natali', email: 'natali@doity.com', role: 'UX Designer', tags: 4, src: 'https://i.pravatar.cc/80?u=natali' },
  { name: 'Orlando Diggs', handle: '@orlando', email: 'orlando@doity.com', role: 'UI Designer', tags: 4 },
  { name: 'Drew Cano', handle: '@drew', email: 'drew@doity.com', role: 'Designer de Produto', tags: 4, src: 'https://i.pravatar.cc/80?u=drew' },
  { name: 'Kate Morrison', handle: '@kate', email: 'kate@doity.com', role: 'Gerente de Produto', tags: 4, src: 'https://i.pravatar.cc/80?u=kate' },
  { name: 'Koray Okumus', handle: '@koray', email: 'koray@doity.com', role: 'Desenvolvedor Frontend', tags: 4, src: 'https://i.pravatar.cc/80?u=koray' },
]

const memberColumns = [
  { key: 'check', label: '', checkboxOnly: true },
  { key: 'name', label: 'Nome' },
  { key: 'status', label: 'Status', sortable: true, sort: 'desc' },
  { key: 'role', label: 'Função', help: true },
  { key: 'email', label: 'E-mail' },
  { key: 'tags', label: 'Tags', tags: true },
  { key: 'actions', label: '', actions: true },
]

const memberColumnsMobile = [
  { key: 'check', label: '', checkboxOnly: true },
  { key: 'name', label: 'Nome' },
  { key: 'status', label: 'Status', sortable: true, sort: 'desc' },
  { key: 'role', label: 'Função', help: true },
]

const companies = [
  { name: 'Catálogo', domain: 'catalogapp.io', about: 'Conteúdo sobre a empresa.', detail: 'Detalhes extras', license: 70, users: 5 },
  { name: 'Circo', domain: 'circo.io', about: 'Conteúdo sobre a empresa.', detail: 'Detalhes extras', license: 70, users: 5 },
  { name: 'Epicurious', domain: 'epicurious.io', about: 'Conteúdo sobre a empresa.', detail: 'Detalhes extras', license: 70, users: 5 },
  { name: 'Acme Org', domain: 'acme.org', about: 'Conteúdo sobre a empresa.', detail: 'Detalhes extras', license: 70, users: 5 },
  { name: 'CloudWatch', domain: 'cloudwatch.io', about: 'Conteúdo sobre a empresa.', detail: 'Detalhes extras', license: 70, users: 5 },
]

const files = [
  { name: 'Nome do arquivo.png', size: '200 KB', sent: '4 de Jan, 2025', updated: '4 de Jan, 2025', by: 'Olivia Silva' },
  { name: 'Nome do arquivo.png', size: '200 KB', sent: '4 de Jan, 2025', updated: '4 de Jan, 2025', by: 'Phoenix Baker' },
  { name: 'Nome do arquivo.png', size: '16 MB', sent: '2 de Jan, 2025', updated: '2 de Jan, 2025', by: 'Lana Steiner' },
  { name: 'Nome do arquivo.png', size: '200 KB', sent: '2 de Jan, 2025', updated: '2 de Jan, 2025', by: 'Demi Wilkinson' },
  { name: 'Nome do arquivo.png', size: '200 KB', sent: '2 de Jan, 2025', updated: '2 de Jan, 2025', by: 'Candice Wu' },
  { name: 'Nome do arquivo.png', size: '200 KB', sent: '2 de Jan, 2025', updated: '2 de Jan, 2025', by: 'Natali Craig' },
  { name: 'Nome do arquivo.png', size: '200 KB', sent: '1 de Jan, 2025', updated: '1 de Jan, 2025', by: 'Drew Cano' },
]

const suppliers = [
  { name: 'Catálogo', domain: 'catalogapp.io', score: 60, trend: '+20%', date: '22 de jan de 2025' },
  { name: 'Circo', domain: 'circo.io', score: 60, trend: '+20%', date: '20 de jan de 2025' },
  { name: 'Epicurious', domain: 'epicurious.io', score: 60, trend: '+20%', date: '24 de jan de 2025' },
  { name: 'Acme Org', domain: 'acme.org', score: 60, trend: '+20%', date: '26 de jan de 2025' },
  { name: 'CloudWatch', domain: 'cloudwatch.io', score: 60, trend: '+20%', date: '18 de jan de 2025' },
  { name: 'ContrasteAI', domain: 'contrasteai.com', score: 60, trend: '+20%', date: '28 de jan de 2025' },
  { name: 'Catalog', domain: 'catalogapp.io', score: 60, trend: '+20%', date: '16 de jan de 2025' },
]

const meta = {
  ...doityStoryMeta('Table', Table, {
    argTypes: {
      dividers: { control: 'select', options: ['line', 'alternating'] },
      headerTone: { control: 'select', options: ['white', 'gray'] },
    },
    args: {
      dividers: 'line',
      headerTone: 'gray',
      hoverable: true,
      bordered: false,
    },
  }),
  title: 'Components/Data/Table',
} satisfies Meta

export default meta
type Story = StoryObj

function useMembersTable() {
  const page = ref(1)
  const selected = ref(new Set())
  function toggle(i) {
    const next = new Set(selected.value)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    selected.value = next
  }
  function toggleAll(v) {
    selected.value = v ? new Set(members.map((_, i) => i)) : new Set()
  }
  return { page, selected, toggle, toggleAll, members }
}

export const Default: Story = {
  name: 'Inscritos (desktop)',
  parameters: {
    ...storyUsage(`<DoityTable title="Inscritos" badge="100 inscritos" header-tone="gray" :columns="columns" :data="rows">
  <template #header-checkbox-check>
    <DoityCheckbox size="md" ... />
  </template>
  <template #cell-check="{ index }">
    <DoityCheckbox size="md" :model-value="selected.has(index)" @update:model-value="toggle(index)" />
  </template>
  <template #cell-name="{ row }">
    <DoityAvatarLabelGroup :src="row.src" :name="row.name" :description="row.handle" size="sm" />
  </template>
</DoityTable>`),
    layout: 'padded',
  },
  render: args => ({
    components: {
      Table,
      Badge,
      AvatarLabelGroup,
      Button,
      Checkbox,
      Pagination,
      IconCopy,
      IconDownload,
      IconTrash,
      IconEdit,
    },
    setup() {
      return { args, ...useMembersTable(), columns: memberColumns }
    },
    template: `
      <Table
        v-bind="args"
        title="Inscritos"
        badge="100 inscritos"
        header-tone="gray"
        :columns="columns"
        :data="members"
      >
        <template #header-checkbox-check>
          <Checkbox
            size="md"
            :model-value="selected.size === members.length"
            :indeterminate="selected.size > 0 && selected.size < members.length"
            @update:model-value="toggleAll"
          />
        </template>
        <template #cell-check="{ index }">
          <Checkbox
            size="md"
            :model-value="selected.has(index)"
            @update:model-value="toggle(index)"
          />
        </template>
        <template #cell-name="{ row }">
          <AvatarLabelGroup :src="row.src" :name="row.name" :description="row.handle" size="sm" />
        </template>
        <template #cell-status>
          <Badge variant="success" icon="dot" size="sm">Label</Badge>
        </template>
        <template #cell-role="{ row }">{{ row.role }}</template>
        <template #cell-email="{ row }">{{ row.email }}</template>
        <template #cell-tags="{ row }">
          <div class="doity-table__tags">
            <Badge variant="primary" size="sm">Rótulo</Badge>
            <Badge variant="primary" size="sm">Rótulo</Badge>
            <Badge variant="primary" size="sm">Rótulo</Badge>
            <Badge variant="gray" size="sm">+{{ row.tags }}</Badge>
          </div>
        </template>
        <template #cell-actions>
          <div class="doity-table__actions">
            <Button hierarchy="link" size="sm" icon="only" aria-label="Copiar"><template #default><IconCopy /></template></Button>
            <Button hierarchy="link" size="sm" icon="only" aria-label="Baixar"><template #default><IconDownload /></template></Button>
            <Button hierarchy="link" size="sm" icon="only" aria-label="Excluir"><template #default><IconTrash /></template></Button>
            <Button hierarchy="link" size="sm" icon="only" aria-label="Editar"><template #default><IconEdit /></template></Button>
          </div>
        </template>
        <template #footer>
          <Pagination v-model:page="page" :total-pages="10" show-labels previous-label="Button" next-label="Button" />
        </template>
      </Table>
    `,
  }),
}

export const Mobile: Story = {
  name: 'Inscritos (mobile)',
  parameters: {
    ...storyUsage(`<DoityPagination variant="compact" />`),
    layout: 'padded',
    viewport: {
      viewports: {
        inscritosMobile: {
          name: 'Inscritos 375',
          styles: { width: '375px', height: '812px' },
        },
      },
      defaultViewport: 'inscritosMobile',
    },
  },
  render: () => ({
    components: {
      Table,
      Badge,
      AvatarLabelGroup,
      Checkbox,
      Pagination,
    },
    setup() {
      return { ...useMembersTable(), columns: memberColumnsMobile }
    },
    template: `
      <Table
        title="Inscritos"
        badge="100 inscritos"
        header-tone="gray"
        :columns="columns"
        :data="members"
      >
        <template #header-checkbox-check>
          <Checkbox
            size="md"
            :model-value="selected.size === members.length"
            :indeterminate="selected.size > 0 && selected.size < members.length"
            @update:model-value="toggleAll"
          />
        </template>
        <template #cell-check="{ index }">
          <Checkbox
            size="md"
            :model-value="selected.has(index)"
            @update:model-value="toggle(index)"
          />
        </template>
        <template #cell-name="{ row }">
          <AvatarLabelGroup :src="row.src" :name="row.name" :description="row.handle" size="sm" />
        </template>
        <template #cell-status>
          <Badge variant="success" icon="dot" size="sm">Label</Badge>
        </template>
        <template #cell-role="{ row }">{{ row.role }}</template>
        <template #footer>
          <Pagination v-model:page="page" :total-pages="10" variant="compact" />
        </template>
      </Table>
    `,
  }),
}

export const Companies: Story = {
  name: 'Clientes (companies)',
  parameters: storyUsage(`<DoityTable title="Clientes" ... />`),
  render: () => ({
    components: {
      Table,
      TableCell,
      Badge,
      Avatar,
      AvatarLabelGroup,
      AvatarGroup,
      Button,
      IconMore,
    },
    setup() {
      const columns = [
        { key: 'company', label: 'Empresa', sortable: true, sort: 'desc' },
        { key: 'status', label: 'Status' },
        { key: 'about', label: 'Sobre' },
        { key: 'users', label: 'Usuários' },
        { key: 'license', label: 'Uso de licença' },
        { key: 'actions', label: '', actions: true },
      ]
      const avatars = ['Olivia', 'Phoenix', 'Lana', 'Demi', 'Candice', 'Natali', 'Orlando', 'Drew', 'Kate', 'Alex']
      return { columns, companies, avatars }
    },
    template: `
      <Table
        title="Clientes"
        description="Essas empresas compraram nos últimos 12 meses."
        header-tone="white"
        :columns="columns"
        :data="companies"
      >
        <template #cell-company="{ row }">
          <AvatarLabelGroup :name="row.name" :description="row.domain" size="sm" />
        </template>
        <template #cell-status="{ index }">
          <Badge :variant="index === 0 ? 'success' : 'gray'" size="sm">{{ index === 0 ? 'Ativo' : 'Label' }}</Badge>
        </template>
        <template #cell-about="{ row }">
          <TableCell :text="row.about" :supporting-text="row.detail" />
        </template>
        <template #cell-users>
          <AvatarGroup :max="5" size="xs">
            <Avatar v-for="n in avatars" :key="n" :name="n" size="xs" />
          </AvatarGroup>
        </template>
        <template #cell-license="{ row }">
          <TableCell :progress="row.license" />
        </template>
        <template #cell-actions>
          <Button hierarchy="link" size="sm" icon="only" aria-label="Mais"><template #default><IconMore /></template></Button>
        </template>
      </Table>
    `,
  }),
}

export const Files: Story = {
  name: 'Arquivos enviados',
  parameters: storyUsage(`<DoityTable title="Arquivos enviados" ... />`),
  render: () => ({
    components: {
      Table,
      TableCell,
      Button,
      Checkbox,
      IconPlus,
      IconFile,
      IconMore,
    },
    setup() {
      const columns = [
        { key: 'check', label: '', checkboxOnly: true },
        { key: 'file', label: 'Nome do arquivo' },
        { key: 'size', label: 'Tamanho do arquivo' },
        { key: 'sent', label: 'Data de envio' },
        { key: 'updated', label: 'Última atualização' },
        { key: 'by', label: 'Enviado por' },
        { key: 'actions', label: '', actions: true },
      ]
      return { columns, files }
    },
    template: `
      <Table
        title="Arquivos enviados"
        header-tone="white"
        :columns="columns"
        :data="files"
      >
        <template #actions>
          <Button hierarchy="outline" size="sm">Button</Button>
          <Button hierarchy="primary" size="sm" icon="leading">
            <template #icon-leading><IconPlus /></template>
            Button
          </Button>
        </template>
        <template #header-checkbox-check>
          <Checkbox size="md" />
        </template>
        <template #cell-check>
          <Checkbox size="md" />
        </template>
        <template #cell-file="{ row }">
          <TableCell :text="row.name" :supporting-text="row.size">
            <template #leading>
              <span style="align-items:center;background:var(--doity-color-background-tertiary);border-radius:9999px;color:var(--doity-color-text-secondary);display:inline-flex;height:40px;justify-content:center;width:40px">
                <IconFile />
              </span>
            </template>
          </TableCell>
        </template>
        <template #cell-size="{ row }">{{ row.size }}</template>
        <template #cell-sent="{ row }">{{ row.sent }}</template>
        <template #cell-updated="{ row }">{{ row.updated }}</template>
        <template #cell-by="{ row }">{{ row.by }}</template>
        <template #cell-actions>
          <Button hierarchy="link" size="sm" icon="only" aria-label="Mais"><template #default><IconMore /></template></Button>
        </template>
      </Table>
    `,
  }),
}

export const WithFilters: Story = {
  name: 'Com filtros (fornecedores)',
  parameters: storyUsage(`<DoityTable title="Movimentos de fornecedores" ... />`),
  render: () => ({
    components: {
      Table,
      TableCell,
      Badge,
      AvatarLabelGroup,
      Button,
      Checkbox,
      Input,
      Pagination,
      IconPlus,
      IconFilter,
      IconCopy,
      IconDownload,
      IconTrash,
      IconEdit,
    },
    setup() {
      const page = ref(1)
      const columns = [
        { key: 'check', label: '', checkboxOnly: true },
        { key: 'supplier', label: 'Fornecedor', sortable: true, sort: 'desc' },
        { key: 'rating', label: 'Classificação' },
        { key: 'date', label: 'Última avaliação' },
        { key: 'tags', label: 'Uso da licença', tags: true },
        { key: 'actions', label: '', actions: true },
      ]
      return { page, columns, suppliers }
    },
    template: `
      <Table
        title="Movimentos de fornecedores"
        badge="240 fornecedores"
        description="Acompanhe os fornecedores e suas classificações de segurança."
        header-tone="white"
        :columns="columns"
        :data="suppliers"
      >
        <template #actions>
          <Button hierarchy="outline" size="sm" icon="leading">
            <template #icon-leading><IconFilter /></template>
            Button
          </Button>
          <Button hierarchy="primary" size="sm" icon="leading">
            <template #icon-leading><IconPlus /></template>
            Button
          </Button>
        </template>
        <template #filters>
          <Badge variant="primary" size="sm">Label</Badge>
          <div style="display:flex;gap:12px;align-items:center;margin-left:auto">
            <div style="min-width:280px;max-width:400px;flex:1">
              <Input placeholder="Buscar" size="sm" />
            </div>
            <Button hierarchy="outline" size="sm" icon="leading">
              <template #icon-leading><IconFilter /></template>
              Button
            </Button>
          </div>
        </template>
        <template #header-checkbox-check>
          <Checkbox size="md" />
        </template>
        <template #cell-check>
          <Checkbox size="md" />
        </template>
        <template #cell-supplier="{ row }">
          <AvatarLabelGroup :name="row.name" :description="row.domain" size="sm" />
        </template>
        <template #cell-rating="{ row }">
          <TableCell :progress="row.score" trend="positive" :trend-label="row.trend" />
        </template>
        <template #cell-date="{ row }">{{ row.date }}</template>
        <template #cell-tags>
          <div class="doity-table__tags">
            <Badge variant="success" icon="dot" size="sm">Label</Badge>
            <Badge variant="primary" size="sm">Rótulo</Badge>
            <Badge variant="primary" size="sm">Rótulo</Badge>
            <Badge variant="gray" size="sm">+4</Badge>
          </div>
        </template>
        <template #cell-actions>
          <div class="doity-table__actions">
            <Button hierarchy="link" size="sm" icon="only"><template #default><IconCopy /></template></Button>
            <Button hierarchy="link" size="sm" icon="only"><template #default><IconDownload /></template></Button>
            <Button hierarchy="link" size="sm" icon="only"><template #default><IconTrash /></template></Button>
            <Button hierarchy="link" size="sm" icon="only"><template #default><IconEdit /></template></Button>
          </div>
        </template>
        <template #footer>
          <Pagination v-model:page="page" :total-pages="10" variant="compact" />
        </template>
      </Table>
    `,
  }),
}

export const AlternatingFills: Story = {
  name: 'Alternating fills',
  parameters: storyUsage(`<DoityTable dividers="alternating" ... />`),
  render: () => ({
    components: { Table, Badge, AvatarLabelGroup, Checkbox },
    setup() {
      const columns = [
        { key: 'check', label: '', checkboxOnly: true },
        { key: 'name', label: 'Nome' },
        { key: 'status', label: 'Status' },
        { key: 'email', label: 'E-mail' },
      ]
      return { columns, members: members.slice(0, 5) }
    },
    template: `
      <Table
        title="Inscritos"
        badge="100 inscritos"
        dividers="alternating"
        header-tone="gray"
        :columns="columns"
        :data="members"
      >
        <template #header-checkbox-check><Checkbox size="md" /></template>
        <template #cell-check><Checkbox size="md" /></template>
        <template #cell-name="{ row }">
          <AvatarLabelGroup :src="row.src" :name="row.name" :description="row.handle" size="sm" />
        </template>
        <template #cell-status>
          <Badge variant="success" icon="dot" size="sm">Label</Badge>
        </template>
        <template #cell-email="{ row }">{{ row.email }}</template>
      </Table>
    `,
  }),
}

export const HeaderCells: Story = {
  name: 'Header cells',
  parameters: storyUsage(`<DoityTableHeaderCell label="Empresa" sortable sort="desc" help tone="gray" />`),
  render: () => ({
    components: { TableHeaderCell, Checkbox },
    template: `
      <div style="display:grid;gap:24px">
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 8px">White</p>
          <table style="border-collapse:collapse;width:100%">
            <tr>
              <TableHeaderCell label="Empresa" sortable sort="desc" tone="white">
                <template #checkbox><Checkbox size="md" /></template>
              </TableHeaderCell>
              <TableHeaderCell checkbox-only tone="white">
                <template #checkbox><Checkbox size="md" /></template>
              </TableHeaderCell>
              <TableHeaderCell label="Empresa" tone="white" />
              <TableHeaderCell tone="white" />
            </tr>
          </table>
        </div>
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 8px">Gray</p>
          <table style="border-collapse:collapse;width:100%">
            <tr>
              <TableHeaderCell label="Empresa" sortable sort="desc" tone="gray">
                <template #checkbox><Checkbox size="md" /></template>
              </TableHeaderCell>
              <TableHeaderCell checkbox-only tone="gray">
                <template #checkbox><Checkbox size="md" /></template>
              </TableHeaderCell>
              <TableHeaderCell label="Empresa" help tone="gray" />
              <TableHeaderCell label="Empresa" sortable sort="asc" help tone="gray" />
            </tr>
          </table>
        </div>
      </div>
    `,
  }),
}

export const CellVariants: Story = {
  name: 'Cell variants',
  parameters: storyUsage(`<DoityTableCell text="Olivia Silva" supporting-text="olivia@doity.com" />`),
  render: () => ({
    components: { TableCell, Badge, Avatar, AvatarGroup, Checkbox, Button, IconCopy, IconEdit },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px">
        <TableCell text="Olivia Silva" />
        <TableCell text="olivia@doity.com" emphasis="text" />
        <TableCell text="Olivia Silva" supporting-text="@olivia">
          <template #leading><Avatar name="Olivia Silva" size="sm" /></template>
        </TableCell>
        <TableCell>
          <template #leading><Checkbox size="md" /></template>
        </TableCell>
        <TableCell>
          <template #trailing>
            <Badge variant="success" icon="dot" size="sm">Label</Badge>
          </template>
        </TableCell>
        <TableCell>
          <template #trailing>
            <div class="doity-table__tags">
              <Badge variant="primary" size="sm">Rótulo</Badge>
              <Badge variant="primary" size="sm">Rótulo</Badge>
              <Badge variant="gray" size="sm">+4</Badge>
            </div>
          </template>
        </TableCell>
        <TableCell>
          <template #trailing>
            <AvatarGroup :max="4" size="xs">
              <Avatar name="A" size="xs" />
              <Avatar name="B" size="xs" />
              <Avatar name="C" size="xs" />
              <Avatar name="D" size="xs" />
              <Avatar name="E" size="xs" />
            </AvatarGroup>
          </template>
        </TableCell>
        <TableCell :progress="70" />
        <TableCell :progress="60" trend="positive" trend-label="+20%" />
        <TableCell>
          <template #trailing>
            <div class="doity-table__actions">
              <Button hierarchy="link" size="sm" icon="only"><template #default><IconCopy /></template></Button>
              <Button hierarchy="link" size="sm" icon="only"><template #default><IconEdit /></template></Button>
            </div>
          </template>
        </TableCell>
      </div>
    `,
  }),
}
