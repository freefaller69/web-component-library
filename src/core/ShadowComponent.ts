import { BaseComponent } from "./BaseComponent.js";

/**
 * ShadowComponent - Extends BaseComponent with Shadow DOM support
 * Adds shadow root setup with CSS injection and optional content container
 */
export abstract class ShadowComponent extends BaseComponent {
  declare readonly shadowRoot: ShadowRoot;
  private contentRoot?: HTMLElement;
  private styleElement?: HTMLStyleElement;
  private useContentWrapper: boolean;

  constructor(shadowRootOptions: ShadowRootInit = { mode: "open" }, useContentWrapper = true) {
    super();
    this.useContentWrapper = useContentWrapper;
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

    // Setup content container (optional)
    if (this.useContentWrapper) {
      this.contentRoot = document.createElement("div");
      this.shadowRoot.appendChild(this.contentRoot);
    }
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
   * Sets the inner HTML inside the content container or directly in shadow root.
   * Keeps styles intact.
   */
  protected setContent(html: string): void {
    if (this.useContentWrapper && this.contentRoot) {
      this.contentRoot.innerHTML = html;
    } else {
      // Find and preserve style element, then set content directly in shadow root
      const styleEl = this.shadowRoot.querySelector('style');
      this.shadowRoot.innerHTML = '';
      if (styleEl) {
        this.shadowRoot.appendChild(styleEl);
      }
      // Create a temporary div to parse HTML and append children
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      while (tempDiv.firstChild) {
        this.shadowRoot.appendChild(tempDiv.firstChild);
      }
    }
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
    if (this.useContentWrapper && this.contentRoot) {
      return this.contentRoot.querySelector<T>(selector);
    }
    return this.shadowRoot.querySelector<T>(selector);
  }

  protected shadowQuerySelectorAll<T extends Element = Element>(
    selector: string
  ): NodeListOf<T> {
    if (this.useContentWrapper && this.contentRoot) {
      return this.contentRoot.querySelectorAll<T>(selector);
    }
    return this.shadowRoot.querySelectorAll<T>(selector);
  }
}
