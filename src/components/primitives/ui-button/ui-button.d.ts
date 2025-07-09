import { ShadowComponent } from '../../../core/ShadowComponent.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-button': UiButtonAttributes;
    }
  }
}

interface UiButtonAttributes {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  'aria-label'?: string;
}

export class UiButton extends ShadowComponent {
  static readonly observedAttributes: string[];
  
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  loading: boolean;
  
  constructor();
  
  focus(): void;
  blur(): void;
  click(): void;
}

export interface UiButtonEventDetail {
  variant: string;
  size: string;
  originalEvent: Event;
}

declare global {
  interface HTMLElementEventMap {
    'ui-click': CustomEvent<UiButtonEventDetail>;
  }
}