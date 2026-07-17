# Ajuste de reuso de componentes (gaps)

Documentação do refactor que alinha compostos do design system aos primitivos existentes, **sem forçar o mesmo visual** quando o Figma diverge.

## Princípio

Reutilizar a **mesma base** (`Button`, `Badge`, `Modal`, `Checkbox`/`Radio`, `Spinner`, `Dropdown`, etc.) e adaptar com classes/` :deep` / props, em vez de reinventar shell, controles ou overlays.

## Mapa de mudanças

| Componente | Antes | Depois (adaptável) |
|---|---|---|
| **AlertDialog** | Shell próprio (Teleport/backdrop) | `Modal` com `role="alertdialog"` + `Button` no footer |
| **AlertBanner** | Badge desenhado à mão | `Badge` com overrides de pill branco do banner |
| **ChoiceOption** | Checkbox/Radio/Tag custom | `Checkbox`/`Radio` apresentacionais + `Badge` na tag |
| **Sonner** | Botão e spinner próprios | `Button` (ação) + `Spinner` (loading) |
| **Pagination** | `<button>` nativo em tudo | `Button` nas setas (default/card/compact); números e dots/lines continuam especializados |
| **Navbar** | Bloco de usuário / menu manual | `AvatarLabelGroup` + `Dropdown` |
| **Menubar / NavigationMenu** | Overlay próprio | Coordenador compartilhado (`overlayCoordinator`) — sem forçar `Dropdown` |
| **Stepper** | Irmãos soltos | Facade `Stepper variant="minimal\|arrow\|icons"` → Minimal / Arrow / Icon |
| **FileUpload** | Remove ad hoc | `Button` (link / icon-only) |
| **VideoPlayer** | Toggle inferior ad hoc | `Button` + `PlayButton` no centro |
| **Countdown** (badge) | Pill ad hoc | `Badge` como casca; dígitos animados no label |

## Detalhes importantes

### Pagination
- Setas: `hierarchy="link"` (ícone) ou `outline` (com labels).
- Variante **card**: visual de button group próprio; divisores laterais nas setas preservados mesmo com `Button`.
- Com `showLabels`, as setas usam `width: auto` para não cortar “Anterior” / “Próxima”.
- Dots/lines e números de página **não** viram `Button` — comportamento/visual de carrossel e página ativa são específicos.

### Overlay (Menubar / NavigationMenu)
- Um único overlay aberto por vez via `overlayCoordinator`, em vez de acoplar ao `Dropdown` (menus de navegação têm layout e hover distintos).

### Stepper
- API unificada: `DoityStepper` com `variant`; exports dos stepers concretos permanecem para uso direto.

## Correções pós-gap
- **Badge**: removida animação micro-scale (`animated` / pulse).
- **Pagination card**: bordas entre setas e páginas restauradas; labels sem clip por `width: 40px` fixo.
- **ButtonGroup**: segmentos com `min-width: min-content` para não esmagar texto.

## Como validar no Storybook

1. AlertDialog / Modal
2. AlertBanner, ChoiceOption (control + card), Sonner
3. Pagination: default, card, card+labels, compact, dots
4. Navbar (usuário + menu)
5. Menubar e NavigationMenu (abrir um fecha o outro)
6. Stepper `variant` minimal / arrow / icons
7. FileUpload, VideoPlayer, Countdown badge
