import { ShadowComponent } from "../../../core/ShadowComponent.js";
import inputCss from "./ui-input.css?inline";

export interface UiInputEventDetail {
  value: string;
  originalEvent: Event;
}

export interface UiInputValidationEventDetail {
  value: string;
  isValid: boolean;
  errorMessage: string;
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-input": CustomEvent<UiInputEventDetail>;
    "ui-change": CustomEvent<UiInputEventDetail>;
    "ui-focus": CustomEvent<UiInputEventDetail>;
    "ui-blur": CustomEvent<UiInputEventDetail>;
    "ui-validation": CustomEvent<UiInputValidationEventDetail>;
  }
}

type InputType = "text" | "password" | "email" | "number" | "tel" | "url" | "search";
type InputSize = "small" | "medium" | "large";

interface PropertyConfig {
  type: 'string' | 'boolean' | 'nullable-string';
  defaultValue: any;
  updateInput?: boolean;
}

type ValidationRule = (value: string, element: UiInput) => { isValid: boolean; errorMessage: string };

interface ValidationConfig {
  rules: ValidationRule[];
  validateOnInput?: boolean;
  validateOnBlur?: boolean;
}

export class UiInput extends ShadowComponent {
  static get observedAttributes(): string[] {
    return [
      "type",
      "size",
      "disabled",
      "readonly",
      "required",
      "placeholder",
      "value",
      "min",
      "max",
      "step",
      "pattern",
      "autocomplete",
      "name",
      "id",
      "aria-label",
      "aria-describedby",
      "invalid"
    ];
  }

  private _properties = new Map<string, any>();
  private _inputElement: HTMLInputElement | null = null;
  private _validationConfig: ValidationConfig | null = null;
  private _lastValidationResult: { isValid: boolean; errorMessage: string } = { isValid: true, errorMessage: '' };
  private _propertyConfigs: Record<string, PropertyConfig> = {
    type: { type: 'string', defaultValue: 'text', updateInput: true },
    size: { type: 'string', defaultValue: 'medium', updateInput: true },
    disabled: { type: 'boolean', defaultValue: false, updateInput: true },
    readonly: { type: 'boolean', defaultValue: false, updateInput: true },
    required: { type: 'boolean', defaultValue: false, updateInput: true },
    placeholder: { type: 'string', defaultValue: '', updateInput: true },
    value: { type: 'string', defaultValue: '', updateInput: true },
    invalid: { type: 'boolean', defaultValue: false, updateInput: true },
    min: { type: 'nullable-string', defaultValue: null, updateInput: true },
    max: { type: 'nullable-string', defaultValue: null, updateInput: true },
    step: { type: 'nullable-string', defaultValue: null, updateInput: true },
    pattern: { type: 'nullable-string', defaultValue: null, updateInput: true },
    autocomplete: { type: 'nullable-string', defaultValue: null, updateInput: true },
    name: { type: 'nullable-string', defaultValue: null, updateInput: true },
    id: { type: 'nullable-string', defaultValue: null, updateInput: true },
    ariaLabel: { type: 'nullable-string', defaultValue: null, updateInput: true },
    ariaDescribedby: { type: 'nullable-string', defaultValue: null, updateInput: true }
  };

  constructor() {
    super({ mode: "open" }, false);
    
    // Initialize properties with defaults
    Object.entries(this._propertyConfigs).forEach(([key, config]) => {
      this._properties.set(key, config.defaultValue);
    });
    
    this._handleInputEvent = this._handleInputEvent.bind(this);
    this._handleChangeEvent = this._handleChangeEvent.bind(this);
    this._handleFocusEvent = this._handleFocusEvent.bind(this);
    this._handleBlurEvent = this._handleBlurEvent.bind(this);
    this._setupValidation();
  }

  private _setupValidation(): void {
    this._validationConfig = {
      rules: [],
      validateOnInput: true,
      validateOnBlur: true
    };
  }

  private static _validationRules = {
    email: (value: string): { isValid: boolean; errorMessage: string } => {
      if (!value) return { isValid: true, errorMessage: '' };
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return {
        isValid: emailPattern.test(value),
        errorMessage: emailPattern.test(value) ? '' : 'Please enter a valid email address'
      };
    },

    tel: (value: string): { isValid: boolean; errorMessage: string } => {
      if (!value) return { isValid: true, errorMessage: '' };
      // Allow only numbers, spaces, parentheses, and dashes
      const telPattern = /^[\d\s\(\)\-\+]+$/;
      return {
        isValid: telPattern.test(value),
        errorMessage: telPattern.test(value) ? '' : 'Please enter only numbers and valid phone formatting characters'
      };
    },

    required: (value: string): { isValid: boolean; errorMessage: string } => {
      const isEmpty = !value || value.trim().length === 0;
      return {
        isValid: !isEmpty,
        errorMessage: isEmpty ? 'This field is required' : ''
      };
    }
  };

  private _validateInput(value: string): { isValid: boolean; errorMessage: string } {
    const rules: ValidationRule[] = [];
    
    // Add type-specific validation
    const inputType = this._properties.get('type') as InputType;
    if (inputType === 'email') {
      rules.push(() => UiInput._validationRules.email(value));
    } else if (inputType === 'tel') {
      rules.push(() => UiInput._validationRules.tel(value));
    }
    
    // Add required validation if needed
    if (this._properties.get('required')) {
      rules.push(() => UiInput._validationRules.required(value));
    }
    
    // Run all validation rules
    for (const rule of rules) {
      const result = rule(value, this);
      if (!result.isValid) {
        return result;
      }
    }
    
    return { isValid: true, errorMessage: '' };
  }

  private _updateValidationState(validationResult: { isValid: boolean; errorMessage: string }): void {
    this._lastValidationResult = validationResult;
    
    // Update invalid state
    const wasInvalid = this._properties.get('invalid');
    const isInvalid = !validationResult.isValid;
    
    if (wasInvalid !== isInvalid) {
      this._properties.set('invalid', isInvalid);
      this._updateInputProperty('invalid', isInvalid);
    }
  }

  private _dispatchValidationEvent(originalEvent: Event): void {
    const currentValue = this._properties.get('value');
    
    this.dispatchEvent(
      new CustomEvent('ui-validation', {
        detail: {
          value: currentValue,
          isValid: this._lastValidationResult.isValid,
          errorMessage: this._lastValidationResult.errorMessage,
          originalEvent: originalEvent
        },
        bubbles: true,
        cancelable: true
      })
    );
  }

  private _createProperty(propertyName: string, attributeName?: string): void {
    const attrName = attributeName || propertyName.toLowerCase();
    const config = this._propertyConfigs[propertyName];
    
    Object.defineProperty(this, propertyName, {
      get: () => this._properties.get(propertyName),
      set: (value: any) => {
        const processedValue = this._processPropertyValue(value, config);
        if (this._properties.get(propertyName) !== processedValue) {
          this._properties.set(propertyName, processedValue);
          this.setAttributeSafe(attrName, processedValue);
          if (config.updateInput) {
            this._updateInputProperty(propertyName, processedValue);
          }
        }
      },
      enumerable: true,
      configurable: true
    });
  }

  private _processPropertyValue(value: any, config: PropertyConfig): any {
    switch (config.type) {
      case 'boolean':
        return Boolean(value);
      case 'string':
        return String(value || config.defaultValue);
      case 'nullable-string':
        return value || null;
      default:
        return value;
    }
  }

  private _updateInputProperty(propertyName: string, value: any): void {
    if (!this._inputElement) return;

    switch (propertyName) {
      case 'type':
        this._inputElement.type = value;
        break;
      case 'size':
        this._inputElement.setAttribute('data-size', value);
        break;
      case 'disabled':
        this._inputElement.disabled = value;
        break;
      case 'readonly':
        this._inputElement.readOnly = value;
        break;
      case 'required':
        this._inputElement.required = value;
        break;
      case 'placeholder':
        this._inputElement.placeholder = value;
        break;
      case 'value':
        if (this._inputElement.value !== value) {
          this._inputElement.value = value;
        }
        break;
      case 'invalid':
        if (value) {
          this._inputElement.setAttribute('aria-invalid', 'true');
        } else {
          this._inputElement.removeAttribute('aria-invalid');
        }
        break;
      case 'min':
      case 'max':
      case 'step':
      case 'pattern':
        if (value) {
          this._inputElement.setAttribute(propertyName, value);
        } else {
          this._inputElement.removeAttribute(propertyName);
        }
        break;
      case 'autocomplete':
        if (value) {
          this._inputElement.setAttribute('autocomplete', value);
        } else {
          this._inputElement.removeAttribute('autocomplete');
        }
        break;
      case 'name':
        if (value) {
          this._inputElement.name = value;
        } else {
          this._inputElement.removeAttribute('name');
        }
        break;
      case 'id':
        if (value) {
          this._inputElement.id = value;
        } else {
          this._inputElement.removeAttribute('id');
        }
        break;
      case 'ariaLabel':
        if (value) {
          this._inputElement.setAttribute('aria-label', value);
        } else {
          this._inputElement.removeAttribute('aria-label');
        }
        break;
      case 'ariaDescribedby':
        if (value) {
          this._inputElement.setAttribute('aria-describedby', value);
        } else {
          this._inputElement.removeAttribute('aria-describedby');
        }
        break;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    
    // Create property getters/setters
    this._createProperty('type');
    this._createProperty('size');
    this._createProperty('disabled');
    this._createProperty('readonly');
    this._createProperty('required');
    this._createProperty('placeholder');
    this._createProperty('value');
    this._createProperty('invalid');
    this._createProperty('min');
    this._createProperty('max');
    this._createProperty('step');
    this._createProperty('pattern');
    this._createProperty('autocomplete');
    this._createProperty('name');
    this._createProperty('id');
    this._createProperty('ariaLabel', 'aria-label');
    this._createProperty('ariaDescribedby', 'aria-describedby');
  }

  // Type-safe property accessors
  get type(): InputType { return this._properties.get('type'); }
  set type(value: InputType) { (this as any).type = value; }

  get size(): InputSize { return this._properties.get('size'); }
  set size(value: InputSize) { (this as any).size = value; }

  get disabled(): boolean { return this._properties.get('disabled'); }
  set disabled(value: boolean) { (this as any).disabled = value; }

  get readonly(): boolean { return this._properties.get('readonly'); }
  set readonly(value: boolean) { (this as any).readonly = value; }

  get required(): boolean { return this._properties.get('required'); }
  set required(value: boolean) { (this as any).required = value; }

  get placeholder(): string { return this._properties.get('placeholder'); }
  set placeholder(value: string) { (this as any).placeholder = value; }

  get value(): string { return this._properties.get('value'); }
  set value(value: string) { (this as any).value = value; }

  get invalid(): boolean { return this._properties.get('invalid'); }
  set invalid(value: boolean) { (this as any).invalid = value; }

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
      const processedValue = this._processAttributeValue(newValue, config);
      this._properties.set(propertyName, processedValue);
      if (config.updateInput) {
        this._updateInputProperty(propertyName, processedValue);
      }
    }
  }

  private _processAttributeValue(value: string | null, config: PropertyConfig): any {
    switch (config.type) {
      case 'boolean':
        return value !== null;
      case 'string':
        return value || config.defaultValue;
      case 'nullable-string':
        return value;
      default:
        return value;
    }
  }

  protected renderShadowContent(): void {
    const input = document.createElement("input");
    input.classList.add("ui-input");
    
    // Store reference for incremental updates
    this._inputElement = input;
    
    // Apply all current property values
    Object.entries(this._propertyConfigs).forEach(([propertyName, config]) => {
      if (config.updateInput) {
        const value = this._properties.get(propertyName);
        this._updateInputProperty(propertyName, value);
      }
    });

    this.setContent(input.outerHTML);
    this._setupEventListeners();
  }

  protected getStyles(): string {
    return inputCss;
  }

  private _setupEventListeners(): void {
    const input = this.shadowQuerySelector(".ui-input") as HTMLInputElement;
    if (input) {
      // Update cached reference
      this._inputElement = input;
      
      this.addManagedEventListener(input, "input", this._handleInputEvent);
      this.addManagedEventListener(input, "change", this._handleChangeEvent);
      this.addManagedEventListener(input, "focus", this._handleFocusEvent);
      this.addManagedEventListener(input, "blur", this._handleBlurEvent);
    }
  }

  private _dispatchCustomEvent(eventType: string, originalEvent: Event): void {
    const currentValue = this._properties.get('value');
    
    this.dispatchEvent(
      new CustomEvent(eventType, {
        detail: {
          value: currentValue,
          originalEvent: originalEvent,
        },
        bubbles: true,
        cancelable: true,
      })
    );
  }

  private _handleInputEvent(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._properties.set('value', input.value);
    
    // Validate on input if configured
    if (this._validationConfig?.validateOnInput) {
      const validationResult = this._validateInput(input.value);
      this._updateValidationState(validationResult);
      this._dispatchValidationEvent(event);
    }
    
    this._dispatchCustomEvent("ui-input", event);
  }

  private _handleChangeEvent(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._properties.set('value', input.value);
    
    // Always validate on change
    const validationResult = this._validateInput(input.value);
    this._updateValidationState(validationResult);
    this._dispatchValidationEvent(event);
    
    this._dispatchCustomEvent("ui-change", event);
  }

  private _handleFocusEvent(event: Event): void {
    this._dispatchCustomEvent("ui-focus", event);
  }

  private _handleBlurEvent(event: Event): void {
    // Validate on blur if configured
    if (this._validationConfig?.validateOnBlur) {
      const currentValue = this._properties.get('value');
      const validationResult = this._validateInput(currentValue);
      this._updateValidationState(validationResult);
      this._dispatchValidationEvent(event);
    }
    
    this._dispatchCustomEvent("ui-blur", event);
  }

  focus(): void {
    this.focusFirstElementInShadow();
  }

  blur(): void {
    if (this._inputElement) {
      this._inputElement.blur();
    }
  }

  select(): void {
    if (this._inputElement) {
      this._inputElement.select();
    }
  }

  checkValidity(): boolean {
    return this._inputElement ? this._inputElement.checkValidity() : false;
  }

  reportValidity(): boolean {
    return this._inputElement ? this._inputElement.reportValidity() : false;
  }

  setCustomValidity(error: string): void {
    if (this._inputElement) {
      this._inputElement.setCustomValidity(error);
    }
  }

  validate(): { isValid: boolean; errorMessage: string } {
    const currentValue = this._properties.get('value');
    const validationResult = this._validateInput(currentValue);
    this._updateValidationState(validationResult);
    return validationResult;
  }

  get validationResult(): { isValid: boolean; errorMessage: string } {
    return this._lastValidationResult;
  }
}

customElements.define("ui-input", UiInput);