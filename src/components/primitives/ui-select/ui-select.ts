import { ShadowComponent } from "../../../core/ShadowComponent.js";
import selectCss from "./ui-select.css?inline";

export interface UiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface UiSelectEventDetail {
  value: string | string[];
  selectedOptions: UiSelectOption[];
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-select-change": CustomEvent<UiSelectEventDetail>;
    "ui-select-open": CustomEvent<{ originalEvent: Event }>;
    "ui-select-close": CustomEvent<{ originalEvent: Event }>;
  }
}

type SelectSize = "small" | "medium" | "large";

interface PropertyConfig {
  type: 'string' | 'boolean' | 'nullable-string' | 'array';
  defaultValue: any;
  updateDisplay?: boolean;
}

export class UiSelect extends ShadowComponent {
  static get observedAttributes(): string[] {
    return [
      "value",
      "placeholder",
      "multiple",
      "searchable",
      "disabled",
      "required",
      "invalid",
      "size",
      "name",
      "aria-label",
      "aria-describedby"
    ];
  }

  private _properties = new Map<string, any>();
  private _options: UiSelectOption[] = [];
  private _isOpen = false;
  private _highlightedIndex = -1;
  private _triggerElement: HTMLElement | null = null;
  private _dropdownElement: HTMLElement | null = null;
  private _filteredOptions: UiSelectOption[] = [];
  private _searchQuery = '';

  private _propertyConfigs: Record<string, PropertyConfig> = {
    value: { type: 'string', defaultValue: '', updateDisplay: true },
    placeholder: { type: 'string', defaultValue: 'Select an option...', updateDisplay: true },
    multiple: { type: 'boolean', defaultValue: false, updateDisplay: true },
    searchable: { type: 'boolean', defaultValue: false, updateDisplay: true },
    disabled: { type: 'boolean', defaultValue: false, updateDisplay: true },
    required: { type: 'boolean', defaultValue: false, updateDisplay: true },
    invalid: { type: 'boolean', defaultValue: false, updateDisplay: true },
    size: { type: 'string', defaultValue: 'medium', updateDisplay: true },
    name: { type: 'nullable-string', defaultValue: null, updateDisplay: false },
    ariaLabel: { type: 'nullable-string', defaultValue: null, updateDisplay: true },
    ariaDescribedby: { type: 'nullable-string', defaultValue: null, updateDisplay: true }
  };

  constructor() {
    super({ mode: "open" }, false);
    
    // Initialize properties with defaults
    Object.entries(this._propertyConfigs).forEach(([key, config]) => {
      this._properties.set(key, config.defaultValue);
    });
    
    this._handleTriggerClick = this._handleTriggerClick.bind(this);
    this._handleTriggerKeydown = this._handleTriggerKeydown.bind(this);
    this._handleOptionClick = this._handleOptionClick.bind(this);
    this._handleOptionKeydown = this._handleOptionKeydown.bind(this);
    this._handleSearchInput = this._handleSearchInput.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
  }

  private _createProperty(propertyName: string, attributeName?: string): void {
    const attrName = attributeName || propertyName.toLowerCase();
    const config = this._propertyConfigs[propertyName];
    
    Object.defineProperty(this, propertyName, {
      get: () => this._properties.get(propertyName),
      set: (value: any) => {
        const processedValue = this._processPropertyValue(value, config, propertyName);
        if (this._properties.get(propertyName) !== processedValue) {
          this._properties.set(propertyName, processedValue);
          this.setAttributeSafe(attrName, processedValue);
          if (config.updateDisplay) {
            this._updateDisplay();
          }
        }
      },
      enumerable: true,
      configurable: true
    });
  }

  private _processPropertyValue(value: any, config: PropertyConfig, propertyName?: string): any {
    switch (config.type) {
      case 'boolean':
        return Boolean(value);
      case 'string':
        // Add size validation for size property
        if (propertyName === 'size') {
          return ['small', 'medium', 'large'].includes(value) ? value : config.defaultValue;
        }
        return String(value || config.defaultValue);
      case 'nullable-string':
        return value || null;
      case 'array':
        return Array.isArray(value) ? value : [];
      default:
        return value;
    }
  }

  private _setPropertyValue(propertyName: string, value: any): void {
    const config = this._propertyConfigs[propertyName];
    if (!config) return;
    
    const processedValue = this._processPropertyValue(value, config, propertyName);
    if (this._properties.get(propertyName) !== processedValue) {
      this._properties.set(propertyName, processedValue);
      
      // Map property names to attribute names
      const attrName = propertyName === 'ariaLabel' ? 'aria-label' : 
                       propertyName === 'ariaDescribedby' ? 'aria-describedby' : 
                       propertyName.toLowerCase();
      
      this.setAttributeSafe(attrName, processedValue);
      
      if (config.updateDisplay) {
        this._updateDisplay();
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    
    // Create property getters/setters
    this._createProperty('value');
    this._createProperty('placeholder');
    this._createProperty('multiple');
    this._createProperty('searchable');
    this._createProperty('disabled');
    this._createProperty('required');
    this._createProperty('invalid');
    this._createProperty('size');
    this._createProperty('name');
    this._createProperty('ariaLabel', 'aria-label');
    this._createProperty('ariaDescribedby', 'aria-describedby');

    // Set up outside click listener
    document.addEventListener('click', this._handleOutsideClick);
    document.addEventListener('keydown', this._handleEscapeKey);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
    document.removeEventListener('keydown', this._handleEscapeKey);
    
    // Clean up type-ahead timer to prevent memory leaks
    if (this._typeAheadTimer) {
      clearTimeout(this._typeAheadTimer);
      this._typeAheadTimer = null;
    }
  }

  // Type-safe property accessors that delegate to dynamic property system
  get value(): string { return this._properties.get('value'); }
  set value(value: string) { this._setPropertyValue('value', value); }

  get placeholder(): string { return this._properties.get('placeholder'); }
  set placeholder(value: string) { this._setPropertyValue('placeholder', value); }

  get multiple(): boolean { return this._properties.get('multiple'); }
  set multiple(value: boolean) { this._setPropertyValue('multiple', value); }

  get searchable(): boolean { return this._properties.get('searchable'); }
  set searchable(value: boolean) { this._setPropertyValue('searchable', value); }

  get disabled(): boolean { return this._properties.get('disabled'); }
  set disabled(value: boolean) { this._setPropertyValue('disabled', value); }

  get required(): boolean { return this._properties.get('required'); }
  set required(value: boolean) { this._setPropertyValue('required', value); }

  get invalid(): boolean { return this._properties.get('invalid'); }
  set invalid(value: boolean) { this._setPropertyValue('invalid', value); }

  get size(): SelectSize { return this._properties.get('size'); }
  set size(value: SelectSize) { this._setPropertyValue('size', value); }

  get ariaLabel(): string | null { return this._properties.get('ariaLabel'); }
  set ariaLabel(value: string | null) { this._setPropertyValue('ariaLabel', value); }

  get ariaDescribedby(): string | null { return this._properties.get('ariaDescribedby'); }
  set ariaDescribedby(value: string | null) { this._setPropertyValue('ariaDescribedby', value); }

  get options(): UiSelectOption[] {
    return this._options;
  }

  set options(value: UiSelectOption[]) {
    // Validate option objects structure
    const validOptions = Array.isArray(value) ? 
      value.filter(opt => 
        opt && 
        typeof opt === 'object' &&
        typeof opt.value === 'string' && 
        typeof opt.label === 'string' &&
        opt.value.length > 0 &&
        opt.label.length > 0
      ) : [];
    
    this._options = validOptions;
    this._filteredOptions = [...this._options];
    this._updateDisplay();
  }

  protected onAttributeChange(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    const propertyName = name === 'aria-label' ? 'ariaLabel' : 
                        name === 'aria-describedby' ? 'ariaDescribedby' : 
                        name;
    
    const config = this._propertyConfigs[propertyName];
    if (config) {
      const processedValue = this._processAttributeValue(newValue, config, propertyName);
      this._properties.set(propertyName, processedValue);
      if (config.updateDisplay) {
        this._updateDisplay();
      }
    }
  }

  private _processAttributeValue(value: string | null, config: PropertyConfig, propertyName?: string): any {
    switch (config.type) {
      case 'boolean':
        return value !== null;
      case 'string':
        // Add size validation for size property
        if (propertyName === 'size') {
          return value && ['small', 'medium', 'large'].includes(value) ? value : config.defaultValue;
        }
        return value || config.defaultValue;
      case 'nullable-string':
        return value;
      default:
        return value;
    }
  }

  protected renderShadowContent(): void {
    const container = document.createElement('div');
    container.classList.add('ui-select');
    container.setAttribute('data-size', this.size);
    
    if (this.disabled) {
      container.classList.add('ui-select--disabled');
    }
    
    if (this.invalid) {
      container.classList.add('ui-select--invalid');
    }

    // Create trigger element
    const trigger = document.createElement('div');
    trigger.classList.add('ui-select__trigger');
    trigger.setAttribute('role', 'combobox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('tabindex', this.disabled ? '-1' : '0');
    
    if (this.ariaLabel) {
      trigger.setAttribute('aria-label', this.ariaLabel);
    }
    
    if (this.ariaDescribedby) {
      trigger.setAttribute('aria-describedby', this.ariaDescribedby);
    }

    // Create display area
    const display = document.createElement('div');
    display.classList.add('ui-select__display');
    
    // Create dropdown arrow
    const arrow = document.createElement('div');
    arrow.classList.add('ui-select__arrow');
    arrow.innerHTML = '▼';

    trigger.appendChild(display);
    trigger.appendChild(arrow);

    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.classList.add('ui-select__dropdown');
    dropdown.setAttribute('role', 'listbox');
    dropdown.style.display = 'none';

    container.appendChild(trigger);
    container.appendChild(dropdown);

    this.setContent(container.outerHTML);
    this._setupElements();
    this._updateDisplay();
  }

  private _setupElements(): void {
    this._triggerElement = this.shadowQuerySelector('.ui-select__trigger');
    this._dropdownElement = this.shadowQuerySelector('.ui-select__dropdown');
    
    if (this._triggerElement) {
      this.addManagedEventListener(this._triggerElement, 'click', this._handleTriggerClick);
      this.addManagedEventListener(this._triggerElement, 'keydown', this._handleTriggerKeydown);
    }
    
    // Update trigger attributes based on current state
    this._updateTriggerAttributes();
  }

  private _updateTriggerAttributes(): void {
    if (!this._triggerElement) return;
    
    // Update tabindex based on disabled state
    this._triggerElement.setAttribute('tabindex', this.disabled ? '-1' : '0');
    
    // Update aria-label
    if (this.ariaLabel) {
      this._triggerElement.setAttribute('aria-label', this.ariaLabel);
    } else {
      this._triggerElement.removeAttribute('aria-label');
    }
    
    // Update aria-describedby
    if (this.ariaDescribedby) {
      this._triggerElement.setAttribute('aria-describedby', this.ariaDescribedby);
    } else {
      this._triggerElement.removeAttribute('aria-describedby');
    }
  }

  private _updateDisplay(): void {
    const display = this.shadowQuerySelector('.ui-select__display');
    if (!display) return;

    const selectedOptions = this._getSelectedOptions();
    
    if (selectedOptions.length === 0) {
      display.textContent = this.placeholder;
      display.classList.add('ui-select__display--placeholder');
    } else {
      display.classList.remove('ui-select__display--placeholder');
      
      if (this.multiple) {
        display.textContent = selectedOptions.map(opt => opt.label).join(', ');
      } else {
        display.textContent = selectedOptions[0].label;
      }
    }
    
    // Update trigger attributes
    this._updateTriggerAttributes();
  }

  private _getSelectedOptions(): UiSelectOption[] {
    const value = this.value;
    if (!value) return [];
    
    if (this.multiple) {
      const values = Array.isArray(value) ? value : value.split(',');
      return this._options.filter(option => values.includes(option.value));
    } else {
      return this._options.filter(option => option.value === value);
    }
  }

  protected getStyles(): string {
    return selectCss;
  }

  // Event handlers - will implement in next step
  private _handleTriggerClick(event: Event): void {
    if (this.disabled) return;
    
    event.preventDefault();
    this._toggleDropdown(event);
  }

  private _handleTriggerKeydown(event: Event): void {
    const keyEvent = event as KeyboardEvent;
    if (this.disabled) return;
    
    switch (keyEvent.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        keyEvent.preventDefault();
        if (!this._isOpen) {
          this._openDropdown(keyEvent);
        } else {
          this._navigateOptions(keyEvent.key === 'ArrowDown' ? 1 : -1);
        }
        break;
      
      case 'Enter':
      case ' ':
        keyEvent.preventDefault();
        if (!this._isOpen) {
          this._openDropdown(keyEvent);
        } else if (this._highlightedIndex >= 0) {
          const option = this._filteredOptions[this._highlightedIndex];
          if (option && !option.disabled) {
            this._selectOption(option.value, keyEvent);
            if (!this.multiple) {
              this._closeDropdown(keyEvent);
            }
          }
        }
        break;
      
      case 'Escape':
        if (this._isOpen) {
          keyEvent.preventDefault();
          this._closeDropdown(keyEvent);
        }
        break;
      
      case 'Tab':
        if (this._isOpen) {
          this._closeDropdown(keyEvent);
        }
        break;
      
      default:
        // Type-ahead search
        if (keyEvent.key.length === 1 && !keyEvent.ctrlKey && !keyEvent.metaKey) {
          this._handleTypeAhead(keyEvent.key);
        }
        break;
    }
  }

  private _handleOptionClick(event: Event): void {
    const target = event.target as HTMLElement;
    const optionValue = target.getAttribute('data-value');
    
    if (!optionValue || target.classList.contains('ui-select__option--disabled')) {
      return;
    }
    
    this._selectOption(optionValue, event);
    
    if (!this.multiple) {
      this._closeDropdown(event);
    }
  }

  private _handleOptionKeydown(event: Event): void {
    const keyEvent = event as KeyboardEvent;
    const target = keyEvent.target as HTMLElement;
    
    if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
      keyEvent.preventDefault();
      const optionValue = target.getAttribute('data-value');
      
      if (optionValue && !target.classList.contains('ui-select__option--disabled')) {
        this._selectOption(optionValue, keyEvent);
        
        if (!this.multiple) {
          this._closeDropdown(keyEvent);
        }
      }
    }
  }

  private _handleSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._searchQuery = target.value.toLowerCase();
    this._filterOptions();
    this._renderDropdownContent();
  }

  private _handleOutsideClick(event: Event): void {
    if (this._isOpen && !this.contains(event.target as Node)) {
      this._closeDropdown(event);
    }
  }

  private _handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this._isOpen) {
      this._closeDropdown(event);
    }
  }

  private _toggleDropdown(originalEvent?: Event): void {
    if (this._isOpen) {
      this._closeDropdown(originalEvent);
    } else {
      this._openDropdown(originalEvent);
    }
  }

  private _openDropdown(originalEvent?: Event): void {
    this._isOpen = true;
    this._renderDropdownContent();
    
    if (this._dropdownElement) {
      this._dropdownElement.style.display = 'block';
    }
    
    if (this._triggerElement) {
      this._triggerElement.setAttribute('aria-expanded', 'true');
    }
    
    this.dispatchEvent(new CustomEvent('ui-select-open', {
      detail: { originalEvent: originalEvent || new Event('open') },
      bubbles: true
    }));
  }

  private _closeDropdown(originalEvent?: Event): void {
    this._isOpen = false;
    this._highlightedIndex = -1;
    this._searchQuery = '';
    this._filteredOptions = [...this._options];
    
    if (this._dropdownElement) {
      this._dropdownElement.style.display = 'none';
    }
    
    if (this._triggerElement) {
      this._triggerElement.setAttribute('aria-expanded', 'false');
      this._triggerElement.focus();
    }
    
    this.dispatchEvent(new CustomEvent('ui-select-close', {
      detail: { originalEvent: originalEvent || new Event('close') },
      bubbles: true
    }));
  }

  private _selectOption(optionValue: string, originalEvent?: Event): void {
    const option = this._options.find(opt => opt.value === optionValue);
    if (!option) return;
    
    let newValue: string | string[];
    let selectedOptions: UiSelectOption[];
    
    if (this.multiple) {
      const currentValues = this.value ? this.value.split(',') : [];
      const valueIndex = currentValues.indexOf(optionValue);
      
      if (valueIndex >= 0) {
        // Remove from selection
        currentValues.splice(valueIndex, 1);
      } else {
        // Add to selection
        currentValues.push(optionValue);
      }
      
      newValue = currentValues;
      selectedOptions = this._options.filter(opt => currentValues.includes(opt.value));
      
      // Update property
      this._properties.set('value', currentValues.join(','));
    } else {
      newValue = optionValue;
      selectedOptions = [option];
      
      // Update property
      this._properties.set('value', optionValue);
    }
    
    // Update display
    this._updateDisplay();
    
    // Dispatch change event
    this.dispatchEvent(new CustomEvent('ui-select-change', {
      detail: {
        value: newValue,
        selectedOptions: selectedOptions,
        originalEvent: originalEvent || new Event('change')
      },
      bubbles: true
    }));
    
    // Re-render dropdown to update selected states
    if (this._isOpen) {
      this._renderDropdownContent();
    }
  }

  private _filterOptions(): void {
    if (!this._searchQuery) {
      this._filteredOptions = [...this._options];
      return;
    }
    
    this._filteredOptions = this._options.filter(option =>
      option.label.toLowerCase().includes(this._searchQuery) ||
      option.value.toLowerCase().includes(this._searchQuery)
    );
  }

  private _navigateOptions(direction: number): void {
    const availableOptions = this._filteredOptions.filter(option => !option.disabled);
    if (availableOptions.length === 0) return;
    
    let newIndex = this._highlightedIndex + direction;
    
    // Wrap around
    if (newIndex < 0) {
      newIndex = availableOptions.length - 1;
    } else if (newIndex >= availableOptions.length) {
      newIndex = 0;
    }
    
    // Find the actual index in filtered options
    const targetOption = availableOptions[newIndex];
    this._highlightedIndex = this._filteredOptions.indexOf(targetOption);
    
    this._updateHighlightedOption();
  }

  private _updateHighlightedOption(): void {
    const options = this.shadowRoot?.querySelectorAll('.ui-select__option');
    if (!options) return;
    
    options.forEach((option, index) => {
      if (index === this._highlightedIndex) {
        option.classList.add('ui-select__option--highlighted');
        option.scrollIntoView({ block: 'nearest' });
      } else {
        option.classList.remove('ui-select__option--highlighted');
      }
    });
  }

  private _typeAheadQuery = '';
  private _typeAheadTimer: number | null = null;

  private _handleTypeAhead(key: string): void {
    // Clear existing timer
    if (this._typeAheadTimer) {
      clearTimeout(this._typeAheadTimer);
    }
    
    // Add to query
    this._typeAheadQuery += key.toLowerCase();
    
    // Find matching option
    const matchingIndex = this._filteredOptions.findIndex(option => 
      !option.disabled && option.label.toLowerCase().startsWith(this._typeAheadQuery)
    );
    
    if (matchingIndex >= 0) {
      this._highlightedIndex = matchingIndex;
      this._updateHighlightedOption();
      
      // If dropdown is closed, open it
      if (!this._isOpen) {
        this._openDropdown();
      }
    }
    
    // Clear query after delay
    this._typeAheadTimer = window.setTimeout(() => {
      this._typeAheadQuery = '';
      this._typeAheadTimer = null;
    }, 500);
  }

  private _renderDropdownContent(): void {
    if (!this._dropdownElement) return;
    
    // Clear existing content
    this._dropdownElement.innerHTML = '';
    
    // Add search input if searchable
    if (this.searchable) {
      const searchContainer = document.createElement('div');
      searchContainer.classList.add('ui-select__search');
      
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.classList.add('ui-select__search-input');
      searchInput.placeholder = 'Search...';
      
      searchContainer.appendChild(searchInput);
      this._dropdownElement.appendChild(searchContainer);
      this.addManagedEventListener(searchInput, 'input', this._handleSearchInput);
    }
    
    // Add options
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('ui-select__options');
    
    this._filteredOptions.forEach((option) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('ui-select__option');
      optionElement.setAttribute('role', 'option');
      optionElement.setAttribute('data-value', option.value);
      optionElement.textContent = option.label;
      
      if (option.disabled) {
        optionElement.classList.add('ui-select__option--disabled');
        optionElement.setAttribute('aria-disabled', 'true');
      } else {
        optionElement.setAttribute('tabindex', '0');
        this.addManagedEventListener(optionElement, 'click', this._handleOptionClick);
        this.addManagedEventListener(optionElement, 'keydown', this._handleOptionKeydown);
      }
      
      // Check if selected
      const selectedOptions = this._getSelectedOptions();
      const isSelected = selectedOptions.some(selected => selected.value === option.value);
      if (isSelected) {
        optionElement.classList.add('ui-select__option--selected');
        optionElement.setAttribute('aria-selected', 'true');
      }
      
      optionsContainer.appendChild(optionElement);
    });
    
    this._dropdownElement.appendChild(optionsContainer);
  }

  // Public methods
  open(): void {
    if (!this.disabled) {
      this._openDropdown();
    }
  }

  close(): void {
    this._closeDropdown();
  }

  focus(): void {
    this._triggerElement?.focus();
  }
}

customElements.define("ui-select", UiSelect);