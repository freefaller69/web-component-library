import { ShadowComponent } from "../../../core/ShadowComponent.js";
import textCss from "./ui-text.css?inline";

type TextAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong" | "em" | "small" | "code";
type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

export class UiText extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["as", "size"];
  }

  private _as: TextAs = "p";
  private _size: TextSize | null = null;

  constructor() {
    super({ mode: "open" }, false);
  }

  get as(): TextAs {
    return this._as;
  }
  set as(value: TextAs) {
    this._as = value;
    this.setAttributeSafe("as", value);
    this.render();
  }

  get size(): TextSize | null {
    return this._size;
  }
  set size(value: TextSize | null) {
    this._size = value;
    if (value) {
      this.setAttributeSafe("size", value);
    } else {
      this.removeAttribute("size");
    }
    this.render();
  }

  protected onAttributeChange(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    switch (name) {
      case "as":
        this._as = (newValue as TextAs) || "p";
        break;
      case "size":
        this._size = newValue as TextSize | null;
        break;
    }
  }

  protected renderShadowContent(): void {
    const element = document.createElement(this._as);
    element.classList.add("ui-text");
    
    if (this._size) {
      element.classList.add(`ui-text--${this._size}`);
    }
    
    const slot = document.createElement("slot");
    element.appendChild(slot);
    
    this.setContent(element.outerHTML);
  }

  protected getStyles(): string {
    return textCss;
  }
}

customElements.define("ui-text", UiText);