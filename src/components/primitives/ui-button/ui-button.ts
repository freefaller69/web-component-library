import { ShadowComponent } from "../../../core/ShadowComponent.js";
import templateHtml from "./ui-button.html?raw";
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
    super();
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  get variant(): ButtonVariant {
    return this._variant;
  }
  set variant(value: ButtonVariant) {
    if (["primary", "secondary", "ghost"].includes(value)) {
      this._variant = value;
      this.setAttributeSafe("variant", value);
      this.render();
    }
  }

  get size(): ButtonSize {
    return this._size;
  }
  set size(value: ButtonSize) {
    if (["small", "medium", "large"].includes(value)) {
      this._size = value;
      this.setAttributeSafe("size", value);
      this.render();
    }
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
    const html = templateHtml
      .replace("{variant}", this.variant)
      .replace("{size}", this.size)
      .replace("{disabled}", this.disabled ? "disabled" : "")
      .replace("{aria-busy}", this.loading ? 'aria-busy="true"' : "")
      .replace(
        "{spinner}",
        this.loading
          ? '<span class="ui-button__spinner" part="spinner"></span>'
          : ""
      );

    this.setContent(html);
    this._setupEventListeners();
  }

  protected getStyles(): string {
    return buttonCss;
  }

  private _setupEventListeners(): void {
    const button = this.shadowQuerySelector(".ui-button") as HTMLButtonElement;
    if (button) {
      this.addManagedEventListener(button, "click", this._handleClick);
      this.addManagedEventListener(
        button,
        "keydown",
        this._handleKeydown as EventListener
      );
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

export function renderUiButtonSSR({
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
} = {}): string {
  return `
    <style>${buttonCss}</style>
    ${templateHtml
      .replace("{variant}", variant)
      .replace("{size}", size)
      .replace("{disabled}", disabled ? "disabled" : "")
      .replace("{aria-busy}", loading ? 'aria-busy="true"' : "")
      .replace(
        "{spinner}",
        loading ? '<span class="ui-button__spinner" part="spinner"></span>' : ""
      )}
  `;
}
