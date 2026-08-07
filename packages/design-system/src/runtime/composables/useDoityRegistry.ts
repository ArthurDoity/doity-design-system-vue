export interface DoityRegistryEntry {
  name: string
  slug: string
  category: 'foundations' | 'components'
  description: string
  figmaPage: string
  component?: string
}

export const componentRegistry: DoityRegistryEntry[] = [
  { name: 'Colors', slug: 'colors', category: 'foundations', description: 'Paleta Gray, Brand, Success, Warning, Error e Info', figmaPage: 'Foundations' },
  { name: 'Typography', slug: 'typography', category: 'foundations', description: 'Inter — Display e Text com pesos Regular a Bold', figmaPage: 'Foundations' },
  { name: 'Shadows', slug: 'shadows', category: 'foundations', description: 'Elevações shadow-xs até shadow-3xl e focus rings', figmaPage: 'Foundations' },
  { name: 'Tokens', slug: 'tokens', category: 'foundations', description: 'Variáveis CSS --doity-*', figmaPage: 'Tokens' },
  { name: 'Accordion', slug: 'accordion', category: 'components', description: 'Painéis expansíveis', figmaPage: 'Accordion', component: 'DoityAccordion' },
  { name: 'Alert', slug: 'alert', category: 'components', description: 'Alert card com ícone, título e descrição', figmaPage: 'Alert', component: 'DoityAlert' },
  { name: 'Alert Banner', slug: 'alert-banner', category: 'components', description: 'Alert pill compacto com badge', figmaPage: 'Alert', component: 'DoityAlertBanner' },
  { name: 'Alert Dialog', slug: 'alert-dialog', category: 'components', description: 'Diálogos de confirmação', figmaPage: 'Alert Dialog', component: 'DoityAlertDialog' },
  { name: 'Avatar', slug: 'avatar', category: 'components', description: 'Avatar, grupo, label group e indicador online', figmaPage: 'Avatar', component: 'DoityAvatar' },
  { name: 'Badge', slug: 'badge', category: 'components', description: 'Tags/badges com cores e layouts (Figma Tags)', figmaPage: 'Badge', component: 'DoityBadge' },
  { name: 'Breadcrumb', slug: 'breadcrumb', category: 'components', description: 'Navegação hierárquica', figmaPage: 'Breadcrumb', component: 'DoityBreadcrumb' },
  { name: 'Button', slug: 'button', category: 'components', description: 'Ações e interações primárias', figmaPage: 'Button', component: 'DoityButton' },
  { name: 'Button Group', slug: 'button-group', category: 'components', description: 'Botões agrupados com borda compartilhada', figmaPage: 'Button Group', component: 'DoityButtonGroup' },
  { name: 'Card', slug: 'card', category: 'components', description: 'Containers de conteúdo', figmaPage: 'Card', component: 'DoityCard' },
  { name: 'Credit Card', slug: 'credit-card', category: 'components', description: 'Mockup de cartão de crédito', figmaPage: 'Credit Card Mockup', component: 'DoityCreditCard' },
  { name: 'Charts', slug: 'charts', category: 'components', description: 'Bar, line, pie, progress, circle, activity e radar', figmaPage: 'Charts', component: 'DoityChart' },
  { name: 'Checkbox & Toggle', slug: 'checkbox-toggle', category: 'components', description: 'Checkbox, Radio e Switch', figmaPage: 'Radio, Checkbox & Toggle', component: 'DoityCheckbox' },
  { name: 'Checkbox Group', slug: 'choice-option', category: 'components', description: 'Item de grupo selecionável (control / icon / card)', figmaPage: 'Checkbox group item', component: 'DoityChoiceOption' },
  { name: 'Checkbox Group Item', slug: 'checkbox-group-item', category: 'components', description: 'Alias de Choice Option (variant=control)', figmaPage: 'Checkbox group item', component: 'DoityCheckboxGroupItem' },
  { name: 'Countdown', slug: 'countdown', category: 'components', description: 'Temporizador genérico (plain, badge ou text)', figmaPage: 'Box de Inscrição e Checkout', component: 'DoityCountdown' },
  { name: 'Date Picker', slug: 'date-picker', category: 'components', description: 'Calendário interativo (single ou range)', figmaPage: 'Date picker', component: 'DoityDatePicker' },
  { name: 'Dialog', slug: 'dialog', category: 'components', description: 'Atalho de Modal com Cancelar/Salvar', figmaPage: 'Dialog', component: 'DoityDialog' },
  { name: 'Dropdown', slug: 'dropdown', category: 'components', description: 'Menus suspensos', figmaPage: 'Select & Dropdown', component: 'DoityDropdown' },
  { name: 'Empty', slug: 'empty', category: 'components', description: 'Estados vazios (default, outline, muted)', figmaPage: 'Empty', component: 'DoityEmpty' },
  { name: 'File Dropzone', slug: 'file-dropzone', category: 'components', description: 'Upload por clique ou arrastar e soltar', figmaPage: 'Box de Inscrição e Checkout', component: 'DoityFileDropzone' },
  { name: 'File Upload', slug: 'file-upload', category: 'components', description: 'Card de progresso (upload/download) e arquivo concluído', figmaPage: 'Box de Inscrição e Checkout', component: 'DoityFileUpload' },
  { name: 'Input', slug: 'input', category: 'components', description: 'Campos de texto', figmaPage: 'Input', component: 'DoityInput' },
  { name: 'Item', slug: 'item', category: 'components', description: 'Item versátil com media, título, descrição e ações', figmaPage: 'Item', component: 'DoityItem' },
  { name: 'Modal', slug: 'modal', category: 'components', description: 'Modais sm–xxl com layouts e animação', figmaPage: 'Modal', component: 'DoityModal' },
  { name: 'Menubar', slug: 'menubar', category: 'components', description: 'Barra de menu horizontal com dropdowns', figmaPage: 'Menubar', component: 'DoityMenubar' },
  { name: 'Navbar', slug: 'navbar', category: 'components', description: 'Barra de navegação superior', figmaPage: 'Navbar', component: 'DoityNavbar' },
  { name: 'Navigation Menu', slug: 'navigation-menu', category: 'components', description: 'Menu de navegação com painel mega menu', figmaPage: 'Navigation Menu', component: 'DoityNavigationMenu' },
  { name: 'Pagination', slug: 'pagination', category: 'components', description: 'Paginação (default, card, dots, lines) com animações', figmaPage: 'Pagination', component: 'DoityPagination' },
  { name: 'Play Button', slug: 'play-button', category: 'components', description: 'Botão circular de play', figmaPage: 'Video Player', component: 'DoityPlayButton' },
  { name: 'Radio', slug: 'radio', category: 'components', description: 'Seleção única em grupo', figmaPage: 'Radio, Checkbox & Toggle', component: 'DoityRadio' },
  { name: 'Select', slug: 'select', category: 'components', description: 'Campo de seleção', figmaPage: 'Select & Dropdown', component: 'DoitySelect' },
  { name: 'Sonner', slug: 'sonner', category: 'components', description: 'Notificações toast', figmaPage: 'Sonner', component: 'DoitySonner' },
  { name: 'Spinner', slug: 'spinner', category: 'components', description: 'Indicador de carregamento', figmaPage: 'Spinner', component: 'DoitySpinner' },
  { name: 'Star Rating', slug: 'star-rating', category: 'components', description: 'Avaliação por estrelas com animação', figmaPage: 'Box de Inscrição e Checkout', component: 'DoityStarRating' },
  { name: 'Stepper', slug: 'stepper', category: 'components', description: 'Steppers minimal, arrow e ícones (checkout)', figmaPage: 'Stepper', component: 'DoityStepper' },
  { name: 'Switch', slug: 'switch', category: 'components', description: 'Alternância on/off', figmaPage: 'Radio, Checkbox & Toggle', component: 'DoitySwitch' },
  { name: 'Table', slug: 'table', category: 'components', description: 'Tabela em card com header, filtros, células compostas e paginação', figmaPage: 'Table', component: 'DoityTable' },
  { name: 'Tabs', slug: 'tabs', category: 'components', description: 'Menu Tabs com pill deslizante', figmaPage: 'Tabs', component: 'DoityTabs' },
  { name: 'Text Area', slug: 'textarea', category: 'components', description: 'Campos de texto multilinha', figmaPage: 'Text Area', component: 'DoityTextarea' },
  { name: 'Tooltip', slug: 'tooltip', category: 'components', description: 'Dicas contextuais', figmaPage: 'Tooltip', component: 'DoityTooltip' },
  { name: 'Video Player', slug: 'video-player', category: 'components', description: 'Player de vídeo com play e progresso', figmaPage: 'Video Player', component: 'DoityVideoPlayer' },
]

export function useDoityRegistry() {
  const foundations = componentRegistry.filter(c => c.category === 'foundations')
  const components = componentRegistry.filter(c => c.category === 'components')

  function findBySlug(slug: string) {
    return componentRegistry.find(c => c.slug === slug)
  }

  return { foundations, components, componentRegistry, findBySlug }
}
