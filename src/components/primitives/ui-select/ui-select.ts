import { ShadowComponent } from "../../../core/ShadowComponent.js";
import selectCss from "./ui-select.css?inline";

export interface UiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export class UiSelect extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["value", "placeholder", "disabled"];
  }

  protected _value = "";
  protected _placeholder = "Select an option";
  protected _disabled = false;
  protected _options: UiSelectOption[] = [];
  protected _isOpen = false;
  protected _highlightedIndex = -1;

  constructor() {
    super({ mode: "open" }, false);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  get value(): string { 
    return this._value; 
  }
  
  set value(val: string) { 
    this._value = val; 
    this.setAttributeSafe("value", val); 
    this._updateDisplay(); 
  }
  
  get placeholder(): string { 
    return this._placeholder; 
  }
  
  set placeholder(val: string) { 
    this._placeholder = val; 
    this.setAttributeSafe("placeholder", val); 
    this._updateDisplay(); 
  }
  
  get disabled(): boolean { 
    return this._disabled; 
  }
  
  set disabled(val: boolean) { 
    this._disabled = val; 
    this.setAttributeSafe("disabled", val ? "" : null); 
    this.render(); 
  }
  
  get options(): UiSelectOption[] { 
    return this._options; 
  }
  
  set options(opts: UiSelectOption[]) { 
    this._options = Array.isArray(opts) ? opts : []; 
    this._renderOptions(); 
  }

  connectedCallback(): void { 
    super.connectedCallback(); 
    document.addEventListener('click', this._handleOutsideClick); 
  }
  
  disconnectedCallback(): void { 
    super.disconnectedCallback(); 
    document.removeEventListener('click', this._handleOutsideClick); 
  }

  protected onAttributeChange(name: string, _old: string | null, newValue: string | null): void {
    switch (name) {
      case "value": 
        this._value = newValue || ""; 
        this._updateDisplay(); 
        break;
      case "placeholder": 
        this._placeholder = newValue || "Select an option"; 
        this._updateDisplay(); 
        break;
      case "disabled": 
        this._disabled = newValue !== null; 
        break;
    }
  }

  protected renderShadowContent(): void {
    this.setContent(`<div class="ui-select ${this._disabled ? 'ui-select--disabled' : ''}"><button class="ui-select__trigger" type="button" ${this._disabled ? 'disabled' : ''} aria-haspopup="listbox" aria-expanded="false"><span class="ui-select__display"></span><span class="ui-select__arrow">▼</span></button><div class="ui-select__dropdown" role="listbox" style="display: none;"></div></div>`);
    const trigger = this.shadowQuerySelector('.ui-select__trigger') as HTMLElement;
    if (trigger) {
      this.addManagedEventListener(trigger, 'click', () => this._toggle());
      this.addManagedEventListener(trigger, 'keydown', (e) => this._handleKeydown(e as KeyboardEvent));
    }
    this._updateDisplay(); 
    this._renderOptions();
  }

  protected _updateDisplay(): void {
    const display = this.shadowQuerySelector('.ui-select__display');
    if (!display) return;
    const option = this._options.find(opt => opt.value === this._value);
    display.textContent = option ? option.label : this._placeholder;
    display.classList.toggle('ui-select__display--placeholder', !option);
  }

  protected _renderOptions(): void {
    const dropdown = this.shadowQuerySelector('.ui-select__dropdown');
    if (!dropdown) return;
    dropdown.innerHTML = '';
    this._options.forEach((option) => {
      const el = document.createElement('div');
      el.className = 'ui-select__option';
      el.setAttribute('data-value', option.value);
      el.textContent = option.label;
      if (option.disabled) {
        el.classList.add('ui-select__option--disabled');
      } else {
        this.addManagedEventListener(el, 'click', () => this._select(option.value));
      }
      if (this._isOptionSelected(option.value)) el.classList.add('ui-select__option--selected');
      dropdown.appendChild(el);
    });
  }

  protected _handleKeydown(e: KeyboardEvent): void {
    if (this._disabled) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (!this._isOpen) {
          this._open();
        } else {
          this._navigate(e.key === 'ArrowDown' ? 1 : -1);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this._isOpen && this._highlightedIndex >= 0) {
          this._selectByIndex(this._highlightedIndex);
          if (this._shouldCloseOnSelection()) {
            this._close();
          }
        } else {
          this._toggle();
        }
        break;
      case 'Escape':
        if (this._isOpen) { 
          e.preventDefault(); 
          this._close(); 
        }
        break;
    }
  }

  private _handleOutsideClick(e: Event): void {
    if (this._isOpen && !this.contains(e.target as Node)) {
      this._close();
    }
  }

  protected _toggle(): void { 
    this._isOpen ? this._close() : this._open(); 
  }

  protected _open(): void {
    this._isOpen = true;
    this._highlightedIndex = this._options.findIndex(opt => opt.value === this._value);
    (this.shadowQuerySelector('.ui-select__trigger') as HTMLElement)?.setAttribute('aria-expanded', 'true');
    (this.shadowQuerySelector('.ui-select__dropdown') as HTMLElement).style.display = 'block';
    this._updateHighlight();
  }
  protected _close(): void {
    this._isOpen = false; 
    this._highlightedIndex = -1;
    const trigger = this.shadowQuerySelector('.ui-select__trigger') as HTMLElement;
    trigger?.setAttribute('aria-expanded', 'false'); 
    trigger?.focus();
    (this.shadowQuerySelector('.ui-select__dropdown') as HTMLElement).style.display = 'none';
  }

  protected _navigate(direction: number): void {
    const enabled = this._options.map((opt, idx) => opt.disabled ? -1 : idx).filter(idx => idx >= 0);
    if (!enabled.length) return;
    let current = enabled.indexOf(this._highlightedIndex);
    current = (current + direction + enabled.length) % enabled.length;
    this._highlightedIndex = enabled[current]; 
    this._updateHighlight();
  }
  protected _updateHighlight(): void {
    this.shadowRoot?.querySelectorAll('.ui-select__option').forEach((opt, idx) => {
      opt.classList.toggle('ui-select__option--highlighted', idx === this._highlightedIndex);
    });
  }

  protected _select(value: string): void {
    this.value = value; 
    if (this._shouldCloseOnSelection()) {
      this._close();
    }
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true }));
  }
  protected _selectByIndex(index: number): void {
    const option = this._options[index];
    if (option && !option.disabled) {
      this._select(option.value);
    }
  }

  protected _isOptionSelected(optionValue: string): boolean {
    return optionValue === this._value;
  }

  protected _shouldCloseOnSelection(): boolean {
    return true;
  }

  protected getStyles(): string { 
    return selectCss; 
  }
}

customElements.define("ui-select", UiSelect);