import { ShadowComponent } from "../../../core/ShadowComponent.js";
import buttonCss from "./ui-button.css?inline";

export interface UiButtonEventDetail {
  variant: string;
  size: string;
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-click": CustomEvent<UiButtonEventDetail>;
  }
}

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "small" | "medium" | "large";

export class UiButton extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["variant", "size", "disabled", "loading"];
  }

  private _variant: ButtonVariant = "primary";
  private _size: ButtonSize = "medium";
  private _disabled = false;
  private _loading = false;

  constructor() {
    super({ mode: "open" }, false);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  get variant(): ButtonVariant {
    return this._variant;
  }
  set variant(value: ButtonVariant) {
    this._variant = value;
    this.setAttributeSafe("variant", value);
    this.render();
  }

  get size(): ButtonSize {
    return this._size;
  }
  set size(value: ButtonSize) {
    this._size = value;
    this.setAttributeSafe("size", value);
    this.render();
  }

  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = Boolean(value);
    this.setAttributeSafe("disabled", this._disabled);
    this.render();
  }

  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = Boolean(value);
    this.setAttributeSafe("loading", this._loading);
    this.render();
  }

  protected onAttributeChange(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    switch (name) {
      case "variant":
        this._variant = (newValue as ButtonVariant) || "primary";
        break;
      case "size":
        this._size = (newValue as ButtonSize) || "medium";
        break;
      case "disabled":
        this._disabled = newValue !== null;
        break;
      case "loading":
        this._loading = newValue !== null;
        break;
    }
  }

  protected renderShadowContent(): void {
    const button = document.createElement("button");
    button.classList.add("ui-button");
    button.setAttribute("data-variant", this._variant);
    button.setAttribute("data-size", this._size);
    
    if (this._disabled) {
      button.disabled = true;
    }
    
    if (this._loading) {
      button.setAttribute("aria-busy", "true");
      button.disabled = true;
    }

    // Add spinner for loading state
    if (this._loading) {
      const spinner = document.createElement("span");
      spinner.classList.add("ui-button__spinner");
      button.appendChild(spinner);
    }

    const slot = document.createElement("slot");
    button.appendChild(slot);

    this.setContent(button.outerHTML);
    this._setupEventListeners();
  }

  protected getStyles(): string {
    return buttonCss;
  }

  private _setupEventListeners(): void {
    const button = this.shadowQuerySelector(".ui-button") as HTMLButtonElement;
    if (button) {
      this.addManagedEventListener(button, "click", this._handleClick);
      this.addManagedEventListener(button, "keydown", this._handleKeydown as EventListener);
    }
  }

  private _handleClick(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent("ui-click", {
        detail: {
          variant: this.variant,
          size: this.size,
          originalEvent: event,
        },
        bubbles: true,
        cancelable: true,
      })
    );
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (this.disabled || this.loading) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._handleClick(event);
    }
  }

  focus(): void {
    this.focusFirstElementInShadow();
  }

  click(): void {
    if (!this.disabled && !this.loading) {
      this._handleClick(new Event("click"));
    }
  }
}

customElements.define("ui-button", UiButton);