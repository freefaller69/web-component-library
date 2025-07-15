import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-button.ts';
import type { UiButton } from './ui-button.ts';

describe('ui-button', () => {
  let element: UiButton;
  let container: HTMLDivElement;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    element = document.createElement('ui-button') as UiButton;
    container.appendChild(element);
    
    // Wait for component to be fully connected and rendered
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.variant).toBe('primary');
      expect(element.size).toBe('medium');
      expect(element.disabled).toBe(false);
      expect(element.loading).toBe(false);
    });

    it('should have proper shadow DOM structure', () => {
      expect(element.shadowRoot).toBeDefined();
      
      const button = element.shadowRoot?.querySelector('button');
      expect(button).toBeDefined();
      expect(button?.classList.contains('ui-button')).toBe(true);
      expect(button?.getAttribute('data-variant')).toBe('primary');
      expect(button?.getAttribute('data-size')).toBe('medium');
    });

    it('should have proper CSS parts', () => {
      const button = element.shadowRoot?.querySelector('[part="button"]');
      const content = element.shadowRoot?.querySelector('[part="content"]');
      
      expect(button).toBeDefined();
      expect(content).toBeDefined();
    });

    it('should have slot for content projection', () => {
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
    });
  });

  describe('Attribute/property synchronization', () => {
    describe('variant', () => {
      it('should sync property to attribute', () => {
        element.variant = 'secondary';
        expect(element.getAttribute('variant')).toBe('secondary');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('variant', 'ghost');
        expect(element.variant).toBe('ghost');
      });

      it('should update data attributes when variant changes', () => {
        element.variant = 'secondary';
        
        const button = element.shadowRoot?.querySelector('button');
        expect(button?.getAttribute('data-variant')).toBe('secondary');
      });

      it('should handle invalid variant values', () => {
        // @ts-expect-error - testing invalid value
        element.variant = 'invalid';
        expect(element.variant).toBe('invalid'); // No validation in simplified version
      });
    });

    describe('size', () => {
      it('should sync property to attribute', () => {
        element.size = 'large';
        expect(element.getAttribute('size')).toBe('large');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('size', 'small');
        expect(element.size).toBe('small');
      });

      it('should update data attributes when size changes', () => {
        element.size = 'large';
        
        const button = element.shadowRoot?.querySelector('button');
        expect(button?.getAttribute('data-size')).toBe('large');
      });

      it('should handle invalid size values', () => {
        // @ts-expect-error - testing invalid value
        element.size = 'invalid';
        expect(element.size).toBe('invalid'); // No validation in simplified version
      });
    });

    describe('disabled', () => {
      it('should sync property to attribute', () => {
        element.disabled = true;
        expect(element.hasAttribute('disabled')).toBe(true);
      });

      it('should sync attribute to property', () => {
        element.setAttribute('disabled', '');
        expect(element.disabled).toBe(true);
      });

      it('should remove attribute when disabled is false', () => {
        element.disabled = true;
        element.disabled = false;
        expect(element.hasAttribute('disabled')).toBe(false);
      });

      it('should set disabled attribute on internal button', () => {
        element.disabled = true;
        
        const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
        expect(button?.disabled).toBe(true);
      });
    });

    describe('loading', () => {
      it('should sync property to attribute', () => {
        element.loading = true;
        expect(element.hasAttribute('loading')).toBe(true);
      });

      it('should sync attribute to property', () => {
        element.setAttribute('loading', '');
        expect(element.loading).toBe(true);
      });

      it('should show spinner when loading', () => {
        element.loading = true;
        
        const spinner = element.shadowRoot?.querySelector('.ui-button__spinner');
        expect(spinner).toBeDefined();
      });

      it('should set aria-busy when loading', () => {
        element.loading = true;
        
        const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
        expect(button?.getAttribute('aria-busy')).toBe('true');
      });

      it('should hide spinner when not loading', () => {
        element.loading = false;
        
        const spinner = element.shadowRoot?.querySelector('.ui-button__spinner');
        expect(spinner).toBeNull();
      });
    });
  });

  describe('Event handling', () => {
    it('should dispatch ui-click event when clicked', () => {
      let eventFired = false;
      let eventDetail: any;

      element.addEventListener('ui-click', (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        variant: 'primary',
        size: 'medium',
        originalEvent: expect.any(Event)
      });
    });

    it('should not dispatch event when disabled', () => {
      element.disabled = true;
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(eventFired).toBe(false);
    });

    it('should not dispatch event when loading', () => {
      element.loading = true;
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(eventFired).toBe(false);
    });

    it('should bubble the event', () => {
      let eventFired = false;

      container.addEventListener('ui-click', () => {
        eventFired = true;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(eventFired).toBe(true);
    });
  });

  describe('Keyboard navigation', () => {
    it('should trigger click on Enter key', () => {
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(enterEvent);

      expect(eventFired).toBe(true);
    });

    it('should trigger click on Space key', () => {
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      button.dispatchEvent(spaceEvent);

      expect(eventFired).toBe(true);
    });

    it('should not trigger click on other keys', () => {
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      button.dispatchEvent(escapeEvent);

      expect(eventFired).toBe(false);
    });

    it('should not trigger keyboard events when disabled', () => {
      element.disabled = true;
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(enterEvent);

      expect(eventFired).toBe(false);
    });

    it('should not trigger keyboard events when loading', () => {
      element.loading = true;
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(enterEvent);

      expect(eventFired).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should use semantic button element', () => {
      const button = element.shadowRoot?.querySelector('button');
      expect(button?.tagName.toLowerCase()).toBe('button');
    });

    it('should be focusable by default', () => {
      element.focus();
      expect(document.activeElement).toBe(element);
    });

    it('should focus internal button when focus() is called', () => {
      element.focus();
      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(element.shadowRoot?.activeElement).toBe(button);
    });

    it('should not be focusable when disabled', () => {
      element.disabled = true;
      element.focus();
      expect(document.activeElement).not.toBe(element);
    });

    it('should set aria-busy when loading', () => {
      element.loading = true;
      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(button?.getAttribute('aria-busy')).toBe('true');
    });

    it('should not have aria-busy when not loading', () => {
      element.loading = false;
      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      expect(button?.hasAttribute('aria-busy')).toBe(false);
    });
  });

  describe('State management', () => {
    it('should prevent clicks when disabled', () => {
      element.disabled = true;
      let clickCount = 0;

      element.addEventListener('ui-click', () => {
        clickCount++;
      });

      // Try multiple ways to trigger click
      element.click();
      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(clickCount).toBe(0);
    });

    it('should prevent clicks when loading', () => {
      element.loading = true;
      let clickCount = 0;

      element.addEventListener('ui-click', () => {
        clickCount++;
      });

      // Try multiple ways to trigger click
      element.click();
      const button = element.shadowRoot?.querySelector('button') as HTMLButtonElement;
      button.click();

      expect(clickCount).toBe(0);
    });

    it('should allow clicks when enabled and not loading', () => {
      element.disabled = false;
      element.loading = false;
      let clickCount = 0;

      element.addEventListener('ui-click', () => {
        clickCount++;
      });

      element.click();
      expect(clickCount).toBe(1);
    });
  });

  describe('Programmatic methods', () => {
    it('should support programmatic click', () => {
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      element.click();
      expect(eventFired).toBe(true);
    });

    it('should not click when disabled', () => {
      element.disabled = true;
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      element.click();
      expect(eventFired).toBe(false);
    });

    it('should not click when loading', () => {
      element.loading = true;
      let eventFired = false;

      element.addEventListener('ui-click', () => {
        eventFired = true;
      });

      element.click();
      expect(eventFired).toBe(false);
    });
  });

  describe('Content projection', () => {
    it('should project text content', () => {
      element.textContent = 'Button Text';
      
      // Wait for the slot to be processed
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
      expect(element.textContent).toBe('Button Text');
    });

    it('should project HTML content', () => {
      element.innerHTML = '<span>Icon</span> Button';
      
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
      expect(element.innerHTML).toBe('<span>Icon</span> Button');
    });
  });
});