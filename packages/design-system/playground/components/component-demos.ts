import { defineComponent, h, ref } from 'vue'

const C = (name: string) => resolveComponent(`Doity${name}`)

function col(children: ReturnType<typeof h>[], gap = '12px') {
  return h('div', { style: `display:flex;flex-direction:column;gap:${gap}` }, children)
}

function row(children: ReturnType<typeof h>[], gap = '12px') {
  return h('div', { style: `display:flex;flex-wrap:wrap;gap:${gap};align-items:center` }, children)
}

const tableColumns = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
  { key: 'status', label: 'Status' },
]

const tableData = [
  { name: 'Ana Silva', email: 'ana@doity.com', status: 'Ativo' },
  { name: 'Bruno Costa', email: 'bruno@doity.com', status: 'Pendente' },
  { name: 'Carla Dias', email: 'carla@doity.com', status: 'Ativo' },
]

const chartData = [
  { label: 'Jan', value: 40 },
  { label: 'Fev', value: 65 },
  { label: 'Mar', value: 50 },
  { label: 'Abr', value: 80 },
]

const sidebarItems = [
  { label: 'Dashboard', icon: '▦', active: true },
  { label: 'Eventos', icon: '◉' },
  { label: 'Participantes', icon: '◎' },
  { label: 'Configurações', icon: '⚙' },
]

const sidebarRoles = [
  { label: 'Org.', value: 'organizer' },
  { label: 'Part.', value: 'participant' },
]

const dropdownItems = [
  { label: 'Editar', value: 'edit' },
  { label: 'Duplicar', value: 'duplicate' },
  { section: true, label: 'Ações' },
  { label: 'Excluir', value: 'delete', destructive: true },
]

const selectOptions = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3' },
]

export const componentDemos: Record<string, ReturnType<typeof defineComponent>> = {
  accordion: defineComponent({
    render: () => h(C('Accordion'), {}, () => [
      h(C('AccordionItem'), { title: 'O que é o Doity Design System?', open: true }, () => 'Pacote Vue/Nuxt com tokens CSS centralizados.'),
      h(C('AccordionItem'), { title: 'Como atualizar tokens?' }, () => 'Execute pnpm tokens:sync a partir do Figma.'),
      h(C('AccordionItem'), { title: 'Desabilitado', disabled: true }, () => 'Conteúdo oculto'),
    ]),
  }),

  alert: defineComponent({
    render: () => col([
      h(C('Alert'), { variant: 'default', title: 'Default', description: 'Mensagem padrão', icon: true }),
      h(C('Alert'), { variant: 'success', title: 'Success', description: 'Operação concluída', icon: true }),
      h(C('Alert'), { variant: 'warning', title: 'Warning', description: 'Atenção necessária', icon: true }),
      h(C('Alert'), { variant: 'error', title: 'Error', description: 'Algo deu errado', icon: true }),
      h(C('Alert'), { variant: 'info', title: 'Info', description: 'Informação adicional', icon: true, dismissible: true }),
    ]),
  }),

  'alert-dialog': defineComponent({
    setup() {
      const open = ref(false)
      const destructive = ref(false)
      return () => col([
        row([
          h(C('Button'), { hierarchy: 'primary', onClick: () => { open.value = true; destructive.value = false } }, () => 'Abrir diálogo'),
          h(C('Button'), { hierarchy: 'outline', destructive: true, onClick: () => { open.value = true; destructive.value = true } }, () => 'Ação destrutiva'),
        ]),
        h(C('AlertDialog'), {
          open: open.value,
          'onUpdate:open': (v: boolean) => { open.value = v },
          title: destructive.value ? 'Excluir item?' : 'Confirmar ação',
          description: destructive.value ? 'Esta ação não pode ser desfeita.' : 'Deseja continuar com esta operação?',
          destructive: destructive.value,
          confirmLabel: destructive.value ? 'Excluir' : 'Continuar',
        }),
      ])
    },
  }),

  avatar: defineComponent({
    render: () => col([
      row([
        h(C('Avatar'), { name: 'Ana Silva', size: 'xs' }),
        h(C('Avatar'), { name: 'Bruno Costa', size: 'sm' }),
        h(C('Avatar'), { name: 'Carla Dias', size: 'md' }),
        h(C('Avatar'), { name: 'Daniel Lima', size: 'lg' }),
        h(C('Avatar'), { name: 'Eduardo Leandro', size: 'xl' }),
        h(C('Avatar'), { name: 'Fernanda Rocha', size: '2xl' }),
      ]),
      row([
        h(C('Avatar'), { name: 'Online', size: 'md', online: true }),
        h(C('Avatar'), { placeholder: true, size: 'md' }),
      ]),
      h(C('AvatarGroup'), { size: 'md', showAdd: true }, () => [
        h(C('Avatar'), { name: 'Ana Silva', size: 'md' }),
        h(C('Avatar'), { name: 'Bruno Costa', size: 'md' }),
        h(C('Avatar'), { name: 'Carla Dias', size: 'md' }),
        h(C('Avatar'), { name: 'Daniel Lima', size: 'md' }),
        h(C('Avatar'), { name: 'Eduardo Leandro', size: 'md' }),
      ]),
    ], '20px'),
  }),

  badge: defineComponent({
    render: () => col([
      row([
        h(C('Badge'), { variant: 'gray' }, () => 'Gray'),
        h(C('Badge'), { variant: 'primary' }, () => 'Primary'),
        h(C('Badge'), { variant: 'success' }, () => 'Success'),
        h(C('Badge'), { variant: 'warning' }, () => 'Warning'),
        h(C('Badge'), { variant: 'error' }, () => 'Error'),
        h(C('Badge'), { variant: 'outline' }, () => 'Outline'),
      ]),
      row([
        h(C('Badge'), { size: 'sm' }, () => 'Small'),
        h(C('Badge'), { size: 'md' }, () => 'Medium'),
        h(C('Badge'), { size: 'lg' }, () => 'Large'),
        h(C('Badge'), { dot: true, variant: 'success' }, () => 'Com dot'),
      ]),
    ], '16px'),
  }),

  breadcrumb: defineComponent({
    render: () => h(C('Breadcrumb'), {
      items: [
        { label: 'Home', href: '#' },
        { label: 'Eventos', href: '#' },
        { label: 'Meu evento', href: '#' },
        { label: 'Participantes' },
      ],
    }),
  }),

  button: defineComponent({
    render: () => col([
      row([
        h(C('Button'), { hierarchy: 'primary' }, () => 'Primary'),
        h(C('Button'), { hierarchy: 'secondary' }, () => 'Secondary'),
        h(C('Button'), { hierarchy: 'outline' }, () => 'Outline'),
        h(C('Button'), { hierarchy: 'link' }, () => 'Link'),
      ]),
      row(['sm', 'md', 'lg', 'xl', '2xl'].map(s =>
        h(C('Button'), { size: s, hierarchy: 'primary' }, () => s),
      )),
      row([
        h(C('Button'), { destructive: true }, () => 'Destructive'),
        h(C('Button'), { disabled: true }, () => 'Disabled'),
        h(C('Button'), { loading: true }, () => 'Loading'),
        h(C('Button'), { icon: 'only', hierarchy: 'outline' }, () => '⚙'),
      ]),
    ], '16px'),
  }),

  card: defineComponent({
    render: () => row([
      h(C('Card'), { title: 'Card simples', subtitle: 'Subtítulo do card', style: 'max-width:320px' }, () =>
        h('p', { style: 'margin:0;color:#737373' }, 'Conteúdo do card com tokens do design system.'),
      ),
    ]),
  }),

  charts: defineComponent({
    render: () => col([
      h(C('Chart'), { data: chartData, type: 'bar', height: 200 }),
      h(C('Chart'), { data: chartData, type: 'line', height: 200 }),
    ], '24px'),
  }),

  'checkbox-toggle': defineComponent({
    render: () => col([
      row([
        h(C('Checkbox'), { modelValue: false }, () => 'Unchecked'),
        h(C('Checkbox'), { modelValue: true }, () => 'Checked'),
        h(C('Checkbox'), { disabled: true }, () => 'Disabled'),
        h(C('Checkbox'), { size: 'sm' }, () => 'Small'),
      ]),
      row([
        h(C('Switch'), { modelValue: false }),
        h(C('Switch'), { modelValue: true }),
        h(C('Switch'), { disabled: true }),
        h(C('Switch'), { size: 'sm' }),
      ]),
      row([
        h(C('Radio'), { name: 'demo', value: 'a', modelValue: 'a' }, () => 'Opção A'),
        h(C('Radio'), { name: 'demo', value: 'b', modelValue: 'a' }, () => 'Opção B'),
        h(C('Radio'), { name: 'demo', value: 'c', disabled: true }, () => 'Opção C'),
      ]),
    ], '20px'),
  }),

  dialog: defineComponent({
    setup() {
      const open = ref(false)
      return () => col([
        h(C('Button'), { hierarchy: 'primary', onClick: () => { open.value = true } }, () => 'Abrir dialog'),
        h(C('Dialog'), {
          open: open.value,
          'onUpdate:open': (v: boolean) => { open.value = v },
          title: 'Editar perfil',
          description: 'Atualize suas informações abaixo.',
        }, () => h(C('Input'), { label: 'Nome', placeholder: 'Seu nome', style: 'width:100%' })),
      ])
    },
  }),

  dropdown: defineComponent({
    render: () => h(C('Dropdown'), {
      items: dropdownItems,
      style: 'display:inline-block',
    }),
  }),

  empty: defineComponent({
    render: () => col([
      h(C('Empty'), { size: 'md' }),
      h(C('Empty'), { size: 'sm', title: 'Lista vazia', description: 'Adicione o primeiro item.', hideActions: true }),
    ], '24px'),
  }),

  input: defineComponent({
    render: () => col([
      h(C('Input'), { label: 'E-mail', placeholder: 'voce@email.com', hint: 'Usaremos para notificações', style: 'max-width:360px' }),
      h(C('Input'), { label: 'Senha', type: 'password', placeholder: '••••••••', style: 'max-width:360px' }),
      h(C('Input'), { label: 'Campo com erro', error: 'Este campo é obrigatório', style: 'max-width:360px' }),
      row(['sm', 'md', 'lg'].map(s =>
        h(C('Input'), { size: s, placeholder: `Size ${s}`, style: 'max-width:200px' }),
      )),
    ], '16px'),
  }),

  modal: defineComponent({
    setup() {
      const open = ref(false)
      return () => col([
        h(C('Button'), { hierarchy: 'primary', onClick: () => { open.value = true } }, () => 'Abrir modal'),
        h(C('Modal'), {
          open: open.value,
          'onUpdate:open': (v: boolean) => { open.value = v },
          title: 'Modal de exemplo',
          description: 'Conteúdo do modal com overlay.',
          featuredIcon: true,
        }, () => h('p', { style: 'margin:0;color:#737373' }, 'Slot para conteúdo customizado.')),
      ])
    },
  }),

  navbar: defineComponent({
    render: () => col([
      h('div', { style: 'border:1px solid var(--doity-color-border-default);border-radius:8px;overflow:hidden' }, [
        h(C('Navbar'), { type: 'default' }),
      ]),
      h('div', { style: 'border:1px solid var(--doity-color-border-default);border-radius:8px;overflow:hidden' }, [
        h(C('Navbar'), { type: 'title', title: 'Dashboard' }),
      ]),
      h('div', { style: 'border:1px solid var(--doity-color-border-default);border-radius:8px;overflow:hidden' }, [
        h(C('Navbar'), { type: 'user' }),
      ]),
    ], '16px'),
  }),

  pagination: defineComponent({
    setup() {
      const page = ref(3)
      return () => col([
        h(C('Pagination'), {
          page: page.value,
          totalPages: 10,
          'onUpdate:page': (p: number) => { page.value = p },
        }),
        h('p', { style: 'margin:0;font-size:12px;color:#737373' }, `Página atual: ${page.value}`),
      ])
    },
  }),

  sidebar: defineComponent({
    render: () => h('div', { style: 'display:flex;height:480px;border:1px solid var(--doity-color-border-default);border-radius:8px;overflow:hidden' }, [
      h(C('Sidebar'), {
        roles: sidebarRoles,
        activeRole: 'organizer',
        items: sidebarItems,
        showCta: true,
        profileCard: { title: 'Perfil 80%', subtitle: 'Complete seu cadastro', progress: 80, progressLabel: '80% concluído' },
      }),
      h('div', { style: 'flex:1;padding:24px;background:var(--doity-color-background-secondary)' }, 'Área de conteúdo'),
    ]),
  }),

  sonner: defineComponent({
    setup() {
      const { success, error, warning, info } = useDoityToast()
      return () => col([
        row([
          h(C('Button'), { size: 'sm', onClick: () => success('Salvo com sucesso!') }, () => 'Success'),
          h(C('Button'), { size: 'sm', hierarchy: 'outline', onClick: () => error('Erro ao salvar') }, () => 'Error'),
          h(C('Button'), { size: 'sm', hierarchy: 'outline', onClick: () => warning('Verifique os dados') }, () => 'Warning'),
          h(C('Button'), { size: 'sm', hierarchy: 'outline', onClick: () => info('Nova atualização disponível') }, () => 'Info'),
        ]),
        h(C('Sonner')),
      ])
    },
  }),

  spinner: defineComponent({
    render: () => col([
      row(['sm', 'md', 'lg'].map(s => h(C('Spinner'), { size: s }))),
      row([
        h(C('Spinner'), { color: 'brand' }),
        h(C('Spinner'), { color: 'success' }),
        h(C('Spinner'), { color: 'warning' }),
        h(C('Spinner'), { color: 'error' }),
      ]),
    ], '16px'),
  }),

  table: defineComponent({
    render: () => h(C('Table'), { columns: tableColumns, data: tableData, striped: true }),
  }),

  tabs: defineComponent({
    setup() {
      const tab = ref('tab1')
      return () => col([
        h(C('Tabs'), {
          modelValue: tab.value,
          'onUpdate:modelValue': (v: string) => { tab.value = v },
          items: [
            { label: 'Geral', value: 'tab1' },
            { label: 'Configurações', value: 'tab2' },
            { label: 'Desabilitado', value: 'tab3', disabled: true },
          ],
        }, {
          default: () => [
            h(C('TabPanel'), { value: 'tab1' }, () => 'Conteúdo da aba Geral'),
            h(C('TabPanel'), { value: 'tab2' }, () => 'Conteúdo da aba Configurações'),
          ],
        }),
      ])
    },
  }),

  textarea: defineComponent({
    render: () => col([
      h(C('Textarea'), { label: 'Descrição', placeholder: 'Digite uma descrição...', hint: 'Máximo 500 caracteres', style: 'max-width:480px' }),
      h(C('Textarea'), { label: 'Com erro', error: 'Campo obrigatório', style: 'max-width:480px' }),
      h(C('Textarea'), { label: 'Desabilitado', disabled: true, style: 'max-width:480px' }),
    ], '16px'),
  }),

  tooltip: defineComponent({
    render: () => row([
      h(C('Tooltip'), { content: 'Tooltip no topo', position: 'top' }, () =>
        h(C('Button'), { hierarchy: 'outline', size: 'sm' }, () => 'Top'),
      ),
      h(C('Tooltip'), { content: 'Tooltip à direita', position: 'right' }, () =>
        h(C('Button'), { hierarchy: 'outline', size: 'sm' }, () => 'Right'),
      ),
      h(C('Tooltip'), { content: 'Tooltip embaixo', position: 'bottom' }, () =>
        h(C('Button'), { hierarchy: 'outline', size: 'sm' }, () => 'Bottom'),
      ),
      h(C('Tooltip'), { content: 'Tooltip à esquerda', position: 'left', theme: 'dark' }, () =>
        h(C('Button'), { hierarchy: 'outline', size: 'sm' }, () => 'Dark'),
      ),
    ]),
  }),
}
