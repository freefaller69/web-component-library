import { ShadowComponent } from "../../../core/ShadowComponent.js";
import templateHtml from "./ui-box.html?raw";
import boxCss from "./ui-box.css?inline";

export interface UiBoxEventDetail {
  padding: string;
  margin: string;
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-box-click": CustomEvent<UiBoxEventDetail>;
  }
}

type BoxSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type BoxRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
type BoxShadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";

export class UiBox extends ShadowComponent {
  static get observedAttributes(): string[] {
    return [
      "padding", "margin", "radius", "shadow", "background", "border", 
      "width", "height", "overflow", "display", "flex-direction", 
      "justify-content", "align-items", "gap", "clickable"
    ];
  }

  private _padding: BoxSpacing = "none";
  private _margin: BoxSpacing = "none";
  private _radius: BoxRadius = "none";
  private _shadow: BoxShadow = "none";
  private _background = "";
  private _border = "";
  private _width = "";
  private _height = "";
  private _overflow = "";
  private _display = "";
  private _flexDirection = "";
  private _justifyContent = "";
  private _alignItems = "";
  private _gap = "";
  private _clickable = false;

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  get padding(): BoxSpacing {
    return this._padding;
  }
  set padding(value: BoxSpacing) {
    if (["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"].includes(value)) {
      this._padding = value;
      this.setAttributeSafe("padding", value);
      this.render();
    }
  }

  get margin(): BoxSpacing {
    return this._margin;
  }
  set margin(value: BoxSpacing) {
    if (["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"].includes(value)) {
      this._margin = value;
      this.setAttributeSafe("margin", value);
      this.render();
    }
  }

  get radius(): BoxRadius {
    return this._radius;
  }
  set radius(value: BoxRadius) {
    if (["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"].includes(value)) {
      this._radius = value;
      this.setAttributeSafe("radius", value);
      this.render();
    }
  }

  get shadow(): BoxShadow {
    return this._shadow;
  }
  set shadow(value: BoxShadow) {
    if (["none", "sm", "md", "lg", "xl", "2xl", "inner"].includes(value)) {
      this._shadow = value;
      this.setAttributeSafe("shadow", value);
      this.render();
    }
  }

  get background(): string {
    return this._background;
  }
  set background(value: string) {
    this._background = value;
    this.setAttributeSafe("background", value);
    this.render();
  }

  get border(): string {
    return this._border;
  }
  set border(value: string) {
    this._border = value;
    this.setAttributeSafe("border", value);
    this.render();
  }

  get width(): string {
    return this._width;
  }
  set width(value: string) {
    this._width = value;
    this.setAttributeSafe("width", value);
    this.render();
  }

  get height(): string {
    return this._height;
  }
  set height(value: string) {
    this._height = value;
    this.setAttributeSafe("height", value);
    this.render();
  }

  get overflow(): string {
    return this._overflow;
  }
  set overflow(value: string) {
    this._overflow = value;
    this.setAttributeSafe("overflow", value);
    this.render();
  }

  get display(): string {
    return this._display;
  }
  set display(value: string) {
    this._display = value;
    this.setAttributeSafe("display", value);
    this.render();
  }

  get flexDirection(): string {
    return this._flexDirection;
  }
  set flexDirection(value: string) {
    this._flexDirection = value;
    this.setAttributeSafe("flex-direction", value);
    this.render();
  }

  get justifyContent(): string {
    return this._justifyContent;
  }
  set justifyContent(value: string) {
    this._justifyContent = value;
    this.setAttributeSafe("justify-content", value);
    this.render();
  }

  get alignItems(): string {
    return this._alignItems;
  }
  set alignItems(value: string) {
    this._alignItems = value;
    this.setAttributeSafe("align-items", value);
    this.render();
  }

  get gap(): string {
    return this._gap;
  }
  set gap(value: string) {
    this._gap = value;
    this.setAttributeSafe("gap", value);
    this.render();
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
      case "padding":
        this._padding = (newValue as BoxSpacing) || "none";
        break;
      case "margin":
        this._margin = (newValue as BoxSpacing) || "none";
        break;
      case "radius":
        this._radius = (newValue as BoxRadius) || "none";
        break;
      case "shadow":
        this._shadow = (newValue as BoxShadow) || "none";
        break;
      case "background":
        this._background = newValue || "";
        break;
      case "border":
        this._border = newValue || "";
        break;
      case "width":
        this._width = newValue || "";
        break;
      case "height":
        this._height = newValue || "";
        break;
      case "overflow":
        this._overflow = newValue || "";
        break;
      case "display":
        this._display = newValue || "";
        break;
      case "flex-direction":
        this._flexDirection = newValue || "";
        break;
      case "justify-content":
        this._justifyContent = newValue || "";
        break;
      case "align-items":
        this._alignItems = newValue || "";
        break;
      case "gap":
        this._gap = newValue || "";
        break;
      case "clickable":
        this._clickable = newValue !== null;
        break;
    }
    
    // Re-render after attribute changes
    if (this.isConnected) {
      this.render();
    }
  }

  protected renderShadowContent(): void {
    const inlineStyles = this._buildInlineStyles();
    
    const html = templateHtml
      .replace(/{padding}/g, this.padding)
      .replace(/{margin}/g, this.margin)
      .replace(/{radius}/g, this.radius)
      .replace(/{shadow}/g, this.shadow)
      .replace(/{clickable}/g, this.clickable ? "ui-box--clickable" : "")
      .replace(/{style}/g, inlineStyles ? `style="${inlineStyles}"` : "")
      .replace(/{tabindex}/g, this.clickable ? 'tabindex="0"' : "")
      .replace(/{role}/g, this.clickable ? 'role="button"' : "");

    this.setContent(html);
    this._setupEventListeners();
  }

  protected getStyles(): string {
    return boxCss;
  }

  private _buildInlineStyles(): string {
    const styles: string[] = [];
    
    if (this.background) styles.push(`background: ${this.background}`);
    if (this.border) styles.push(`border: ${this.border}`);
    if (this.width) styles.push(`width: ${this.width}`);
    if (this.height) styles.push(`height: ${this.height}`);
    if (this.overflow) styles.push(`overflow: ${this.overflow}`);
    if (this.display) styles.push(`display: ${this.display}`);
    if (this.flexDirection) styles.push(`flex-direction: ${this.flexDirection}`);
    if (this.justifyContent) styles.push(`justify-content: ${this.justifyContent}`);
    if (this.alignItems) styles.push(`align-items: ${this.alignItems}`);
    if (this.gap) styles.push(`gap: ${this.gap}`);
    
    return styles.join('; ');
  }

  private _setupEventListeners(): void {
    if (this.clickable) {
      const boxElement = this.shadowQuerySelector(".ui-box");
      if (boxElement) {
        this.addManagedEventListener(boxElement, "click", this._handleClick);
        this.addManagedEventListener(
          boxElement,
          "keydown",
          this._handleKeydown as EventListener
        );
      }
    }
  }

  private _handleClick(event: Event): void {
    if (!this.clickable) return;

    this.dispatchEvent(
      new CustomEvent("ui-box-click", {
        detail: {
          padding: this.padding,
          margin: this.margin,
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

customElements.define("ui-box", UiBox);

export function renderUiBoxSSR({
  padding = "none",
  margin = "none",
  radius = "none",
  shadow = "none",
  background = "",
  border = "",
  width = "",
  height = "",
  overflow = "",
  display = "",
  flexDirection = "",
  justifyContent = "",
  alignItems = "",
  gap = "",
  clickable = false,
}: {
  padding?: BoxSpacing;
  margin?: BoxSpacing;
  radius?: BoxRadius;
  shadow?: BoxShadow;
  background?: string;
  border?: string;
  width?: string;
  height?: string;
  overflow?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  clickable?: boolean;
} = {}): string {
  const inlineStyles: string[] = [];
  
  if (background) inlineStyles.push(`background: ${background}`);
  if (border) inlineStyles.push(`border: ${border}`);
  if (width) inlineStyles.push(`width: ${width}`);
  if (height) inlineStyles.push(`height: ${height}`);
  if (overflow) inlineStyles.push(`overflow: ${overflow}`);
  if (display) inlineStyles.push(`display: ${display}`);
  if (flexDirection) inlineStyles.push(`flex-direction: ${flexDirection}`);
  if (justifyContent) inlineStyles.push(`justify-content: ${justifyContent}`);
  if (alignItems) inlineStyles.push(`align-items: ${alignItems}`);
  if (gap) inlineStyles.push(`gap: ${gap}`);
  
  const styleAttribute = inlineStyles.length > 0 ? `style="${inlineStyles.join('; ')}"` : "";
  
  return `
    <style>${boxCss}</style>
    ${templateHtml
      .replace(/{padding}/g, padding)
      .replace(/{margin}/g, margin)
      .replace(/{radius}/g, radius)
      .replace(/{shadow}/g, shadow)
      .replace(/{clickable}/g, clickable ? "ui-box--clickable" : "")
      .replace(/{style}/g, styleAttribute)
      .replace(/{tabindex}/g, clickable ? 'tabindex="0"' : "")
      .replace(/{role}/g, clickable ? 'role="button"' : "")}
  `;
}