import { ShadowComponent } from "../../../core/ShadowComponent.js";
import iconCss from "./ui-icon.css?inline";

type IconSize = "sm" | "md" | "lg";

export class UiIcon extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["size", "label"];
  }

  private _size: IconSize = "md";
  private _label = "";

  constructor() {
    super({ mode: "open" }, false);
  }

  get size(): IconSize { return this._size; }
  set size(value: IconSize) {
    this._size = value;
    this.setAttributeSafe("size", value);
    this.render();
  }

  get label(): string { return this._label; }
  set label(value: string) {
    this._label = value;
    this.setAttributeSafe("label", value);
    this.render();
  }

  protected onAttributeChange(name: string, _oldValue: string | null, newValue: string | null): void {
    switch (name) {
      case "size":
        this._size = (newValue as IconSize) || "md";
        break;
      case "label":
        this._label = newValue || "";
        break;
    }
    this.render();
  }

  protected renderShadowContent(): void {
    this.setContent(this._getTemplate());
  }

  private _getTemplate(): string {
    const ariaLabel = this._label ? `aria-label="${this._label}" role="img"` : 'aria-hidden="true"';
    return `<div class="ui-icon" data-size="${this._size}" ${ariaLabel}>
      <slot></slot>
    </div>`;
  }

  protected getStyles(): string {
    return iconCss;
  }
}

customElements.define("ui-icon", UiIcon);