import { ShadowComponent } from "../../../core/ShadowComponent.js";
import imageCss from "./ui-image.css?inline";

type ImageFit = "contain" | "cover" | "fill" | "scale-down";

export class UiImage extends ShadowComponent {
  static get observedAttributes(): string[] {
    return ["src", "alt", "loading", "fit", "fallback"];
  }

  private _src = "";
  private _alt = "";
  private _loading: "lazy" | "eager" = "lazy";
  private _fit: ImageFit = "cover";
  private _fallback = "";
  private _hasError = false;

  constructor() {
    super({ mode: "open" }, false);
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
        break;
      case "alt":
        this._alt = newValue || "";
        break;
      case "loading":
        this._loading = (newValue as "lazy" | "eager") || "lazy";
        break;
      case "fit":
        this._fit = (newValue as ImageFit) || "cover";
        break;
      case "fallback":
        this._fallback = newValue || "";
        break;
    }
    this.render();
  }

  protected renderShadowContent(): void {
    const currentSrc = this._hasError && this._fallback ? this._fallback : this._src;
    
    if (!currentSrc) {
      this.setContent('');
      return;
    }

    this.setContent(this._getTemplate(currentSrc));
    this._setupEventListeners();
  }

  private _getTemplate(src: string): string {
    return `<img class="ui-image__img" src="${src}" alt="${this._alt}" loading="${this._loading}" data-fit="${this._fit}">`;
  }

  protected getStyles(): string {
    return imageCss;
  }

  private _setupEventListeners(): void {
    const img = this.shadowQuerySelector(".ui-image__img") as HTMLImageElement;
    if (img) {
      this.addManagedEventListener(img, "error", this._handleError);
    }
  }

  private _handleError(): void {
    if (!this._hasError && this._fallback) {
      this._hasError = true;
      this.render();
    }
  }
}

customElements.define("ui-image", UiImage);