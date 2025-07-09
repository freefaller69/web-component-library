import { ShadowComponent } from "../../../core/ShadowComponent.js";
import templateHtml from "./ui-text.html?raw";
import textCss from "./ui-text.css?inline";

export interface UiTextEventDetail {
  as: string;
  level: number | null;
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-text-click": CustomEvent<UiTextEventDetail>;
  }
}

type TextAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong" | "em" | "small" | "code";
type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type TextWeight = "normal" | "medium" | "semibold" | "bold";

export class UiText extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["as", "level", "size", "weight", "truncate", "color", "align", "clickable"];
  }

  private _as: TextAs = "span";
  private _level: number | null = null;
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

  get as(): TextAs {
    return this._as;
  }
  set as(value: TextAs) {
    if (["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong", "em", "small", "code"].includes(value)) {
      this._as = value;
      this.setAttributeSafe("as", value);
      this.render();
    }
  }

  get level(): number | null {
    return this._level;
  }
  set level(value: number | null) {
    if (value === null || (typeof value === "number" && value >= 1 && value <= 6)) {
      this._level = value;
      if (value !== null) {
        this._as = `h${value}` as TextAs;
        this.setAttributeSafe("level", value);
        this.setAttributeSafe("as", this._as);
      } else {
        this.removeAttribute("level");
      }
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
      case "as":
        this._as = (newValue as TextAs) || "span";
        break;
      case "level":
        this._level = newValue ? parseInt(newValue) : null;
        if (this._level !== null && this._level >= 1 && this._level <= 6) {
          this._as = `h${this._level}` as TextAs;
        }
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
    
    if (this.isConnected) {
      this.render();
    }
  }

  protected renderShadowContent(): void {
    const html = templateHtml
      .replace(/{element}/g, this.as)
      .replace(/{size}/g, this.size)
      .replace(/{weight}/g, this.weight)
      .replace(/{truncate}/g, this.truncate ? "ui-text--truncate" : "")
      .replace(/{align}/g, this.align)
      .replace(/{clickable}/g, this.clickable ? "ui-text--clickable" : "")
      .replace(/{color}/g, this.color ? `style="color: ${this.color}"` : "")
      .replace(/{tabindex}/g, this.clickable ? 'tabindex="0"' : "")
      .replace(/{role}/g, this.clickable ? 'role="button"' : "");

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
          as: this.as,
          level: this.level,
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
  as = "span",
  level = null,
  size = "md",
  weight = "normal",
  truncate = false,
  color = "",
  align = "left",
  clickable = false,
}: {
  as?: TextAs;
  level?: number | null;
  size?: TextSize;
  weight?: TextWeight;
  truncate?: boolean;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  clickable?: boolean;
} = {}): string {
  // If level is provided, use it to determine the element
  const element = level !== null ? `h${level}` : as;
  
  return `
    <style>${textCss}</style>
    ${templateHtml
      .replace(/{element}/g, element)
      .replace(/{size}/g, size)
      .replace(/{weight}/g, weight)
      .replace(/{truncate}/g, truncate ? "ui-text--truncate" : "")
      .replace(/{align}/g, align)
      .replace(/{clickable}/g, clickable ? "ui-text--clickable" : "")
      .replace(/{color}/g, color ? `style="color: ${color}"` : "")
      .replace(/{tabindex}/g, clickable ? 'tabindex="0"' : "")
      .replace(/{role}/g, clickable ? 'role="button"' : "")}
  `;
}