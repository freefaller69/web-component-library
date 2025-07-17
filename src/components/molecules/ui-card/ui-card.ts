import { ShadowComponent } from "../../../core/ShadowComponent.js";
import cardCss from "./ui-card.css?inline";

type CardPadding = "none" | "sm" | "md" | "lg";

export class UiCard extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["padding", "clickable", "aria-label", "aria-describedby"];
  }

  private _padding: CardPadding = "md";
  private _clickable = false;
  private _ariaLabel: string | null = null;
  private _ariaDescribedby: string | null = null;

  constructor() {
    super({ mode: "open" }, false);
  }

  get padding(): CardPadding { return this._padding; }
  set padding(value: CardPadding) { this._padding = value; this.setAttributeSafe("padding", value); this.render(); }

  get clickable(): boolean { return this._clickable; }
  set clickable(value: boolean) { this._clickable = value; this.setAttributeSafe("clickable", value ? "" : null); this.render(); }

  get ariaLabel(): string | null { return this._ariaLabel; }
  set ariaLabel(value: string | null) { this._ariaLabel = value; this.setAttributeSafe("aria-label", value); this.render(); }

  get ariaDescribedby(): string | null { return this._ariaDescribedby; }
  set ariaDescribedby(value: string | null) { this._ariaDescribedby = value; this.setAttributeSafe("aria-describedby", value); this.render(); }

  protected onAttributeChange(name: string, _old: string | null, newValue: string | null): void {
    switch (name) {
      case "padding": this._padding = (newValue as CardPadding) || "md"; break;
      case "clickable": this._clickable = newValue !== null; break;
      case "aria-label": this._ariaLabel = newValue; break;
      case "aria-describedby": this._ariaDescribedby = newValue; break;
    }
  }

  protected renderShadowContent(): void {
    const cardClasses = `ui-card ui-card--${this._padding}${this._clickable ? ' ui-card--clickable' : ''}`;
    let clickableAttrs = '';
    
    if (this._clickable) {
      clickableAttrs = ' tabindex="0" role="button"';
      if (this._ariaLabel) clickableAttrs += ` aria-label="${this._ariaLabel}"`;
      else clickableAttrs += ' aria-label="Interactive card"';
      if (this._ariaDescribedby) clickableAttrs += ` aria-describedby="${this._ariaDescribedby}"`;
    }
    
    this.setContent(`<div class="${cardClasses}"${clickableAttrs}>
      <header class="ui-card__header"><slot name="header"></slot></header>
      <main class="ui-card__content"><slot></slot></main>
      <footer class="ui-card__footer"><slot name="footer"></slot></footer>
    </div>`);
    
    if (this._clickable) {
      const card = this.shadowQuerySelector('.ui-card');
      if (card) {
        this.addManagedEventListener(card, 'click', (e) => {
          this.dispatchEvent(new CustomEvent('card-click', { detail: { originalEvent: e }, bubbles: true }));
        });
        this.addManagedEventListener(card, 'keydown', (e) => {
          const keyEvent = e as KeyboardEvent;
          if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
            keyEvent.preventDefault();
            this.dispatchEvent(new CustomEvent('card-click', { detail: { originalEvent: e }, bubbles: true }));
          }
        });
      }
    }
  }

  focus(): void {
    const card = this.shadowQuerySelector('.ui-card');
    if (card instanceof HTMLElement) {
      card.focus();
    }
  }

  protected getStyles(): string {
    return cardCss;
  }
}

customElements.define("ui-card", UiCard);