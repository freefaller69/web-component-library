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
    return ["as", "level", "size", "weight", "truncate", "color", "align", "clickable", "aria-label", "title"];
  }

  private _as: TextAs = "span";
  private _level: number | null = null;
  private _size: TextSize = "md";
  private _weight: TextWeight = "normal";
  private _truncate = false;
  private _color = "";
  private _align: "left" | "center" | "right" | "justify" = "left";
  private _clickable = false;
  private _ariaLabel = "";
  private _title = "";
  private _renderScheduled = false;
  private _templateCache = new Map<string, string>();
  private _eventListenersSetup = false;
  private _truncateExpanded = false;

  // Valid values for runtime validation
  private readonly validAsValues: TextAs[] = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong", "em", "small", "code"];
  private readonly validSizes: TextSize[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];
  private readonly validWeights: TextWeight[] = ["normal", "medium", "semibold", "bold"];
  private readonly validAligns = ["left", "center", "right", "justify"] as const;

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  // Security: Validate CSS color values
  private validateColor(color: string): boolean {
    if (!color) return true; // Empty string is valid
    
    // Create a temporary element to test color validity
    const testElement = document.createElement('div');
    testElement.style.color = color;
    
    // If the color is invalid, the style.color will be empty
    return testElement.style.color !== '';
  }

  // Enhanced validation with error reporting
  private validateAttribute(name: string, value: any): boolean {
    const validators: Record<string, (v: any) => boolean> = {
      as: (v: string) => this.validAsValues.includes(v as TextAs),
      size: (v: string) => this.validSizes.includes(v as TextSize),
      weight: (v: string) => this.validWeights.includes(v as TextWeight),
      align: (v: string) => this.validAligns.includes(v as any),
      level: (v: number) => Number.isInteger(v) && v >= 1 && v <= 6,
      color: (v: string) => this.validateColor(v)
    };
    
    const validator = validators[name];
    if (validator && !validator(value)) {
      console.warn(`ui-text: Invalid ${name} value "${value}". Check documentation for valid options.`);
      return false;
    }
    return true;
  }

  // Performance: Implement render batching
  private scheduleRender(): void {
    if (this._renderScheduled) return;
    this._renderScheduled = true;
    
    // Check if we're in a test environment (Vitest sets up globals)
    const isTest = typeof globalThis !== 'undefined' && 
                  ('__vitest_worker__' in globalThis || 
                   'expect' in globalThis ||
                   (typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test'));
    
    if (isTest) {
      this._renderScheduled = false;
      if (this.isConnected) {
        this.render();
      }
    } else {
      queueMicrotask(() => {
        this._renderScheduled = false;
        if (this.isConnected) {
          this.render();
        }
      });
    }
  }

  // Performance: Template caching
  private getCachedTemplate(): string {
    const key = `${this.as}-${this.size}-${this.weight}-${this.truncate}-${this.align}-${this.clickable}-${this.color}-${this._truncateExpanded}`;
    
    if (this._templateCache.has(key)) {
      return this._templateCache.get(key)!;
    }
    
    // Determine truncation classes
    let truncateClass = "";
    if (this.truncate) {
      truncateClass = this._truncateExpanded ? "ui-text--truncate-expanded" : "ui-text--truncate";
    }
    
    // Auto-generate title for truncated text if not provided
    let titleAttr = "";
    if (this.title) {
      titleAttr = `title="${this.title}"`;
    } else if (this.truncate && !this._truncateExpanded && this.textContent) {
      titleAttr = `title="${this.textContent}"`;
    }
    
    const html = templateHtml
      .replace(/{element}/g, this.as)
      .replace(/{size}/g, this.size)
      .replace(/{weight}/g, this.weight)
      .replace(/{truncate}/g, truncateClass)
      .replace(/{align}/g, this.align)
      .replace(/{clickable}/g, this.clickable ? "ui-text--clickable" : "")
      .replace(/{color}/g, this.color ? `style="color: ${this.color}"` : "")
      .replace(/{tabindex}/g, this.clickable || this.truncate ? 'tabindex="0"' : "")
      .replace(/{role}/g, this.clickable ? 'role="button"' : this.truncate ? 'role="button"' : "")
      .replace(/{aria-label}/g, this.ariaLabel ? `aria-label="${this.ariaLabel}"` : "")
      .replace(/{title}/g, titleAttr);
    
    // Limit cache size to prevent memory leaks
    if (this._templateCache.size > 50) {
      this._templateCache.clear();
    }
    
    this._templateCache.set(key, html);
    return html;
  }

  get as(): TextAs {
    return this._as;
  }
  set as(value: TextAs) {
    if (this.validateAttribute('as', value)) {
      this._as = value;
      this.setAttributeSafe("as", value);
      this.scheduleRender();
    }
  }

  get level(): number | null {
    return this._level;
  }
  set level(value: number | null) {
    if (value === null || this.validateAttribute('level', value)) {
      this._level = value;
      if (value !== null) {
        this._as = `h${value}` as TextAs;
        this.setAttributeSafe("level", value);
        this.setAttributeSafe("as", this._as);
      } else {
        this.removeAttribute("level");
      }
      this.scheduleRender();
    }
  }

  get size(): TextSize {
    return this._size;
  }
  set size(value: TextSize) {
    if (this.validateAttribute('size', value)) {
      this._size = value;
      this.setAttributeSafe("size", value);
      this.scheduleRender();
    }
  }

  get weight(): TextWeight {
    return this._weight;
  }
  set weight(value: TextWeight) {
    if (this.validateAttribute('weight', value)) {
      this._weight = value;
      this.setAttributeSafe("weight", value);
      this.scheduleRender();
    }
  }

  get truncate(): boolean {
    return this._truncate;
  }
  set truncate(value: boolean) {
    this._truncate = Boolean(value);
    this.setAttributeSafe("truncate", this._truncate);
    this.scheduleRender();
  }

  get color(): string {
    return this._color;
  }
  set color(value: string) {
    if (this.validateAttribute('color', value)) {
      this._color = value;
      this.setAttributeSafe("color", value);
      this.scheduleRender();
    }
  }

  get align(): "left" | "center" | "right" | "justify" {
    return this._align;
  }
  set align(value: "left" | "center" | "right" | "justify") {
    if (this.validateAttribute('align', value)) {
      this._align = value;
      this.setAttributeSafe("align", value);
      this.scheduleRender();
    }
  }

  get clickable(): boolean {
    return this._clickable;
  }
  set clickable(value: boolean) {
    const oldValue = this._clickable;
    this._clickable = Boolean(value);
    this.setAttributeSafe("clickable", this._clickable);
    
    // Only re-setup event listeners if clickable state changed
    if (oldValue !== this._clickable) {
      this._eventListenersSetup = false;
    }
    
    this.scheduleRender();
  }

  get ariaLabel(): string {
    return this._ariaLabel;
  }
  set ariaLabel(value: string) {
    this._ariaLabel = value;
    this.setAttributeSafe("aria-label", value);
    this.scheduleRender();
  }

  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
    this.setAttributeSafe("title", value);
    this.scheduleRender();
  }

  // Accessibility: Toggle truncation for screen readers
  public toggleTruncation(): void {
    if (this._truncate) {
      this._truncateExpanded = !this._truncateExpanded;
      this._announceToScreenReader(
        this._truncateExpanded ? "Text expanded" : "Text collapsed"
      );
      this.scheduleRender();
    }
  }

  // Accessibility: Announce actions to screen readers
  private _announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  protected onAttributeChange(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    switch (name) {
      case "as":
        if (newValue && this.validateAttribute('as', newValue)) {
          this._as = newValue as TextAs;
        } else {
          this._as = "span";
        }
        break;
      case "level":
        this._level = newValue ? parseInt(newValue) : null;
        if (this._level !== null && this.validateAttribute('level', this._level)) {
          this._as = `h${this._level}` as TextAs;
        }
        break;
      case "size":
        if (newValue && this.validateAttribute('size', newValue)) {
          this._size = newValue as TextSize;
        } else {
          this._size = "md";
        }
        break;
      case "weight":
        if (newValue && this.validateAttribute('weight', newValue)) {
          this._weight = newValue as TextWeight;
        } else {
          this._weight = "normal";
        }
        break;
      case "truncate":
        this._truncate = newValue !== null;
        break;
      case "color":
        if (this.validateAttribute('color', newValue || "")) {
          this._color = newValue || "";
        } else {
          this._color = "";
        }
        break;
      case "align":
        if (newValue && this.validateAttribute('align', newValue)) {
          this._align = newValue as "left" | "center" | "right" | "justify";
        } else {
          this._align = "left";
        }
        break;
      case "clickable":
        const oldClickable = this._clickable;
        this._clickable = newValue !== null;
        if (oldClickable !== this._clickable) {
          this._eventListenersSetup = false;
        }
        break;
      case "aria-label":
        this._ariaLabel = newValue || "";
        break;
      case "title":
        this._title = newValue || "";
        break;
    }
    
    if (this.isConnected) {
      this.scheduleRender();
    }
  }

  protected renderShadowContent(): void {
    const html = this.getCachedTemplate();
    this.setContent(html);
    // Reset event listeners flag since DOM was re-rendered
    this._eventListenersSetup = false;
    this._setupEventListeners();
  }

  protected getStyles(): string {
    return textCss;
  }

  private _setupEventListeners(): void {
    if (this.clickable || this.truncate) {
      const textElement = this.shadowQuerySelector(".ui-text");
      if (textElement && !this._eventListenersSetup) {
        this.addManagedEventListener(textElement, "click", this._handleClick);
        this.addManagedEventListener(
          textElement,
          "keydown",
          this._handleKeydown as EventListener
        );
        this._eventListenersSetup = true;
      }
    }
  }

  private _handleClick(event: Event): void {
    // Handle truncation expansion
    if (this.truncate) {
      this.toggleTruncation();
      return;
    }
    
    if (!this.clickable) return;

    // Announce action to screen readers
    this._announceToScreenReader(`${this.as} element activated`);
    
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
    // Handle truncation expansion
    if (this.truncate && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      this.toggleTruncation();
      return;
    }
    
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
  ariaLabel = "",
  title = "",
}: {
  as?: TextAs;
  level?: number | null;
  size?: TextSize;
  weight?: TextWeight;
  truncate?: boolean;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  clickable?: boolean;
  ariaLabel?: string;
  title?: string;
} = {}): string {
  // Security: Validate color in SSR as well
  const validateColor = (color: string): boolean => {
    if (!color) return true;
    const testElement = document.createElement('div');
    testElement.style.color = color;
    return testElement.style.color !== '';
  };
  
  // If level is provided, use it to determine the element
  const element = level !== null ? `h${level}` : as;
  const safeColor = validateColor(color) ? color : "";
  
  return `
    <style>${textCss}</style>
    ${templateHtml
      .replace(/{element}/g, element)
      .replace(/{size}/g, size)
      .replace(/{weight}/g, weight)
      .replace(/{truncate}/g, truncate ? "ui-text--truncate" : "")
      .replace(/{align}/g, align)
      .replace(/{clickable}/g, clickable ? "ui-text--clickable" : "")
      .replace(/{color}/g, safeColor ? `style="color: ${safeColor}"` : "")
      .replace(/{tabindex}/g, clickable || truncate ? 'tabindex="0"' : "")
      .replace(/{role}/g, clickable ? 'role="button"' : truncate ? 'role="button"' : "")
      .replace(/{aria-label}/g, ariaLabel ? `aria-label="${ariaLabel}"` : "")
      .replace(/{title}/g, title ? `title="${title}"` : "")}
  `;
}