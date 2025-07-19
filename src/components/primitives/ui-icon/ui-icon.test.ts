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
      expect(element.size).toBe('md');
      expect(element.label).toBe('');
    });

    it('should have proper shadow DOM structure', () => {
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement).toBeDefined();
      expect(iconElement?.classList.contains('ui-icon')).toBe(true);
      expect(iconElement?.getAttribute('data-size')).toBe('md');
      expect(iconElement?.tagName.toLowerCase()).toBe('div');
    });

    it('should have slot for content', () => {
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
    });

    it('should have aria-hidden by default when no label', () => {
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Size property', () => {
    it('should apply size attribute when size is set', () => {
      element.size = 'lg';
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('data-size')).toBe('lg');
    });

    it('should update size attribute when size changes', () => {
      element.size = 'sm';
      let iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('data-size')).toBe('sm');

      element.size = 'lg';
      iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('data-size')).toBe('lg');
    });

    it('should handle all size variants', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      
      for (const size of sizes) {
        element.size = size;
        const iconElement = element.shadowRoot?.querySelector('.ui-icon');
        expect(iconElement?.getAttribute('data-size')).toBe(size);
      }
    });
  });


  describe('Accessibility properties', () => {
    it('should set aria-label and role when label is provided', () => {
      element.label = 'Success icon';
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-label')).toBe('Success icon');
      expect(iconElement?.getAttribute('role')).toBe('img');
      expect(iconElement?.hasAttribute('aria-hidden')).toBe(false);
    });

    it('should set aria-hidden when no label is provided', () => {
      element.label = '';
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-hidden')).toBe('true');
      expect(iconElement?.hasAttribute('aria-label')).toBe(false);
      expect(iconElement?.hasAttribute('role')).toBe(false);
    });

    it('should update accessibility attributes when label changes', () => {
      element.label = 'Initial label';
      let iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-label')).toBe('Initial label');
      expect(iconElement?.getAttribute('role')).toBe('img');

      element.label = 'Updated label';
      iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-label')).toBe('Updated label');

      element.label = '';
      iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('aria-hidden')).toBe('true');
      expect(iconElement?.hasAttribute('aria-label')).toBe(false);
    });
  });

  describe('Attribute synchronization', () => {
    it('should sync size attribute', () => {
      element.size = 'lg';
      expect(element.getAttribute('size')).toBe('lg');
    });

    it('should sync label attribute', () => {
      element.label = 'Test label';
      expect(element.getAttribute('label')).toBe('Test label');
      
      element.label = '';
      expect(element.getAttribute('label')).toBe('');
    });

    it('should handle attribute changes', () => {
      element.setAttribute('size', 'lg');
      expect(element.size).toBe('lg');
      
      element.setAttribute('label', 'Add item');
      expect(element.label).toBe('Add item');
    });

    it('should handle attribute removal', () => {
      element.setAttribute('label', 'Test');
      element.removeAttribute('label');
      expect(element.label).toBe('');
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
    it('should handle default size fallback', () => {
      element.setAttribute('size', '');
      expect(element.size).toBe('md');
      
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.getAttribute('data-size')).toBe('md');
    });

    it('should maintain icon structure after multiple property changes', () => {
      element.size = 'lg';
      element.label = 'Success';
      
      element.size = 'sm';
      element.label = 'Error';
      
      const iconElement = element.shadowRoot?.querySelector('.ui-icon');
      expect(iconElement?.classList.contains('ui-icon')).toBe(true);
      expect(iconElement?.getAttribute('data-size')).toBe('sm');
      expect(iconElement?.getAttribute('aria-label')).toBe('Error');
    });
  });
});