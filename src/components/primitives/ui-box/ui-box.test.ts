import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-box.ts';
import type { UiBox } from './ui-box.ts';

describe('ui-box', () => {
  let element: UiBox;
  let container: HTMLDivElement;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    element = document.createElement('ui-box') as UiBox;
    container.appendChild(element);
    
    // Wait for component to be fully connected and rendered
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.padding).toBe(null);
      expect(element.radius).toBe(null);
      expect(element.shadow).toBe(null);
      expect(element.clickable).toBe(false);
    });

    it('should have proper shadow DOM structure', () => {
      expect(element.shadowRoot).toBeDefined();
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement).toBeDefined();
      expect(boxElement?.classList.contains('ui-box')).toBe(true);
    });

    it('should have slot for content projection', () => {
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
    });
  });

  describe('Attribute/property synchronization', () => {
    describe('padding', () => {
      it('should sync property to attribute', () => {
        element.padding = 'md';
        expect(element.getAttribute('padding')).toBe('md');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('padding', 'lg');
        expect(element.padding).toBe('lg');
      });

      it('should update data attribute when padding changes', () => {
        element.padding = 'sm';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('data-padding')).toBe('sm');
      });

      it('should handle null padding values', () => {
        element.padding = 'md';
        element.padding = null;
        expect(element.padding).toBe(null);
        expect(element.hasAttribute('padding')).toBe(false);
      });
    });

    describe('radius', () => {
      it('should sync property to attribute', () => {
        element.radius = 'lg';
        expect(element.getAttribute('radius')).toBe('lg');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('radius', 'xl');
        expect(element.radius).toBe('xl');
      });

      it('should update data attribute when radius changes', () => {
        element.radius = 'md';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('data-radius')).toBe('md');
      });
    });

    describe('shadow', () => {
      it('should sync property to attribute', () => {
        element.shadow = 'lg';
        expect(element.getAttribute('shadow')).toBe('lg');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('shadow', 'xl');
        expect(element.shadow).toBe('xl');
      });

      it('should update data attribute when shadow changes', () => {
        element.shadow = 'md';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('data-shadow')).toBe('md');
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

      it('should add data attribute when clickable', () => {
        element.clickable = true;
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('data-clickable')).toBe('true');
      });

      it('should add tabindex and role when clickable', () => {
        element.clickable = true;
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('tabindex')).toBe('0');
        expect(boxElement?.getAttribute('role')).toBe('button');
      });
    });
  });

  describe('Event handling', () => {
    it('should dispatch ui-box-click event when clicked and clickable', () => {
      element.clickable = true;
      
      let eventFired = false;
      let eventDetail: any = null;
      
      element.addEventListener('ui-box-click', (e: any) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      boxElement.click();
      
      expect(eventFired).toBe(true);
      expect(eventDetail).toBeDefined();
      expect(eventDetail.originalEvent).toBeDefined();
    });

    it('should not dispatch event when not clickable', () => {
      element.clickable = false;
      
      let eventFired = false;
      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      boxElement.click();
      
      expect(eventFired).toBe(false);
    });

    it('should bubble the event', () => {
      element.clickable = true;
      
      let eventFired = false;
      container.addEventListener('ui-box-click', () => {
        eventFired = true;
      });
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      boxElement.click();
      
      expect(eventFired).toBe(true);
    });
  });

  describe('Keyboard navigation', () => {
    it('should trigger click on Enter key when clickable', () => {
      element.clickable = true;
      
      let eventFired = false;
      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      boxElement.dispatchEvent(enterEvent);
      
      expect(eventFired).toBe(true);
    });

    it('should trigger click on Space key when clickable', () => {
      element.clickable = true;
      
      let eventFired = false;
      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      boxElement.dispatchEvent(spaceEvent);
      
      expect(eventFired).toBe(true);
    });

    it('should not trigger click on other keys', () => {
      element.clickable = true;
      
      let eventFired = false;
      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      boxElement.dispatchEvent(escEvent);
      
      expect(eventFired).toBe(false);
    });

    it('should not trigger keyboard events when not clickable', () => {
      element.clickable = false;
      
      let eventFired = false;
      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      boxElement.dispatchEvent(enterEvent);
      
      expect(eventFired).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should use semantic div element', () => {
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement?.tagName.toLowerCase()).toBe('div');
    });

    it('should be focusable when clickable', () => {
      element.clickable = true;
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      expect(boxElement.tabIndex).toBe(0);
    });

    it('should focus internal element when focus() is called and clickable', () => {
      element.clickable = true;
      element.focus();
      
      expect(document.activeElement).toBe(element);
    });

    it('should not be focusable when not clickable', () => {
      element.clickable = false;
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLElement;
      expect(boxElement.hasAttribute('tabindex')).toBe(false);
    });

    it('should have button role when clickable', () => {
      element.clickable = true;
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement?.getAttribute('role')).toBe('button');
    });

    it('should have tabindex when clickable', () => {
      element.clickable = true;
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement?.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Programmatic methods', () => {
    it('should support programmatic click when clickable', () => {
      element.clickable = true;
      
      let eventFired = false;
      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });
      
      element.click();
      expect(eventFired).toBe(true);
    });

    it('should not click when not clickable', () => {
      element.clickable = false;
      
      let eventFired = false;
      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });
      
      element.click();
      expect(eventFired).toBe(false);
    });
  });

  describe('Content projection', () => {
    it('should project text content', () => {
      element.textContent = 'Test content';
      expect(element.textContent).toBe('Test content');
    });

    it('should project HTML content', () => {
      element.innerHTML = '<span>HTML content</span>';
      const span = element.querySelector('span');
      expect(span?.textContent).toBe('HTML content');
    });
  });

  describe('Styling with data attributes', () => {
    it('should apply padding styles', () => {
      element.padding = 'md';
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement?.getAttribute('data-padding')).toBe('md');
    });

    it('should apply radius styles', () => {
      element.radius = 'lg';
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement?.getAttribute('data-radius')).toBe('lg');
    });

    it('should apply shadow styles', () => {
      element.shadow = 'xl';
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement?.getAttribute('data-shadow')).toBe('xl');
    });

    it('should handle multiple properties together', () => {
      element.padding = 'lg';
      element.radius = 'md';
      element.shadow = 'sm';
      element.clickable = true;
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement?.getAttribute('data-padding')).toBe('lg');
      expect(boxElement?.getAttribute('data-radius')).toBe('md');
      expect(boxElement?.getAttribute('data-shadow')).toBe('sm');
      expect(boxElement?.getAttribute('data-clickable')).toBe('true');
    });
  });
});