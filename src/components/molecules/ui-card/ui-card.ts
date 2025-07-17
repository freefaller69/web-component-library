import { ShadowComponent } from "../../../core/ShadowComponent.js";
import cardCss from "./ui-card.css?inline";

export interface UiCardEventDetail {
  action: string;
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-card-action": CustomEvent<UiCardEventDetail>;
  }
}

type CardVariant = "default" | "minimal" | "stat" | "list";
type CardSize = "small" | "medium" | "large";

export class UiCard extends ShadowComponent {
  static get observedAttributes(): string[] {
    return [
      "variant",
      "size",
      "clickable",
      "elevated",
      "bordered",
      "aria-label",
      "aria-describedby"
    ];
  }

  private static readonly VALID_VARIANTS: readonly CardVariant[] = ['default', 'minimal', 'stat', 'list'];
  private static readonly VALID_SIZES: readonly CardSize[] = ['small', 'medium', 'large'];

  constructor() {
    super({ mode: "open" }, false);
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCardKeydown = this._handleCardKeydown.bind(this);
  }

  private _validateValue<T>(value: string | null, validValues: readonly T[], fallback: T): T {
    return (value && validValues.includes(value as T)) ? value as T : fallback;
  }

  // Simplified property accessors with direct attribute reflection
  get variant(): CardVariant {
    return this._validateValue(this.getAttribute('variant'), UiCard.VALID_VARIANTS, 'default');
  }
  set variant(value: CardVariant) {
    this.setAttribute('variant', value);
  }

  get size(): CardSize {
    return this._validateValue(this.getAttribute('size'), UiCard.VALID_SIZES, 'medium');
  }
  set size(value: CardSize) {
    this.setAttribute('size', value);
  }

  get clickable(): boolean {
    return this.hasAttribute('clickable');
  }
  set clickable(value: boolean) {
    this.toggleAttribute('clickable', value);
  }

  get elevated(): boolean {
    return this.hasAttribute('elevated');
  }
  set elevated(value: boolean) {
    this.toggleAttribute('elevated', value);
  }

  get bordered(): boolean {
    return this.hasAttribute('bordered') ? this.getAttribute('bordered') !== 'false' : true;
  }
  set bordered(value: boolean) {
    if (value) {
      this.setAttribute('bordered', 'true');
    } else {
      this.setAttribute('bordered', 'false');
    }
  }

  get ariaLabel(): string | null {
    return this.getAttribute('aria-label');
  }
  set ariaLabel(value: string | null) {
    if (value) {
      this.setAttribute('aria-label', value);
    } else {
      this.removeAttribute('aria-label');
    }
  }

  get ariaDescribedby(): string | null {
    return this.getAttribute('aria-describedby');
  }
  set ariaDescribedby(value: string | null) {
    if (value) {
      this.setAttribute('aria-describedby', value);
    } else {
      this.removeAttribute('aria-describedby');
    }
  }

  protected onAttributeChange(
    name: string,
    _oldValue: string | null,
    _newValue: string | null
  ): void {
    // Only update if we have rendered content
    if (this.shadowRoot.children.length > 0) {
      // If variant changed, we need to re-render slots
      if (name === 'variant') {
        this.renderShadowContent();
      } else {
        this._updateCardAttributes();
        this._updateEventListeners();
      }
    }
  }

  protected renderShadowContent(): void {
    const container = document.createElement('div');
    container.classList.add('ui-card');
    this._applyCardAttributes(container);
    this._createSlots(container);
    this.setContent(container.outerHTML);
    this._setupEventListeners();
  }

  private _applyCardAttributes(container: HTMLElement): void {
    container.setAttribute('data-variant', this.variant);
    container.setAttribute('data-size', this.size);
    
    // Apply modifier classes
    const modifiers = this._getModifierClasses();
    modifiers.forEach(modifier => container.classList.add(modifier));
    
    // Set clickable attributes
    if (this.clickable) {
      container.setAttribute('role', 'button');
      container.setAttribute('tabindex', '0');
      
      if (this.ariaLabel) {
        container.setAttribute('aria-label', this.ariaLabel);
      }
      
      if (this.ariaDescribedby) {
        container.setAttribute('aria-describedby', this.ariaDescribedby);
      }
    }
  }

  private _getModifierClasses(): string[] {
    const modifiers: string[] = [];
    
    if (this.clickable) modifiers.push('ui-card--clickable');
    if (this.elevated) modifiers.push('ui-card--elevated');
    if (this.getAttribute('bordered') === 'false') modifiers.push('ui-card--borderless');
    
    return modifiers;
  }

  private _createSlots(container: HTMLElement): void {
    const slots = this._getVariantSlots();
    
    slots.forEach(slotName => {
      if (slotName === 'default') {
        const slot = document.createElement('slot');
        container.appendChild(slot);
      } else {
        const slotContainer = document.createElement('div');
        slotContainer.classList.add(`ui-card__${slotName}`);
        
        const slot = document.createElement('slot');
        slot.setAttribute('name', slotName);
        slotContainer.appendChild(slot);
        
        container.appendChild(slotContainer);
      }
    });
  }

  private _getVariantSlots(): string[] {
    switch (this.variant) {
      case 'minimal':
        return ['default'];
      case 'stat':
        return ['icon', 'title', 'value', 'subtitle'];
      case 'list':
        return ['media', 'title', 'subtitle', 'meta', 'actions'];
      case 'default':
      default:
        return ['media', 'title', 'default', 'actions'];
    }
  }

  private _updateCardAttributes(): void {
    const container = this.shadowQuerySelector('.ui-card');
    if (!container) return;
    
    // Update data attributes
    container.setAttribute('data-variant', this.variant);
    container.setAttribute('data-size', this.size);
    
    // Update modifier classes
    container.className = `ui-card ${this._getModifierClasses().join(' ')}`;
    
    // Update clickable attributes
    if (this.clickable) {
      container.setAttribute('role', 'button');
      container.setAttribute('tabindex', '0');
      
      if (this.ariaLabel) {
        container.setAttribute('aria-label', this.ariaLabel);
      } else {
        container.removeAttribute('aria-label');
      }
      
      if (this.ariaDescribedby) {
        container.setAttribute('aria-describedby', this.ariaDescribedby);
      } else {
        container.removeAttribute('aria-describedby');
      }
    } else {
      container.removeAttribute('role');
      container.removeAttribute('tabindex');
      container.removeAttribute('aria-label');
      container.removeAttribute('aria-describedby');
    }
  }

  private _setupEventListeners(): void {
    this._updateEventListeners();
  }

  private _updateEventListeners(): void {
    const container = this.shadowQuerySelector('.ui-card');
    if (!container) return;
    
    // Remove existing listeners by re-adding managed listeners
    // The base class handles cleanup automatically
    if (this.clickable) {
      this.addManagedEventListener(container, 'click', this._handleCardClick);
      this.addManagedEventListener(container, 'keydown', this._handleCardKeydown);
    }
  }

  protected getStyles(): string {
    return cardCss;
  }

  private _handleCardClick(event: Event): void {
    if (!this.clickable) return;
    
    this._emitCardAction('click', event);
  }

  private _handleCardKeydown(event: Event): void {
    const keyEvent = event as KeyboardEvent;
    if (!this.clickable) return;
    
    if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
      keyEvent.preventDefault();
      this._emitCardAction('activate', keyEvent);
    }
  }

  private _emitCardAction(action: string, originalEvent: Event): void {
    this.dispatchEvent(new CustomEvent('ui-card-action', {
      detail: {
        action,
        originalEvent
      },
      bubbles: true
    }));
  }

  // Public methods
  focus(): void {
    if (this.clickable) {
      const container = this.shadowQuerySelector('.ui-card');
      if (container) {
        (container as HTMLElement).focus();
      }
    }
  }
}

customElements.define("ui-card", UiCard);