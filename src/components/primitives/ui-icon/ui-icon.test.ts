import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-icon.ts';
import type { UiIcon } from './ui-icon.ts';

describe('ui-icon', () => {
  let element: UiIcon;
  let container: HTMLDivElement;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    element = document.createElement('ui-icon') as UiIcon;
    container.appendChild(element);
    
    // Wait for component to be fully initialized
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.name).toBe(null);
      expect(element.size).toBe('md');
      expect(element.ariaLabel).toBe(null);
    });

    it('should have proper shadow DOM structure', () => {
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement).toBeDefined();
      expect(iconElement?.classList.contains('ui-icon')).toBe(true);
      expect(iconElement?.classList.contains('ui-icon--md')).toBe(true);
      expect(iconElement?.tagName.toLowerCase()).toBe('span');
    });

    it('should have slot for content', () => {
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
    });

    it('should have aria-hidden by default when no aria-label', () => {
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Size property', () => {
    it('should apply size class when size is set', () => {
      element.size = 'lg';
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.classList.contains('ui-icon--lg')).toBe(true);
      expect(iconElement?.classList.contains('ui-icon--md')).toBe(false);
    });

    it('should update size class when size changes', () => {
      element.size = 'sm';
      let iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.classList.contains('ui-icon--sm')).toBe(true);

      element.size = 'xl';
      iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.classList.contains('ui-icon--xl')).toBe(true);
      expect(iconElement?.classList.contains('ui-icon--sm')).toBe(false);
    });

    it('should handle all size variants', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
      
      for (const size of sizes) {
        element.size = size;
        const iconElement = element.shadowRoot?.querySelector('.ui-icon');
        expect(iconElement?.classList.contains(`ui-icon--${size}`)).toBe(true);
      }
    });
  });

  describe('Name property and built-in icons', () => {
    it('should render built-in icon when name is set', () => {
      element.name = 'check';
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      const svg = iconElement?.querySelector('svg');
      expect(svg).toBeDefined();
      expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    });

    it('should render different built-in icons', () => {
      const iconNames = ['check', 'x', 'plus', 'minus', 'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'menu', 'mail', 'file'];
      
      for (const iconName of iconNames) {
        element.name = iconName;
        const iconElement = element.shadowRoot?.querySelector('.ui-icon');
        const svg = iconElement?.querySelector('svg');
        expect(svg).toBeDefined();
      }
    });

    it('should clear icon when name is set to null', () => {
      element.name = 'check';
      let iconElement = element.shadowRoot?.querySelector('.ui-icon');
      let svg = iconElement?.querySelector('svg');
      expect(svg).toBeDefined();

      element.name = null;
      iconElement = element.shadowRoot?.querySelector('.ui-icon');
      svg = iconElement?.querySelector('svg');
      expect(svg).toBe(null);
    });

    it('should handle unknown icon names gracefully', () => {
      element.name = 'unknown-icon';
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      const svg = iconElement?.querySelector('svg');
      expect(svg).toBe(null);
    });
  });

  describe('Accessibility properties', () => {
    it('should set aria-label and role when ariaLabel is provided', () => {
      element.ariaLabel = 'Success icon';
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-label')).toBe('Success icon');
      expect(iconElement?.getAttribute('role')).toBe('img');
      expect(iconElement?.hasAttribute('aria-hidden')).toBe(false);
    });

    it('should set aria-hidden when no ariaLabel is provided', () => {
      element.ariaLabel = null;
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-hidden')).toBe('true');
      expect(iconElement?.hasAttribute('aria-label')).toBe(false);
      expect(iconElement?.hasAttribute('role')).toBe(false);
    });

    it('should update accessibility attributes when ariaLabel changes', () => {
      element.ariaLabel = 'Initial label';
      let iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-label')).toBe('Initial label');
      expect(iconElement?.getAttribute('role')).toBe('img');

      element.ariaLabel = 'Updated label';
      iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-label')).toBe('Updated label');

      element.ariaLabel = null;
      iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-hidden')).toBe('true');
      expect(iconElement?.hasAttribute('aria-label')).toBe(false);
    });
  });

  describe('Attribute synchronization', () => {
    it('should sync name attribute', () => {
      element.name = 'check';
      expect(element.getAttribute('name')).toBe('check');
      
      element.name = null;
      expect(element.hasAttribute('name')).toBe(false);
    });

    it('should sync size attribute', () => {
      element.size = 'lg';
      expect(element.getAttribute('size')).toBe('lg');
    });

    it('should sync aria-label attribute', () => {
      element.ariaLabel = 'Test label';
      expect(element.getAttribute('aria-label')).toBe('Test label');
      
      element.ariaLabel = null;
      expect(element.hasAttribute('aria-label')).toBe(false);
    });

    it('should handle attribute changes', () => {
      element.setAttribute('name', 'plus');
      expect(element.name).toBe('plus');
      
      element.setAttribute('size', 'xl');
      expect(element.size).toBe('xl');
      
      element.setAttribute('aria-label', 'Add item');
      expect(element.ariaLabel).toBe('Add item');
    });

    it('should handle attribute removal', () => {
      element.setAttribute('name', 'check');
      element.removeAttribute('name');
      expect(element.name).toBe(null);
      
      element.setAttribute('aria-label', 'Test');
      element.removeAttribute('aria-label');
      expect(element.ariaLabel).toBe(null);
    });
  });

  describe('Slotted content', () => {
    it('should support custom SVG content via slot', async () => {
      // Add custom SVG content
      const customSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      customSvg.setAttribute('viewBox', '0 0 100 100');
      customSvg.innerHTML = '<circle cx="50" cy="50" r="40"/>';
      element.appendChild(customSvg);

      // Wait for slot assignment
      await new Promise(resolve => setTimeout(resolve, 0));

      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
      
      // Check that the element has the custom SVG as a child
      expect(element.children.length).toBe(1);
      expect(element.children[0]).toBe(customSvg);
      expect(element.children[0].getAttribute('viewBox')).toBe('0 0 100 100');
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle empty string name', () => {
      element.name = '';
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      const svg = iconElement?.querySelector('svg');
      expect(svg).toBe(null);
    });

    it('should handle default size fallback', () => {
      element.setAttribute('size', '');
      expect(element.size).toBe('md');
      
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.classList.contains('ui-icon--md')).toBe(true);
    });

    it('should maintain icon structure after multiple property changes', () => {
      element.name = 'check';
      element.size = 'lg';
      element.ariaLabel = 'Success';
      
      element.name = 'x';
      element.size = 'sm';
      element.ariaLabel = 'Error';
      
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.classList.contains('ui-icon')).toBe(true);
      expect(iconElement?.classList.contains('ui-icon--sm')).toBe(true);
      expect(iconElement?.getAttribute('aria-label')).toBe('Error');
      
      const svg = iconElement?.querySelector('svg');
      expect(svg).toBeDefined();
    });
  });
});