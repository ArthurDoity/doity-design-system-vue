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

const chartSeries = [
  { name: 'Series 1', values: [720, 760, 700, 680, 740] },
  { name: 'Series 2', values: [480, 500, 460, 440, 490] },
]

const chartMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai']

const pieData = [
  { label: 'Series 1', value: 24 },
  { label: 'Series 2', value: 38 },
  { label: 'Series 3', value: 38 },
]

const menubarItems = [
  {
    label: 'File',
    items: [
      { label: 'New Tab', shortcut: '⌘T' },
      { label: 'New Window', shortcut: '⌘N' },
      { label: 'New Incognito Window', disabled: true },
      { divider: true },
      { label: 'Share', submenu: true },
      { divider: true },
      { label: 'Print..', shortcut: '⌘P' },
    ],
  },
  { label: 'Edit', items: [{ label: 'Undo', shortcut: '⌘Z' }] },
  { label: 'View', items: [{ label: 'Zoom In' }] },
  { label: 'Profiles', items: [{ label: 'Default' }] },
]

const navigationMenuItems = [
  { label: 'Home', children: [{ title: 'Overview', description: 'Resumo geral.' }] },
  {
    label: 'Components',
    columns: [
      [
        { title: 'Alert Dialog', description: 'Modal de confirmação.' },
        { title: 'Progress', description: 'Indicador de progresso.' },
        { title: 'Tabs', description: 'Seções em abas.' },
      ],
      [
        { title: 'Hover Card', description: 'Preview ao passar o mouse.' },
        { title: 'Scroll-area', description: 'Área com scroll.' },
        { title: 'Tooltip', description: 'Dica contextual.' },
      ],
    ],
  },
  { label: 'Docs', href: '#' },
]

const dropdownItems = [
  { section: true, label: 'Ações' },
  { label: 'Editar', value: 'edit', icon: true },
  { label: 'Duplicar', value: 'duplicate', icon: true, selected: true },
  { divider: true },
  { label: 'Arquivar', value: 'archive', checkbox: true },
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
      h(C('AccordionItem'), { title: 'Informações do Produto', open: true }, () => [
        h('p', 'Nosso produto principal combina tecnologia de ponta com um design elegante.'),
        h('p', 'Os principais recursos incluem capacidades de processamento avançadas.'),
      ]),
      h(C('AccordionItem'), { title: 'Como atualizar tokens?' }, () => 'Execute pnpm tokens:sync com seu token de acesso.'),
      h(C('AccordionItem'), { title: 'Desabilitado', disabled: true }, () => 'Conteúdo oculto'),
    ]),
  }),

  alert: defineComponent({
    render: () => col([
      h(C('Alert'), {
        title: 'Success! Your changes have been saved',
        description: 'This is an alert with icon, title and description.',
      }),
      h(C('Alert'), {
        title: 'This Alert has a title and an icon. No description.',
      }),
      h(C('Alert'), {
        variant: 'destructive',
        title: 'Unable to process your payment.',
      }, () => [
        h('p', { style: 'margin:0' }, 'Please verify your billing information and try again.'),
        h('ul', [
          h('li', 'Check your card details'),
          h('li', 'Ensure sufficient funds'),
          h('li', 'Verify billing address'),
        ]),
      ]),
    ], '12px'),
  }),

  'alert-banner': defineComponent({
    render: () => col([
      h(C('AlertBanner'), { variant: 'primary', badge: 'Novo recurso', message: 'Acabamos de lançar um novo recurso' }),
      h(C('AlertBanner'), { variant: 'error', badge: 'Erro', message: 'Houve um problema com essa ação' }),
      h(C('AlertBanner'), { variant: 'success', badge: 'Sucesso', message: 'Você atualizou seu perfil e detalhes', showArrow: true }),
      h(C('AlertBanner'), {
        variant: 'error',
        badgePosition: 'trailing',
        badge: 'Corrigir agora',
        message: 'Houve um problema com essa ação',
        showArrow: true,
      }),
    ], '12px'),
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
          title: 'Você tem certeza absoluta?',
          description: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores.',
          destructive: destructive.value,
          cancelLabel: 'Cancelar',
          confirmLabel: 'Continuar',
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
        h(C('Badge'), { variant: 'blue' }, () => 'Blue'),
        h(C('Badge'), { variant: 'purple' }, () => 'Purple'),
      ]),
      row([
        h(C('Badge'), { size: 'sm' }, () => 'Small'),
        h(C('Badge'), { size: 'md' }, () => 'Medium'),
        h(C('Badge'), { size: 'lg' }, () => 'Large'),
        h(C('Badge'), { icon: 'dot', variant: 'success' }, () => 'Com dot'),
        h(C('Badge'), { icon: 'close', variant: 'primary' }, () => 'Close'),
      ]),
    ], '16px'),
  }),

  breadcrumb: defineComponent({
    render: () => col([
      h(C('Breadcrumb'), {
        separator: 'slash',
        items: [
          { label: 'Home', href: '#' },
          { label: 'Components', href: '#' },
          { label: 'Breadcrumb' },
        ],
      }),
      h(C('Breadcrumb'), {
        separator: 'chevron',
        maxItems: 3,
        items: [
          { label: 'Home', href: '#' },
          { label: 'Docs', href: '#' },
          { label: 'Guides', href: '#' },
          { label: 'Components', href: '#' },
          { label: 'Breadcrumb' },
        ],
      }),
    ], '16px'),
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

  'button-group': defineComponent({
    render: () => col([
      h(C('ButtonGroup'), {}, () => [
        h(C('Button'), { hierarchy: 'outline' }, () => 'Archive'),
        h(C('Button'), { hierarchy: 'outline' }, () => 'Report'),
        h(C('Button'), { hierarchy: 'outline' }, () => 'Snooze'),
      ]),
      h(C('ButtonGroup'), { orientation: 'vertical' }, () => [
        h(C('Button'), { hierarchy: 'outline', icon: 'only' }, () => '+'),
        h(C('Button'), { hierarchy: 'outline', icon: 'only' }, () => '−'),
      ]),
      h(C('ButtonGroup'), { variant: 'secondary', size: 'sm' }, () => [
        h(C('Button'), { hierarchy: 'secondary' }, () => 'Copy'),
        h(C('Button'), { hierarchy: 'secondary' }, () => 'Paste'),
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

  'choice-option': defineComponent({
    setup() {
      const plan = ref('pro')
      const plans = ref(['basic'])
      const method = ref('pix')
      return () => col([
        h(C('ChoiceOption'), {
          modelValue: plan.value,
          'onUpdate:modelValue': (v: string) => { plan.value = v },
          name: 'plan',
          value: 'pro',
          label: 'Plano Pro (default)',
          description: 'Estilo legado',
          style: 'max-width:360px',
        }),
        h(C('CheckboxGroupItem'), {
          modelValue: plans.value,
          'onUpdate:modelValue': (v: string[]) => { plans.value = v },
          name: 'plans',
          value: 'basic',
          label: 'Plano básico R$10/mês',
          description: 'Inclui até 10 usuários, 20GB de dados individuais e acesso a todos os recursos.',
          style: 'max-width:480px',
        }),
        h(C('ChoiceOption'), {
          modelValue: method.value,
          'onUpdate:modelValue': (v: string) => { method.value = v },
          name: 'payment',
          value: 'pix',
          icon: 'pix',
          label: 'Pix',
          style: 'max-width:360px',
        }),
        h(C('ChoiceOption'), {
          modelValue: method.value,
          'onUpdate:modelValue': (v: string) => { method.value = v },
          name: 'payment',
          value: 'credit',
          icon: 'credit-card',
          label: 'Cartão de crédito',
          style: 'max-width:360px',
        }),
      ], '12px')
    },
  }),

  'checkbox-group-item': defineComponent({
    setup() {
      const plans = ref(['basic'])
      return () => col([
        h(C('CheckboxGroupItem'), {
          modelValue: plans.value,
          'onUpdate:modelValue': (v: string[]) => { plans.value = v },
          name: 'cgi',
          value: 'basic',
          label: 'Plano básico R$10/mês',
          description: 'Inclui até 10 usuários, 20GB de dados individuais e acesso a todos os recursos.',
          style: 'max-width:480px',
        }),
        h(C('CheckboxGroupItem'), {
          modelValue: plans.value,
          'onUpdate:modelValue': (v: string[]) => { plans.value = v },
          name: 'cgi',
          value: 'business',
          label: 'Business R$20/mês',
          description: 'Inclui até 20 usuários e 40GB de dados.',
          style: 'max-width:480px',
        }),
      ], '12px')
    },
  }),

  countdown: defineComponent({
    setup() {
      const plain = ref(125)
      const badge = ref(899)
      const ending = ref(9)
      const text = ref(884)
      return () => col([
        h(C('Countdown'), {
          modelValue: plain.value,
          'onUpdate:modelValue': (v: number) => { plain.value = v },
          auto: true,
        }),
        h(C('Countdown'), {
          modelValue: badge.value,
          'onUpdate:modelValue': (v: number) => { badge.value = v },
          variant: 'badge',
          auto: true,
        }),
        h(C('Countdown'), {
          modelValue: ending.value,
          'onUpdate:modelValue': (v: number) => { ending.value = v },
          variant: 'badge',
          auto: true,
        }),
        h(C('Countdown'), {
          modelValue: text.value,
          'onUpdate:modelValue': (v: number) => { text.value = v },
          variant: 'text',
          prefix: 'Expira em ',
          hint: 'Se expirar, será necessário realizar uma nova inscrição.',
          auto: true,
          style: 'max-width:420px',
        }),
      ], '20px')
    },
  }),

  charts: defineComponent({
    render: () => col([
      h(C('Chart'), { data: chartData, type: 'bar', height: 200, yAxisLabel: 'Usuários', xAxisLabel: 'Mês' }),
      h(C('Chart'), {
        type: 'line',
        legend: 'top',
        categories: chartMonths,
        series: chartSeries,
        height: 200,
        yAxisLabel: 'Usuários ativos',
        xAxisLabel: 'Mês',
      }),
      row([
        h(C('Chart'), { type: 'donut', data: pieData, legend: 'right', size: 'sm' }),
        h(C('Chart'), { type: 'circle', value: 40, label: 'Ativos', size: 'sm' }),
        h(C('Chart'), { type: 'progress', value: 40, progressVariant: 'trailing' }),
      ]),
    ], '24px'),
  }),

  'checkbox-toggle': defineComponent({
    setup() {
      const a = ref(true)
      const b = ref(false)
      const radio = ref('1')
      return () => col([
        row([
          h(C('Checkbox'), { modelValue: a.value, 'onUpdate:modelValue': (v: boolean) => { a.value = v } }, () => 'Check 1'),
          h(C('Checkbox'), { modelValue: b.value, 'onUpdate:modelValue': (v: boolean) => { b.value = v } }, () => 'Check 2'),
          h(C('Checkbox'), { disabled: true }, () => 'Disabled'),
          h(C('Checkbox'), { size: 'sm', modelValue: true }, () => 'Small'),
        ]),
        row([
          h(C('Switch'), { modelValue: false }),
          h(C('Switch'), { modelValue: true }),
          h(C('Switch'), { disabled: true }),
          h(C('Switch'), { size: 'sm' }),
        ]),
        row([
          h(C('Radio'), {
            name: 'demo',
            value: '1',
            modelValue: radio.value,
            'onUpdate:modelValue': (v: string) => { radio.value = v },
          }, () => 'Radio 1'),
          h(C('Radio'), {
            name: 'demo',
            value: '2',
            modelValue: radio.value,
            'onUpdate:modelValue': (v: string) => { radio.value = v },
          }, () => 'Radio 2'),
          h(C('Radio'), { name: 'demo', value: 'c', disabled: true }, () => 'Disabled'),
        ]),
      ], '20px')
    },
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
    render: () => row([
      h(C('Dropdown'), {
        items: dropdownItems,
        style: 'display:inline-block',
      }),
      h(C('Dropdown'), {
        items: [
          { section: true, label: 'South America' },
          { label: 'Brasil', value: 'br' },
          { label: 'Argentina', value: 'ar' },
          { label: 'Chile', value: 'cl' },
          { label: 'Uruguai', value: 'uy' },
          { section: true, label: 'Europe' },
          { label: 'Alemanha', value: 'de' },
          { label: 'França', value: 'fr' },
          { label: 'Itália', value: 'it' },
        ],
        maxHeight: '180px',
        style: 'display:inline-block',
      }),
    ], '16px'),
  }),

  'date-picker': defineComponent({
    setup() {
      const range = ref({ start: '2025-01-06', end: '2025-01-13' })
      return () => h(C('DatePicker'), {
        modelValue: range.value,
        'onUpdate:modelValue': (v: { start: string | null, end: string | null }) => { range.value = v },
        mode: 'range',
      })
    },
  }),

  empty: defineComponent({
    render: () => col([
      h(C('Empty'), {
        title: 'No Projects Yet',
        description: "You haven't created any projects yet.",
        primaryLabel: 'Create Project',
        secondaryLabel: 'Import Project',
        linkLabel: 'Learn More',
      }),
      h(C('Empty'), {
        variant: 'outline',
        title: 'Cloud Storage Empty',
        description: 'Upload files to your cloud storage.',
        primaryLabel: '',
        secondaryLabel: 'Upload Files',
      }),
      h(C('Empty'), {
        variant: 'muted',
        title: 'No Notifications',
        description: "You're all caught up.",
        primaryLabel: '',
        secondaryLabel: 'Refresh',
      }),
    ], '24px'),
  }),

  'file-dropzone': defineComponent({
    render: () => row([
      h(C('FileDropzone')),
      h(C('FileDropzone'), { active: true }),
    ], '16px'),
  }),

  'file-upload': defineComponent({
    render: () => row([
      h(C('FileUpload'), {
        status: 'uploading',
        fileName: 'Downloading...',
        meta: '129 MB / 1000 MB',
        progress: 45,
        cancelLabel: 'Cancel',
      }),
      h(C('FileUpload'), {
        status: 'complete',
        fileName: 'documento.docx',
        meta: '129 MB / 1000 MB',
      }),
    ], '16px'),
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
          title: 'Blog post published',
          description: 'This blog post has been published. Team members will be able to edit this post.',
          size: 'sm',
          layout: 'centered',
          featuredIcon: true,
          actions: 'stretch',
          showClose: false,
        }, {
          footer: () => [
            h(C('Button'), { hierarchy: 'outline', onClick: () => { open.value = false } }, () => 'Cancel'),
            h(C('Button'), { hierarchy: 'primary', onClick: () => { open.value = false } }, () => 'Confirm'),
          ],
        }),
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

  menubar: defineComponent({
    render: () => h('div', { style: 'min-height:260px;padding:8px' }, [
      h(C('Menubar'), { items: menubarItems, defaultOpen: 'File' }),
    ]),
  }),

  'navigation-menu': defineComponent({
    render: () => h('div', { style: 'min-height:360px;padding:8px' }, [
      h(C('NavigationMenu'), { items: navigationMenuItems, defaultOpen: 'Components' }),
    ]),
  }),

  pagination: defineComponent({
    setup() {
      const page = ref(3)
      const slide = ref(1)
      return () => col([
        h(C('Pagination'), {
          page: page.value,
          totalPages: 10,
          'onUpdate:page': (p: number) => { page.value = p },
        }),
        h(C('Pagination'), {
          page: page.value,
          totalPages: 5,
          variant: 'card',
          'onUpdate:page': (p: number) => { page.value = p },
        }),
        h(C('Pagination'), {
          page: slide.value,
          totalPages: 3,
          variant: 'dots',
          theme: 'primary',
          framed: true,
          'onUpdate:page': (p: number) => { slide.value = p },
        }),
        h('p', { style: 'margin:0;font-size:12px;color:#737373' }, `Página: ${page.value} · Slide: ${slide.value}`),
      ], '16px')
    },
  }),

  sonner: defineComponent({
    setup() {
      const { toast, success, error, warning, info, loading, dismissAll } = useDoityToast()
      return () => col([
        row([
          h(C('Button'), { size: 'sm', hierarchy: 'outline', onClick: () => toast('Event has been created') }, () => 'Default'),
          h(C('Button'), { size: 'sm', onClick: () => success('Event has been created') }, () => 'Success'),
          h(C('Button'), { size: 'sm', hierarchy: 'outline', onClick: () => info('Be at the area 10 minutes before the event') }, () => 'Info'),
          h(C('Button'), { size: 'sm', hierarchy: 'outline', onClick: () => warning('Event start time cannot be earlier than 8am') }, () => 'Warning'),
          h(C('Button'), { size: 'sm', hierarchy: 'outline', onClick: () => error('Event has not been created') }, () => 'Error'),
          h(C('Button'), { size: 'sm', hierarchy: 'outline', onClick: () => loading() }, () => 'Loading'),
          h(C('Button'), {
            size: 'sm',
            hierarchy: 'outline',
            onClick: () => toast({
              title: 'Event has been created',
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: { label: 'Undo' },
            }),
          }, () => 'Ação'),
          h(C('Button'), { size: 'sm', hierarchy: 'ghost', onClick: () => dismissAll() }, () => 'Limpar'),
        ]),
        h(C('Sonner')),
      ])
    },
  }),

  spinner: defineComponent({
    render: () => col([
      row(['xs', 'sm', 'md', 'lg'].map(s => h(C('Spinner'), { size: s }))),
      row([
        h(C('Spinner'), { color: 'red' }),
        h(C('Spinner'), { color: 'green' }),
        h(C('Spinner'), { color: 'blue' }),
        h(C('Spinner'), { color: 'yellow' }),
        h(C('Spinner'), { color: 'brand' }),
      ]),
      row([
        h(C('Spinner'), { type: 'spokes', size: 'sm' }),
        h(C('Spinner'), { type: 'spokes', size: 'md' }),
        h(C('Spinner'), { type: 'spokes', size: 'lg' }),
      ]),
    ], '16px'),
  }),

  'star-rating': defineComponent({
    setup() {
      const rating = ref(0)
      return () => col([
        h(C('StarRating'), {
          modelValue: rating.value,
          'onUpdate:modelValue': (v: number) => { rating.value = v },
        }),
        h('p', { style: 'margin:0;color:#737373;font:14px/20px system-ui' }, `Nota: ${rating.value}`),
        h(C('StarRating'), { demo: true }),
      ], '16px')
    },
  }),

  table: defineComponent({
    render: () => h(C('Table'), { columns: tableColumns, data: tableData, striped: true }),
  }),

  tabs: defineComponent({
    setup() {
      const tab = ref('ingressos')
      return () => col([
        h(C('Tabs'), {
          modelValue: tab.value,
          'onUpdate:modelValue': (v: string) => { tab.value = v },
          items: [
            { label: 'Ingressos', value: 'ingressos' },
            { label: 'Eventos', value: 'eventos' },
            { label: 'Cursos', value: 'cursos' },
            { label: 'Trabalhos', value: 'trabalhos' },
            { label: 'Minha Conta', value: 'conta' },
            { label: 'Ajuda', value: 'ajuda' },
          ],
        }, {
          default: () => [
            h(C('TabPanel'), { value: 'ingressos' }, () => 'Conteúdo de Ingressos'),
            h(C('TabPanel'), { value: 'eventos' }, () => 'Conteúdo de Eventos'),
            h(C('TabPanel'), { value: 'cursos' }, () => 'Conteúdo de Cursos'),
            h(C('TabPanel'), { value: 'trabalhos' }, () => 'Conteúdo de Trabalhos'),
            h(C('TabPanel'), { value: 'conta' }, () => 'Conteúdo de Minha Conta'),
            h(C('TabPanel'), { value: 'ajuda' }, () => 'Conteúdo de Ajuda'),
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
