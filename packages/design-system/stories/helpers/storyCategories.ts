import type { ComponentDocName } from '../docs/component-docs'

/** Categorias do sidebar (ASCII — melhor para o indexador do Storybook) */
export const STORY_CATEGORY_ORDER = [
  'Actions',
  'Forms',
  'Feedback',
  'Navigation',
  'Data',
  'Overlay',
  'Upload',
  'Layout',
] as const

export type StoryCategory = (typeof STORY_CATEGORY_ORDER)[number]

type StoryPlacement = {
  category: StoryCategory
  label: string
}

export const storyPlacement: Partial<Record<ComponentDocName, StoryPlacement>> = {
  Button: { category: 'Actions', label: 'Button' },
  ButtonGroup: { category: 'Actions', label: 'Button Group' },

  Input: { category: 'Forms', label: 'Input' },
  Textarea: { category: 'Forms', label: 'Textarea' },
  Select: { category: 'Forms', label: 'Select' },
  Dropdown: { category: 'Forms', label: 'Dropdown' },
  DatePicker: { category: 'Forms', label: 'Date Picker' },
  Checkbox: { category: 'Forms', label: 'Checkbox' },
  Radio: { category: 'Forms', label: 'Radio' },
  Switch: { category: 'Forms', label: 'Switch' },
  ChoiceOption: { category: 'Forms', label: 'Checkbox Group' },
  CheckboxGroupItem: { category: 'Forms', label: 'Checkbox Group Item' },

  Alert: { category: 'Feedback', label: 'Alert' },
  AlertBanner: { category: 'Feedback', label: 'Alert Banner' },
  AlertDialog: { category: 'Feedback', label: 'Alert Dialog' },
  Countdown: { category: 'Feedback', label: 'Countdown' },
  Sonner: { category: 'Feedback', label: 'Sonner' },
  Spinner: { category: 'Feedback', label: 'Spinner' },
  StarRating: { category: 'Feedback', label: 'Star Rating' },
  Empty: { category: 'Feedback', label: 'Empty' },
  Tooltip: { category: 'Feedback', label: 'Tooltip' },

  Breadcrumb: { category: 'Navigation', label: 'Breadcrumb' },
  Navbar: { category: 'Navigation', label: 'Navbar' },
  Menubar: { category: 'Navigation', label: 'Menubar' },
  NavigationMenu: { category: 'Navigation', label: 'Navigation Menu' },
  Tabs: { category: 'Navigation', label: 'Tabs' },
  Pagination: { category: 'Navigation', label: 'Pagination' },

  Table: { category: 'Data', label: 'Table' },
  Chart: { category: 'Data', label: 'Chart' },
  Badge: { category: 'Data', label: 'Badge' },
  Avatar: { category: 'Data', label: 'Avatar' },
  Card: { category: 'Data', label: 'Card' },
  CreditCard: { category: 'Data', label: 'Credit Card' },
  VideoPlayer: { category: 'Data', label: 'Video Player' },
  PlayButton: { category: 'Data', label: 'Play Button' },
  Item: { category: 'Data', label: 'Item' },
  ItemGroup: { category: 'Data', label: 'Item Group' },

  Dialog: { category: 'Overlay', label: 'Dialog' },
  Modal: { category: 'Overlay', label: 'Modal' },

  FileDropzone: { category: 'Upload', label: 'File Dropzone' },
  FileUpload: { category: 'Upload', label: 'File Upload' },

  Accordion: { category: 'Layout', label: 'Accordion' },
  AccordionItem: { category: 'Layout', label: 'Accordion Item' },

  MinimalStepper: { category: 'Navigation', label: 'Minimal Stepper' },
  ArrowStepper: { category: 'Navigation', label: 'Arrow Stepper' },
  Stepper: { category: 'Navigation', label: 'Stepper' },
}

export function storyTitleFor(name: ComponentDocName): string {
  const place = storyPlacement[name]
  if (!place) return `Components/${name}`
  return `Components/${place.category}/${place.label}`
}
