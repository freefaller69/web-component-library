import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-text.ts';
import type { UiText } from './ui-text.ts';

describe('ui-text', () => {
  let element: UiText;
  let container: HTMLDivElement;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    element = document.createElement('ui-text') as UiText;
    container.appendChild(element);
    
    // Wait for component to be fully initialized
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.as).toBe('p');
      expect(element.size).toBe(null);
    });

    it('should have proper shadow DOM structure with p element', () => {
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement).toBeDefined();
      expect(textElement?.classList.contains('ui-text')).toBe(true);
      expect(textElement?.tagName.toLowerCase()).toBe('p');
    });

    it('should have slot for content', () => {
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
    });
  });

  describe('Semantic HTML elements', () => {
    it('should render h1 element when as="h1"', () => {
      element.as = 'h1';
      const h1Element = element.shadowRoot?.querySelector('h1');
      expect(h1Element).toBeDefined();
      expect(h1Element?.classList.contains('ui-text')).toBe(true);
    });

    it('should render h2 element when as="h2"', () => {
      element.as = 'h2';
      const h2Element = element.shadowRoot?.querySelector('h2');
      expect(h2Element).toBeDefined();
      expect(h2Element?.classList.contains('ui-text')).toBe(true);
    });

    it('should render h3 element when as="h3"', () => {
      element.as = 'h3';
      const h3Element = element.shadowRoot?.querySelector('h3');
      expect(h3Element).toBeDefined();
      expect(h3Element?.classList.contains('ui-text')).toBe(true);
    });

    it('should render h4 element when as="h4"', () => {
      element.as = 'h4';
      const h4Element = element.shadowRoot?.querySelector('h4');
      expect(h4Element).toBeDefined();
      expect(h4Element?.classList.contains('ui-text')).toBe(true);
    });

    it('should render h5 element when as="h5"', () => {
      element.as = 'h5';
      const h5Element = element.shadowRoot?.querySelector('h5');
      expect(h5Element).toBeDefined();
      expect(h5Element?.classList.contains('ui-text')).toBe(true);
    });

    it('should render h6 element when as="h6"', () => {
      element.as = 'h6';
      const h6Element = element.shadowRoot?.querySelector('h6');
      expect(h6Element).toBeDefined();
      expect(h6Element?.classList.contains('ui-text')).toBe(true);
    });

    it('should render p element when as="p"', () => {
      element.as = 'p';
      const pElement = element.shadowRoot?.querySelector('p');
      expect(pElement).toBeDefined();
      expect(pElement?.classList.contains('ui-text')).toBe(true);
    });

    it('should render strong element when as="strong"', () => {
      element.as = 'strong';
      const strongElement = element.shadowRoot?.querySelector('strong');
      expect(strongElement).toBeDefined();
      expect(strongElement?.classList.contains('ui-text')).toBe(true);
    });

    it('should render em element when as="em"', () => {
      element.as = 'em';
      const emElement = element.shadowRoot?.querySelector('em');
      expect(emElement).toBeDefined();
      expect(emElement?.classList.contains('ui-text')).toBe(true);
    });

    it('should render small element when as="small"', () => {
      element.as = 'small';
      const smallElement = element.shadowRoot?.querySelector('small');
      expect(smallElement).toBeDefined();
      expect(smallElement?.classList.contains('ui-text')).toBe(true);
    });

    it('should render code element when as="code"', () => {
      element.as = 'code';
      const codeElement = element.shadowRoot?.querySelector('code');
      expect(codeElement).toBeDefined();
      expect(codeElement?.classList.contains('ui-text')).toBe(true);
    });
  });

  describe('Size property', () => {
    it('should apply size class when size is set', () => {
      element.size = 'lg';
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.classList.contains('ui-text--lg')).toBe(true);
    });

    it('should not apply size class when size is null', () => {
      element.size = null;
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.className).toBe('ui-text');
    });

    it('should update size class when size changes', () => {
      element.size = 'sm';
      let textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.classList.contains('ui-text--sm')).toBe(true);

      element.size = 'xl';
      textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.classList.contains('ui-text--xl')).toBe(true);
      expect(textElement?.classList.contains('ui-text--sm')).toBe(false);
    });
  });

  describe('Attribute synchronization', () => {
    it('should sync as attribute', () => {
      element.as = 'h1';
      expect(element.getAttribute('as')).toBe('h1');
    });

    it('should sync size attribute', () => {
      element.size = 'lg';
      expect(element.getAttribute('size')).toBe('lg');
      
      element.size = null;
      expect(element.hasAttribute('size')).toBe(false);
    });

    it('should handle attribute changes', () => {
      element.setAttribute('as', 'h2');
      expect(element.as).toBe('h2');
      
      element.setAttribute('size', 'xl');
      expect(element.size).toBe('xl');
    });
  });
});