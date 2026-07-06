export interface DoityRegistryEntry {
  name: string
  slug: string
  category: 'foundations' | 'components'
  description: string
  figmaPage: string
  component?: string
}

export const componentRegistry: DoityRegistryEntry[] = [
  { name: 'Colors', slug: 'colors', category: 'foundations', description: 'Paleta de cores do design system', figmaPage: 'Foundations' },
  { name: 'Typography', slug: 'typography', category: 'foundations', description: 'Escala tipográfica e família de fontes', figmaPage: 'Foundations' },
  { name: 'Shadows', slug: 'shadows', category: 'foundations', description: 'Sombras e elevações', figmaPage: 'Foundations' },
  { name: 'Tokens', slug: 'tokens', category: 'foundations', description: 'Variáveis CSS sincronizadas com o Figma', figmaPage: 'Tokens' },
  { name: 'Accordion', slug: 'accordion', category: 'components', description: 'Painéis expansíveis', figmaPage: 'Accordion', component: 'DoityAccordion' },
  { name: 'Alert', slug: 'alert', category: 'components', description: 'Mensagens de feedback', figmaPage: 'Alert', component: 'DoityAlert' },
  { name: 'Alert Dialog', slug: 'alert-dialog', category: 'components', description: 'Diálogos de confirmação', figmaPage: 'Alert Dialog', component: 'DoityAlertDialog' },
  { name: 'Avatar', slug: 'avatar', category: 'components', description: 'Representação visual de usuários', figmaPage: 'Avatar', component: 'DoityAvatar' },
  { name: 'Badge', slug: 'badge', category: 'components', description: 'Etiquetas e status', figmaPage: 'Badge', component: 'DoityBadge' },
  { name: 'Breadcrumb', slug: 'breadcrumb', category: 'components', description: 'Navegação hierárquica', figmaPage: 'Breadcrumb', component: 'DoityBreadcrumb' },
  { name: 'Button', slug: 'button', category: 'components', description: 'Ações e interações primárias', figmaPage: 'Button', component: 'DoityButton' },
  { name: 'Card', slug: 'card', category: 'components', description: 'Containers de conteúdo', figmaPage: 'Card', component: 'DoityCard' },
  { name: 'Charts', slug: 'charts', category: 'components', description: 'Visualização de dados', figmaPage: 'Charts', component: 'DoityChart' },
  { name: 'Checkbox & Toggle', slug: 'checkbox-toggle', category: 'components', description: 'Seleção e alternância', figmaPage: 'Radio, Checkbox & Toggle', component: 'DoityCheckbox' },
  { name: 'Dialog', slug: 'dialog', category: 'components', description: 'Modais e overlays', figmaPage: 'Dialog', component: 'DoityDialog' },
  { name: 'Dropdown', slug: 'dropdown', category: 'components', description: 'Menus suspensos', figmaPage: 'Select & Dropdown', component: 'DoityDropdown' },
  { name: 'Empty', slug: 'empty', category: 'components', description: 'Estados vazios', figmaPage: 'Empty', component: 'DoityEmpty' },
  { name: 'Input', slug: 'input', category: 'components', description: 'Campos de texto', figmaPage: 'Input', component: 'DoityInput' },
  { name: 'Modal', slug: 'modal', category: 'components', description: 'Janelas modais', figmaPage: 'Modal', component: 'DoityModal' },
  { name: 'Navbar', slug: 'navbar', category: 'components', description: 'Barra de navegação superior', figmaPage: 'Navbar', component: 'DoityNavbar' },
  { name: 'Pagination', slug: 'pagination', category: 'components', description: 'Navegação entre páginas', figmaPage: 'Pagination', component: 'DoityPagination' },
  { name: 'Sidebar', slug: 'sidebar', category: 'components', description: 'Menu lateral', figmaPage: 'Menu Sidebar', component: 'DoitySidebar' },
  { name: 'Sonner', slug: 'sonner', category: 'components', description: 'Notificações toast', figmaPage: 'Sonner', component: 'DoitySonner' },
  { name: 'Spinner', slug: 'spinner', category: 'components', description: 'Indicador de carregamento', figmaPage: 'Spinner', component: 'DoitySpinner' },
  { name: 'Table', slug: 'table', category: 'components', description: 'Tabelas de dados', figmaPage: 'Table', component: 'DoityTable' },
  { name: 'Tabs', slug: 'tabs', category: 'components', description: 'Navegação por abas', figmaPage: 'Tabs', component: 'DoityTabs' },
  { name: 'Text Area', slug: 'textarea', category: 'components', description: 'Campos de texto multilinha', figmaPage: 'Text Area', component: 'DoityTextarea' },
  { name: 'Tooltip', slug: 'tooltip', category: 'components', description: 'Dicas contextuais', figmaPage: 'Tooltip', component: 'DoityTooltip' },
]

export function useDoityRegistry() {
  const foundations = componentRegistry.filter(c => c.category === 'foundations')
  const components = componentRegistry.filter(c => c.category === 'components')

  function findBySlug(slug: string) {
    return componentRegistry.find(c => c.slug === slug)
  }

  return { foundations, components, componentRegistry, findBySlug }
}
