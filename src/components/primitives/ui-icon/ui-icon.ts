import { ShadowComponent } from "../../../core/ShadowComponent.js";
import iconCss from "./ui-icon.css?inline";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export class UiIcon extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["name", "size", "aria-label"];
  }

  private _name: string | null = null;
  private _size: IconSize = "md";
  private _ariaLabel: string | null = null;

  constructor() {
    super({ mode: "open" }, false);
  }

  get name(): string | null {
    return this._name;
  }
  set name(value: string | null) {
    this._name = value;
    if (value) {
      this.setAttributeSafe("name", value);
    } else {
      this.removeAttribute("name");
    }
    this.render();
  }

  get size(): IconSize {
    return this._size;
  }
  set size(value: IconSize) {
    this._size = value;
    this.setAttributeSafe("size", value);
    this.render();
  }

  get ariaLabel(): string | null {
    return this._ariaLabel;
  }
  set ariaLabel(value: string | null) {
    this._ariaLabel = value;
    if (value) {
      this.setAttributeSafe("aria-label", value);
    } else {
      this.removeAttribute("aria-label");
    }
    this.render();
  }

  protected onAttributeChange(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ): void {
    switch (name) {
      case "name":
        this._name = newValue;
        break;
      case "size":
        this._size = (newValue as IconSize) || "md";
        break;
      case "aria-label":
        this._ariaLabel = newValue;
        break;
    }
  }

  protected renderShadowContent(): void {
    const icon = document.createElement("span");
    icon.classList.add("ui-icon");
    icon.classList.add(`ui-icon--${this._size}`);
    
    if (this._ariaLabel) {
      icon.setAttribute("aria-label", this._ariaLabel);
      icon.setAttribute("role", "img");
    } else {
      icon.setAttribute("aria-hidden", "true");
    }

    // Add named icon if specified
    if (this._name) {
      const iconElement = this._createNamedIcon(this._name);
      if (iconElement) {
        icon.appendChild(iconElement);
      }
    }

    // Always add slot for custom content (takes priority over named icons)
    const slot = document.createElement("slot");
    icon.appendChild(slot);

    this.setContent(icon.outerHTML);
  }

  protected getStyles(): string {
    return iconCss;
  }

  private _createSvg(paths: string[], attributes: Record<string, string> = {}): SVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    // Set default attributes
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    
    // Override with custom attributes
    Object.entries(attributes).forEach(([key, value]) => {
      svg.setAttribute(key, value);
    });
    
    // Add paths/elements
    paths.forEach(pathData => {
      if (pathData.startsWith('<')) {
        // Handle complex elements like <line> or <polyline>
        const temp = document.createElement('div');
        temp.innerHTML = pathData;
        const element = temp.firstElementChild;
        if (element) {
          svg.appendChild(element);
        }
      } else {
        // Handle simple path data
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        svg.appendChild(path);
      }
    });
    
    return svg;
  }

  private _createNamedIcon(name: string): SVGElement | null {
    // Icon definitions with path data and optional custom attributes
    const iconDefinitions: Record<string, { paths: string[], attributes?: Record<string, string> }> = {
      // Directional icons - chevrons (subtle)
      "chevron-down": { paths: ["m6 9 6 6 6-6"] },
      "chevron-up": { paths: ["m18 15-6-6-6 6"] },
      "chevron-left": { paths: ["m15 18-6-6 6-6"] },
      "chevron-right": { paths: ["m9 18 6-6-6-6"] },
      
      // Directional icons - arrows (bolder)
      "arrow-up": { paths: ["m18 15-6-6-6 6"] },
      "arrow-down": { paths: ["m6 9 6 6 6-6"] },
      "arrow-left": { paths: ["m15 18-6-6 6-6"] },
      "arrow-right": { paths: ["m9 18 6-6-6-6"] },
      
      // Interface icons
      "menu": { 
        paths: [
          '<line x1="4" x2="20" y1="6" y2="6"/>',
          '<line x1="4" x2="20" y1="12" y2="12"/>',
          '<line x1="4" x2="20" y1="18" y2="18"/>'
        ]
      },
      "x": { 
        paths: [
          "m18 6-12 12",
          "m6 6 12 12"
        ]
      },
      
      // Action icons
      "check": { paths: ["M20 6 9 17l-5-5"] },
      "plus": { 
        paths: [
          "M5 12h14",
          "M12 5v14"
        ]
      },
      "minus": { paths: ["M5 12h14"] },
      
      // Content icons
      "mail": { 
        paths: [
          "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
          '<polyline points="22,6 12,13 2,6"/>'
        ]
      },
      "file": { 
        paths: [
          "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
          "M14 2v4a2 2 0 0 0 2 2h4"
        ]
      },
    };

    const iconDef = iconDefinitions[name];
    if (iconDef) {
      return this._createSvg(iconDef.paths, iconDef.attributes);
    }

    return null;
  }
}

customElements.define("ui-icon", UiIcon);