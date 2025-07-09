import { ShadowComponent } from "../../../core/ShadowComponent.js";
import templateHtml from "./ui-text.html?raw";
import textCss from "./ui-text.css?inline";

export interface UiTextEventDetail {
  variant: string;
  size: string;
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-text-click": CustomEvent<UiTextEventDetail>;
  }
}

type TextVariant = "body" | "heading" | "caption" | "label" | "link";
type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type TextWeight = "normal" | "medium" | "semibold" | "bold";

export class UiText extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["variant", "size", "weight", "truncate", "color", "align", "clickable"];
  }

  private _variant: TextVariant = "body";
  private _size: TextSize = "md";
  private _weight: TextWeight = "normal";
  private _truncate = false;
  private _color = "";
  private _align: "left" | "center" | "right" | "justify" = "left";
  private _clickable = false;

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  get variant(): TextVariant {
    return this._variant;
  }
  set variant(value: TextVariant) {
    if (["body", "heading", "caption", "label", "link"].includes(value)) {
      this._variant = value;
      this.setAttributeSafe("variant", value);
      this.render();
    }
  }

  get size(): TextSize {
    return this._size;
  }
  set size(value: TextSize) {
    if (["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"].includes(value)) {
      this._size = value;
      this.setAttributeSafe("size", value);
      this.render();
    }
  }

  get weight(): TextWeight {
    return this._weight;
  }
  set weight(value: TextWeight) {
    if (["normal", "medium", "semibold", "bold"].includes(value)) {
      this._weight = value;
      this.setAttributeSafe("weight", value);
      this.render();
    }
  }

  get truncate(): boolean {
    return this._truncate;
  }
  set truncate(value: boolean) {
    this._truncate = Boolean(value);
    this.setAttributeSafe("truncate", this._truncate);
    this.render();
  }

  get color(): string {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
    this.setAttributeSafe("color", value);
    this.render();
  }

  get align(): "left" | "center" | "right" | "justify" {
    return this._align;
  }
  set align(value: "left" | "center" | "right" | "justify") {
    if (["left", "center", "right", "justify"].includes(value)) {
      this._align = value;
      this.setAttributeSafe("align", value);
      this.render();
    }
  }

  get clickable(): boolean {
    return this._clickable;
  }
  set clickable(value: boolean) {
    this._clickable = Boolean(value);
    this.setAttributeSafe("clickable", this._clickable);
    this.render();
  }

  protected onAttributeChange(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    switch (name) {
      case "variant":
        this._variant = (newValue as TextVariant) || "body";
        break;
      case "size":
        this._size = (newValue as TextSize) || "md";
        break;
      case "weight":
        this._weight = (newValue as TextWeight) || "normal";
        break;
      case "truncate":
        this._truncate = newValue !== null;
        break;
      case "color":
        this._color = newValue || "";
        break;
      case "align":
        this._align = (newValue as "left" | "center" | "right" | "justify") || "left";
        break;
      case "clickable":
        this._clickable = newValue !== null;
        break;
    }
  }

  protected renderShadowContent(): void {
    const html = templateHtml
      .replace("{variant}", this.variant)
      .replace("{size}", this.size)
      .replace("{weight}", this.weight)
      .replace("{truncate}", this.truncate ? "ui-text--truncate" : "")
      .replace("{align}", this.align)
      .replace("{clickable}", this.clickable ? "ui-text--clickable" : "")
      .replace("{color}", this.color ? `style="color: ${this.color}"` : "")
      .replace("{tabindex}", this.clickable ? 'tabindex="0"' : "")
      .replace("{role}", this.clickable ? 'role="button"' : "");

    this.setContent(html);
    this._setupEventListeners();
  }

  protected getStyles(): string {
    return textCss;
  }

  private _setupEventListeners(): void {
    if (this.clickable) {
      const textElement = this.shadowQuerySelector(".ui-text");
      if (textElement) {
        this.addManagedEventListener(textElement, "click", this._handleClick);
        this.addManagedEventListener(
          textElement,
          "keydown",
          this._handleKeydown as EventListener
        );
      }
    }
  }

  private _handleClick(event: Event): void {
    if (!this.clickable) return;

    this.dispatchEvent(
      new CustomEvent("ui-text-click", {
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
    if (!this.clickable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._handleClick(event);
    }
  }

  focus(): void {
    if (this.clickable) {
      this.focusFirstElementInShadow();
    }
  }

  click(): void {
    if (this.clickable) {
      this._handleClick(new Event("click"));
    }
  }
}

customElements.define("ui-text", UiText);

export function renderUiTextSSR({
  variant = "body",
  size = "md",
  weight = "normal",
  truncate = false,
  color = "",
  align = "left",
  clickable = false,
}: {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  truncate?: boolean;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  clickable?: boolean;
} = {}): string {
  return `
    <style>${textCss}</style>
    ${templateHtml
      .replace("{variant}", variant)
      .replace("{size}", size)
      .replace("{weight}", weight)
      .replace("{truncate}", truncate ? "ui-text--truncate" : "")
      .replace("{align}", align)
      .replace("{clickable}", clickable ? "ui-text--clickable" : "")
      .replace("{color}", color ? `style="color: ${color}"` : "")
      .replace("{tabindex}", clickable ? 'tabindex="0"' : "")
      .replace("{role}", clickable ? 'role="button"' : "")}
  `;
}