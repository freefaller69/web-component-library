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
      expect(element.padding).toBe('none');
      expect(element.margin).toBe('none');
      expect(element.radius).toBe('none');
      expect(element.shadow).toBe('none');
      expect(element.background).toBe('');
      expect(element.border).toBe('');
      expect(element.width).toBe('');
      expect(element.height).toBe('');
      expect(element.overflow).toBe('');
      expect(element.display).toBe('');
      expect(element.flexDirection).toBe('');
      expect(element.justifyContent).toBe('');
      expect(element.alignItems).toBe('');
      expect(element.gap).toBe('');
      expect(element.clickable).toBe(false);
    });

    it('should have proper shadow DOM structure', () => {
      expect(element.shadowRoot).toBeDefined();
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      expect(boxElement).toBeDefined();
      expect(boxElement?.classList.contains('ui-box')).toBe(true);
      expect(boxElement?.classList.contains('ui-box--p-none')).toBe(true);
      expect(boxElement?.classList.contains('ui-box--m-none')).toBe(true);
      expect(boxElement?.classList.contains('ui-box--radius-none')).toBe(true);
      expect(boxElement?.classList.contains('ui-box--shadow-none')).toBe(true);
    });

    it('should have proper CSS parts', () => {
      const boxElement = element.shadowRoot?.querySelector('[part="box"]');
      expect(boxElement).toBeDefined();
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

      it('should update CSS classes when padding changes', () => {
        element.padding = 'md';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.classList.contains('ui-box--p-md')).toBe(true);
        expect(boxElement?.classList.contains('ui-box--p-none')).toBe(false);
      });

      it('should handle invalid padding values', () => {
        const originalPadding = element.padding;
        // @ts-expect-error - testing invalid value
        element.padding = 'invalid';
        expect(element.padding).toBe(originalPadding);
      });
    });

    describe('margin', () => {
      it('should sync property to attribute', () => {
        element.margin = 'lg';
        expect(element.getAttribute('margin')).toBe('lg');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('margin', 'sm');
        expect(element.margin).toBe('sm');
      });

      it('should update CSS classes when margin changes', () => {
        element.margin = 'lg';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.classList.contains('ui-box--m-lg')).toBe(true);
        expect(boxElement?.classList.contains('ui-box--m-none')).toBe(false);
      });

      it('should handle invalid margin values', () => {
        const originalMargin = element.margin;
        // @ts-expect-error - testing invalid value
        element.margin = 'invalid';
        expect(element.margin).toBe(originalMargin);
      });
    });

    describe('radius', () => {
      it('should sync property to attribute', () => {
        element.radius = 'md';
        expect(element.getAttribute('radius')).toBe('md');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('radius', 'lg');
        expect(element.radius).toBe('lg');
      });

      it('should update CSS classes when radius changes', () => {
        element.radius = 'md';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.classList.contains('ui-box--radius-md')).toBe(true);
        expect(boxElement?.classList.contains('ui-box--radius-none')).toBe(false);
      });

      it('should handle invalid radius values', () => {
        const originalRadius = element.radius;
        // @ts-expect-error - testing invalid value
        element.radius = 'invalid';
        expect(element.radius).toBe(originalRadius);
      });
    });

    describe('shadow', () => {
      it('should sync property to attribute', () => {
        element.shadow = 'md';
        expect(element.getAttribute('shadow')).toBe('md');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('shadow', 'lg');
        expect(element.shadow).toBe('lg');
      });

      it('should update CSS classes when shadow changes', () => {
        element.shadow = 'md';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.classList.contains('ui-box--shadow-md')).toBe(true);
        expect(boxElement?.classList.contains('ui-box--shadow-none')).toBe(false);
      });

      it('should handle invalid shadow values', () => {
        const originalShadow = element.shadow;
        // @ts-expect-error - testing invalid value
        element.shadow = 'invalid';
        expect(element.shadow).toBe(originalShadow);
      });
    });

    describe('background', () => {
      it('should sync property to attribute', () => {
        element.background = 'hsl(0, 100%, 50%)';
        expect(element.getAttribute('background')).toBe('hsl(0, 100%, 50%)');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('background', 'hsl(120, 100%, 50%)');
        expect(element.background).toBe('hsl(120, 100%, 50%)');
      });

      it('should apply inline style when background is set', () => {
        element.background = 'hsl(0, 100%, 50%)';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('style')).toContain('background: hsl(0, 100%, 50%)');
      });
    });

    describe('border', () => {
      it('should sync property to attribute', () => {
        element.border = '1px solid hsl(0, 0%, 50%)';
        expect(element.getAttribute('border')).toBe('1px solid hsl(0, 0%, 50%)');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('border', '2px dashed hsl(0, 0%, 25%)');
        expect(element.border).toBe('2px dashed hsl(0, 0%, 25%)');
      });

      it('should apply inline style when border is set', () => {
        element.border = '1px solid hsl(0, 0%, 50%)';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('style')).toContain('border: 1px solid hsl(0, 0%, 50%)');
      });
    });

    describe('width', () => {
      it('should sync property to attribute', () => {
        element.width = '200px';
        expect(element.getAttribute('width')).toBe('200px');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('width', '100%');
        expect(element.width).toBe('100%');
      });

      it('should apply inline style when width is set', () => {
        element.width = '200px';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('style')).toContain('width: 200px');
      });
    });

    describe('height', () => {
      it('should sync property to attribute', () => {
        element.height = '100px';
        expect(element.getAttribute('height')).toBe('100px');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('height', '50vh');
        expect(element.height).toBe('50vh');
      });

      it('should apply inline style when height is set', () => {
        element.height = '100px';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('style')).toContain('height: 100px');
      });
    });

    describe('overflow', () => {
      it('should sync property to attribute', () => {
        element.overflow = 'hidden';
        expect(element.getAttribute('overflow')).toBe('hidden');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('overflow', 'auto');
        expect(element.overflow).toBe('auto');
      });

      it('should apply inline style when overflow is set', () => {
        element.overflow = 'hidden';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('style')).toContain('overflow: hidden');
      });
    });

    describe('display', () => {
      it('should sync property to attribute', () => {
        element.display = 'flex';
        expect(element.getAttribute('display')).toBe('flex');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('display', 'grid');
        expect(element.display).toBe('grid');
      });

      it('should apply inline style when display is set', () => {
        element.display = 'flex';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.getAttribute('style')).toContain('display: flex');
      });
    });

    describe('flex properties', () => {
      it('should sync flex-direction property to attribute', () => {
        element.flexDirection = 'column';
        expect(element.getAttribute('flex-direction')).toBe('column');
      });

      it('should sync justify-content property to attribute', () => {
        element.justifyContent = 'center';
        expect(element.getAttribute('justify-content')).toBe('center');
      });

      it('should sync align-items property to attribute', () => {
        element.alignItems = 'center';
        expect(element.getAttribute('align-items')).toBe('center');
      });

      it('should sync gap property to attribute', () => {
        element.gap = '1rem';
        expect(element.getAttribute('gap')).toBe('1rem');
      });

      it('should apply inline styles for flex properties', () => {
        element.display = 'flex';
        element.flexDirection = 'column';
        element.justifyContent = 'center';
        element.alignItems = 'center';
        element.gap = '1rem';
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        const style = boxElement?.getAttribute('style') || '';
        expect(style).toContain('display: flex');
        expect(style).toContain('flex-direction: column');
        expect(style).toContain('justify-content: center');
        expect(style).toContain('align-items: center');
        expect(style).toContain('gap: 1rem');
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
        
        const boxElement = element.shadowRoot?.querySelector('.ui-box');
        expect(boxElement?.classList.contains('ui-box--clickable')).toBe(true);
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
      let eventDetail: any;

      element.addEventListener('ui-box-click', (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      });

      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
      boxElement.click();

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        padding: 'none',
        margin: 'none',
        originalEvent: expect.any(Event)
      });
    });

    it('should not dispatch event when not clickable', () => {
      element.clickable = false;
      let eventFired = false;

      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });

      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
      boxElement.click();

      expect(eventFired).toBe(false);
    });

    it('should bubble the event', () => {
      element.clickable = true;
      let eventFired = false;

      container.addEventListener('ui-box-click', () => {
        eventFired = true;
      });

      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
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

      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
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

      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
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

      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      boxElement.dispatchEvent(escapeEvent);

      expect(eventFired).toBe(false);
    });

    it('should not trigger keyboard events when not clickable', () => {
      element.clickable = false;
      let eventFired = false;

      element.addEventListener('ui-box-click', () => {
        eventFired = true;
      });

      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
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
      element.focus();
      expect(document.activeElement).toBe(element);
    });

    it('should focus internal element when focus() is called and clickable', () => {
      element.clickable = true;
      element.focus();
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
      expect(element.shadowRoot?.activeElement).toBe(boxElement);
    });

    it('should not be focusable when not clickable', () => {
      element.clickable = false;
      element.focus();
      expect(document.activeElement).not.toBe(element);
    });

    it('should have button role when clickable', () => {
      element.clickable = true;
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
      expect(boxElement?.getAttribute('role')).toBe('button');
    });

    it('should have tabindex when clickable', () => {
      element.clickable = true;
      const boxElement = element.shadowRoot?.querySelector('.ui-box') as HTMLDivElement;
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
      element.textContent = 'Box Content';
      
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
      expect(element.textContent).toBe('Box Content');
    });

    it('should project HTML content', () => {
      element.innerHTML = '<p>Paragraph in box</p>';
      
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).toBeDefined();
      expect(element.innerHTML).toBe('<p>Paragraph in box</p>');
    });
  });

  describe('Layout functionality', () => {
    it('should handle flex layout properties', () => {
      element.display = 'flex';
      element.flexDirection = 'column';
      element.justifyContent = 'space-between';
      element.alignItems = 'center';
      element.gap = '1rem';
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      const style = boxElement?.getAttribute('style') || '';
      expect(style).toContain('display: flex');
      expect(style).toContain('flex-direction: column');
      expect(style).toContain('justify-content: space-between');
      expect(style).toContain('align-items: center');
      expect(style).toContain('gap: 1rem');
    });

    it('should handle overflow properties', () => {
      element.overflow = 'auto';
      element.width = '200px';
      element.height = '100px';
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      const style = boxElement?.getAttribute('style') || '';
      expect(style).toContain('overflow: auto');
      expect(style).toContain('width: 200px');
      expect(style).toContain('height: 100px');
    });

    it('should handle multiple style properties together', () => {
      element.background = 'hsl(200, 100%, 50%)';
      element.border = '2px solid hsl(0, 0%, 50%)';
      element.width = '300px';
      element.height = '200px';
      element.padding = 'md';
      element.margin = 'lg';
      element.radius = 'xl';
      element.shadow = 'lg';
      
      const boxElement = element.shadowRoot?.querySelector('.ui-box');
      const style = boxElement?.getAttribute('style') || '';
      expect(style).toContain('background: hsl(200, 100%, 50%)');
      expect(style).toContain('border: 2px solid hsl(0, 0%, 50%)');
      expect(style).toContain('width: 300px');
      expect(style).toContain('height: 200px');
      
      expect(boxElement?.classList.contains('ui-box--p-md')).toBe(true);
      expect(boxElement?.classList.contains('ui-box--m-lg')).toBe(true);
      expect(boxElement?.classList.contains('ui-box--radius-xl')).toBe(true);
      expect(boxElement?.classList.contains('ui-box--shadow-lg')).toBe(true);
    });
  });

  describe('Spacing scale validation', () => {
    it('should accept all valid padding values', () => {
      const validPaddings = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
      
      validPaddings.forEach(padding => {
        element.padding = padding as any;
        expect(element.padding).toBe(padding);
      });
    });

    it('should accept all valid margin values', () => {
      const validMargins = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
      
      validMargins.forEach(margin => {
        element.margin = margin as any;
        expect(element.margin).toBe(margin);
      });
    });

    it('should accept all valid radius values', () => {
      const validRadii = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];
      
      validRadii.forEach(radius => {
        element.radius = radius as any;
        expect(element.radius).toBe(radius);
      });
    });

    it('should accept all valid shadow values', () => {
      const validShadows = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner'];
      
      validShadows.forEach(shadow => {
        element.shadow = shadow as any;
        expect(element.shadow).toBe(shadow);
      });
    });
  });
});