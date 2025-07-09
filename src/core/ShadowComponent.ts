import { BaseComponent } from "./BaseComponent.js";

/**
 * ShadowComponent - Extends BaseComponent with Shadow DOM support
 * Adds shadow root setup with CSS injection and content container
 */
export abstract class ShadowComponent extends BaseComponent {
  declare readonly shadowRoot: ShadowRoot;
  private contentRoot: HTMLElement;
  private styleElement?: HTMLStyleElement;

  constructor(shadowRootOptions: ShadowRootInit = { mode: "open" }) {
    super();
    this.attachShadow(shadowRootOptions);

    // Setup styles
    const styles = this.getStyles();
    if ("adoptedStyleSheets" in Document.prototype && styles) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles);
      (this.shadowRoot as any).adoptedStyleSheets = [sheet];
    } else {
      this.styleElement = document.createElement("style");
      this.styleElement.textContent = styles;
      this.shadowRoot.appendChild(this.styleElement);
    }

    // Setup content container
    this.contentRoot = document.createElement("div");
    this.shadowRoot.appendChild(this.contentRoot);
  }

  /**
   * Subclasses should return the raw CSS string for styling.
   */
  protected getStyles(): string {
    return "";
  }

  /**
   * Subclasses must implement to render inner HTML content
   * using this.setContent(html)
   */
  protected abstract renderShadowContent(): void;

  protected render(): void {
    this.renderShadowContent();
  }

  /**
   * Sets the inner HTML inside the content container.
   * Keeps styles intact.
   */
  protected setContent(html: string): void {
    this.contentRoot.innerHTML = html;
  }

  /**
   * Finds and focuses the first interactive element inside shadow DOM.
   */
  protected focusFirstElementInShadow(): void {
    const focusable = this.shadowRoot.querySelector(
      'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    if (focusable) focusable.focus();
  }

  protected shadowQuerySelector<T extends Element = Element>(
    selector: string
  ): T | null {
    return this.shadowRoot.querySelector<T>(selector);
  }

  protected shadowQuerySelectorAll<T extends Element = Element>(
    selector: string
  ): NodeListOf<T> {
    return this.shadowRoot.querySelectorAll<T>(selector);
  }
}
