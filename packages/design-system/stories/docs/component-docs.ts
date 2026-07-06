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
    description: 'Container de painéis expansíveis. Use com `DoityAccordionItem` como filhos.',
    usage: `<DoityAccordion>
  <DoityAccordionItem title="Título" :open="true">Conteúdo</DoityAccordionItem>
</DoityAccordion>`,
    slots: {
      default: 'Lista de `DoityAccordionItem`',
    },
  },

  AccordionItem: {
    exportName: 'DoityAccordionItem',
    description: 'Item individual dentro de um Accordion.',
    usage: `<DoityAccordionItem title="Como funciona?" :open="true">
  Texto do painel expansível.
</DoityAccordionItem>`,
    props: {
      title: { description: 'Título exibido no cabeçalho do item', type: 'string', control: 'text' },
      value: { description: 'Identificador opcional do item', type: 'string', control: 'text' },
      open: { description: 'Controla se o painel está aberto (v-model:open)', type: 'boolean', default: false, control: 'boolean' },
      disabled: { description: 'Desabilita interação com o item', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:open': 'Emitido quando o estado aberto/fechado muda',
    },
    slots: {
      default: 'Conteúdo do painel',
    },
  },

  Alert: {
    exportName: 'DoityAlert',
    description: 'Mensagens de feedback inline (sucesso, erro, aviso, info).',
    usage: `<DoityAlert
  variant="success"
  title="Salvo!"
  description="As alterações foram aplicadas."
  :icon="true"
/>`,
    props: {
      variant: { description: 'Estilo visual do alerta', type: "'default' | 'success' | 'warning' | 'error' | 'info'", default: 'default', control: 'select', options: ['default', 'success', 'warning', 'error', 'info'] },
      title: { description: 'Título em destaque', type: 'string', control: 'text' },
      description: { description: 'Texto de apoio abaixo do título', type: 'string', control: 'text' },
      dismissible: { description: 'Exibe botão para fechar o alerta', type: 'boolean', default: false, control: 'boolean' },
      icon: { description: 'Exibe ícone correspondente ao variant', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      dismiss: 'Emitido ao fechar um alerta dismissible',
    },
  },

  AlertDialog: {
    exportName: 'DoityAlertDialog',
    description: 'Diálogo modal de confirmação com ações primária e secundária.',
    usage: `<DoityAlertDialog
  v-model:open="open"
  title="Excluir item?"
  description="Esta ação não pode ser desfeita."
  confirm-label="Excluir"
  :destructive="true"
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
    description: 'Representação visual de usuário com foto, iniciais ou placeholder.',
    usage: `<DoityAvatar name="Ana Silva" size="md" :online="true" />`,
    props: {
      src: { description: 'URL da imagem de perfil', type: 'string', control: 'text' },
      alt: { description: 'Texto alternativo da imagem', type: 'string', control: 'text' },
      name: { description: 'Nome usado para gerar iniciais quando não há imagem', type: 'string', control: 'text' },
      size: { description: 'Tamanho do avatar', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: 'md', control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
      online: { description: 'Indicador de status online', type: 'boolean', default: false, control: 'boolean' },
      placeholder: { description: 'Exibe ícone placeholder em vez de iniciais', type: 'boolean', default: false, control: 'boolean' },
    },
  },

  Badge: {
    exportName: 'DoityBadge',
    description: 'Etiquetas de status, categorias ou contadores.',
    usage: `<DoityBadge variant="success" size="md">Ativo</DoityBadge>`,
    props: {
      variant: { description: 'Cor/estilo do badge', type: 'string', default: 'gray', control: 'select', options: ['gray', 'brand', 'success', 'warning', 'error', 'info'] },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      dot: { description: 'Exibe ponto colorido antes do texto', type: 'boolean', default: false, control: 'boolean' },
    },
    slots: {
      default: 'Texto do badge',
    },
  },

  Breadcrumb: {
    exportName: 'DoityBreadcrumb',
    description: 'Navegação hierárquica indicando a localização na aplicação.',
    usage: `<DoityBreadcrumb :items="[
  { label: 'Home', to: '/' },
  { label: 'Eventos', to: '/eventos' },
  { label: 'Detalhes' },
]" />`,
    props: {
      items: { description: 'Lista de itens `{ label, to?, href? }`', type: 'Array', control: 'object' },
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

  Chart: {
    exportName: 'DoityChart',
    description: 'Gráfico de barras simples baseado em tokens de cor.',
    usage: `<DoityChart :data="[
  { label: 'Jan', value: 40 },
  { label: 'Fev', value: 65 },
]" :height="240" />`,
    props: {
      data: { description: 'Array `{ label, value }`', type: 'Array', control: 'object' },
      type: { description: 'Tipo do gráfico', type: 'string', default: 'bar', control: 'text' },
      height: { description: 'Altura em pixels', type: 'number', default: 240, control: 'number' },
      showValues: { description: 'Exibe valores acima das barras', type: 'boolean', default: true, control: 'boolean' },
    },
  },

  CheckboxToggle: {
    exportName: 'DoityCheckbox / DoitySwitch',
    description: 'Checkbox e Switch (toggle) para seleção e alternância. Veja também as docs de `Checkbox` e `Switch`.',
    usage: `<DoityCheckbox v-model="aceito" label="Aceito os termos" />
<DoitySwitch v-model="ativo" label="Notificações" />`,
  },

  Checkbox: {
    exportName: 'DoityCheckbox',
    description: 'Caixa de seleção com label e estados.',
    usage: `<DoityCheckbox v-model="aceito" label="Aceito os termos" />`,
    props: {
      modelValue: { description: 'Valor selecionado (v-model)', type: 'boolean', default: false, control: 'boolean' },
      label: { description: 'Rótulo ao lado do checkbox', type: 'string', control: 'text' },
      hint: { description: 'Texto de ajuda abaixo', type: 'string', control: 'text' },
      disabled: { description: 'Desabilita interação', type: 'boolean', default: false, control: 'boolean' },
      indeterminate: { description: 'Estado indeterminado', type: 'boolean', default: false, control: 'boolean' },
      size: { description: 'Tamanho', type: "'sm' | 'md'", default: 'md', control: 'select', options: ['sm', 'md'] },
      id: { description: 'ID do input (gerado automaticamente se omitido)', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido quando o valor muda',
    },
  },

  Switch: {
    exportName: 'DoitySwitch',
    description: 'Alternância on/off (toggle).',
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

  Dialog: {
    exportName: 'DoityDialog',
    description: 'Modal com cabeçalho, conteúdo e ações de cancelar/salvar.',
    usage: `<DoityDialog
  v-model:open="open"
  title="Editar perfil"
  description="Atualize suas informações."
  size="md"
  @save="salvar"
/>`,
    props: {
      open: { description: 'Controla visibilidade (v-model:open)', type: 'boolean', default: false, control: 'boolean' },
      title: { description: 'Título do modal', type: 'string', control: 'text' },
      description: { description: 'Texto descritivo', type: 'string', control: 'text' },
      size: { description: 'Largura máxima', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      cancelLabel: { description: 'Rótulo do botão cancelar', type: 'string', default: 'Cancelar', control: 'text' },
      saveLabel: { description: 'Rótulo do botão salvar', type: 'string', default: 'Salvar', control: 'text' },
    },
    events: {
      'update:open': 'Emitido ao abrir/fechar',
      close: 'Emitido ao fechar',
      cancel: 'Emitido ao cancelar',
      save: 'Emitido ao salvar',
    },
    slots: {
      default: 'Conteúdo do modal',
    },
  },

  Dropdown: {
    exportName: 'DoityDropdown',
    description: 'Menu suspenso acionado por um trigger customizável.',
    usage: `<DoityDropdown
  :items="[
    { label: 'Editar', value: 'edit' },
    { label: 'Excluir', value: 'delete', destructive: true },
  ]"
  align="left"
  @select="onSelect"
/>`,
    props: {
      items: { description: 'Itens `{ label, value?, disabled?, destructive?, selected?, section? }`', type: 'Array', control: 'object' },
      align: { description: 'Alinhamento do menu', type: "'left' | 'right'", default: 'left', control: 'select', options: ['left', 'right'] },
    },
    events: {
      select: 'Emitido ao selecionar um item',
    },
    slots: {
      trigger: 'Elemento que abre o menu (padrão: botão "Menu")',
      default: 'Itens customizados (substitui prop items)',
    },
  },

  Empty: {
    exportName: 'DoityEmpty',
    description: 'Estado vazio com ícone, título, descrição e ações.',
    usage: `<DoityEmpty
  title="Nenhum item"
  description="Crie o primeiro item para começar."
  primary-label="Criar"
  @primary="criar"
/>`,
    props: {
      title: { description: 'Título principal', type: 'string', default: 'Nenhum dado encontrado', control: 'text' },
      description: { description: 'Texto de apoio', type: 'string', control: 'text' },
      size: { description: 'Tamanho do bloco', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      primaryLabel: { description: 'Rótulo do botão primário', type: 'string', default: 'Criar item', control: 'text' },
      secondaryLabel: { description: 'Rótulo do botão secundário', type: 'string', default: 'Voltar', control: 'text' },
      hideActions: { description: 'Oculta os botões de ação', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      primary: 'Emitido ao clicar no botão primário',
      secondary: 'Emitido ao clicar no botão secundário',
    },
    slots: {
      icon: 'Ícone customizado',
    },
  },

  Input: {
    exportName: 'DoityInput',
    description: 'Campo de texto com label, hint, erro e ícones.',
    usage: `<DoityInput
  v-model="email"
  label="E-mail"
  placeholder="seu@email.com"
  hint="Usaremos para contato"
  size="md"
/>`,
    props: {
      modelValue: { description: 'Valor do campo (v-model)', type: 'string', default: '', control: 'text' },
      type: { description: 'Tipo HTML do input', type: 'string', default: 'text', control: 'text' },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      label: { description: 'Rótulo acima do campo', type: 'string', control: 'text' },
      placeholder: { description: 'Placeholder', type: 'string', control: 'text' },
      hint: { description: 'Texto de ajuda abaixo', type: 'string', control: 'text' },
      error: { description: 'Mensagem de erro (ativa estado de erro)', type: 'string', control: 'text' },
      disabled: { description: 'Desabilita o campo', type: 'boolean', default: false, control: 'boolean' },
      required: { description: 'Marca como obrigatório', type: 'boolean', default: false, control: 'boolean' },
      id: { description: 'ID do input', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido a cada digitação',
    },
    slots: {
      'icon-leading': 'Ícone à esquerda',
      'icon-trailing': 'Ícone à direita',
    },
  },

  Modal: {
    exportName: 'DoityModal',
    description: 'Janela modal com overlay, título e ícone opcional.',
    usage: `<DoityModal
  v-model:open="open"
  title="Confirmar ação"
  description="Deseja continuar?"
  :featured-icon="true"
/>`,
    props: {
      open: { description: 'Controla visibilidade (v-model:open)', type: 'boolean', default: false, control: 'boolean' },
      title: { description: 'Título do modal', type: 'string', control: 'text' },
      description: { description: 'Texto descritivo', type: 'string', control: 'text' },
      fullscreen: { description: 'Ocupa tela inteira', type: 'boolean', default: false, control: 'boolean' },
      featuredIcon: { description: 'Exibe ícone destacado no cabeçalho', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:open': 'Emitido ao abrir/fechar',
      close: 'Emitido ao fechar',
    },
    slots: {
      default: 'Conteúdo do modal',
    },
  },

  Navbar: {
    exportName: 'DoityNavbar',
    description: 'Barra de navegação superior com contexto, papéis e perfil.',
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
    },
  },

  Pagination: {
    exportName: 'DoityPagination',
    description: 'Navegação entre páginas de listagens.',
    usage: `<DoityPagination v-model:page="page" :total-pages="10" />`,
    props: {
      page: { description: 'Página atual (v-model:page)', type: 'number', default: 1, control: 'number' },
      totalPages: { description: 'Total de páginas', type: 'number', default: 1, control: 'number' },
      siblingCount: { description: 'Páginas visíveis ao lado da atual', type: 'number', default: 1, control: 'number' },
      showEdges: { description: 'Sempre mostra primeira e última página', type: 'boolean', default: true, control: 'boolean' },
    },
    events: {
      'update:page': 'Emitido ao mudar de página',
    },
  },

  Select: {
    exportName: 'DoitySelect',
    description: 'Campo de seleção customizado (sem `<select>` nativo) com dropdown estilizado.',
    usage: `<DoitySelect
  v-model="estado"
  label="Estado"
  placeholder="Selecione..."
  :options="[
    { label: 'São Paulo', value: 'sp' },
    { label: 'Rio de Janeiro', value: 'rj' },
  ]"
/>`,
    props: {
      modelValue: { description: 'Valor selecionado (v-model)', type: 'string | number', default: '', control: 'text' },
      options: { description: 'Opções `{ label, value, disabled? }`', type: 'Array', control: 'object' },
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
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
      'icon-leading': 'Ícone à esquerda do trigger',
    },
  },

  Sidebar: {
    exportName: 'DoitySidebar',
    description: 'Menu lateral com papéis, itens de navegação e card de perfil.',
    usage: `<DoitySidebar
  :roles="roles"
  v-model:active-role="role"
  :items="menuItems"
  :collapsed="false"
/>`,
    props: {
      roles: { description: 'Papéis/tabs superiores', type: 'Array', control: 'object' },
      activeRole: { description: 'Papel ativo (v-model:activeRole)', type: 'string', control: 'text' },
      items: { description: 'Itens de menu', type: 'Array', control: 'object' },
      showCta: { description: 'Exibe botão CTA', type: 'boolean', default: false, control: 'boolean' },
      profileCard: { description: 'Dados do card de perfil', type: 'object | null', control: 'object' },
      collapsed: { description: 'Modo colapsado (v-model:collapsed)', type: 'boolean', default: false, control: 'boolean' },
    },
    events: {
      'update:activeRole': 'Emitido ao trocar papel',
      'update:collapsed': 'Emitido ao colapsar/expandir',
      'cta-click': 'Emitido ao clicar no CTA',
      'logout-click': 'Emitido ao clicar em logout',
    },
  },

  Sonner: {
    exportName: 'DoitySonner',
    description: 'Container de toasts. Use o composable `useDoityToast()` para disparar notificações.',
    usage: `<script setup>
const { success, error } = useDoityToast()
</script>

<template>
  <DoityButton @click="success('Salvo!')">Salvar</DoityButton>
  <DoitySonner />
</template>`,
    props: {},
  },

  Spinner: {
    exportName: 'DoitySpinner',
    description: 'Indicador de carregamento.',
    usage: `<DoitySpinner size="md" color="brand" label="Carregando..." />`,
    props: {
      size: { description: 'Tamanho', type: "'sm' | 'md' | 'lg'", default: 'md', control: 'select', options: ['sm', 'md', 'lg'] },
      color: { description: 'Cor do spinner', type: "'brand' | 'gray' | 'white'", default: 'brand', control: 'select', options: ['brand', 'gray', 'white'] },
      label: { description: 'Texto para leitores de tela', type: 'string', default: 'Carregando...', control: 'text' },
    },
  },

  Table: {
    exportName: 'DoityTable',
    description: 'Tabela de dados com colunas configuráveis.',
    usage: `<DoityTable
  :columns="[{ key: 'name', label: 'Nome' }]"
  :data="[{ name: 'Ana' }]"
  striped
  hoverable
/>`,
    props: {
      columns: { description: 'Definição das colunas `{ key, label }`', type: 'Array', control: 'object' },
      data: { description: 'Linhas da tabela', type: 'Array', control: 'object' },
      striped: { description: 'Linhas zebradas', type: 'boolean', default: false, control: 'boolean' },
      bordered: { description: 'Bordas nas células', type: 'boolean', default: true, control: 'boolean' },
      hoverable: { description: 'Destaque ao passar o mouse', type: 'boolean', default: true, control: 'boolean' },
    },
  },

  Tabs: {
    exportName: 'DoityTabs',
    description: 'Navegação por abas. Use `DoityTabPanel` como filhos.',
    usage: `<DoityTabs v-model="aba" :items="[
  { label: 'Geral', value: 'geral' },
  { label: 'Config', value: 'config' },
]">
  <DoityTabPanel value="geral">Conteúdo geral</DoityTabPanel>
  <DoityTabPanel value="config">Configurações</DoityTabPanel>
</DoityTabs>`,
    props: {
      modelValue: { description: 'Aba ativa (v-model)', type: 'string', default: '', control: 'text' },
      items: { description: 'Abas `{ label, value, disabled? }`', type: 'Array', control: 'object' },
    },
    events: {
      'update:modelValue': 'Emitido ao trocar de aba',
    },
    slots: {
      default: 'Conteúdo (DoityTabPanel)',
    },
  },

  Textarea: {
    exportName: 'DoityTextarea',
    description: 'Campo de texto multilinha.',
    usage: `<DoityTextarea
  v-model="descricao"
  label="Descrição"
  placeholder="Digite..."
  :rows="4"
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
      rows: { description: 'Número de linhas visíveis', type: 'number', default: 4, control: 'number' },
      resize: { description: 'Comportamento de resize CSS', type: 'string', default: 'vertical', control: 'text' },
      id: { description: 'ID do textarea', type: 'string', control: 'text' },
    },
    events: {
      'update:modelValue': 'Emitido a cada digitação',
    },
  },

  Tooltip: {
    exportName: 'DoityTooltip',
    description: 'Dica contextual ao passar o mouse ou focar.',
    usage: `<DoityTooltip content="Texto de ajuda" position="top">
  <DoityButton hierarchy="outline">Hover me</DoityButton>
</DoityTooltip>`,
    props: {
      content: { description: 'Texto exibido no tooltip', type: 'string', control: 'text' },
      position: { description: 'Posição relativa ao trigger', type: "'top' | 'bottom' | 'left' | 'right'", default: 'top', control: 'select', options: ['top', 'bottom', 'left', 'right'] },
      delay: { description: 'Atraso em ms antes de exibir', type: 'number', default: 200, control: 'number' },
      theme: { description: 'Tema visual', type: "'light' | 'dark'", default: 'light', control: 'select', options: ['light', 'dark'] },
    },
    slots: {
      default: 'Elemento trigger (filho)',
    },
  },
} satisfies Record<string, ComponentDocEntry>

export type ComponentDocName = keyof typeof componentDocs
