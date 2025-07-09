# Development Guidelines

## Component Development Workflow

### Phase-by-Phase Implementation

**Phase 1: Foundation Primitives**
- `ui-box`, `ui-text`, `ui-spacer` (layout fundamentals)
- `ui-button`, `ui-input`, `ui-link` (basic interactions)
- `ui-icon`, `ui-image` (content elements)

**Phase 2: Interactive Primitives** 
- `ui-checkbox`, `ui-radio`, `ui-switch` (form controls)
- `ui-slider`, `ui-progress` (value displays)
- `ui-focus-trap`, `ui-portal` (behavioral utilities)

**Phase 3: Stress Test with First Molecules**
- `ui-field` (input + label + validation)
- `ui-select` (dropdown composition)
- `ui-alert` (feedback composition)

**Phase 4: Complex Primitives**
- `ui-textarea`, `ui-observer`, `ui-clickaway`
- `ui-skeleton`, `ui-divider`

**Phase 5: Advanced Molecules**
- `ui-combobox`, `ui-date-picker`, `ui-tooltip`
- `ui-badge`, `ui-chip`, `ui-card`

### Implementation Checklist per Component

**Pre-Development:**
- [ ] Review atomic design level (primitive/molecule/organism)
- [ ] Identify base class (BaseComponent vs ShadowComponent)
- [ ] Define API surface (attributes, properties, events, slots)
- [ ] Plan accessibility requirements (ARIA, keyboard nav)
- [ ] Sketch theming approach and CSS custom properties

**Core Implementation:**
- [ ] Create component directory with all files
- [ ] Implement JavaScript class with proper inheritance
- [ ] Add CSS with theming tokens and responsive design
- [ ] Document HTML structure in .html file
- [ ] Register custom element with proper naming

**Testing & Documentation:**
- [ ] Write comprehensive unit tests
- [ ] Create Storybook stories for all variants
- [ ] Test keyboard navigation and screen reader support
- [ ] Validate with automated accessibility tools
- [ ] Test in multiple browsers and devices

**Integration:**
- [ ] Add to main library index
- [ ] Update TypeScript definitions (if applicable)
- [ ] Test with existing components
- [ ] Performance validation

## Code Standards

### Naming Conventions

**Custom Elements:**
```javascript
// Always kebab-case with 'ui-' prefix
customElements.define('ui-button', UiButton);
customElements.define('ui-date-picker', UiDatePicker);
```

**CSS Classes:**
```css
/* Component base class matches element name */
.ui-button { }

/* Variants use double hyphen */
.ui-button--primary { }
.ui-button--large { }

/* Sub-elements use double underscore */
.ui-button__icon { }
.ui-button__spinner { }

/* States use single hyphen */
.ui-button-disabled { }
.ui-button-loading { }
```

**CSS Custom Properties:**
```css
/* Global tokens without component prefix */
--color-primary
--spacing-md
--font-size-lg

/* Component-specific tokens with prefix */
--button-bg
--button-padding
--card-radius
```

**JavaScript Properties:**
```javascript
// camelCase for properties
element.variant = 'primary';
element.isDisabled = true;

// kebab-case for attributes
element.setAttribute('variant', 'primary');
element.setAttribute('is-disabled', '');
```

**Events:**
```javascript
// Prefix with 'ui-' and use kebab-case
this.dispatchCustomEvent('click', details);      // becomes 'ui-click'
this.dispatchCustomEvent('value-change', data);  // becomes 'ui-value-change'
```

### File Organization Standards

**Directory Structure:**
```
src/components/[level]/[component-name]/
├── [component-name].js      // Main implementation
├── [component-name].css     // Styles
├── [component-name].html    // Structure documentation
├── [component-name].test.js // Unit tests
├── [component-name].stories.js // Storybook stories
└── index.js                 // Export
```

**Import/Export Patterns:**
```javascript
// Always use named exports
export class UiButton extends ShadowComponent { }

// Re-export in index.js
export { UiButton } from './ui-button.js';

// Import in consuming code
import { UiButton } from '@our-library/ui-button';
```

### Accessibility Standards

**ARIA Implementation:**
```javascript
// Always provide semantic roles
button.setAttribute('role', 'button');

// Use semantic HTML elements when possible
<button> instead of <div role="button">

// Label everything clearly
button.setAttribute('aria-label', this.ariaLabel || this.textContent);

// Announce state changes
button.setAttribute('aria-pressed', this.pressed.toString());
```

**Keyboard Navigation:**
```javascript
// Standard key handling
_handleKeydown(event) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      this._activate();
      break;
    case 'Escape':
      this._close();
      break;
    case 'ArrowDown':
      this._moveNext();
      break;
  }
}
```

**Focus Management:**
```javascript
// Always manage focus for modal content
onConnect() {
  if (this.autoFocus) {
    this.focus();
  }
}

// Restore focus when closing modals
_close() {
  if (this._previousFocus) {
    this._previousFocus.focus();
  }
}
```

### Performance Standards

**Lazy Initialization:**
```javascript
// Defer expensive operations
get _expensiveProperty() {
  if (!this._cached) {
    this._cached = this._computeExpensiveValue();
  }
  return this._cached;
}

// Batch DOM updates
requestUpdate() {
  if (this._updateScheduled) return;
  
  this._updateScheduled = true;
  queueMicrotask(() => {
    this._updateScheduled = false;
    this._performUpdate();
  });
}
```

**Event Listener Management:**
```javascript
// Always use managed listeners for cleanup
onConnect() {
  this.addManagedEventListener(window, 'resize', this._handleResize);
  this.addManagedEventListener(document, 'click', this._handleDocumentClick);
}

// Passive listeners for performance
this.addManagedEventListener(element, 'scroll', handler, { passive: true });
```

**Memory Management:**
```javascript
// Clean up resources in disconnectedCallback
onDisconnect() {
  // Cleanup managed listeners (handled by base class)
  super.onDisconnect();
  
  // Cancel any pending operations
  if (this._animationFrame) {
    cancelAnimationFrame(this._animationFrame);
  }
  
  // Clear timers
  if (this._timer) {
    clearTimeout(this._timer);
  }
  
  // Remove references
  this._cached = null;
}
```

## Testing Standards

### Unit Test Structure

```javascript
// components/primitives/ui-button/ui-button.test.js
import { expect } from '@esm-bundle/chai';
import './ui-button.js';

describe('ui-button', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('ui-button');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('initialization', () => {
    it('should create with defaults', () => {
      expect(element.variant).to.equal('primary');
      expect(element.size).to.equal('medium');
      expect(element.disabled).to.be.false;
    });

    it('should have proper shadow DOM structure', () => {
      const button = element.shadowRoot.querySelector('button');
      expect(button).to.exist;
      expect(button.classList.contains('ui-button')).to.be.true;
    });
  });

  describe('attributes and properties', () => {
    it('should sync attribute to property', () => {
      element.setAttribute('variant', 'secondary');
      expect(element.variant).to.equal('secondary');
    });

    it('should sync property to attribute', () => {
      element.variant = 'ghost';
      expect(element.getAttribute('variant')).to.equal('ghost');
    });

    it('should handle boolean attributes', () => {
      element.disabled = true;
      expect(element.hasAttribute('disabled')).to.be.true;
      expect(element.disabled).to.be.true;
    });
  });

  describe('events', () => {
    it('should dispatch ui-click on button click', (done) => {
      element.addEventListener('ui-click', (event) => {
        expect(event.detail.variant).to.equal('primary');
        done();
      });
      
      const button = element.shadowRoot.querySelector('button');
      button.click();
    });

    it('should not dispatch when disabled', (done) => {
      element.disabled = true;
      
      element.addEventListener('ui-click', () => {
        done(new Error('Should not fire when disabled'));
      });
      
      const button = element.shadowRoot.querySelector('button');
      button.click();
      
      setTimeout(done, 50);
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      element.setAttribute('aria-label', 'Test button');
      const button = element.shadowRoot.querySelector('button');
      expect(button.getAttribute('aria-label')).to.equal('Test button');
    });

    it('should handle keyboard events', (done) => {
      element.addEventListener('ui-click', () => done());
      
      const button = element.shadowRoot.querySelector('button');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(event);
    });

    it('should be focusable', () => {
      element.focus();
      expect(document.activeElement).to.equal(element);
    });
  });

  describe('theming', () => {
    it('should use CSS custom properties', () => {
      const button = element.shadowRoot.querySelector('button');
      const styles = getComputedStyle(button);
      
      // Verify theme variables are applied
      expect(styles.getPropertyValue('--color-primary')).to.not.be.empty;
    });

    it('should support theme overrides', () => {
      element.style.setProperty('--button-bg', 'red');
      element.requestUpdate();
      
      // Verify override is applied
      const button = element.shadowRoot.querySelector('button');
      // Test implementation would verify the color
    });
  });
});
```

### Integration Test Patterns

```javascript
// tests/integration/form-components.test.js
describe('Form Component Integration', () => {
  let form, field, input, button;

  beforeEach(() => {
    form = document.createElement('ui-form');
    field = document.createElement('ui-field');
    input = document.createElement('ui-input');
    button = document.createElement('ui-button');
    
    field.appendChild(input);
    form.appendChild(field);
    form.appendChild(button);
    document.body.appendChild(form);
  });

  afterEach(() => {
    document.body.removeChild(form);
  });

  it('should handle form submission flow', async () => {
    input.value = 'test@example.com';
    input.required = true;
    
    button.click();
    
    // Test form validation, submission events, etc.
  });

  it('should manage focus between components', () => {
    input.focus();
    expect(document.activeElement).to.equal(input);
    
    // Test tab navigation
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    input.dispatchEvent(tabEvent);
    
    expect(document.activeElement).to.equal(button);
  });
});
```

### Accessibility Testing

```javascript
// Use axe-core for automated accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('ui-button accessibility', () => {
  it('should have no accessibility violations', async () => {
    const element = document.createElement('ui-button');
    element.textContent = 'Click me';
    document.body.appendChild(element);
    
    const results = await axe(element);
    expect(results).toHaveNoViolations();
    
    document.body.removeChild(element);
  });

  it('should work with screen readers', () => {
    const element = document.createElement('ui-button');
    element.setAttribute('aria-label', 'Submit form');
    
    // Test that aria-label is properly reflected
    const button = element.shadowRoot.querySelector('button');
    expect(button.getAttribute('aria-label')).to.equal('Submit form');
  });
});
```

## Storybook Standards

### Story Structure

```javascript
// components/primitives/ui-button/ui-button.stories.js
import './ui-button.js';

export default {
  title: 'Primitives/Interactive/Button',
  component: 'ui-button',
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component supporting multiple variants, sizes, and states.'
      }
    },
    a11y: {
      // Configure accessibility testing
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner'
    }
  }
};

// Template for creating button instances
const Template = (args) => {
  const button = document.createElement('ui-button');
  
  Object.keys(args).forEach(key => {
    if (key === 'children') {
      button.textContent = args[key];
    } else if (typeof args[key] === 'boolean') {
      if (args[key]) button.setAttribute(key, '');
    } else if (args[key]) {
      button.setAttribute(key, args[key]);
    }
  });
  
  return button;
};

// Individual stories
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button'
};

export const AllVariants = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 1rem; align-items: center;';
  
  ['primary', 'secondary', 'ghost'].forEach(variant => {
    const button = document.createElement('ui-button');
    button.setAttribute('variant', variant);
    button.textContent = variant.charAt(0).toUpperCase() + variant.slice(1);
    container.appendChild(button);
  });
  
  return container;
};

export const AllSizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 1rem; align-items: center;';
  
  ['small', 'medium', 'large'].forEach(size => {
    const button = document.createElement('ui-button');
    button.setAttribute('size', size);
    button.textContent = size.charAt(0).toUpperCase() + size.slice(1);
    container.appendChild(button);
  });
  
  return container;
};

// Interactive story with play function
export const Interactive = Template.bind({});
Interactive.args = {
  variant: 'primary',
  children: 'Click me!'
};

Interactive.play = async ({ canvasElement }) => {
  const button = canvasElement.querySelector('ui-button');
  
  // Add event listener for demonstration
  button.addEventListener('ui-click', (event) => {
    console.log('Button clicked:', event.detail);
    
    // Show loading state briefly
    button.loading = true;
    setTimeout(() => {
      button.loading = false;
    }, 2000);
  });
};

// Accessibility testing story
export const AccessibilityTest = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  
  // Button with aria-label
  const labeledButton = document.createElement('ui-button');
  labeledButton.setAttribute('aria-label', 'Close dialog');
  labeledButton.textContent = '×';
  
  // Button with describedby
  const describedButton = document.createElement('ui-button');
  describedButton.id = 'submit-btn';
  describedButton.textContent = 'Submit';
  
  const description = document.createElement('div');
  description.id = 'submit-desc';
  description.textContent = 'Submits the form data';
  describedButton.setAttribute('aria-describedby', 'submit-desc');
  
  container.appendChild(labeledButton);
  container.appendChild(describedButton);
  container.appendChild(description);
  
  return container;
};
```

## Error Handling Standards

### Graceful Degradation

```javascript
// Handle missing dependencies gracefully
constructor() {
  super();
  
  try {
    this.setupShadowDOM();
  } catch (error) {
    console.warn(`${this.tagName}: Shadow DOM setup failed`, error);
    this._fallbackToLightDOM();
  }
}

_fallbackToLightDOM() {
  // Provide light DOM fallback
  this.innerHTML = this._getLightDOMTemplate();
  this.classList.add('ui-button', 'ui-button--fallback');
}
```

### Validation and Warnings

```javascript
// Validate component usage
connectedCallback() {
  super.connectedCallback();
  
  this._validateUsage();
}

_validateUsage() {
  // Check for required attributes
  if (this.tagName === 'UI-INPUT' && !this.hasAttribute('label') && !this.hasAttribute('aria-label')) {
    console.warn('ui-input: Missing accessible label. Provide either label attribute or aria-label.');
  }
  
  // Check for invalid combinations
  if (this.disabled && this.loading) {
    console.warn('ui-button: disabled and loading states should not be used together.');
  }
  
  // Validate attribute values
  const validVariants = ['primary', 'secondary', 'ghost'];
  if (this.variant && !validVariants.includes(this.variant)) {
    console.warn(`ui-button: Invalid variant "${this.variant}". Valid options: ${validVariants.join(', ')}`);
  }
}
```

## Build and Deployment Standards

### Component Exports

```javascript
// src/index.js - Main library entry point
// Primitives
export { UiBox } from './components/primitives/ui-box/index.js';
export { UiButton } from './components/primitives/ui-button/index.js';
export { UiInput } from './components/primitives/ui-input/index.js';
// ... etc

// Molecules
export { UiField } from './components/molecules/ui-field/index.js';
export { UiSelect } from './components/molecules/ui-select/index.js';
// ... etc

// Organisms
export { UiDialog } from './components/organisms/ui-dialog/index.js';
export { UiTable } from './components/organisms/ui-table/index.js';
// ... etc

// Utilities
export { themeManager } from './styles/theme-manager.js';
export { ThemeBuilder } from './styles/theme-builder.js';

// Auto-register all components
export function registerAll() {
  // Import and register all components
  import('./components/primitives/ui-button/ui-button.js');
  import('./components/primitives/ui-input/ui-input.js');
  // ... etc
}

// Selective registration
export function registerComponent(componentName) {
  const componentMap = {
    'ui-button': () => import('./components/primitives/ui-button/ui-button.js'),
    'ui-input': () => import('./components/primitives/ui-input/ui-input.js'),
    // ... etc
  };
  
  return componentMap[componentName]?.();
}
```

### TypeScript Definitions (if using TS)

```typescript
// types/index.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-button': UiButtonAttributes;
      'ui-input': UiInputAttributes;
      // ... etc
    }
  }
}

interface UiButtonAttributes {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  'aria-label'?: string;
}

interface UiInputAttributes {
  type?: 'text' | 'email' | 'password' | 'number';
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
}
```

## Documentation Standards

### Component Documentation Template

```markdown
# ui-button

A versatile button component with multiple variants, sizes, and states.

## Usage

```html
<ui-button variant="primary" size="medium">
  Click me
</ui-button>
```

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `ui-click` | `{ variant, size, originalEvent }` | Fired when button is clicked |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--button-bg` | `var(--color-primary)` | Background color |
| `--button-color` | `var(--color-background)` | Text color |
| `--button-border` | `transparent` | Border color |

## Accessibility

- Supports keyboard navigation (Enter and Space keys)
- Proper ARIA attributes for screen readers
- Focus management and visual indicators
- High contrast mode support

## Examples

See [Storybook stories](./ui-button.stories.js) for comprehensive examples.
```

This comprehensive guide ensures:
- **Consistent implementation** across all components
- **High-quality code** with proper testing and accessibility
- **Developer experience** with clear patterns and documentation
- **Maintainable codebase** with standardized structure
- **Production readiness** with performance and error handling standards