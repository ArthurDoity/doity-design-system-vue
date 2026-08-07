export interface PropDoc {
  description: string
  control?: string | boolean | object
  options?: unknown[]
  type?: string
  default?: string | boolean | number
  table?: Record<string, unknown>
}

export interface ComponentDocEntry {
  exportName?: string
  description: string
  usage: string
  props?: Record<string, PropDoc>
  events?: Record<string, string>
  slots?: Record<string, string>
}

export const componentDocs = {
  Accordion: {
    exportName: 'DoityAccordion',
    description:
      'Lista de painéis expansíveis (estilo flush, divisor inferior). Use com `DoityAccordionItem`.',
    usage: `<DoityAccordion>
  <DoityAccordionItem title="Informações do Produto" :open="true">
    <p>Conteúdo do painel.</p>
  </DoityAccordionItem>
</DoityAccordion>`,
    props: {
      multiple: {
        description: 'Permite vários itens abertos',
        type: 'boolean',
        default: false,
        control: 'boolean',
      },
    },
    slots: {
      default: 'Lista de `DoityAccordionItem`',
    },
  },

  AccordionItem: {
    exportName: 'DoityAccordionItem',
    description:
      'Item do Accordion: título medium 14/20, chevron 16px, conteúdo regular primary com gap 16px.',
    usage: `<DoityAccordionItem title="Informações do Produto" :open="true">
  <p>Texto do painel.</p>
</DoityAccordionItem>`,
    props: {
      title: { description: 'Título do cabeçalho', type: 'string', control: 'text' },
      value: { description: 'Identificador opcional do item', type: 'string', control: 'text' },
      open: { description: 'Aberto (v-model:open)', type: 'boolean', control: 'boolean' },
      disabled: { description: 'Desabilita o item', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:open': 'Emitido ao abrir/fechar',
    },
    slots: {
      default: 'Conteúdo do painel',
    },
  },

  Alert: {
    exportName: 'DoityAlert',
    description:
      'Alert card: fundo branco, borda, ícone 16px + título/descrição. Variante destructive com texto vermelho. Use o slot default para listas ou conteúdo rico.',
    usage: `<DoityAlert
  title="Success! Your changes have been saved"
  description="This is an alert with icon, title and description."
/>

<DoityAlert variant="destructive" title="Unable to process your payment.">
  <p>Please verify your billing information and try again.</p>
  <ul>
    <li>Check your card details</li>
    <li>Ensure sufficient funds</li>
  </ul>
</DoityAlert>`,
    props: {
      variant: {
        description: 'Estilo',
        type: "'default' | 'success' | 'warning' | 'info' | 'destructive' | 'error'",
        default: 'default',
        control: 'select',
        options: ['default', 'success', 'warning', 'info', 'destructive', 'error'],
      },
      title: { description: 'Título', type: 'string', control: 'text' },
      description: { description: 'Texto de apoio (ou use o slot)', type: 'string', control: 'text' },
      icon: { description: 'Exibe ícone built-in', type: 'boolean', default: true, control: 'boolean' },
      dismissible: { description: 'Botão fechar', type: 'boolean', default: false, control: 'boolean' },
      animated: {
        description: 'Animação de entrada/saída (útil quando o alert surge após uma ação)',
        type: 'boolean',
        default: true,
        control: 'boolean',
      },
      modelValue: {
        description: 'Visibilidade controlada (v-model) — permite animar a saída ao esconder',
        type: 'boolean',
        default: true,
        control: 'boolean',
      },
    },
    events: {
      dismiss: 'Emitido ao fechar',
      'update:modelValue': 'Sincroniza visibilidade (v-model)',
    },
    slots: {
      default: 'Corpo (description / lista)',
      icon: 'Ícone customizado',
    },
  },

  AlertBanner: {
    exportName: 'DoityAlertBanner',
    description:
      'Alert pill / banner compacto: badge + mensagem, cores semânticas, seta opcional, badge leading ou trailing.',
    usage: `<DoityAlertBanner
  variant="success"
  badge="Sucesso"
  message="Você atualizou seu perfil e detalhes"
/>
<DoityAlertBanner
  variant="error"
  badge-position="trailing"
  badge="Corrigir agora"
  message="Houve um problema com essa ação"
  show-arrow
/>`,
    props: {
      variant: {
        description: 'Cor semântica',
        type: "'primary' | 'gray' | 'error' | 'warning' | 'success'",
        default: 'primary',
        control: 'select',
        options: ['primary', 'gray', 'error', 'warning', 'success'],
      },
      badgePosition: {
        description: 'Posição do badge',
        type: "'leading' | 'trailing'",
        default: 'leading',
        control: 'select',
        options: ['leading', 'trailing'],
      },
      badge: { description: 'Texto do badge', type: 'string', control: 'text' },
      message: { description: 'Mensagem', type: 'string', control: 'text' },
      size: {
        description: 'Tamanho',
        type: "'md' | 'lg'",
        default: 'md',
        control: 'select',
        options: ['md', 'lg'],
      },
      showArrow: { description: 'Seta de ação (torna o banner interativo + hover)', type: 'boolean', default: false, control: 'boolean' },
      href: { description: 'Se definido, renderiza como link', type: 'string', control: 'text' },
      animated: {
        description: 'Animação de entrada/saída',
        type: 'boolean',
        default: true,
        control: 'boolean',
      },
      modelValue: {
        description: 'Visibilidade controlada (v-model)',
        type: 'boolean',
        default: true,
        control: 'boolean',
      },
    },
    events: {
      click: 'Clique quando interativo (href ou showArrow)',
      'update:modelValue': 'Sincroniza visibilidade (v-model)',
    },
    slots: {
      default: 'Mensagem',
      badge: 'Badge customizado',
    },
  },

  AlertDialog: {
    exportName: 'DoityAlertDialog',
    description:
      'Confirmação (Cancelar/Continuar), sem campos. Construído sobre DoityModal (role=alertdialog, size lg, sem botão X). Para formulários use DoityDialog; para layout custom use DoityModal.',
    usage: `<DoityAlertDialog
  v-model:open="open"
  title="Você tem certeza absoluta?"
  description="Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores."
  cancel-label="Cancelar"
  confirm-label="Continuar"
  @confirm="onConfirm"
/>`,
    props: {
      open: { description: 'Controla visibilidade (v-model:open)', type: 'boolean', default: false, control: 'boolean' },
      title: { description: 'Título do diálogo', type: 'string', control: 'text' },
      description: { description: 'Texto descritivo', type: 'string', control: 'text' },
      cancelLabel: { description: 'Rótulo do botão cancelar', type: 'string', default: 'Cancelar', control: 'text' },
      confirmLabel: { description: 'Rótulo do botão confirmar', type: 'string', default: 'Continuar', control: 'text' },
      destructive: { description: 'Estilo destrutivo no botão confirmar', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:open': 'Emitido ao abrir/fechar',
      confirm: 'Emitido ao confirmar',
      cancel: 'Emitido ao cancelar',
    },
  },

  Avatar: {
    exportName: 'DoityAvatar',
    description:
      'Avatar circular (Figma): foto, iniciais ou ícone placeholder; indicador online/offline com tamanhos xs–2xl.',
    usage: `<DoityAvatar name="Olívia Silva" size="md" online />
<DoityAvatar src="/foto.jpg" size="lg" status="online" />
<DoityAvatar placeholder size="md" />
<DoityAvatar name="OR" size="xl" />`,
    props: {
      src: { description: 'URL da imagem de perfil', type: 'string', control: 'text' },
      alt: { description: 'Texto alternativo da imagem', type: 'string', control: 'text' },
      name: { description: 'Nome para gerar iniciais (sem imagem)', type: 'string', control: 'text' },
      size: {
        description: 'Tamanho',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        default: 'md',
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      },
      status: {
        description: 'Indicador de presença: true/online · offline · false',
        type: "boolean | 'online' | 'offline'",
        default: false,
        control: 'select',
        options: [false, true, 'online', 'offline'],
      },
      online: { description: 'Alias de status=online (API legada)', type: 'boolean', default: false, control: 'boolean' },
      placeholder: { description: 'Força ícone de usuário', type: 'boolean', default: false, control: 'boolean' },
    },
  },

  AvatarGroup: {
    exportName: 'DoityAvatarGroup',
    description:
      'Grupo de avatares sobrepostos (Figma Avatar group): overflow +N, botão adicionar com tooltip “Adicionar usuário”.',
    usage: `<DoityAvatarGroup size="md" :max="5" show-add show-more>
  <DoityAvatar name="Ana" />
  <DoityAvatar name="Bruno" />
  <DoityAvatar name="Carla" />
  <DoityAvatar name="Daniel" />
  <DoityAvatar name="Eduardo" />
  <DoityAvatar name="Fernanda" />
</DoityAvatarGroup>`,
    props: {
      size: {
        description: 'Tamanho do grupo (xs/sm/md)',
        type: "'xs' | 'sm' | 'md'",
        default: 'md',
        control: 'select',
        options: ['xs', 'sm', 'md'],
      },
      max: { description: 'Máximo de avatares visíveis', type: 'number', default: 5, control: 'number' },
      total: { description: 'Total para calcular +N (opcional)', type: 'number', control: 'number' },
      showAdd: { description: 'Botão adicionar com tooltip', type: 'boolean', default: false, control: 'boolean' },
      showMore: { description: 'Exibe badge +N', type: 'boolean', default: true, control: 'boolean' },
      addLabel: { description: 'Label/tooltip do botão', type: 'string', default: 'Adicionar usuário', control: 'text' },
      disabledAdd: { description: 'Desabilita o botão adicionar', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      add: 'Emitido ao clicar em adicionar',
    },
    slots: {
      default: 'Avatares (DoityAvatar)',
    },
  },

  AvatarLabelGroup: {
    exportName: 'DoityAvatarLabelGroup',
    description:
      'Avatar + nome + texto de apoio (Figma Avatar label group). Tamanhos sm–xl, com ou sem status online.',
    usage: `<DoityAvatarLabelGroup
  name="Olívia Silva"
  description="olivia@doity.com.br"
  size="md"
  online
/>`,
    props: {
      src: { description: 'URL da imagem', type: 'string', control: 'text' },
      name: { description: 'Nome', type: 'string', control: 'text' },
      description: { description: 'Texto de apoio (e-mail, handle…)', type: 'string', control: 'text' },
      size: {
        description: 'Tamanho',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: 'md',
        control: 'select',
        options: ['sm', 'md', 'lg', 'xl'],
      },
      status: {
        description: 'Indicador de presença',
        type: "boolean | 'online' | 'offline'",
        default: false,
        control: 'select',
        options: [false, true, 'online', 'offline'],
      },
      online: { description: 'Alias de status=online', type: 'boolean', default: false, control: 'boolean' },
      placeholder: { description: 'Ícone placeholder', type: 'boolean', default: false, control: 'boolean' },
    },
    slots: {
      default: 'Nome customizado',
      description: 'Texto de apoio customizado',
      avatar: 'Substitui o DoityAvatar',
    },
  },

  Badge: {
    exportName: 'DoityBadge',
    description:
      'Tag/badge pill (Figma Tags): cores semânticas e de destaque, tamanhos sm/md/lg, layouts com dot, avatar, ícone, close e only. Micro-scale ao montar e ao mudar o texto.',
    usage: `<DoityBadge variant="primary" size="md">Label</DoityBadge>
<DoityBadge variant="success" icon="dot">Ativo</DoityBadge>
<DoityBadge variant="gray" icon="close" @close="remover">Filtro</DoityBadge>`,
    props: {
      variant: {
        description: 'Cor (aliases: brand→primary, info→blue)',
        type: 'string',
        default: 'gray',
        control: 'select',
        options: [
          'gray',
          'primary',
          'error',
          'warning',
          'success',
          'blue',
          'blue-gray',
          'blue-light',
          'indigo',
          'purple',
          'pink',
          'rose',
          'orange',
          'outline',
        ],
      },
      size: {
        description: 'sm 12/18 · md/lg 14/20',
        type: "'sm' | 'md' | 'lg'",
        default: 'md',
        control: 'select',
        options: ['sm', 'md', 'lg'],
      },
      icon: {
        description: 'Layout de ícone',
        type: "'none' | 'dot' | 'leading' | 'trailing' | 'close' | 'only'",
        default: 'none',
        control: 'select',
        options: ['none', 'dot', 'leading', 'trailing', 'close', 'only'],
      },
      dot: { description: 'Atalho para icon=dot', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      close: 'Emitido ao clicar no X (icon="close")',
    },
    slots: {
      default: 'Texto (ou ícone se icon="only")',
      'icon-leading': 'Ícone à esquerda',
      'icon-trailing': 'Ícone à direita',
      avatar: 'Avatar 16px à esquerda',
      country: 'Bandeira/país 16px à esquerda',
      icon: 'Ícone (leading ou only)',
    },
  },

  Breadcrumb: {
    exportName: 'DoityBreadcrumb',
    description:
      'Navegação hierárquica (Figma Breadcrumb): separador slash ou chevron (vermelho), item atual em destaque, dropdown opcional e colapso com ellipsis (`maxItems`).',
    usage: `<DoityBreadcrumb
  separator="chevron"
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' },
  ]"
/>

<DoityBreadcrumb
  separator="slash"
  :items="[
    { label: 'Home', href: '/' },
    {
      label: 'Components',
      dropdown: [
        { label: 'Button', value: 'button' },
        { label: 'Input', value: 'input' },
      ],
    },
    { label: 'Breadcrumb' },
  ]"
/>

<DoityBreadcrumb :max-items="3" :items="longPath" />`,
    props: {
      items: {
        description: '`{ label, href?, to?, dropdown?, current? }[]`',
        type: 'Array',
        control: 'object',
      },
      separator: {
        description: 'slash | chevron',
        type: 'string',
        default: 'chevron',
        control: 'select',
        options: ['slash', 'chevron'],
      },
      maxItems: {
        description: 'Máximo de itens visíveis; colapsa o meio com …',
        type: 'number',
        control: { type: 'number', min: 2, max: 10 },
      },
    },
    events: {
      select: 'Emitido ao clicar em item/dropdown/ellipsis',
      'ellipsis-select': 'Emitido ao escolher item oculto no ellipsis',
    },
    slots: {
      default: 'Itens customizados (substitui prop items)',
    },
  },

  Button: {
    exportName: 'DoityButton',
    description: 'Botão de ação com hierarquias, tamanhos, ícones e estados.',
    usage: `<DoityButton hierarchy="primary" size="md" @click="salvar">
  Salvar
</DoityButton>`,
    props: {
      hierarchy: { description: 'Estilo visual do botão', type: "'primary' | 'secondary' | 'outline' | 'link'", default: 'primary', control: 'select', options: ['primary', 'secondary', 'outline', 'link'] },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: 'md', control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
      icon: { description: 'Posição do ícone', type: "'none' | 'dot' | 'leading' | 'trailing' | 'only'", default: 'none', control: 'select', options: ['none', 'dot', 'leading', 'trailing', 'only'] },
      destructive: { description: 'Variante destrutiva (vermelho)', type: 'boolean', default: false, control: 'boolean' },
      disabled: { description: 'Desabilita o botão', type: 'boolean', default: false, control: 'boolean' },
      loading: { description: 'Exibe spinner e bloqueia clique', type: 'boolean', default: false, control: 'boolean' },
      type: { description: 'Tipo do elemento button', type: 'string', default: 'button', control: 'text' },
      href: { description: 'Se definido, renderiza como link `<a>`', type: 'string', control: 'text' },
      target: { description: 'Target do link (ex: `_blank`)', type: 'string', control: 'text' },
    },
    events: {
      click: 'Emitido ao clicar (bloqueado se disabled ou loading)',
    },
    slots: {
      default: 'Rótulo do botão',
      'icon-leading': 'Ícone à esquerda (quando icon="leading")',
      'icon-trailing': 'Ícone à direita (quando icon="trailing")',
    },
  },

  ButtonGroup: {
    exportName: 'DoityButtonGroup',
    description:
      'Agrupa botões (e inputs) num único bloco com borda compartilhada. Com `v-model` (índice), o highlight desliza entre segmentos. Aninhe grupos para toolbars com gap.',
    usage: `<DoityButtonGroup>
  <DoityButton hierarchy="outline">Archive</DoityButton>
  <DoityButton hierarchy="outline">Report</DoityButton>
</DoityButtonGroup>

<DoityButtonGroup v-model="active" variant="secondary">
  <DoityButton hierarchy="outline">Dia</DoityButton>
  <DoityButton hierarchy="outline">Semana</DoityButton>
  <DoityButton hierarchy="outline">Mês</DoityButton>
</DoityButtonGroup>`,
    props: {
      orientation: {
        description: 'Direção dos segmentos',
        type: "'horizontal' | 'vertical'",
        default: 'horizontal',
        control: 'select',
        options: ['horizontal', 'vertical'],
      },
      size: {
        description: 'Altura dos segmentos: sm≈32, md≈36, lg≈40',
        type: "'sm' | 'md' | 'lg'",
        default: 'md',
        control: 'select',
        options: ['sm', 'md', 'lg'],
      },
      variant: {
        description: 'Fundo do grupo',
        type: "'default' | 'secondary'",
        default: 'default',
        control: 'select',
        options: ['default', 'secondary'],
      },
      modelValue: {
        description: 'Índice ativo (v-model). null = sem highlight deslizante',
        type: 'number | null',
        default: null,
        control: { type: 'number', min: 0 },
      },
    },
    events: {
      'update:modelValue': 'Índice do segmento clicado',
      change: 'Mesmo valor do modelValue',
    },
    slots: {
      default: 'DoityButton, DoityInput ou outros DoityButtonGroup (nested)',
    },
  },

  Card: {
    exportName: 'DoityCard',
    description: 'Container de conteúdo com cabeçalho, corpo e rodapé opcionais.',
    usage: `<DoityCard title="Título" subtitle="Subtítulo">
  Conteúdo do card.
</DoityCard>`,
    props: {
      title: { description: 'Título do cabeçalho', type: 'string', control: 'text' },
      subtitle: { description: 'Subtítulo abaixo do título', type: 'string', control: 'text' },
    },
    slots: {
      default: 'Corpo do card',
      header: 'Cabeçalho customizado',
      footer: 'Rodapé do card',
    },
  },

  CreditCard: {
    exportName: 'DoityCreditCard',
    description:
      'Mockup de cartão de crédito (Figma): temas glass, sólido, strip horizontal/vertical e gradient. Hover com tilt 3D suave + shine.',
    usage: `<DoityCreditCard
  theme="transparent"
  brand="Doity"
  holder="OLIVIA SILVA"
  number="1234 1234 1234 1234"
  expiry="06/24"
/>`,
    props: {
      theme: {
        description: 'Tema visual do cartão',
        type: 'string',
        default: 'transparent',
        control: 'select',
        options: [
          'transparent',
          'transparent-gradient',
          'primary-dark',
          'primary-light',
          'gray-light',
          'gray-dark',
          'primary-light-gradient',
          'gray-light-gradient',
          'transparent-strip',
          'gray-strip',
          'gradient-strip',
          'salmon-strip',
          'gray-strip-vertical',
          'gradient-strip-vertical',
          'salmon-strip-vertical',
          'transparent-gradient-strip',
          'transparent-gradient-strip-vertical',
        ],
      },
      brand: { description: 'Marca no topo', type: 'string', default: 'Doity', control: 'text' },
      holder: { description: 'Nome do titular', type: 'string', control: 'text' },
      number: { description: 'Número do cartão', type: 'string', control: 'text' },
      expiry: { description: 'Validade', type: 'string', control: 'text' },
      interactive: {
        description: 'Tilt 3D + shine no hover',
        type: 'boolean',
        default: true,
        control: 'boolean',
      },
    },
  },

  ChoiceOption: {
    exportName: 'DoityChoiceOption',
    description:
      'Item de Checkbox Group. Variantes: default (legado), control (reusa DoityCheckbox/DoityRadio como indicador à esquerda), icon (featured icon + check à direita), card (header + preço/tag com DoityBadge). Animações de seleção preservadas. Alias: DoityCheckboxGroupItem (defaults variant=control, type=checkbox).',
    usage: `<DoityChoiceOption v-model="plan" name="plan" value="pro" label="Plano Pro" />

<DoityCheckboxGroupItem
  v-model="plans"
  value="basic"
  label="Plano básico R$10/mês"
  description="Inclui até 10 usuários..."
/>

<DoityChoiceOption
  v-model="person"
  variant="icon"
  type="checkbox"
  value="olivia"
  label="Olivia Silva"
>
  <template #icon><!-- SVG --></template>
</DoityChoiceOption>

<DoityChoiceOption
  v-model="plan"
  variant="card"
  value="basic"
  label="Plano básico"
  price="$10"
  price-suffix="por mês"
  tag="Somente por tempo limitado"
  description="Inclui até 10 usuários..."
/>`,
    props: {
      modelValue: {
        description: 'Valor selecionado (string/number) ou array se checkbox',
        type: 'string | number | Array',
        default: '',
        control: 'text',
      },
      value: { description: 'Valor desta opção', type: 'string | number', control: 'text' },
      label: { description: 'Texto principal', type: 'string', control: 'text' },
      description: { description: 'Texto secundário', type: 'string', default: '', control: 'text' },
      name: { description: 'Nome do grupo HTML', type: 'string', control: 'text' },
      variant: {
        description: 'Layout: default | control | icon | card',
        type: "'default' | 'control' | 'icon' | 'card'",
        default: 'default',
        control: 'select',
        options: ['default', 'control', 'icon', 'card'],
      },
      icon: {
        description: 'Ícone built-in de conveniência (prefira slot icon)',
        type: "'' | 'pix' | 'credit-card'",
        default: '',
        control: 'select',
        options: ['', 'pix', 'credit-card'],
      },
      type: {
        description: 'radio (única) ou checkbox (múltipla)',
        type: "'radio' | 'checkbox'",
        default: 'radio',
        control: 'select',
        options: ['radio', 'checkbox'],
      },
      control: {
        description: 'Estilo do indicador (auto se vazio)',
        type: "'' | 'checkbox' | 'radio' | 'check-circle'",
        default: '',
        control: 'select',
        options: ['', 'checkbox', 'radio', 'check-circle'],
      },
      size: {
        description: 'Tamanho tipográfico/controle',
        type: "'sm' | 'md'",
        default: 'sm',
        control: 'select',
        options: ['sm', 'md'],
      },
      showCheck: { description: 'Mostra o check à direita', type: 'boolean', default: true, control: 'boolean' },
      price: { description: 'Preço (variant=card)', type: 'string', default: '', control: 'text' },
      priceSuffix: { description: 'Sufixo do preço', type: 'string', default: '', control: 'text' },
      tag: { description: 'Badge (variant=card)', type: 'string', default: '', control: 'text' },
      disabled: { description: 'Desabilita interação', type: 'boolean', default: false, control: 'boolean' },
      id: { description: 'ID do input', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido ao selecionar / alternar',
      select: 'Emitido com o valor (ou array no checkbox)',
    },
    slots: {
      default: 'Label (alternativa à prop label)',
      icon: 'Ícone customizado',
      description: 'Descrição customizada',
      price: 'Preço customizado (card)',
      tag: 'Badge customizado (card)',
      check: 'Indicador de selecionado',
      trailing: 'Área à direita (substitui o check)',
    },
  },

  CheckboxGroupItem: {
    exportName: 'DoityCheckboxGroupItem',
    description:
      'Alias de DoityChoiceOption com defaults do Checkbox group (variant=control, type=checkbox).',
    usage: `<DoityCheckboxGroupItem
  v-model="plans"
  value="basic"
  label="Plano básico R$10/mês"
  description="Inclui até 10 usuários..."
/>`,
    props: {
      variant: {
        description: 'Default: control',
        type: "'default' | 'control' | 'icon' | 'card'",
        default: 'control',
        control: 'select',
        options: ['default', 'control', 'icon', 'card'],
      },
      type: {
        description: 'Default: checkbox',
        type: "'radio' | 'checkbox'",
        default: 'checkbox',
        control: 'select',
        options: ['radio', 'checkbox'],
      },
    },
  },

  Countdown: {
    exportName: 'DoityCountdown',
    description:
      'Temporizador genérico com tabular-nums e rolagem de dígitos. Variantes plain (só tempo), badge (pill sobre DoityBadge) e text (prefixo + hint opcionais). Formato auto | mm:ss | hh:mm:ss.',
    usage: `<DoityCountdown v-model="seconds" auto />
<DoityCountdown v-model="seconds" variant="badge" auto />
<DoityCountdown
  v-model="seconds"
  variant="text"
  prefix="Expira em "
  hint="Se expirar, será necessário realizar uma nova inscrição."
  auto
/>`,
    props: {
      modelValue: {
        description: 'Segundos restantes (v-model)',
        type: 'number',
        default: 0,
        control: { type: 'number', min: 0 },
      },
      variant: {
        description: 'Aparência',
        type: "'plain' | 'badge' | 'text'",
        default: 'plain',
        control: 'select',
        options: ['plain', 'badge', 'text'],
      },
      format: {
        description: 'Formato do tempo',
        type: "'auto' | 'mm:ss' | 'hh:mm:ss'",
        default: 'auto',
        control: 'select',
        options: ['auto', 'mm:ss', 'hh:mm:ss'],
      },
      auto: { description: 'Decrementa 1s automaticamente', type: 'boolean', default: false, control: 'boolean' },
      paused: { description: 'Pausa o auto-tick', type: 'boolean', default: false, control: 'boolean' },
      endingThreshold: {
        description: 'Segundos para estado urgente (0 = off)',
        type: 'number',
        default: 10,
        control: { type: 'number', min: 0 },
      },
      prefix: { description: 'Texto antes do tempo (variant text)', type: 'string', default: '', control: 'text' },
      hint: { description: 'Texto de apoio (variant text)', type: 'string', default: '', control: 'text' },
      showIcon: { description: 'Ícone no badge', type: 'boolean', default: true, control: 'boolean' },
      blink: { description: 'Piscar o separador :', type: 'boolean', default: true, control: 'boolean' },
      tone: {
        description: 'Paleta (neutral = preto; brand = vermelho Doity)',
        type: "'brand' | 'neutral'",
        default: 'neutral',
        control: 'select',
        options: ['brand', 'neutral'],
      },
      label: { description: 'aria-label base', type: 'string', default: 'Tempo restante', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido a cada tick / mudança',
      tick: 'Emitido a cada segundo (auto)',
      end: 'Emitido ao chegar em 0',
    },
    slots: {
      icon: 'Ícone do badge',
      prefix: 'Prefixo (variant text)',
      hint: 'Hint (variant text)',
    },
  },

  Chart: {
    exportName: 'DoityChart',
    description:
      'Charts do Figma: barra (simples/stacked), linha/área multi-série, pizza/donut, progress linear, círculo/semicírculo, activity gauge e radar. SVG puro com tokens Brand.',
    usage: `<DoityChart
  type="line"
  legend="top"
  y-axis-label="Usuários ativos"
  x-axis-label="Mês"
  :categories="['Jan','Feb','Mar']"
  :series="[
    { name: 'Series 1', values: [720, 760, 700] },
    { name: 'Series 2', values: [480, 500, 460] },
  ]"
/>

<DoityChart type="progress" :value="40" progress-variant="floating-top" />
<DoityChart type="circle" :value="40" label="Usuários ativos" size="md" />
<DoityChart type="donut" legend="right" :data="[{ label: 'A', value: 24 }, { label: 'B', value: 38 }]" />`,
    props: {
      type: {
        description: 'bar | line | area | pie | donut | progress | circle | half-circle | activity | radar',
        type: 'string',
        default: 'bar',
        control: 'select',
        options: ['bar', 'line', 'area', 'pie', 'donut', 'progress', 'circle', 'half-circle', 'activity', 'radar'],
      },
      data: { description: '`{ label, value }` ou `{ label, values[] }` (stacked)', type: 'Array', control: 'object' },
      series: { description: 'Multi-série: `{ name, values[], color? }[]`', type: 'Array', control: 'object' },
      categories: { description: 'Labels do eixo X (com series)', type: 'Array', control: 'object' },
      height: { description: 'Altura do plot cartesiano (px)', type: 'number', default: 240, control: 'number' },
      legend: { description: 'false | top | right | bottom', type: 'boolean | string', default: false, control: 'select', options: [false, 'top', 'right', 'bottom'] },
      showAxis: { description: 'Exibe eixos e grid', type: 'boolean', default: true, control: 'boolean' },
      xAxisLabel: { description: 'Título do eixo X', type: 'string', control: 'text' },
      yAxisLabel: { description: 'Título do eixo Y', type: 'string', control: 'text' },
      stacked: { description: 'Barras empilhadas', type: 'boolean', default: false, control: 'boolean' },
      hole: { description: 'Furo do donut (0–0.75)', type: 'number', default: 0.5, control: { type: 'number', min: 0, max: 0.75, step: 0.25 } },
      value: { description: '0–100 (progress / circle)', type: 'number', default: 0, control: { type: 'number', min: 0, max: 100 } },
      label: { description: 'Label central (circle / activity)', type: 'string', control: 'text' },
      centerValue: { description: 'Texto/valor central (activity)', type: 'string | number', control: 'text' },
      size: { description: 'xxs | xs | sm | md | lg', type: 'string', default: 'md', control: 'select', options: ['xxs', 'xs', 'sm', 'md', 'lg'] },
      progressVariant: {
        description: 'plain | trailing | bottom | floating-top | floating-bottom',
        type: 'string',
        default: 'plain',
        control: 'select',
        options: ['plain', 'trailing', 'bottom', 'floating-top', 'floating-bottom'],
      },
      curve: { description: 'Suaviza linhas', type: 'boolean', default: true, control: 'boolean' },
    },
  },

  Checkbox: {
    exportName: 'DoityCheckbox',
    description: 'Caixa de seleção com label, estados e animação de check (press + spring).',
    usage: `<DoityCheckbox v-model="aceito" label="Aceito os termos" />`,
    props: {
      modelValue: { description: 'Valor selecionado (v-model)', type: 'boolean', default: false, control: 'boolean' },
      label: { description: 'Rótulo ao lado do checkbox', type: 'string', control: 'text' },
      hint: { description: 'Texto de ajuda abaixo', type: 'string', control: 'text' },
      disabled: { description: 'Desabilita interação', type: 'boolean', default: false, control: 'boolean' },
      indeterminate: { description: 'Estado indeterminado', type: 'boolean', default: false, control: 'boolean' },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      id: { description: 'ID do input (gerado automaticamente se omitido)', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido quando o valor muda',
    },
  },

  Switch: {
    exportName: 'DoitySwitch',
    description: 'Alternância on/off com slide elástico do thumb e press no track.',
    usage: `<DoitySwitch v-model="ativo" label="Notificações" size="md" />`,
    props: {
      modelValue: { description: 'Estado ligado/desligado (v-model)', type: 'boolean', default: false, control: 'boolean' },
      label: { description: 'Rótulo ao lado do switch', type: 'string', control: 'text' },
      disabled: { description: 'Desabilita interação', type: 'boolean', default: false, control: 'boolean' },
      size: { description: 'Tamanho', type: "'sm' | 'md'", default: 'md', control: 'select', options: ['sm', 'md'] },
      id: { description: 'ID do input', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido quando o estado muda',
    },
  },

  Radio: {
    exportName: 'DoityRadio',
    description: 'Seleção única em grupo, com animação de press + spring no indicador.',
    usage: `<DoityRadio v-model="opcao" name="grupo" value="a">Radio 1</DoityRadio>
<DoityRadio v-model="opcao" name="grupo" value="b">Radio 2</DoityRadio>`,
    props: {
      modelValue: { description: 'Valor selecionado do grupo (v-model)', type: 'string | number', control: 'text' },
      value: { description: 'Valor desta opção', type: 'string | number', control: 'text' },
      label: { description: 'Rótulo ao lado do radio', type: 'string', control: 'text' },
      name: { description: 'Nome do grupo HTML', type: 'string', control: 'text' },
      disabled: { description: 'Desabilita interação', type: 'boolean', default: false, control: 'boolean' },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      id: { description: 'ID do input', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido ao selecionar esta opção',
    },
    slots: {
      default: 'Rótulo (alternativa à prop label)',
    },
  },

  DatePicker: {
    exportName: 'DoityDatePicker',
    description:
      'Date picker menu (Figma): calendário com semana iniciando na segunda, seleção single ou range (círculos vermelhos + faixa brand), inputs formatados, Cancelar/Aplicar. Reutiliza Input e Button.',
    usage: `<DoityDatePicker
  v-model="range"
  mode="range"
  @confirm="aplicar"
/>
<!-- range = { start: '2025-01-06', end: '2025-01-13' } -->
<DoityDatePicker v-model="date" mode="single" />`,
    props: {
      modelValue: {
        description: 'single: ISO string | null — range: { start, end }',
        type: 'string | { start: string|null, end: string|null } | null',
        control: 'object',
      },
      mode: {
        description: 'Modo de seleção',
        type: "'range' | 'single'",
        default: 'range',
        control: 'select',
        options: ['range', 'single'],
      },
      cancelLabel: { description: 'Label do botão secundário', type: 'string', default: 'Cancelar', control: 'text' },
      confirmLabel: { description: 'Label do botão primário', type: 'string', default: 'Aplicar', control: 'text' },
      hideInputs: { description: 'Esconde campos de data', type: 'boolean', default: false, control: 'boolean' },
      hideActions: { description: 'Esconde footer de ações', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:modelValue': 'Valor atualizado ao selecionar',
      change: 'Mesmo payload do modelValue',
      confirm: 'Clique em Aplicar',
      cancel: 'Clique em Cancelar (restaura model)',
    },
  },

  Dialog: {
    exportName: 'DoityDialog',
    description:
      'Atalho de Modal com footer Cancelar/Salvar. Mesmo visual e animação do Modal. Use para formulários rápidos; para layout custom (ícone, horizontal, stretch), use DoityModal. Para só confirmação, use DoityAlertDialog.',
    usage: `<DoityDialog
  v-model:open="open"
  title="Editar perfil"
  description="Atualize suas informações."
  size="md"
  @save="salvar"
  @cancel="open = false"
>
  <DoityInput label="Nome" placeholder="Seu nome" />
</DoityDialog>`,
    props: {
      open: { description: 'Visibilidade (v-model:open)', type: 'boolean', default: false, control: 'boolean' },
      title: { description: 'Título', type: 'string', control: 'text' },
      description: { description: 'Texto de apoio', type: 'string', control: 'text' },
      size: {
        description: 'Largura (mesmo do Modal): sm≈350, md≈408, lg≈512',
        type: "'sm' | 'md' | 'lg'",
        default: 'md',
        control: 'select',
        options: ['sm', 'md', 'lg'],
      },
      cancelLabel: { description: 'Rótulo do botão cancelar', type: 'string', default: 'Cancelar', control: 'text' },
      saveLabel: { description: 'Rótulo do botão salvar', type: 'string', default: 'Salvar', control: 'text' },
      showClose: { description: 'Botão X no canto', type: 'boolean', default: true, control: 'boolean' },
      closeOnBackdrop: { description: 'Fecha ao clicar fora', type: 'boolean', default: true, control: 'boolean' },
    },
    events: {
      'update:open': 'Emitido ao abrir/fechar',
      close: 'Emitido ao fechar (X ou backdrop)',
      cancel: 'Emitido ao cancelar',
      save: 'Emitido ao salvar',
    },
    slots: {
      default: 'Conteúdo (campos, etc.)',
      footer: 'Substitui as ações Cancelar/Salvar',
    },
  },

  Dropdown: {
    exportName: 'DoityDropdown',
    description: 'Menu suspenso com itens default, ícone, avatar, checkbox, seções, divisores e scroll — acionado por trigger customizável.',
    usage: `<DoityDropdown
  :items="[
    { section: true, label: 'Section' },
    { label: 'Editar', value: 'edit' },
    { label: 'Duplicar', value: 'duplicate', icon: true },
    { divider: true },
    { label: 'Excluir', value: 'delete', destructive: true },
  ]"
  align="left"
  max-height="280px"
  @select="onSelect"
/>`,
    props: {
      items: {
        description: 'Itens `{ label, value?, disabled?, destructive?, selected?, section?, divider?, icon?, avatar?, checkbox? }`',
        type: 'Array',
        control: 'object',
      },
      align: { description: 'Alinhamento do menu', type: "'left' | 'right'", default: 'left', control: 'select', options: ['left', 'right'] },
      maxHeight: { description: 'Altura máxima do menu (ativa scroll)', type: 'string', control: 'text' },
      scrollHint: { description: 'Chevron inferior quando há mais conteúdo para rolar', type: 'boolean', default: true, control: 'boolean' },
    },
    events: {
      select: 'Emitido ao selecionar um item (menus com checkbox permanecem abertos)',
    },
    slots: {
      trigger: 'Elemento que abre o menu (padrão: botão "Menu")',
      default: 'Itens customizados (substitui prop items)',
      'item-icon': 'Ícone leading customizado por item (`{ item }`)',
    },
  },

  Empty: {
    exportName: 'DoityEmpty',
    description:
      'Estado vazio (Figma Empty): ícone/avatar, título, descrição, ações e link. Variantes default, outline (borda tracejada) e muted (fundo suave). Fade/slide staggered ao montar.',
    usage: `<DoityEmpty
  title="No Projects Yet"
  description="You haven't created any projects yet."
  primary-label="Create Project"
  secondary-label="Import Project"
  link-label="Learn More"
  @primary="criar"
/>`,
    props: {
      title: { description: 'Título', type: 'string', default: 'Nenhum dado encontrado', control: 'text' },
      description: { description: 'Texto de apoio', type: 'string', control: 'text' },
      variant: {
        description: 'Superfície: default | outline | muted',
        type: "'default' | 'outline' | 'muted'",
        default: 'default',
        control: 'select',
        options: ['default', 'outline', 'muted'],
      },
      size: {
        description: 'Padding do bloco',
        type: "'sm' | 'md' | 'lg'",
        default: 'md',
        control: 'select',
        options: ['sm', 'md', 'lg'],
      },
      primaryLabel: {
        description: 'Botão primário (vazio = oculto)',
        type: 'string',
        default: 'Criar item',
        control: 'text',
      },
      secondaryLabel: {
        description: 'Botão outline (vazio = oculto)',
        type: 'string',
        default: '',
        control: 'text',
      },
      linkLabel: { description: 'Link abaixo das ações', type: 'string', default: '', control: 'text' },
      linkHref: { description: 'Href do link', type: 'string', control: 'text' },
      hideIcon: { description: 'Oculta o ícone padrão', type: 'boolean', default: false, control: 'boolean' },
      hideActions: { description: 'Oculta a área de ações', type: 'boolean', default: false, control: 'boolean' },
      animated: { description: 'Fade/slide staggered ao montar', type: 'boolean', default: true, control: 'boolean' },
    },
    events: {
      primary: 'Clique no botão primário',
      secondary: 'Clique no botão secundário',
      link: 'Clique no link de apoio',
    },
    slots: {
      icon: 'Ícone no box 40×40',
      media: 'Substitui o ícone (avatar / avatar group)',
      default: 'Conteúdo extra (ex.: Input de busca)',
      actions: 'Substitui os botões',
      footer: 'Rodapé (ex.: Need help?)',
      title: 'Título customizado',
      description: 'Descrição customizada',
    },
  },

  FileDropzone: {
    exportName: 'DoityFileDropzone',
    description: 'Área de upload por clique ou arrastar e soltar (dropzone), com estados default e ativo.',
    usage: `<DoityFileDropzone
  hint=".doc ou .docx (Máx. 10MB)"
  accept=".doc,.docx"
  @select="onSelect"
/>`,
    props: {
      active: { description: 'Força o estado ativo (drag-over). Se omitido, controla no drag. Hover também ativa a animação.', type: 'boolean', control: 'boolean' },
      actionLabel: { description: 'Texto destacado da ação', type: 'string', default: 'Clique para adicionar', control: 'text' },
      dropLabel: { description: 'Texto após a ação', type: 'string', default: 'ou arraste e solte', control: 'text' },
      hint: { description: 'Texto de formatos/tamanho', type: 'string', default: '.doc ou .docx (Máx. 10MB)', control: 'text' },
      accept: { description: 'Atributo accept do input file', type: 'string', default: '.doc,.docx', control: 'text' },
      multiple: { description: 'Permite múltiplos arquivos', type: 'boolean', default: false, control: 'boolean' },
      disabled: { description: 'Desabilita a dropzone', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      select: 'Emitido com o arquivo (ou lista se multiple)',
      dragenter: 'Arquivo entra na área',
      dragleave: 'Arquivo sai da área',
      drop: 'Arquivo solto na área',
    },
    slots: {
      icon: 'Ícone central',
      title: 'Título completo (substitui actionLabel + dropLabel)',
      hint: 'Texto de hint customizado',
    },
  },

  FileUpload: {
    exportName: 'DoityFileUpload',
    description:
      'Card de progresso (upload/download): spinner + barra + Cancelar enquanto em andamento; ícone de arquivo + remover quando completo.',
    usage: `<DoityFileUpload
  status="uploading"
  file-name="Downloading..."
  meta="129 MB / 1000 MB"
  :progress="45"
  @cancel="onCancel"
/>`,
    props: {
      status: { description: 'Estado do card', type: "'uploading' | 'complete'", default: 'uploading', control: 'select', options: ['uploading', 'complete'] },
      fileName: { description: 'Título (nome do arquivo ou status)', type: 'string', default: 'documento.docx', control: 'text' },
      meta: { description: 'Linha secundária (ex.: 129 MB / 1000 MB)', type: 'string', control: 'text' },
      progress: { description: 'Progresso 0–100 (só em uploading)', type: 'number', default: 0, control: 'number' },
      cancelLabel: { description: 'Texto do botão cancelar', type: 'string', default: 'Cancelar', control: 'text' },
      removeLabel: { description: 'aria-label do botão remover', type: 'string', default: 'Remover arquivo', control: 'text' },
      showPercentage: { description: 'Exibe % ao lado da barra', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      cancel: 'Clique em Cancelar durante o progresso',
      remove: 'Clique na lixeira com upload concluído',
    },
    slots: {
      icon: 'Ícone à esquerda (padrão: Spinner em uploading)',
      cancel: 'Conteúdo do botão cancelar',
      'remove-icon': 'Ícone do botão remover',
    },
  },

  Input: {
    exportName: 'DoityInput',
    description:
      'Campo de texto com label, hint, erro e tamanhos. Extensível com ícones (slots), prefixo (leading-text) e variant search.',
    usage: `<DoityInput v-model="email" label="Email" placeholder="Digite aqui..." />

<DoityInput leading-text="http://" label="Website" placeholder="www.untitledui.com" />

<DoityInput v-model="q" variant="search" placeholder="Buscar" />`,
    props: {
      modelValue: { description: 'Valor do campo (v-model)', type: 'string', default: '', control: 'text' },
      type: { description: 'Tipo HTML do input', type: 'string', default: 'text', control: 'text' },
      variant: {
        description: 'Variante visual',
        type: "'default' | 'search'",
        default: 'default',
        control: 'select',
        options: ['default', 'search'],
      },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      label: { description: 'Rótulo acima do campo', type: 'string', control: 'text' },
      placeholder: { description: 'Placeholder', type: 'string', control: 'text' },
      hint: { description: 'Texto de ajuda abaixo', type: 'string', control: 'text' },
      error: { description: 'Mensagem de erro (ativa estado de erro)', type: 'string', control: 'text' },
      leadingText: { description: 'Prefixo à esquerda (ex.: http://)', type: 'string', control: 'text' },
      clearable: { description: 'Botão limpar (default no search)', type: 'boolean', control: 'boolean' },
      disabled: { description: 'Desabilita o campo', type: 'boolean', default: false, control: 'boolean' },
      required: { description: 'Marca como obrigatório', type: 'boolean', default: false, control: 'boolean' },
      id: { description: 'ID do input', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido a cada digitação',
      clear: 'Emitido ao limpar (search/clearable)',
    },
    slots: {
      'icon-leading': 'Ícone à esquerda',
      'icon-trailing': 'Ícone à direita',
    },
  },

  Item: {
    exportName: 'DoityItem',
    description:
      'Item versátil (Figma Item / shadcn): media, título, descrição e ações. Variantes default, outline e muted; layouts horizontal e vertical.',
    usage: `<DoityItem title="Security Alert" description="New login detected." variant="outline">
  <template #media>
    <span class="doity-item__icon-box">…</span>
  </template>
  <template #actions>
    <DoityButton hierarchy="outline" size="sm">Review</DoityButton>
  </template>
</DoityItem>`,
    props: {
      title: { description: 'Título', type: 'string', control: 'text' },
      description: { description: 'Descrição / texto secundário', type: 'string', control: 'text' },
      variant: {
        description: 'Superfície: default | outline | muted',
        type: "'default' | 'outline' | 'muted'",
        default: 'outline',
        control: 'select',
        options: ['default', 'outline', 'muted'],
      },
      size: {
        description: 'Padding e gap',
        type: "'default' | 'sm'",
        default: 'default',
        control: 'select',
        options: ['default', 'sm'],
      },
      layout: {
        description: 'horizontal (media | content | actions) ou vertical (cards)',
        type: "'horizontal' | 'vertical'",
        default: 'horizontal',
        control: 'select',
        options: ['horizontal', 'vertical'],
      },
      clickable: { description: 'Hover + cursor; renderiza como button se sem href', type: 'boolean', default: false, control: 'boolean' },
      href: { description: 'Se definido, renderiza como <a>', type: 'string', control: 'text' },
      target: { description: 'target do link', type: 'string', control: 'text' },
    },
    events: {
      click: 'Clique quando clickable ou href',
    },
    slots: {
      media: 'Leading (ícone, avatar, thumb)',
      leading: 'Alias de media',
      title: 'Substitui prop title',
      description: 'Substitui prop description',
      default: 'Conteúdo extra abaixo do texto',
      actions: 'Trailing (botões, meta, chevron)',
      trailing: 'Alias de actions',
    },
  },

  ItemGroup: {
    exportName: 'DoityItemGroup',
    description:
      'Lista de DoityItem com divisores. Use variant="outline" para borda ao redor do grupo.',
    usage: `<DoityItemGroup>
  <DoityItem variant="default" title="shadcn" description="shadcn@vercel.com">
    <template #media><DoityAvatar name="shadcn" size="sm" /></template>
  </DoityItem>
</DoityItemGroup>`,
    props: {
      variant: {
        description: 'default (só divisores) | outline (borda no grupo)',
        type: "'default' | 'outline'",
        default: 'default',
        control: 'select',
        options: ['default', 'outline'],
      },
    },
    slots: {
      default: 'Lista de DoityItem',
    },
  },

  Modal: {
    exportName: 'DoityModal',
    description:
      'Shell flexível de modal (sizes sm–xxl, layouts, footer via slot). Animação sobe + fade. Para formulário com Cancelar/Salvar pronto, use DoityDialog. Para só confirmação, use DoityAlertDialog.',
    usage: `<DoityModal
  v-model:open="open"
  title="Blog post published"
  description="This blog post has been published."
  size="sm"
  layout="centered"
  featured-icon
  actions="stretch"
  :show-close="false"
>
  <template #footer>
    <DoityButton hierarchy="outline" @click="open = false">Cancel</DoityButton>
    <DoityButton hierarchy="primary" @click="open = false">Confirm</DoityButton>
  </template>
</DoityModal>`,
    props: {
      open: { description: 'Visibilidade (v-model:open)', type: 'boolean', default: false, control: 'boolean' },
      title: { description: 'Título (18/semibold)', type: 'string', control: 'text' },
      description: { description: 'Texto de apoio (14/regular, secondary)', type: 'string', control: 'text' },
      size: {
        description: 'Largura: sm≈350, md≈408, lg≈512, xl≈544, xxl≈644',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'xxl'",
        default: 'md',
        control: 'select',
        options: ['sm', 'md', 'lg', 'xl', 'xxl'],
      },
      layout: {
        description: 'default | centered (ícone acima) | horizontal (ícone à esquerda)',
        type: "'default' | 'centered' | 'horizontal'",
        default: 'default',
        control: 'select',
        options: ['default', 'centered', 'horizontal'],
      },
      featuredIcon: { description: 'Exibe ícone destacado (slot featured-icon)', type: 'boolean', default: false, control: 'boolean' },
      showClose: { description: 'Botão X no canto', type: 'boolean', default: true, control: 'boolean' },
      closeOnBackdrop: { description: 'Fecha ao clicar fora', type: 'boolean', default: true, control: 'boolean' },
      actions: {
        description: 'Alinhamento do footer: end | stretch | stack',
        type: "'end' | 'stretch' | 'stack'",
        default: 'end',
        control: 'select',
        options: ['end', 'stretch', 'stack'],
      },
      fullscreen: { description: 'Ocupa a viewport (mesmo estilo interno; footer na base)', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:open': 'Emitido ao abrir/fechar',
      close: 'Emitido ao fechar (X ou backdrop)',
    },
    slots: {
      default: 'Corpo do modal (campos, conteúdo)',
      footer: 'Ações (botões)',
      'featured-icon': 'Ícone do featured icon',
      header: 'Substitui título/descrição',
      'close-icon': 'Ícone do botão fechar',
    },
  },

  Navbar: {
    exportName: 'DoityNavbar',
    description: 'Barra de navegação superior com contexto, papéis e perfil. O bloco do usuário usa DoityAvatarLabelGroup dentro de um DoityDropdown (itens de menu configuráveis).',
    usage: `<DoityNavbar
  title="Meus Ingressos"
  context-label="Evento XYZ"
  :roles="roles"
  active-role="participant"
  :user="{ name: 'Ana', email: 'ana@doity.com' }"
/>`,
    props: {
      type: { description: 'Variante visual', type: 'string', default: 'default', control: 'text' },
      contextLabel: { description: 'Label de contexto (breadcrumb superior)', type: 'string', control: 'text' },
      title: { description: 'Título da página', type: 'string', control: 'text' },
      pageLabel: { description: 'Label da área', type: 'string', control: 'text' },
      roles: { description: 'Papéis disponíveis `{ label, value }`', type: 'Array', control: 'object' },
      activeRole: { description: 'Papel ativo', type: 'string', control: 'text' },
      user: { description: 'Dados do usuário `{ name, email, avatar? }`', type: 'object', control: 'object' },
      userMenuItems: { description: 'Itens do menu do usuário (Dropdown) `{ label, value?, destructive? }`', type: 'Array', control: 'object' },
    },
  },

  Pagination: {
    exportName: 'DoityPagination',
    description:
      'Paginação com variantes default, card, compact, dots e lines. Setas reusam DoityButton (link/outline) com overrides de layout; números de página e indicadores dots/lines permanecem especializados. Setas com hover (chevron desliza) e press (scale).',
    usage: `<DoityPagination v-model:page="page" :total-pages="10" />
<DoityPagination v-model:page="page" :total-pages="3" variant="dots" theme="primary" framed />`,
    props: {
      page: { description: 'Página atual (v-model:page)', type: 'number', default: 1, control: 'number' },
      totalPages: { description: 'Total de páginas', type: 'number', default: 1, control: 'number' },
      siblingCount: { description: 'Páginas ao lado da atual', type: 'number', default: 1, control: 'number' },
      variant: {
        description: 'Layout',
        type: "'default' | 'card' | 'compact' | 'dots' | 'lines'",
        default: 'default',
        control: 'select',
        options: ['default', 'card', 'compact', 'dots', 'lines'],
      },
      shape: {
        description: 'Formato do número ativo (default)',
        type: "'square' | 'circle'",
        default: 'square',
        control: 'select',
        options: ['square', 'circle'],
      },
      theme: {
        description: 'Tema das setas/dots (carrossel)',
        type: "'primary' | 'dark' | 'light'",
        default: 'primary',
        control: 'select',
        options: ['primary', 'dark', 'light'],
      },
      size: {
        description: 'md | lg (carrossel)',
        type: "'md' | 'lg'",
        default: 'md',
        control: 'select',
        options: ['md', 'lg'],
      },
      showLabels: { description: 'Anterior / Próxima', type: 'boolean', default: false, control: 'boolean' },
      previousLabel: { description: 'Rótulo anterior', type: 'string', default: 'Anterior', control: 'text' },
      nextLabel: { description: 'Rótulo próxima', type: 'string', default: 'Próxima', control: 'text' },
      showArrows: { description: 'Setas (dots/lines)', type: 'boolean', default: true, control: 'boolean' },
      showIndicators: { description: 'Dots/lines', type: 'boolean', default: true, control: 'boolean' },
      framed: { description: 'Pílula atrás dos dots/lines', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:page': 'Mudança de página',
      previous: 'Clique em anterior',
      next: 'Clique em próxima',
    },
  },

  PlayButton: {
    exportName: 'DoityPlayButton',
    description: 'Botão circular de play (glassmorphism ou outline) em tamanhos xs–2xl.',
    usage: `<DoityPlayButton size="md" variant="glass" @click="onPlay" />`,
    props: {
      size: {
        description: 'Tamanho',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        default: 'md',
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      },
      variant: {
        description: 'Estilo',
        type: "'glass' | 'outline'",
        default: 'glass',
        control: 'select',
        options: ['glass', 'outline'],
      },
      label: { description: 'aria-label', type: 'string', default: 'Reproduzir', control: 'text' },
    },
    events: {
      click: 'Clique no botão',
    },
  },

  MinimalStepper: {
    exportName: 'DoityMinimalStepper',
    description:
      'Stepper minimal (Figma): barras + ícone + label. Completo (cinza), ativo (vermelho) e inativo. Bounce elástico no ícone ao avançar.',
    usage: `<DoityMinimalStepper
  v-model="step"
  :steps="['Dados', 'Pagamento', 'Confirmação']"
/>`,
    props: {
      modelValue: { description: 'Passo ativo 0-based (v-model)', type: 'number', default: 0, control: 'number' },
      steps: { description: 'string[] ou { label }[]', type: 'Array', control: 'object' },
    },
    events: {
      'update:modelValue': 'Mudança de passo',
      change: 'Passo selecionado',
    },
  },

  ArrowStepper: {
    exportName: 'DoityArrowStepper',
    description:
      'Stepper em chevron (Figma Arrow Stepper): complete (vermelho sólido), active (rosa + borda) e inactive. Bounce suave ao mudar.',
    usage: `<DoityArrowStepper
  v-model="step"
  title="Title"
  :steps="[
    { label: 'Step Name', description: 'Short step description' },
    { label: 'Step Name', description: 'Short step description' },
  ]"
/>`,
    props: {
      modelValue: { description: 'Passo ativo 0-based (v-model)', type: 'number', default: 0, control: 'number' },
      steps: { description: 'string[] ou { label, description }[]', type: 'Array', control: 'object' },
      title: { description: 'Título acima', type: 'string', control: 'text' },
      compact: { description: 'Oculta descriptions', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:modelValue': 'Mudança de passo',
      change: 'Passo selecionado',
    },
  },

  Stepper: {
    exportName: 'DoityStepper',
    description:
      'Facade de Stepper: variant minimal | arrow | icons (padrão icons) renderiza DoityMinimalStepper, DoityArrowStepper ou DoityIconStepper. Variante icons: trilha vermelha conforme progresso + bounce elástico no ícone.',
    usage: `<DoityStepper
  variant="icons"
  v-model="step"
  :steps="[{ icon: 'check' }, { icon: 'card' }, { icon: 'check' }]"
/>`,
    props: {
      variant: {
        description: 'Variação visual do stepper',
        type: "'minimal' | 'arrow' | 'icons'",
        default: 'icons',
        control: 'select',
        options: ['minimal', 'arrow', 'icons'],
      },
      modelValue: { description: 'Passo ativo 0-based (v-model)', type: 'number', default: 0, control: 'number' },
      steps: {
        description: "string[] ou { label?, icon?: 'check' | 'card' }[]",
        type: 'Array',
        control: 'object',
      },
    },
    events: {
      'update:modelValue': 'Mudança de passo',
      change: 'Passo selecionado',
    },
  },

  VideoPlayer: {
    exportName: 'DoityVideoPlayer',
    description:
      'Player de vídeo (Figma): tamanhos xs–xl, overlay play, barra de progresso/buffer (md+). Usa DoityPlayButton.',
    usage: `<DoityVideoPlayer
  size="md"
  :progress="35"
  :buffered="70"
  @play="onPlay"
/>`,
    props: {
      size: {
        description: 'Tamanho',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: 'md',
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      playing: { description: 'Estado playing (v-model:playing)', type: 'boolean', default: false, control: 'boolean' },
      poster: { description: 'URL do poster', type: 'string', control: 'text' },
      progress: { description: 'Progresso 0–100', type: 'number', default: 0, control: 'number' },
      buffered: { description: 'Buffer 0–100', type: 'number', default: 0, control: 'number' },
      showControls: { description: 'Controles inferiores (md+)', type: 'boolean', default: true, control: 'boolean' },
    },
    events: {
      play: 'Início da reprodução',
      pause: 'Pausa',
      'update:playing': 'Mudança de playing',
      seek: 'Clique na trilha (0–100)',
    },
  },

  Select: {
    exportName: 'DoitySelect',
    description: 'Campo de seleção customizado (sem `<select>` nativo) com variantes Default, Icon Leading e Search.',
    usage: `<DoitySelect
  v-model="estado"
  label="Estado"
  placeholder="Selecione um membro de equipe"
  variant="default"
  :options="[
    { label: 'São Paulo', value: 'sp' },
    { label: 'Rio de Janeiro', value: 'rj' },
  ]"
/>`,
    props: {
      modelValue: { description: 'Valor selecionado (v-model)', type: 'string | number', default: '', control: 'text' },
      options: { description: 'Opções `{ label, value, disabled? }`', type: 'Array', control: 'object' },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      variant: {
        description: 'Visual do trigger',
        type: "'default' | 'icon' | 'search'",
        default: 'default',
        control: 'select',
        options: ['default', 'icon', 'search'],
      },
      label: { description: 'Rótulo acima do campo', type: 'string', control: 'text' },
      placeholder: { description: 'Texto quando nada selecionado', type: 'string', default: 'Selecione...', control: 'text' },
      hint: { description: 'Texto de ajuda abaixo', type: 'string', control: 'text' },
      error: { description: 'Mensagem de erro', type: 'string', control: 'text' },
      disabled: { description: 'Desabilita o campo', type: 'boolean', default: false, control: 'boolean' },
      required: { description: 'Marca como obrigatório', type: 'boolean', default: false, control: 'boolean' },
      id: { description: 'ID do campo', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido ao selecionar uma opção',
    },
    slots: {
      'icon-leading': 'Ícone à esquerda do trigger (substitui o ícone built-in de variant icon/search)',
    },
  },

  Menubar: {
    exportName: 'DoityMenubar',
    description:
      'Barra de menu horizontal estilo desktop (Figma Menubar). Cada item pode abrir um dropdown com atalhos, estados disabled, submenu e divisores.',
    usage: `<DoityMenubar :items="[
  {
    label: 'File',
    items: [
      { label: 'New Tab', shortcut: '⌘T' },
      { label: 'Share', submenu: true },
      { divider: true },
      { label: 'Print..', shortcut: '⌘P' },
    ],
  },
  { label: 'Edit', items: [{ label: 'Undo', shortcut: '⌘Z' }] },
]" />`,
    props: {
      items: { description: 'Menus top-level com items do dropdown', type: 'Array', control: 'object' },
      defaultOpen: { description: 'id/label do menu aberto inicialmente', type: 'string', control: 'text' },
    },
    events: {
      select: 'Emitido ao selecionar item ou entry',
      'open-change': 'Emitido com o id aberto ou null',
    },
  },

  NavigationMenu: {
    exportName: 'DoityNavigationMenu',
    description:
      'Menu de navegação com painel tipo mega menu (Figma Navigation Menu). Itens com children/columns abrem um painel em colunas (título + descrição).',
    usage: `<DoityNavigationMenu :items="[
  { label: 'Docs', href: '/docs' },
  {
    label: 'Components',
    children: [
      { title: 'Alert Dialog', description: 'Modal de confirmação.' },
      { title: 'Tooltip', description: 'Dica contextual.' },
    ],
  },
]" />`,
    props: {
      items: { description: 'Itens (label, href?, children? | columns?)', type: 'Array', control: 'object' },
      defaultOpen: { description: 'id/label do item aberto inicialmente', type: 'string', control: 'text' },
      panelWidth: { description: 'Largura do painel', type: 'string', default: '600px', control: 'text' },
    },
    events: {
      select: 'Emitido ao selecionar trigger ou link do painel',
      'open-change': 'Emitido com o id aberto ou null',
    },
  },

  Sonner: {
    exportName: 'DoitySonner',
    description:
      'Toasts no estilo Sonner: card branco com borda, ícones neutros por variante (success/info/warning/error), loading usa DoitySpinner e a ação usa DoityButton (escuro/compacto). Título+description+ação opcionais. Monte `<DoitySonner />` e dispare com `useDoityToast()`.',
    usage: `<script setup>
const { toast, success, loading } = useDoityToast()
</script>

<template>
  <DoityButton @click="success('Event has been created')">Success</DoityButton>
  <DoityButton @click="loading()">Loading</DoityButton>
  <DoityButton @click="toast({
    title: 'Event has been created',
    description: 'Sunday, December 03, 2023 at 9:00 AM',
    action: { label: 'Undo' },
  })">Com ação</DoityButton>
  <DoitySonner />
</template>`,
    props: {},
  },

  StarRating: {
    exportName: 'DoityStarRating',
    description:
      'Avaliação por estrelas. Outline → fill com pop e rotação alternada (±14°). Use `demo` para o loop de demonstração.',
    usage: `<DoityStarRating v-model="rating" />
<DoityStarRating :model-value="4" readonly />
<DoityStarRating demo />`,
    props: {
      modelValue: { description: 'Nota atual (0–max), v-model', type: 'number', default: 0, control: { type: 'number', min: 0, max: 5 } },
      max: { description: 'Número de estrelas', type: 'number', default: 5, control: { type: 'number', min: 1, max: 10 } },
      readonly: { description: 'Somente leitura', type: 'boolean', default: false, control: 'boolean' },
      disabled: { description: 'Desabilita interação', type: 'boolean', default: false, control: 'boolean' },
      demo: { description: 'Loop de animação de demonstração (não interativo)', type: 'boolean', default: false, control: 'boolean' },
      size: { description: 'Tamanho em px', type: 'number', default: 29, control: { type: 'number', min: 16, max: 48 } },
      label: { description: 'aria-label do controle', type: 'string', default: 'Avaliação', control: 'text' },
      id: { description: 'ID do root', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido ao alterar a nota',
      change: 'Emitido com o novo valor',
    },
  },

  Spinner: {
    exportName: 'DoitySpinner',
    description:
      'Indicador de carregamento. Tipos: circle (arco) e spokes (8 raios). Tamanhos 12/16/24/32. Cores default, brand, red, green, blue, yellow, etc. Animação: rotate contínuo (circle) ou fade em cascata (spokes).',
    usage: `<DoitySpinner size="md" />
<DoitySpinner type="spokes" size="md" />
<DoitySpinner color="red" size="md" />`,
    props: {
      type: {
        description: 'Estilo do glyph',
        type: "'circle' | 'spokes'",
        default: 'circle',
        control: 'select',
        options: ['circle', 'spokes'],
      },
      size: {
        description: 'Tamanho (xs=12, sm=16, md=24, lg=32)',
        type: "'xs' | 'sm' | 'md' | 'lg'",
        default: 'md',
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg'],
      },
      color: {
        description: 'Cor',
        type: "'default' | 'brand' | 'red' | 'green' | 'blue' | 'yellow' | 'success' | 'error' | 'warning' | 'muted' | 'white'",
        default: 'default',
        control: 'select',
        options: ['default', 'brand', 'red', 'green', 'blue', 'yellow', 'success', 'error', 'warning', 'muted', 'white'],
      },
      label: { description: 'Texto para leitores de tela', type: 'string', default: 'Carregando...', control: 'text' },
    },
  },

  Table: {
    exportName: 'DoityTable',
    description:
      'Tabela em card (Figma Table): header com título/badge/ações, barra de filtros, linhas com divisores ou fills alternados, e footer (paginação). Compose células com DoityTableCell e cabeçalhos com DoityTableHeaderCell, ou use `#cell-{key}` / slot default para markup livre.',
    usage: `<DoityTable
  title="Inscritos"
  badge="100 inscritos"
  header-tone="gray"
  dividers="line"
  :columns="columns"
  :data="rows"
>
  <template #cell-name="{ row }">
    <DoityAvatarLabelGroup :src="row.src" :name="row.name" :description="row.handle" size="sm" />
  </template>
  <template #cell-status>
    <DoityBadge variant="success" icon="dot" size="sm">Label</DoityBadge>
  </template>
  <template #cell-tags>
    <div class="doity-table__tags">
      <DoityBadge variant="primary" size="sm">Rótulo</DoityBadge>
      <DoityBadge variant="gray" size="sm">+4</DoityBadge>
    </div>
  </template>
  <template #footer>
    <DoityPagination v-model:page="page" :total-pages="10" show-labels />
  </template>
</DoityTable>`,
    props: {
      columns: {
        description: 'Colunas `{ key, label, sortable?, help?, sort?, align?, checkbox?, checkboxOnly?, actions?, tags? }`',
        type: 'Array',
        control: 'object',
      },
      data: { description: 'Linhas da tabela (`selected` marca a linha)', type: 'Array', control: 'object' },
      dividers: {
        description: 'line (divisores) ou alternating (zebrado)',
        type: "'line' | 'alternating'",
        default: 'line',
        control: 'select',
        options: ['line', 'alternating'],
      },
      striped: { description: 'Alias de dividers="alternating"', type: 'boolean', default: false, control: 'boolean' },
      headerTone: {
        description: 'Fundo do thead',
        type: "'white' | 'gray'",
        default: 'gray',
        control: 'select',
        options: ['white', 'gray'],
      },
      bordered: { description: 'Bordas verticais entre células', type: 'boolean', default: false, control: 'boolean' },
      hoverable: { description: 'Destaque ao passar o mouse', type: 'boolean', default: true, control: 'boolean' },
      title: { description: 'Título do card', type: 'string', control: 'text' },
      description: { description: 'Texto de apoio do card', type: 'string', control: 'text' },
      badge: { description: 'Badge ao lado do título (DoityBadge primary)', type: 'string', control: 'text' },
    },
    events: {
      sort: 'Emitido ao ordenar coluna `{ key, direction, column }`',
    },
    slots: {
      default: 'Markup livre de `<thead>` / `<tbody>` (ignora columns/data)',
      'card-header': 'Substitui o header do card',
      title: 'Título customizado',
      description: 'Descrição customizada',
      badge: 'Badge customizado (padrão: DoityBadge)',
      actions: 'Botões à direita do header',
      filters: 'Barra de filtros abaixo do header',
      footer: 'Rodapé (DoityPagination)',
      'cell-{key}': 'Conteúdo da célula — reutilize DoityCheckbox, DoityBadge, DoityAvatarLabelGroup, DoityTableCell; tags em `.doity-table__tags` (sempre lado a lado)',
      'header-{key}': 'Label customizado do cabeçalho',
      'header-checkbox': 'Checkbox “selecionar todos” (DoityCheckbox)',
      'header-checkbox-{key}': 'Checkbox do cabeçalho por coluna',
    },
  },

  TableHeaderCell: {
    exportName: 'DoityTableHeaderCell',
    description:
      'Célula de cabeçalho (Figma Table header / Table header cell): label, sort asc/desc, help icon, checkbox e tons white/gray.',
    usage: `<DoityTableHeaderCell
  label="Empresa"
  tone="gray"
  sortable
  sort="desc"
  help
  @sort="onSort"
/>`,
    props: {
      label: { description: 'Texto do cabeçalho', type: 'string', control: 'text' },
      tone: {
        description: 'Fundo white ou gray',
        type: "'white' | 'gray'",
        default: 'white',
        control: 'select',
        options: ['white', 'gray'],
      },
      sortable: { description: 'Exibe seta e permite ordenar', type: 'boolean', default: false, control: 'boolean' },
      sort: {
        description: 'Direção atual',
        type: "'none' | 'asc' | 'desc'",
        default: 'none',
        control: 'select',
        options: ['none', 'asc', 'desc'],
      },
      help: { description: 'Ícone de ajuda', type: 'boolean', default: false, control: 'boolean' },
      helpLabel: { description: 'aria-label do ícone de ajuda', type: 'string', default: 'Mais informações', control: 'text' },
      disabled: { description: 'Estado desabilitado', type: 'boolean', default: false, control: 'boolean' },
      checkboxOnly: { description: 'Célula estreita só com checkbox', type: 'boolean', default: false, control: 'boolean' },
      align: {
        description: 'Alinhamento',
        type: "'left' | 'center' | 'right'",
        default: 'left',
        control: 'select',
        options: ['left', 'center', 'right'],
      },
    },
    events: {
      sort: 'Emitido com a próxima direção (`none` | `asc` | `desc`)',
      help: 'Emitido ao clicar no ícone de ajuda',
    },
    slots: {
      default: 'Label customizado',
      checkbox: 'Checkbox (select-all)',
      'help-icon': 'Ícone de ajuda customizado',
    },
  },

  TableCell: {
    exportName: 'DoityTableCell',
    description:
      'Conteúdo de célula (Figma Table cell): lead/text + supporting, leading (avatar/ícone/checkbox), progress, trend e trailing (ações/badges).',
    usage: `<DoityTableCell text="Olivia Silva" supporting-text="@olivia">
  <template #leading>
    <DoityAvatar name="Olivia Silva" size="sm" />
  </template>
</DoityTableCell>

<DoityTableCell :progress="70" />
<DoityTableCell trend="positive" trend-label="+20%" />`,
    props: {
      text: { description: 'Texto principal', type: 'string', control: 'text' },
      supportingText: { description: 'Texto de apoio (2ª linha)', type: 'string', control: 'text' },
      emphasis: {
        description: 'lead (destaque) ou text (secundário)',
        type: "'lead' | 'text'",
        default: 'lead',
        control: 'select',
        options: ['lead', 'text'],
      },
      disabled: { description: 'Estado desabilitado', type: 'boolean', default: false, control: 'boolean' },
      progress: { description: 'Barra 0–100', type: 'number', control: 'number' },
      trend: {
        description: 'Tendência positiva/negativa',
        type: "'positive' | 'negative'",
        control: 'select',
        options: ['positive', 'negative'],
      },
      trendLabel: { description: 'Label da tendência', type: 'string', control: 'text' },
    },
    slots: {
      default: 'Texto principal',
      supporting: 'Texto de apoio',
      leading: 'Avatar, ícone, checkbox, etc.',
      trailing: 'Badges, ações, etc.',
    },
  },

  Tabs: {
    exportName: 'DoityTabs',
    description:
      'Menu Tabs (Figma): track cinza, pill branca com shadow-sm e indicador deslizante ao trocar. Use `DoityTabPanel` para o conteúdo animado.',
    usage: `<DoityTabs v-model="aba" :items="[
  { label: 'Ingressos', value: 'ingressos' },
  { label: 'Eventos', value: 'eventos' },
  { label: 'Cursos', value: 'cursos' },
]">
  <DoityTabPanel value="ingressos">…</DoityTabPanel>
  <DoityTabPanel value="eventos">…</DoityTabPanel>
  <DoityTabPanel value="cursos">…</DoityTabPanel>
</DoityTabs>`,
    props: {
      modelValue: { description: 'Aba ativa (v-model)', type: 'string', default: '', control: 'text' },
      items: { description: 'Abas `{ label, value, disabled? }`', type: 'Array', control: 'object' },
    },
    events: {
      'update:modelValue': 'Emitido ao trocar de aba',
      change: 'Emitido ao trocar de aba (mesmo valor)',
    },
    slots: {
      default: 'Conteúdo (DoityTabPanel)',
      tabs: 'Override opcional dos botões de aba',
    },
  },

  Textarea: {
    exportName: 'DoityTextarea',
    description:
      'Campo multilinha: tipografia 16/24, radius 8px, focus com ring. Label, hint, erro e disabled com opacity reduzida.',
    usage: `<DoityTextarea
  v-model="message"
  label="Your message"
  placeholder="Type your message here."
  hint="Your message will be copied to the support team."
/>`,
    props: {
      modelValue: { description: 'Valor (v-model)', type: 'string', default: '', control: 'text' },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      label: { description: 'Rótulo', type: 'string', control: 'text' },
      placeholder: { description: 'Placeholder', type: 'string', control: 'text' },
      hint: { description: 'Texto de ajuda', type: 'string', control: 'text' },
      error: { description: 'Mensagem de erro', type: 'string', control: 'text' },
      disabled: { description: 'Desabilita o campo', type: 'boolean', default: false, control: 'boolean' },
      required: { description: 'Obrigatório', type: 'boolean', default: false, control: 'boolean' },
      rows: { description: 'Número de linhas visíveis', type: 'number', default: 3, control: 'number' },
      resize: { description: 'Comportamento de resize CSS', type: 'string', default: 'vertical', control: 'text' },
      id: { description: 'ID do textarea', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido a cada digitação',
    },
  },

  Tooltip: {
    exportName: 'DoityTooltip',
    description:
      'Tooltip (Figma): temas light/dark, seta (center/start/end/none), variante simples ou rich (título + description). Aparece no hover/focus do trigger.',
    usage: `<DoityTooltip content="Este é um tooltip" theme="dark" position="top">
  <DoityButton hierarchy="outline">Hover me</DoityButton>
</DoityTooltip>

<DoityTooltip
  content="Este é um tooltip"
  description="Tooltips são usados para descrever ou identificar um elemento."
  theme="light"
  position="top"
  arrow="start"
/>`,
    props: {
      content: { description: 'Título / texto principal', type: 'string', control: 'text' },
      description: {
        description: 'Texto de apoio (variante rich)',
        type: 'string',
        control: 'text',
      },
      position: {
        description: 'Posição relativa ao trigger',
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: 'top',
        control: 'select',
        options: ['top', 'bottom', 'left', 'right'],
      },
      arrow: {
        description: 'Seta: true/center, start, end, ou false/none',
        type: "boolean | 'center' | 'start' | 'end' | 'none'",
        default: true,
        control: 'select',
        options: [true, false, 'center', 'start', 'end', 'none'],
      },
      theme: {
        description: 'Tema visual',
        type: "'light' | 'dark'",
        default: 'light',
        control: 'select',
        options: ['light', 'dark'],
      },
      delay: { description: 'Atraso em ms antes de exibir', type: 'number', default: 200, control: 'number' },
      forceOpen: {
        description: 'Mantém aberto (útil em docs/stories)',
        type: 'boolean',
        default: false,
        control: 'boolean',
      },
    },
    slots: {
      default: 'Elemento trigger (filho)',
      content: 'Substitui título + description',
      title: 'Título customizado',
      description: 'Texto de apoio customizado',
    },
  },
} satisfies Record<string, ComponentDocEntry>

export type ComponentDocName = keyof typeof componentDocs
