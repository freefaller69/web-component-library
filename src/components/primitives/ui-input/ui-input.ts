import { ShadowComponent } from "../../../core/ShadowComponent.js";
import inputCss from "./ui-input.css?inline";

export interface UiInputEventDetail {
  value: string;
  originalEvent: Event;
}

type InputType = "text" | "password";
type InputSize = "small" | "medium" | "large";

export class UiInput extends ShadowComponent {
  static get observedAttributes(): string[] {
    return [
      "type", "size", "placeholder", "value", "disabled", "readonly", "required",
      "aria-label", "aria-describedby", "invalid", "autocomplete", "name", "id"
    ];
  }

  private _type: InputType = "text";
  private _size: InputSize = "medium";
  private _placeholder = "";
  private _value = "";
  private _disabled = false;
  private _readonly = false;
  private _required = false;
  private _invalid = false;
  private _autocomplete: string | null = null;
  private _name: string | null = null;
  private _id: string | null = null;

  constructor() {
    super({ mode: "open" }, false);
  }

  // Property getters/setters
  get type(): InputType { return this._type; }
  set type(value: InputType) { this._type = value; this.setAttributeSafe("type", value); this.updateInputElement(); }

  get size(): InputSize { return this._size; }
  set size(value: InputSize) { this._size = value; this.setAttributeSafe("size", value); this.updateInputElement(); }

  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) { this._placeholder = value; this.setAttributeSafe("placeholder", value); this.updateInputElement(); }

  get value(): string { return this._value; }
  set value(value: string) { this._value = value; this.setAttributeSafe("value", value); this.updateInputElement(); }

  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value; this.setAttributeSafe("disabled", value ? "" : null); this.updateInputElement(); }

  get readonly(): boolean { return this._readonly; }
  set readonly(value: boolean) { this._readonly = value; this.setAttributeSafe("readonly", value ? "" : null); this.updateInputElement(); }

  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = value; this.setAttributeSafe("required", value ? "" : null); this.updateInputElement(); }

  get invalid(): boolean { return this._invalid; }
  set invalid(value: boolean) { this._invalid = value; this.setAttributeSafe("invalid", value ? "" : null); this.updateInputElement(); }

  get autocomplete(): string | null { return this._autocomplete; }
  set autocomplete(value: string | null) { this._autocomplete = value; this.setAttributeSafe("autocomplete", value); this.updateInputElement(); }

  get name(): string | null { return this._name; }
  set name(value: string | null) { this._name = value; this.setAttributeSafe("name", value); this.updateInputElement(); }

  get inputId(): string | null { return this._id; }
  set inputId(value: string | null) { this._id = value; this.setAttributeSafe("id", value); this.updateInputElement(); }

  protected onAttributeChange(name: string, _old: string | null, newValue: string | null): void {
    const booleanAttrs = ["disabled", "readonly", "required", "invalid"];
    const stringAttrs = ["type", "size", "placeholder", "value", "autocomplete", "name", "id", "aria-label", "aria-describedby"];
    
    if (booleanAttrs.includes(name)) {
      (this as any)[`_${name}`] = newValue !== null;
    } else if (stringAttrs.includes(name)) {
      const propName = name === "aria-label" ? "ariaLabel" : name === "aria-describedby" ? "ariaDescribedby" : name;
      (this as any)[`_${propName}`] = newValue || (name === "type" ? "text" : name === "size" ? "medium" : "");
    }
    this.updateInputElement();
  }

  private updateInputElement(): void {
    const input = this.shadowQuerySelector("input") as HTMLInputElement;
    if (!input) {
      this.render();
      return;
    }

    this.syncInputAttributes(input);
  }

  private syncInputAttributes(input: HTMLInputElement): void {
    input.setAttribute("data-size", this._size);
    input.type = this._type;
    input.placeholder = this._placeholder;
    if (input.value !== this._value) input.value = this._value;
    
    input.disabled = this._disabled;
    input.readOnly = this._readonly;
    input.required = this._required;
    
    this.setOptionalAttribute(input, "autocomplete", this._autocomplete);
    this.setOptionalAttribute(input, "name", this._name);
    this.setOptionalAttribute(input, "id", this._id);
    this.setOptionalAttribute(input, "aria-label", this.getAttribute("aria-label"));
    this.setOptionalAttribute(input, "aria-describedby", this.getAttribute("aria-describedby"));
    this.setOptionalAttribute(input, "aria-invalid", this._invalid ? "true" : null);
  }

  private setOptionalAttribute(element: HTMLElement, name: string, value: string | null): void {
    if (value) element.setAttribute(name, value);
    else element.removeAttribute(name);
  }

  protected renderShadowContent(): void {
    const hadFocus = this.shadowQuerySelector("input") === document.activeElement;
    
    const input = document.createElement("input");
    input.classList.add("ui-input");
    this.syncInputAttributes(input);
    
    this.setContent(input.outerHTML);
    
    if (hadFocus) {
      (this.shadowQuerySelector("input") as HTMLInputElement)?.focus();
    }
    
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const input = this.shadowQuerySelector("input");
    if (!input) return;

    this.addManagedEventListener(input, "input", (e) => {
      this._value = (e.target as HTMLInputElement).value;
      this.setAttributeSafe("value", this._value);
      this.dispatchEvent(new CustomEvent("input", { detail: { value: this._value }, bubbles: true }));
      this.dispatchEvent(new CustomEvent("ui-input", { detail: { value: this._value, originalEvent: e }, bubbles: true }));
    });
    
    this.addManagedEventListener(input, "change", (e) => {
      this._value = (e.target as HTMLInputElement).value;
      this.setAttributeSafe("value", this._value);
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this._value }, bubbles: true }));
      this.dispatchEvent(new CustomEvent("ui-change", { detail: { value: this._value, originalEvent: e }, bubbles: true }));
    });

    this.addManagedEventListener(input, "focus", (e) => {
      this.dispatchEvent(new CustomEvent("ui-focus", { detail: { value: this._value, originalEvent: e }, bubbles: true }));
    });

    this.addManagedEventListener(input, "blur", (e) => {
      this.dispatchEvent(new CustomEvent("ui-blur", { detail: { value: this._value, originalEvent: e }, bubbles: true }));
    });
  }

  private getInputElement(): HTMLInputElement | null {
    return this.shadowQuerySelector("input") as HTMLInputElement;
  }

  focus(): void {
    if (this._disabled) return;
    this.getInputElement()?.focus();
  }

  blur(): void {
    this.getInputElement()?.blur();
  }

  select(): void {
    this.getInputElement()?.select();
  }

  checkValidity(): boolean {
    return this.getInputElement()?.checkValidity() ?? true;
  }

  reportValidity(): boolean {
    return this.getInputElement()?.reportValidity() ?? true;
  }

  setCustomValidity(message: string): void {
    this.getInputElement()?.setCustomValidity(message);
  }

  validate(): { isValid: boolean; errorMessage: string } {
    const isValid = this.checkValidity();
    return { isValid, errorMessage: isValid ? "" : "Invalid input" };
  }

  get validationResult(): { isValid: boolean; errorMessage: string } {
    return this.validate();
  }

  protected getStyles(): string {
    return inputCss;
  }
}

customElements.define("ui-input", UiInput);