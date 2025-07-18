# ui-input Extension Components

This document outlines planned extension components that build upon the primitive `ui-input` component to provide specialized functionality.

## Philosophy

The `ui-input` primitive component is intentionally minimal, supporting only `text` and `password` input types. Specialized input functionality is provided through extension components that inherit from `ui-input` and add specific features.

This approach follows KondoKode principles:
- ✅ **Keep primitives simple** - ui-input stays focused and lightweight
- ✅ **Pay-per-use features** - Only bundle specialized functionality when needed
- ✅ **Atomic design** - Molecules extend primitives with enhanced functionality
- ✅ **Progressive enhancement** - Start simple, add complexity as needed

## Planned Extension Components

### 📧 `ui-email-input`
**Location:** `src/components/molecules/ui-email-input/`
**Extends:** `ui-input`

**Enhanced Features:**
- Email validation with real-time feedback
- Email format correction suggestions
- Multiple email support (comma-separated)
- Integration with email autocomplete
- Domain validation

**Estimated Size:** ~80-100 lines TypeScript

```typescript
// Usage Example
<ui-email-input 
  placeholder="Enter your email" 
  validate-domain="true"
  autocomplete="email">
</ui-email-input>
```

### 📱 `ui-phone-input`
**Location:** `src/components/molecules/ui-phone-input/`
**Extends:** `ui-input`

**Enhanced Features:**
- Phone number formatting as-you-type
- International phone number support
- Country code selection
- Format validation (US, international, etc.)
- Phone number parsing and normalization

**Estimated Size:** ~120-150 lines TypeScript

```typescript
// Usage Example
<ui-phone-input 
  country="US"
  format="(xxx) xxx-xxxx"
  placeholder="(123) 456-7890">
</ui-phone-input>
```

### 🔢 `ui-number-input`
**Location:** `src/components/molecules/ui-number-input/`
**Extends:** `ui-input`

**Enhanced Features:**
- Numeric input with validation
- Min/max constraints
- Step increment/decrement
- Decimal place control
- Currency formatting option
- Scientific notation support

**Estimated Size:** ~90-120 lines TypeScript

```typescript
// Usage Example
<ui-number-input 
  min="0" 
  max="100" 
  step="0.1"
  decimal-places="2"
  currency="USD">
</ui-number-input>
```

### 🔍 `ui-search-input`
**Location:** `src/components/molecules/ui-search-input/`
**Extends:** `ui-input`

**Enhanced Features:**
- Search suggestions/autocomplete
- Recent searches memory
- Search history management
- Debounced search events
- Clear search button
- Search filtering options

**Estimated Size:** ~100-130 lines TypeScript

```typescript
// Usage Example
<ui-search-input 
  suggestions-api="/api/search"
  debounce="300"
  max-suggestions="5"
  show-history="true">
</ui-search-input>
```

### 🌐 `ui-url-input`
**Location:** `src/components/molecules/ui-url-input/`
**Extends:** `ui-input`

**Enhanced Features:**
- URL validation and formatting
- Protocol detection (http/https)
- Domain validation
- Link preview generation
- QR code generation for URLs

**Estimated Size:** ~70-90 lines TypeScript

```typescript
// Usage Example
<ui-url-input 
  protocol="https"
  validate-domain="true"
  show-preview="true">
</ui-url-input>
```

## Implementation Guidelines

### Base Class Extension Pattern

```typescript
import { UiInput } from '../../primitives/ui-input/ui-input.js';

export class UiEmailInput extends UiInput {
  constructor() {
    super();
    // Override type to email internally
    this._type = "email"; 
  }
  
  // Add email-specific validation
  protected validateEmail(value: string): boolean {
    // Email validation logic
  }
  
  // Override validation method
  validate(): { isValid: boolean; errorMessage: string } {
    const baseResult = super.validate();
    if (!baseResult.isValid) return baseResult;
    
    // Add email-specific validation
    const isEmailValid = this.validateEmail(this.value);
    return {
      isValid: isEmailValid,
      errorMessage: isEmailValid ? "" : "Please enter a valid email address"
    };
  }
}
```

### CSS Inheritance

Extension components should:
1. Import base ui-input styles
2. Add only specialized styling
3. Use CSS custom properties for theming
4. Maintain consistent design system

### Bundle Optimization

- Extensions are separate entry points
- Tree-shakable imports
- Only load what's needed
- Base ui-input always available

## Migration Path

### From Current Specialized Types

When migrating from the previous ui-input implementation:

```typescript
// OLD (removed from ui-input)
<ui-input type="email" placeholder="Email">

// NEW (extension component)
<ui-email-input placeholder="Email">
```

```typescript
// OLD (removed from ui-input) 
<ui-input type="number" min="0" max="100">

// NEW (extension component)
<ui-number-input min="0" max="100">
```

### Backwards Compatibility

- `ui-input` maintains `text` and `password` types
- Extension components provide enhanced functionality
- Clear upgrade path documented
- Gradual migration supported

## File Structure

```
src/components/
├── primitives/
│   └── ui-input/              # Base primitive (text/password only)
│       ├── ui-input.ts        # ~250 lines
│       ├── ui-input.css
│       └── ui-input.test.ts
└── molecules/
    ├── ui-email-input/        # Email specialization
    │   ├── ui-email-input.ts  # ~80-100 lines
    │   ├── ui-email-input.css
    │   └── ui-email-input.test.ts
    ├── ui-phone-input/        # Phone specialization  
    │   ├── ui-phone-input.ts  # ~120-150 lines
    │   └── ...
    └── ui-number-input/       # Number specialization
        ├── ui-number-input.ts # ~90-120 lines
        └── ...
```

## Benefits

### For Library Maintainers
- ✅ **Simplified primitive** - ui-input stays focused and maintainable
- ✅ **Modular architecture** - Features separated by concern
- ✅ **Easier testing** - Smaller, focused components
- ✅ **Better code organization** - Clear separation of responsibilities

### For Library Users
- ✅ **Bundle efficiency** - Only pay for features you use
- ✅ **Progressive enhancement** - Start simple, add features as needed
- ✅ **Consistent API** - All inputs share same base interface
- ✅ **Rich functionality** - Specialized components provide advanced features

### For Performance
- ✅ **Smaller base bundle** - Primitive ui-input is lightweight
- ✅ **Lazy loading** - Load extensions on demand
- ✅ **Tree shaking** - Unused extensions are eliminated
- ✅ **Optimal caching** - Base and extensions cached separately

## Development Priority

1. **Phase 1:** `ui-email-input` (most common use case)
2. **Phase 2:** `ui-phone-input` (complex formatting needs)
3. **Phase 3:** `ui-number-input` (numeric validation)
4. **Phase 4:** `ui-search-input` (advanced search features)
5. **Phase 5:** `ui-url-input` (specialized validation)

This approach ensures we deliver maximum value while maintaining the KondoKode philosophy of simplicity and focus.