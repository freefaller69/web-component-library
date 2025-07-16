// Export core base classes
export { BaseComponent, ShadowComponent } from './core/index.js';

// Export all components
export { Button } from './components/Button/Button';
export { Header } from './components/Header/Header';

// Export web components
export { UiBox } from './components/primitives/ui-box/index.js';
export { UiButton } from './components/primitives/ui-button/index.js';
export { UiIcon } from './components/primitives/ui-icon/index.js';
export { UiImage } from './components/primitives/ui-image/index.js';
export { UiText } from './components/primitives/ui-text/index.js';

// Export types if needed
export type { ButtonProps } from './components/Button/Button';
export type { HeaderProps } from './components/Header/Header';
export type { UiImageEventDetail } from './components/primitives/ui-image/index.js';