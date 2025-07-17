import { UiSelect } from "../ui-select/ui-select.js";
import multiSelectCss from "./ui-multi-select.css?inline";

export class UiMultiSelect extends UiSelect {
  constructor() {
    super();
  }

  get multiple(): boolean { return true; }
  set multiple(_val: boolean) { /* Always true, ignore setter */ }

  protected renderShadowContent(): void {
    this.setContent(`<div class="ui-select ui-multi-select ${this._disabled ? 'ui-select--disabled' : ''}"><button class="ui-select__trigger" type="button" ${this._disabled ? 'disabled' : ''} aria-haspopup="listbox" aria-expanded="false" aria-multiselectable="true"><span class="ui-select__display"></span><span class="ui-select__arrow">▼</span></button><div class="ui-select__dropdown" role="listbox" aria-multiselectable="true" style="display: none;"></div></div>`);
    const trigger = this.shadowQuerySelector('.ui-select__trigger') as HTMLElement;
    if (trigger) {
      this.addManagedEventListener(trigger, 'click', () => this._toggle());
      this.addManagedEventListener(trigger, 'keydown', (e) => this._handleKeydown(e as KeyboardEvent));
    }
    this._updateDisplay(); this._renderOptions();
  }

  protected _updateDisplay(): void {
    const display = this.shadowQuerySelector('.ui-select__display');
    if (!display) return;
    const values = this._value ? this._value.split(',') : [];
    const labels = values.map(v => this._options.find(opt => opt.value === v)?.label).filter(Boolean);
    display.textContent = labels.length ? labels.join(', ') : this._placeholder;
    display.classList.toggle('ui-select__display--placeholder', !labels.length);
  }

  protected _isOptionSelected(optionValue: string): boolean {
    return this._value ? this._value.split(',').includes(optionValue) : false;
  }

  protected _shouldCloseOnSelection(): boolean {
    return false;
  }

  protected _select(value: string): void {
    const values = this._value ? this._value.split(',') : [];
    const idx = values.indexOf(value);
    if (idx >= 0) values.splice(idx, 1);
    else values.push(value);
    this.value = values.join(',');
    this._renderOptions();
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true }));
  }

  protected getStyles(): string {
    return super.getStyles() + multiSelectCss;
  }
}

customElements.define("ui-multi-select", UiMultiSelect);