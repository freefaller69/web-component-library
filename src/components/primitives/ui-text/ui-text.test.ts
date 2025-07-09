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
    
    // Wait for component to be fully connected and rendered
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.variant).toBe('body');
      expect(element.size).toBe('md');
      expect(element.weight).toBe('normal');
      expect(element.truncate).toBe(false);
      expect(element.color).toBe('');
      expect(element.align).toBe('left');
      expect(element.clickable).toBe(false);
    });

    it('should have proper shadow DOM structure', () => {
      expect(element.shadowRoot).toBeDefined();
      
      const textElement = element.shadowRoot?.querySelector('span');
      expect(textElement).toBeDefined();
      expect(textElement?.classList.contains('ui-text')).toBe(true);
      expect(textElement?.classList.contains('ui-text--body')).toBe(true);
      expect(textElement?.classList.contains('ui-text--md')).toBe(true);
      expect(textElement?.classList.contains('ui-text--normal')).toBe(true);
      expect(textElement?.classList.contains('ui-text--left')).toBe(true);
    });

    it('should have proper CSS parts', () => {
      const textElement = element.shadowRoot?.querySelector('[part="text"]');
      expect(textElement).toBeDefined();
    });

    it('should have slot for content projection', () => {
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
    });
  });

  describe('Attribute/property synchronization', () => {
    describe('variant', () => {
      it('should sync property to attribute', () => {
        element.variant = 'heading';
        expect(element.getAttribute('variant')).toBe('heading');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('variant', 'caption');
        expect(element.variant).toBe('caption');
      });

      it('should update CSS classes when variant changes', () => {
        element.variant = 'heading';
        
        const textElement = element.shadowRoot?.querySelector('span');
        expect(textElement?.classList.contains('ui-text--heading')).toBe(true);
        expect(textElement?.classList.contains('ui-text--body')).toBe(false);
      });

      it('should handle invalid variant values', () => {
        const originalVariant = element.variant;
        // @ts-expect-error - testing invalid value
        element.variant = 'invalid';
        expect(element.variant).toBe(originalVariant);
      });
    });

    describe('size', () => {
      it('should sync property to attribute', () => {
        element.size = 'xl';
        expect(element.getAttribute('size')).toBe('xl');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('size', 'sm');
        expect(element.size).toBe('sm');
      });

      it('should update CSS classes when size changes', () => {
        element.size = 'xl';
        
        const textElement = element.shadowRoot?.querySelector('span');
        expect(textElement?.classList.contains('ui-text--xl')).toBe(true);
        expect(textElement?.classList.contains('ui-text--md')).toBe(false);
      });

      it('should handle invalid size values', () => {
        const originalSize = element.size;
        // @ts-expect-error - testing invalid value
        element.size = 'invalid';
        expect(element.size).toBe(originalSize);
      });
    });

    describe('weight', () => {
      it('should sync property to attribute', () => {
        element.weight = 'bold';
        expect(element.getAttribute('weight')).toBe('bold');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('weight', 'medium');
        expect(element.weight).toBe('medium');
      });

      it('should update CSS classes when weight changes', () => {
        element.weight = 'bold';
        
        const textElement = element.shadowRoot?.querySelector('span');
        expect(textElement?.classList.contains('ui-text--bold')).toBe(true);
        expect(textElement?.classList.contains('ui-text--normal')).toBe(false);
      });

      it('should handle invalid weight values', () => {
        const originalWeight = element.weight;
        // @ts-expect-error - testing invalid value
        element.weight = 'invalid';
        expect(element.weight).toBe(originalWeight);
      });
    });

    describe('truncate', () => {
      it('should sync property to attribute', () => {
        element.truncate = true;
        expect(element.hasAttribute('truncate')).toBe(true);
      });

      it('should sync attribute to property', () => {
        element.setAttribute('truncate', '');
        expect(element.truncate).toBe(true);
      });

      it('should remove attribute when truncate is false', () => {
        element.truncate = true;
        element.truncate = false;
        expect(element.hasAttribute('truncate')).toBe(false);
      });

      it('should add truncate class when enabled', () => {
        element.truncate = true;
        
        const textElement = element.shadowRoot?.querySelector('span');
        expect(textElement?.classList.contains('ui-text--truncate')).toBe(true);
      });
    });

    describe('color', () => {
      it('should sync property to attribute', () => {
        element.color = 'hsl(0, 100%, 50%)';
        expect(element.getAttribute('color')).toBe('hsl(0, 100%, 50%)');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('color', 'hsl(120, 100%, 50%)');
        expect(element.color).toBe('hsl(120, 100%, 50%)');
      });

      it('should apply inline style when color is set', () => {
        element.color = 'hsl(0, 100%, 50%)';
        
        const textElement = element.shadowRoot?.querySelector('span');
        expect(textElement?.getAttribute('style')).toContain('color: hsl(0, 100%, 50%)');
      });
    });

    describe('align', () => {
      it('should sync property to attribute', () => {
        element.align = 'center';
        expect(element.getAttribute('align')).toBe('center');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('align', 'right');
        expect(element.align).toBe('right');
      });

      it('should update CSS classes when align changes', () => {
        element.align = 'center';
        
        const textElement = element.shadowRoot?.querySelector('span');
        expect(textElement?.classList.contains('ui-text--center')).toBe(true);
        expect(textElement?.classList.contains('ui-text--left')).toBe(false);
      });

      it('should handle invalid align values', () => {
        const originalAlign = element.align;
        // @ts-expect-error - testing invalid value
        element.align = 'invalid';
        expect(element.align).toBe(originalAlign);
      });
    });

    describe('clickable', () => {
      it('should sync property to attribute', () => {
        element.clickable = true;
        expect(element.hasAttribute('clickable')).toBe(true);
      });

      it('should sync attribute to property', () => {
        element.setAttribute('clickable', '');
        expect(element.clickable).toBe(true);
      });

      it('should add clickable class when enabled', () => {
        element.clickable = true;
        
        const textElement = element.shadowRoot?.querySelector('span');
        expect(textElement?.classList.contains('ui-text--clickable')).toBe(true);
      });

      it('should add tabindex and role when clickable', () => {
        element.clickable = true;
        
        const textElement = element.shadowRoot?.querySelector('span');
        expect(textElement?.getAttribute('tabindex')).toBe('0');
        expect(textElement?.getAttribute('role')).toBe('button');
      });
    });
  });

  describe('Event handling', () => {
    it('should dispatch ui-text-click event when clicked and clickable', () => {
      element.clickable = true;
      let eventFired = false;
      let eventDetail: any;

      element.addEventListener('ui-text-click', (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      });

      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      textElement.click();

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        variant: 'body',
        size: 'md',
        originalEvent: expect.any(Event)
      });
    });

    it('should not dispatch event when not clickable', () => {
      element.clickable = false;
      let eventFired = false;

      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });

      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      textElement.click();

      expect(eventFired).toBe(false);
    });

    it('should bubble the event', () => {
      element.clickable = true;
      let eventFired = false;

      container.addEventListener('ui-text-click', () => {
        eventFired = true;
      });

      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      textElement.click();

      expect(eventFired).toBe(true);
    });
  });

  describe('Keyboard navigation', () => {
    it('should trigger click on Enter key when clickable', () => {
      element.clickable = true;
      let eventFired = false;

      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });

      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      textElement.dispatchEvent(enterEvent);

      expect(eventFired).toBe(true);
    });

    it('should trigger click on Space key when clickable', () => {
      element.clickable = true;
      let eventFired = false;

      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });

      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      textElement.dispatchEvent(spaceEvent);

      expect(eventFired).toBe(true);
    });

    it('should not trigger click on other keys', () => {
      element.clickable = true;
      let eventFired = false;

      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });

      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      textElement.dispatchEvent(escapeEvent);

      expect(eventFired).toBe(false);
    });

    it('should not trigger keyboard events when not clickable', () => {
      element.clickable = false;
      let eventFired = false;

      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });

      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      textElement.dispatchEvent(enterEvent);

      expect(eventFired).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should use semantic span element', () => {
      const textElement = element.shadowRoot?.querySelector('span');
      expect(textElement?.tagName.toLowerCase()).toBe('span');
    });

    it('should be focusable when clickable', () => {
      element.clickable = true;
      element.focus();
      expect(document.activeElement).toBe(element);
    });

    it('should focus internal element when focus() is called and clickable', () => {
      element.clickable = true;
      element.focus();
      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      expect(element.shadowRoot?.activeElement).toBe(textElement);
    });

    it('should not be focusable when not clickable', () => {
      element.clickable = false;
      element.focus();
      expect(document.activeElement).not.toBe(element);
    });

    it('should have button role when clickable', () => {
      element.clickable = true;
      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      expect(textElement?.getAttribute('role')).toBe('button');
    });

    it('should have tabindex when clickable', () => {
      element.clickable = true;
      const textElement = element.shadowRoot?.querySelector('span') as HTMLSpanElement;
      expect(textElement?.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Programmatic methods', () => {
    it('should support programmatic click when clickable', () => {
      element.clickable = true;
      let eventFired = false;

      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });

      element.click();
      expect(eventFired).toBe(true);
    });

    it('should not click when not clickable', () => {
      element.clickable = false;
      let eventFired = false;

      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });

      element.click();
      expect(eventFired).toBe(false);
    });
  });

  describe('Content projection', () => {
    it('should project text content', () => {
      element.textContent = 'Hello World';
      
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
      expect(element.textContent).toBe('Hello World');
    });

    it('should project HTML content', () => {
      element.innerHTML = '<strong>Bold</strong> text';
      
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
      expect(element.innerHTML).toBe('<strong>Bold</strong> text');
    });
  });

  describe('Variant-specific behavior', () => {
    it('should render heading variant correctly', () => {
      element.variant = 'heading';
      
      const textElement = element.shadowRoot?.querySelector('span');
      expect(textElement?.classList.contains('ui-text--heading')).toBe(true);
    });

    it('should render link variant correctly', () => {
      element.variant = 'link';
      
      const textElement = element.shadowRoot?.querySelector('span');
      expect(textElement?.classList.contains('ui-text--link')).toBe(true);
    });

    it('should render caption variant correctly', () => {
      element.variant = 'caption';
      
      const textElement = element.shadowRoot?.querySelector('span');
      expect(textElement?.classList.contains('ui-text--caption')).toBe(true);
    });

    it('should render label variant correctly', () => {
      element.variant = 'label';
      
      const textElement = element.shadowRoot?.querySelector('span');
      expect(textElement?.classList.contains('ui-text--label')).toBe(true);
    });
  });
});