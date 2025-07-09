/**
 * BaseComponent - Simple foundation for web components
 * Provides attribute reflection, event cleanup, CSS utilities, and basic accessibility
 */
export abstract class BaseComponent extends HTMLElement {
  private eventListeners = new Map<string, { element: EventTarget; listener: EventListener; options?: AddEventListenerOptions }[]>();
  private attributeCallbacks = new Map<string, (oldValue: string | null, newValue: string | null) => void>();

  constructor() {
    super();
  }

  // Abstract method - subclasses must implement
  protected abstract render(): void;

  // Lifecycle hooks - override as needed
  protected onConnect(): void {}
  protected onDisconnect(): void {}
  protected onAttributeChange(_name: string, _oldValue: string | null, _newValue: string | null): void {}

  // Built-in lifecycle methods
  connectedCallback(): void {
    this.onConnect();
    this.render();
  }

  disconnectedCallback(): void {
    this.cleanup();
    this.onDisconnect();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    this.onAttributeChange(name, oldValue, newValue);
    
    const callback = this.attributeCallbacks.get(name);
    if (callback) {
      callback(oldValue, newValue);
    }
  }

  // Attribute utilities
  protected getAttributeAsBoolean(name: string): boolean {
    return this.hasAttribute(name);
  }

  protected getAttributeAsNumber(name: string, defaultValue = 0): number {
    const value = this.getAttribute(name);
    const parsed = value ? parseFloat(value) : defaultValue;
    return isNaN(parsed) ? defaultValue : parsed;
  }

  protected setAttributeSafe(name: string, value: string | number | boolean | null): void {
    if (value === null || value === false) {
      this.removeAttribute(name);
    } else if (value === true) {
      this.setAttribute(name, '');
    } else {
      this.setAttribute(name, String(value));
    }
  }

  protected registerAttributeCallback(name: string, callback: (oldValue: string | null, newValue: string | null) => void): void {
    this.attributeCallbacks.set(name, callback);
  }

  // Event management with automatic cleanup
  protected addManagedEventListener(
    element: EventTarget,
    type: string,
    listener: EventListener,
    options?: AddEventListenerOptions
  ): void {
    element.addEventListener(type, listener, options);
    
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    
    this.eventListeners.get(type)!.push({ element, listener, options });
  }

  protected removeManagedEventListener(type: string, element?: EventTarget): void {
    const listeners = this.eventListeners.get(type);
    if (!listeners) return;

    listeners.forEach(({ element: listenerElement, listener, options }) => {
      if (!element || element === listenerElement) {
        listenerElement.removeEventListener(type, listener, options);
      }
    });

    if (!element) {
      this.eventListeners.delete(type);
    } else {
      const remaining = listeners.filter(l => l.element !== element);
      if (remaining.length > 0) {
        this.eventListeners.set(type, remaining);
      } else {
        this.eventListeners.delete(type);
      }
    }
  }

  // CSS custom property utilities
  protected setCSSProperty(property: string, value: string): void {
    this.style.setProperty(`--${property}`, value);
  }

  protected getCSSProperty(property: string): string {
    return getComputedStyle(this).getPropertyValue(`--${property}`).trim();
  }

  // Basic accessibility helpers
  protected setAriaLabel(label: string): void {
    this.setAttribute('aria-label', label);
  }

  protected setAriaExpanded(expanded: boolean): void {
    this.setAttribute('aria-expanded', String(expanded));
  }

  protected setAriaHidden(hidden: boolean): void {
    this.setAttribute('aria-hidden', String(hidden));
  }

  protected setTabIndex(index: number): void {
    this.setAttribute('tabindex', String(index));
  }

  // Cleanup on disconnect
  private cleanup(): void {
    this.eventListeners.forEach((listeners, type) => {
      listeners.forEach(({ element, listener, options }) => {
        element.removeEventListener(type, listener, options);
      });
    });
    this.eventListeners.clear();
    this.attributeCallbacks.clear();
  }
}