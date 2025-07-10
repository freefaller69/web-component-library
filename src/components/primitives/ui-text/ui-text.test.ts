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
      expect(element.as).toBe('span');
      expect(element.level).toBe(null);
      expect(element.size).toBe('md');
      expect(element.weight).toBe('normal');
      expect(element.truncate).toBe(false);
      expect(element.color).toBe('');
      expect(element.align).toBe('left');
      expect(element.clickable).toBe(false);
    });

    it('should have proper shadow DOM structure with span element', () => {
      expect(element.shadowRoot).toBeDefined();
      
      const textElement = element.shadowRoot?.querySelector('span');
      expect(textElement).toBeDefined();
      expect(textElement?.classList.contains('ui-text')).toBe(true);
      expect(textElement?.classList.contains('ui-text--span')).toBe(true);
      expect(textElement?.classList.contains('ui-text--md')).toBe(true);
      expect(textElement?.classList.contains('ui-text--normal')).toBe(true);
      expect(textElement?.classList.contains('ui-text--left')).toBe(true);
    });

    it('should have proper CSS parts', () => {
      const textElement = element.shadowRoot?.querySelector('[part="text"]');
      expect(textElement).toBeDefined();
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
      expect(h1Element?.classList.contains('ui-text--h1')).toBe(true);
    });

    it('should render h2 element when as="h2"', () => {
      element.as = 'h2';
      const h2Element = element.shadowRoot?.querySelector('h2');
      expect(h2Element).toBeDefined();
      expect(h2Element?.classList.contains('ui-text--h2')).toBe(true);
    });

    it('should render h3 element when as="h3"', () => {
      element.as = 'h3';
      const h3Element = element.shadowRoot?.querySelector('h3');
      expect(h3Element).toBeDefined();
      expect(h3Element?.classList.contains('ui-text--h3')).toBe(true);
    });

    it('should render h4 element when as="h4"', () => {
      element.as = 'h4';
      const h4Element = element.shadowRoot?.querySelector('h4');
      expect(h4Element).toBeDefined();
      expect(h4Element?.classList.contains('ui-text--h4')).toBe(true);
    });

    it('should render h5 element when as="h5"', () => {
      element.as = 'h5';
      const h5Element = element.shadowRoot?.querySelector('h5');
      expect(h5Element).toBeDefined();
      expect(h5Element?.classList.contains('ui-text--h5')).toBe(true);
    });

    it('should render h6 element when as="h6"', () => {
      element.as = 'h6';
      const h6Element = element.shadowRoot?.querySelector('h6');
      expect(h6Element).toBeDefined();
      expect(h6Element?.classList.contains('ui-text--h6')).toBe(true);
    });

    it('should render p element when as="p"', () => {
      element.as = 'p';
      const pElement = element.shadowRoot?.querySelector('p');
      expect(pElement).toBeDefined();
      expect(pElement?.classList.contains('ui-text--p')).toBe(true);
    });

    it('should render strong element when as="strong"', () => {
      element.as = 'strong';
      const strongElement = element.shadowRoot?.querySelector('strong');
      expect(strongElement).toBeDefined();
      expect(strongElement?.classList.contains('ui-text--strong')).toBe(true);
    });

    it('should render em element when as="em"', () => {
      element.as = 'em';
      const emElement = element.shadowRoot?.querySelector('em');
      expect(emElement).toBeDefined();
      expect(emElement?.classList.contains('ui-text--em')).toBe(true);
    });

    it('should render small element when as="small"', () => {
      element.as = 'small';
      const smallElement = element.shadowRoot?.querySelector('small');
      expect(smallElement).toBeDefined();
      expect(smallElement?.classList.contains('ui-text--small')).toBe(true);
    });

    it('should render code element when as="code"', () => {
      element.as = 'code';
      const codeElement = element.shadowRoot?.querySelector('code');
      expect(codeElement).toBeDefined();
      expect(codeElement?.classList.contains('ui-text--code')).toBe(true);
    });
  });

  describe('Level property for headings', () => {
    it('should render h1 when level=1', () => {
      element.level = 1;
      expect(element.as).toBe('h1');
      const h1Element = element.shadowRoot?.querySelector('h1');
      expect(h1Element).toBeDefined();
      expect(h1Element?.classList.contains('ui-text--h1')).toBe(true);
    });

    it('should render h2 when level=2', () => {
      element.level = 2;
      expect(element.as).toBe('h2');
      const h2Element = element.shadowRoot?.querySelector('h2');
      expect(h2Element).toBeDefined();
      expect(h2Element?.classList.contains('ui-text--h2')).toBe(true);
    });

    it('should render h3 when level=3', () => {
      element.level = 3;
      expect(element.as).toBe('h3');
      const h3Element = element.shadowRoot?.querySelector('h3');
      expect(h3Element).toBeDefined();
      expect(h3Element?.classList.contains('ui-text--h3')).toBe(true);
    });

    it('should render h4 when level=4', () => {
      element.level = 4;
      expect(element.as).toBe('h4');
      const h4Element = element.shadowRoot?.querySelector('h4');
      expect(h4Element).toBeDefined();
      expect(h4Element?.classList.contains('ui-text--h4')).toBe(true);
    });

    it('should render h5 when level=5', () => {
      element.level = 5;
      expect(element.as).toBe('h5');
      const h5Element = element.shadowRoot?.querySelector('h5');
      expect(h5Element).toBeDefined();
      expect(h5Element?.classList.contains('ui-text--h5')).toBe(true);
    });

    it('should render h6 when level=6', () => {
      element.level = 6;
      expect(element.as).toBe('h6');
      const h6Element = element.shadowRoot?.querySelector('h6');
      expect(h6Element).toBeDefined();
      expect(h6Element?.classList.contains('ui-text--h6')).toBe(true);
    });

    it('should ignore invalid level values', () => {
      element.level = 7;
      expect(element.as).toBe('span'); // Should remain default
      
      element.level = 0;
      expect(element.as).toBe('span'); // Should remain default
      
      element.level = -1;
      expect(element.as).toBe('span'); // Should remain default
    });

    it('should handle level attribute changes', () => {
      element.setAttribute('level', '3');
      expect(element.level).toBe(3);
      expect(element.as).toBe('h3');
      
      const h3Element = element.shadowRoot?.querySelector('h3');
      expect(h3Element).toBeDefined();
    });
  });

  describe('Attribute synchronization', () => {
    it('should sync as attribute', () => {
      element.setAttribute('as', 'h1');
      expect(element.as).toBe('h1');
      
      element.as = 'p';
      expect(element.getAttribute('as')).toBe('p');
    });

    it('should sync level attribute', () => {
      element.setAttribute('level', '2');
      expect(element.level).toBe(2);
      
      element.level = 4;
      expect(element.getAttribute('level')).toBe('4');
    });

    it('should sync size attribute', () => {
      element.setAttribute('size', 'lg');
      expect(element.size).toBe('lg');
      
      element.size = 'xl';
      expect(element.getAttribute('size')).toBe('xl');
    });

    it('should sync weight attribute', () => {
      element.setAttribute('weight', 'bold');
      expect(element.weight).toBe('bold');
      
      element.weight = 'medium';
      expect(element.getAttribute('weight')).toBe('medium');
    });

    it('should sync truncate attribute', () => {
      element.setAttribute('truncate', '');
      expect(element.truncate).toBe(true);
      
      element.truncate = false;
      expect(element.hasAttribute('truncate')).toBe(false);
    });

    it('should sync color attribute', () => {
      element.setAttribute('color', 'red');
      expect(element.color).toBe('red');
      
      element.color = 'blue';
      expect(element.getAttribute('color')).toBe('blue');
    });

    it('should sync align attribute', () => {
      element.setAttribute('align', 'center');
      expect(element.align).toBe('center');
      
      element.align = 'right';
      expect(element.getAttribute('align')).toBe('right');
    });

    it('should sync clickable attribute', () => {
      element.setAttribute('clickable', '');
      expect(element.clickable).toBe(true);
      
      element.clickable = false;
      expect(element.hasAttribute('clickable')).toBe(false);
    });
  });

  describe('CSS class application', () => {
    it('should apply size classes', () => {
      element.size = 'lg';
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.classList.contains('ui-text--lg')).toBe(true);
    });

    it('should apply weight classes', () => {
      element.weight = 'bold';
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.classList.contains('ui-text--bold')).toBe(true);
    });

    it('should apply align classes', () => {
      element.align = 'center';
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.classList.contains('ui-text--center')).toBe(true);
    });

    it('should apply truncate class when truncate is true', () => {
      element.truncate = true;
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.classList.contains('ui-text--truncate')).toBe(true);
    });

    it('should apply clickable class when clickable is true', () => {
      element.clickable = true;
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.classList.contains('ui-text--clickable')).toBe(true);
    });
  });

  describe('Style attributes', () => {
    it('should apply color style when color is set', () => {
      element.color = 'red';
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.getAttribute('style')).toContain('color: red');
    });

    it('should not apply color style when color is empty', () => {
      element.color = '';
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.getAttribute('style')).toBeFalsy();
    });
  });

  describe('Accessibility attributes', () => {
    it('should apply tabindex when clickable', () => {
      element.clickable = true;
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.getAttribute('tabindex')).toBe('0');
    });

    it('should apply role when clickable', () => {
      element.clickable = true;
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.getAttribute('role')).toBe('button');
    });

    it('should not apply tabindex when not clickable', () => {
      element.clickable = false;
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.getAttribute('tabindex')).toBeFalsy();
    });

    it('should not apply role when not clickable', () => {
      element.clickable = false;
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      expect(textElement?.getAttribute('role')).toBeFalsy();
    });
  });

  describe('Click events', () => {
    it('should dispatch ui-text-click event when clicked and clickable', () => {
      element.clickable = true;
      element.as = 'h1';
      element.level = 1;
      
      let eventFired = false;
      let eventDetail: any = null;
      
      element.addEventListener('ui-text-click', (e: any) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      textElement?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      
      expect(eventFired).toBe(true);
      expect(eventDetail).toBeDefined();
      expect(eventDetail.as).toBe('h1');
      expect(eventDetail.level).toBe(1);
      expect(eventDetail.originalEvent).toBeDefined();
    });

    it('should not dispatch event when not clickable', () => {
      element.clickable = false;
      
      let eventFired = false;
      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });
      
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      textElement?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      
      expect(eventFired).toBe(false);
    });
  });

  describe('Keyboard events', () => {
    it('should handle Enter key when clickable', () => {
      element.clickable = true;
      
      let eventFired = false;
      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });
      
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      textElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      
      expect(eventFired).toBe(true);
    });

    it('should handle Space key when clickable', () => {
      element.clickable = true;
      
      let eventFired = false;
      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });
      
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      textElement?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      
      expect(eventFired).toBe(true);
    });

    it('should not handle other keys when clickable', () => {
      element.clickable = true;
      
      let eventFired = false;
      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });
      
      const textElement = element.shadowRoot?.querySelector('.ui-text');
      textElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
      
      expect(eventFired).toBe(false);
    });
  });

  describe('Public methods', () => {
    it('should have focus method that works when clickable', () => {
      element.clickable = true;
      expect(typeof element.focus).toBe('function');
      
      // Should not throw when called
      element.focus();
    });

    it('should have click method that works when clickable', () => {
      element.clickable = true;
      expect(typeof element.click).toBe('function');
      
      let eventFired = false;
      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });
      
      element.click();
      expect(eventFired).toBe(true);
    });

    it('should not trigger click when not clickable', () => {
      element.clickable = false;
      
      let eventFired = false;
      element.addEventListener('ui-text-click', () => {
        eventFired = true;
      });
      
      element.click();
      expect(eventFired).toBe(false);
    });
  });

  describe('Input validation', () => {
    it('should reject invalid as values', () => {
      element.as = 'span';
      element.as = 'invalid' as any;
      expect(element.as).toBe('span'); // Should remain unchanged
    });

    it('should reject invalid size values', () => {
      element.size = 'md';
      element.size = 'invalid' as any;
      expect(element.size).toBe('md'); // Should remain unchanged
    });

    it('should reject invalid weight values', () => {
      element.weight = 'normal';
      element.weight = 'invalid' as any;
      expect(element.weight).toBe('normal'); // Should remain unchanged
    });

    it('should reject invalid align values', () => {
      element.align = 'left';
      element.align = 'invalid' as any;
      expect(element.align).toBe('left'); // Should remain unchanged
    });
  });
});