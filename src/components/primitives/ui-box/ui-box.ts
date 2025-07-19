import { ShadowComponent } from "../../../core/ShadowComponent.js";
import boxCss from "./ui-box.css?inline";

export interface UiBoxEventDetail {
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-box-click": CustomEvent<UiBoxEventDetail>;
  }
}

type BoxSpacing = "xs" | "sm" | "md" | "lg" | "xl";
type BoxRadius = "sm" | "md" | "lg" | "xl" | "full";
type BoxShadow = "sm" | "md" | "lg" | "xl";

export class UiBox extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["padding", "radius", "shadow", "clickable"];
  }

  private _padding: BoxSpacing | null = null;
  private _radius: BoxRadius | null = null;
  private _shadow: BoxShadow | null = null;
  private _clickable = false;

  constructor() {
    super({ mode: "open" }, false);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  get padding(): BoxSpacing | null { return this._padding; }
  set padding(value: BoxSpacing | null) {
    this._padding = value;
    if (value) {
      this.setAttributeSafe("padding", value);
    } else {
      this.removeAttribute("padding");
    }
    this.render();
  }

  get radius(): BoxRadius | null { return this._radius; }
  set radius(value: BoxRadius | null) {
    this._radius = value;
    if (value) {
      this.setAttributeSafe("radius", value);
    } else {
      this.removeAttribute("radius");
    }
    this.render();
  }

  get shadow(): BoxShadow | null { return this._shadow; }
  set shadow(value: BoxShadow | null) {
    this._shadow = value;
    if (value) {
      this.setAttributeSafe("shadow", value);
    } else {
      this.removeAttribute("shadow");
    }
    this.render();
  }

  get clickable(): boolean { return this._clickable; }
  set clickable(value: boolean) {
    this._clickable = Boolean(value);
    this.setAttributeSafe("clickable", this._clickable);
    this.render();
  }

  protected onAttributeChange(name: string, _oldValue: string | null, newValue: string | null): void {
    switch (name) {
      case "padding":
        this._padding = newValue as BoxSpacing | null;
        break;
      case "radius":
        this._radius = newValue as BoxRadius | null;
        break;
      case "shadow":
        this._shadow = newValue as BoxShadow | null;
        break;
      case "clickable":
        this._clickable = newValue !== null;
        break;
    }
    this.render();
  }

  protected renderShadowContent(): void {
    this.setContent(this._getTemplate());
    this._setupEventListeners();
  }

  private _getTemplate(): string {
    const paddingAttr = this._padding ? ` data-padding="${this._padding}"` : "";
    const radiusAttr = this._radius ? ` data-radius="${this._radius}"` : "";
    const shadowAttr = this._shadow ? ` data-shadow="${this._shadow}"` : "";
    const clickableAttrs = this._clickable ? ' data-clickable="true" tabindex="0" role="button"' : "";
    
    return `<div class="ui-box"${paddingAttr}${radiusAttr}${shadowAttr}${clickableAttrs}>
      <slot></slot>
    </div>`;
  }

  private _setupEventListeners(): void {
    if (this._clickable) {
      const boxElement = this.shadowQuerySelector(".ui-box");
      if (boxElement) {
        this.addManagedEventListener(boxElement, "click", this._handleClick);
        this.addManagedEventListener(boxElement, "keydown", this._handleKeydown as EventListener);
      }
    }
  }

  private _handleClick(event: Event): void {
    if (!this._clickable) return;
    this.dispatchEvent(
      new CustomEvent("ui-box-click", {
        detail: { originalEvent: event },
        bubbles: true,
        cancelable: true,
      })
    );
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (!this._clickable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._handleClick(event);
    }
  }

  focus(): void {
    if (this._clickable) {
      this.focusFirstElementInShadow();
    }
  }

  click(): void {
    if (this._clickable) {
      this._handleClick(new Event("click"));
    }
  }

  protected getStyles(): string {
    return boxCss;
  }

}

customElements.define("ui-box", UiBox);