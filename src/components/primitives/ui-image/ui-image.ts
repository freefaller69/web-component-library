import { ShadowComponent } from "../../../core/ShadowComponent.js";
import imageCss from "./ui-image.css?inline";

export interface UiImageEventDetail {
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    "ui-image-load": CustomEvent<UiImageEventDetail>;
    "ui-image-error": CustomEvent<UiImageEventDetail>;
  }
}

type ImageFit = "contain" | "cover" | "fill" | "scale-down";

export class UiImage extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["src", "alt", "loading", "decoding", "srcset", "sizes", "fit", "fallback"];
  }

  private _src = "";
  private _alt = "";
  private _loading: "lazy" | "eager" = "lazy";
  private _decoding: "async" | "auto" | "sync" = "async";
  private _srcset = "";
  private _sizes = "";
  private _fit: ImageFit = "cover";
  private _fallback = "";
  private _hasError = false;

  constructor() {
    super({ mode: "open" }, false); // Use direct shadow DOM without wrapper
    this._handleLoad = this._handleLoad.bind(this);
    this._handleError = this._handleError.bind(this);
  }

  get src(): string { return this._src; }
  set src(value: string) {
    this._src = value;
    this.setAttributeSafe("src", value);
    this._hasError = false;
    this.render();
  }

  get alt(): string { return this._alt; }
  set alt(value: string) {
    this._alt = value;
    this.setAttributeSafe("alt", value);
    this.render();
  }

  get loading(): "lazy" | "eager" { return this._loading; }
  set loading(value: "lazy" | "eager") {
    this._loading = value;
    this.setAttributeSafe("loading", value);
    this.render();
  }

  get decoding(): "async" | "auto" | "sync" { return this._decoding; }
  set decoding(value: "async" | "auto" | "sync") {
    this._decoding = value;
    this.setAttributeSafe("decoding", value);
    this.render();
  }

  get srcset(): string { return this._srcset; }
  set srcset(value: string) {
    this._srcset = value;
    this.setAttributeSafe("srcset", value);
    this.render();
  }

  get sizes(): string { return this._sizes; }
  set sizes(value: string) {
    this._sizes = value;
    this.setAttributeSafe("sizes", value);
    this.render();
  }

  get fit(): ImageFit { return this._fit; }
  set fit(value: ImageFit) {
    this._fit = value;
    this.setAttributeSafe("fit", value);
    this.render();
  }

  get fallback(): string { return this._fallback; }
  set fallback(value: string) {
    this._fallback = value;
    this.setAttributeSafe("fallback", value);
    this.render();
  }

  protected onAttributeChange(name: string, _oldValue: string | null, newValue: string | null): void {
    switch (name) {
      case "src":
        this._src = newValue || "";
        this._hasError = false;
        this.render();
        break;
      case "alt":
        this._alt = newValue || "";
        this.render();
        break;
      case "loading":
        this._loading = (newValue as "lazy" | "eager") || "lazy";
        this.render();
        break;
      case "decoding":
        this._decoding = (newValue as "async" | "auto" | "sync") || "async";
        this.render();
        break;
      case "srcset":
        this._srcset = newValue || "";
        this.render();
        break;
      case "sizes":
        this._sizes = newValue || "";
        this.render();
        break;
      case "fit":
        this._fit = (newValue as ImageFit) || "cover";
        this.render();
        break;
      case "fallback":
        this._fallback = newValue || "";
        this.render();
        break;
    }
  }

  protected renderShadowContent(): void {
    const currentSrc = this._hasError && this._fallback ? this._fallback : this._src;
    
    if (currentSrc) {
      const img = document.createElement("img");
      img.classList.add("ui-image__img");
      img.src = currentSrc;
      img.alt = this._alt;
      img.setAttribute('loading', this._loading);
      img.setAttribute('decoding', this._decoding);
      
      // Set data-fit attribute for CSS styling
      img.setAttribute('data-fit', this._fit);
      
      if (this._srcset && !this._hasError) {
        img.srcset = this._srcset;
      }
      if (this._sizes && !this._hasError) {
        img.sizes = this._sizes;
      }

      // Set just the img element directly in shadow root
      this.setContent(img.outerHTML);
    } else {
      // No image source, just show empty container
      this.setContent('');
    }

    this._setupEventListeners();
  }

  protected getStyles(): string {
    return imageCss;
  }

  private _setupEventListeners(): void {
    const img = this.shadowQuerySelector(".ui-image__img") as HTMLImageElement;
    if (img) {
      this.addManagedEventListener(img, "load", this._handleLoad);
      this.addManagedEventListener(img, "error", this._handleError);
    }
  }

  private _handleLoad(event: Event): void {
    this.dispatchEvent(
      new CustomEvent("ui-image-load", {
        detail: { originalEvent: event },
        bubbles: true,
        cancelable: true,
      })
    );
  }

  private _handleError(event: Event): void {
    if (!this._hasError && this._fallback) {
      this._hasError = true;
      this.render();
    }
    
    this.dispatchEvent(
      new CustomEvent("ui-image-error", {
        detail: { originalEvent: event },
        bubbles: true,
        cancelable: true,
      })
    );
  }
}

customElements.define("ui-image", UiImage);