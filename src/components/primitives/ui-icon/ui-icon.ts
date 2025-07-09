import { ShadowComponent } from "../../../core/ShadowComponent.js";
import templateHtml from "./ui-icon.html?raw";
import iconCss from "./ui-icon.css?inline";

export interface UiIconEventDetail {
  name: string;
  size: string;
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-icon-click": CustomEvent<UiIconEventDetail>;
  }
}

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

export class UiIcon extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["name", "size", "color", "stroke-width", "fill", "clickable", "label"];
  }

  private _name = "";
  private _size: IconSize = "md";
  private _color = "";
  private _strokeWidth = "";
  private _fill = "";
  private _clickable = false;
  private _label = "";

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this.setAttributeSafe("name", value);
    this.render();
  }

  get size(): IconSize {
    return this._size;
  }
  set size(value: IconSize) {
    if (["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"].includes(value)) {
      this._size = value;
      this.setAttributeSafe("size", value);
      this.render();
    }
  }

  get color(): string {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
    this.setAttributeSafe("color", value);
    this.render();
  }

  get strokeWidth(): string {
    return this._strokeWidth;
  }
  set strokeWidth(value: string) {
    this._strokeWidth = value;
    this.setAttributeSafe("stroke-width", value);
    this.render();
  }

  get fill(): string {
    return this._fill;
  }
  set fill(value: string) {
    this._fill = value;
    this.setAttributeSafe("fill", value);
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

  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
    this.setAttributeSafe("label", value);
    this.render();
  }

  protected onAttributeChange(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    switch (name) {
      case "name":
        this._name = newValue || "";
        break;
      case "size":
        this._size = (newValue as IconSize) || "md";
        break;
      case "color":
        this._color = newValue || "";
        break;
      case "stroke-width":
        this._strokeWidth = newValue || "";
        break;
      case "fill":
        this._fill = newValue || "";
        break;
      case "clickable":
        this._clickable = newValue !== null;
        break;
      case "label":
        this._label = newValue || "";
        break;
    }
    
    if (this.isConnected) {
      this.render();
    }
  }

  protected renderShadowContent(): void {
    const iconSvg = this._generateIconSvg();
    
    const html = templateHtml
      .replace(/{size}/g, this.size)
      .replace(/{clickable}/g, this.clickable ? "ui-icon--clickable" : "")
      .replace(/{color}/g, this.color ? `style="color: ${this.color}"` : "")
      .replace(/{tabindex}/g, this.clickable ? 'tabindex="0"' : "")
      .replace(/{role}/g, this.clickable ? 'role="button"' : "")
      .replace(/{aria-label}/g, this.label ? `aria-label="${this.label}"` : "")
      .replace(/{icon-svg}/g, iconSvg);

    this.setContent(html);
    this._setupEventListeners();
  }

  protected getStyles(): string {
    return iconCss;
  }

  private _generateIconSvg(): string {
    if (!this.name) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="24" height="24" rx="2" ry="2"/><path d="M16 2l4 4-4 4"/><path d="M8 2L4 6l4 4"/></svg>';
    }

    // Generate SVG based on icon name
    const iconPaths = this._getIconPaths(this.name);
    const strokeWidth = this.strokeWidth || "2";
    const fill = this.fill || "none";
    
    return `<svg viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${iconPaths}</svg>`;
  }

  private _getIconPaths(iconName: string): string {
    const icons: Record<string, string> = {
      // Basic icons
      "x": '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
      "check": '<polyline points="20,6 9,17 4,12"></polyline>',
      "chevron-right": '<polyline points="9,18 15,12 9,6"></polyline>',
      "chevron-left": '<polyline points="15,18 9,12 15,6"></polyline>',
      "chevron-down": '<polyline points="6,9 12,15 18,9"></polyline>',
      "chevron-up": '<polyline points="18,15 12,9 6,15"></polyline>',
      
      // User interface icons
      "menu": '<line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
      "more-vertical": '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>',
      "more-horizontal": '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',
      "search": '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>',
      "settings": '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
      "filter": '<polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>',
      "plus": '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',
      "minus": '<line x1="5" y1="12" x2="19" y2="12"></line>',
      
      // Actions
      "edit": '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>',
      "trash": '<polyline points="3,6 5,6 21,6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
      "copy": '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
      "download": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7,10 12,15 17,10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',
      "upload": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17,8 12,3 7,8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>',
      "save": '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17,21 17,13 7,13 7,21"></polyline><polyline points="7,3 7,8 15,8"></polyline>',
      
      // Communication
      "mail": '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
      "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
      "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
      
      // Status
      "alert-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
      "alert-triangle": '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',
      "info": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
      "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline>',
      "x-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
      
      // Navigation
      "home": '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline>',
      "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline>',
      "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12,19 5,12 12,5"></polyline>',
      "arrow-up": '<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5,12 12,5 19,12"></polyline>',
      "arrow-down": '<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19,12 12,19 5,12"></polyline>',
      "external-link": '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15,3 21,3 21,9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>',
      
      // Media
      "play": '<polygon points="5,3 19,12 5,21"></polygon>',
      "pause": '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>',
      "stop": '<rect x="6" y="6" width="12" height="12"></rect>',
      "skip-back": '<polygon points="19,20 9,12 19,4"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>',
      "skip-forward": '<polygon points="5,4 15,12 5,20"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>',
      "volume-2": '<polygon points="11,5 6,9 2,9 2,15 6,15 11,19"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>',
      "volume-x": '<polygon points="11,5 6,9 2,9 2,15 6,15 11,19"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>',
      "image": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21,15 16,10 5,21"></polyline>',
      "video": '<polygon points="23,7 16,12 23,17"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>',
      
      // Files
      "file": '<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"></path><polyline points="14,2 14,8 20,8"></polyline>',
      "file-text": '<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline>',
      "folder": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
      "folder-open": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><polyline points="22,19 20,18 14,18 12,15 2,15"></polyline>',
      
      // User
      "user": '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
      "users": '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
      "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>',
      "user-minus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>',
      
      // Time
      "clock": '<circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline>',
      "calendar": '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
      
      // Shopping
      "shopping-cart": '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
      "shopping-bag": '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',
      "heart": '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
      
      // Weather
      "sun": '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
      "moon": '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>',
      "cloud": '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>',
      "umbrella": '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>',
      
      // Technology
      "wifi": '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',
      "bluetooth": '<polyline points="6.5,6.5 17.5,17.5 12,23 12,1 17.5,6.5 6.5,17.5"></polyline>',
      "battery": '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>',
      "zap": '<polygon points="13,2 3,14 12,14 11,22 21,10 12,10"></polygon>',
      "cpu": '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>',
      "monitor": '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
      "smartphone": '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
      "tablet": '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
      
      // Default fallback
      "default": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="M21 15.5l-3.09-3.09a2 2 0 0 0-2.83 0L14 13.5"></path>'
    };

    return icons[iconName] || icons["default"];
  }

  private _setupEventListeners(): void {
    if (this.clickable) {
      const iconElement = this.shadowQuerySelector(".ui-icon");
      if (iconElement) {
        this.addManagedEventListener(iconElement, "click", this._handleClick);
        this.addManagedEventListener(
          iconElement,
          "keydown",
          this._handleKeydown as EventListener
        );
      }
    }
  }

  private _handleClick(event: Event): void {
    if (!this.clickable) return;

    this.dispatchEvent(
      new CustomEvent("ui-icon-click", {
        detail: {
          name: this.name,
          size: this.size,
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

customElements.define("ui-icon", UiIcon);

export function renderUiIconSSR({
  name = "",
  size = "md",
  color = "",
  strokeWidth = "",
  fill = "",
  clickable = false,
  label = "",
}: {
  name?: string;
  size?: IconSize;
  color?: string;
  strokeWidth?: string;
  fill?: string;
  clickable?: boolean;
  label?: string;
} = {}): string {
  const iconPaths = name ? UiIcon.prototype._getIconPaths.call({ name }, name) : '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="M21 15.5l-3.09-3.09a2 2 0 0 0-2.83 0L14 13.5"></path>';
  const iconSvg = `<svg viewBox="0 0 24 24" fill="${fill || "none"}" stroke="currentColor" stroke-width="${strokeWidth || "2"}" stroke-linecap="round" stroke-linejoin="round">${iconPaths}</svg>`;
  
  return `
    <style>${iconCss}</style>
    ${templateHtml
      .replace(/{size}/g, size)
      .replace(/{clickable}/g, clickable ? "ui-icon--clickable" : "")
      .replace(/{color}/g, color ? `style="color: ${color}"` : "")
      .replace(/{tabindex}/g, clickable ? 'tabindex="0"' : "")
      .replace(/{role}/g, clickable ? 'role="button"' : "")
      .replace(/{aria-label}/g, label ? `aria-label="${label}"` : "")
      .replace(/{icon-svg}/g, iconSvg)}
  `;
}