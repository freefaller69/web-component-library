import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-image.ts';
import type { UiImage } from './ui-image.ts';

describe('ui-image', () => {
  let element: UiImage;
  let container: HTMLDivElement;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    element = document.createElement('ui-image') as UiImage;
    container.appendChild(element);
    
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.src).toBe("");
      expect(element.alt).toBe("");
      expect(element.loading).toBe("lazy");
      expect(element.fit).toBe("cover");
      expect(element.fallback).toBe("");
    });

    it('should have proper shadow DOM structure', () => {
      expect(element.shadowRoot).toBeDefined();
      
      // No container div anymore - should just have style and content directly in shadow root
      const styleElement = element.shadowRoot?.querySelector('style');
      expect(styleElement).toBeDefined();
    });

    it('should not render img element without src', () => {
      const img = element.shadowRoot?.querySelector('.ui-image__img');
      expect(img).toBeNull();
    });
  });

  describe('Attribute/property synchronization', () => {
    describe('src', () => {
      it('should sync property to attribute', () => {
        element.src = 'test.jpg';
        expect(element.getAttribute('src')).toBe('test.jpg');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('src', 'test.jpg');
        expect(element.src).toBe('test.jpg');
      });

      it('should render img element when src is set', () => {
        element.src = 'test.jpg';
        
        const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
        expect(img).toBeDefined();
        expect(img.src).toContain('test.jpg');
      });
    });

    describe('alt', () => {
      it('should sync property to attribute', () => {
        element.alt = 'Test image';
        expect(element.getAttribute('alt')).toBe('Test image');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('alt', 'Test image');
        expect(element.alt).toBe('Test image');
      });

      it('should set alt on img element', () => {
        element.src = 'test.jpg';
        element.alt = 'Test image';
        
        const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
        expect(img.alt).toBe('Test image');
      });
    });

    describe('loading', () => {
      it('should sync property to attribute', () => {
        element.loading = 'eager';
        expect(element.getAttribute('loading')).toBe('eager');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('loading', 'eager');
        expect(element.loading).toBe('eager');
      });

      it('should set loading on img element', () => {
        element.src = 'test.jpg';
        element.loading = 'eager';
        
        const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
        expect(img.getAttribute('loading')).toBe('eager');
      });
    });

    describe('fit', () => {
      it('should sync property to attribute', () => {
        element.fit = 'contain';
        expect(element.getAttribute('fit')).toBe('contain');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('fit', 'contain');
        expect(element.fit).toBe('contain');
      });

      it('should set data-fit attribute on img element', () => {
        element.src = 'test.jpg';
        element.fit = 'contain';
        
        const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
        expect(img?.getAttribute('data-fit')).toBe('contain');
      });
    });

    describe('fallback', () => {
      it('should sync property to attribute', () => {
        element.fallback = 'fallback.jpg';
        expect(element.getAttribute('fallback')).toBe('fallback.jpg');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('fallback', 'fallback.jpg');
        expect(element.fallback).toBe('fallback.jpg');
      });
    });
  });

  describe('Event handling', () => {
    it('should switch to fallback image on error', async () => {
      element.src = 'invalid-image.jpg';
      element.fallback = 'fallback.jpg';
      
      const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      
      // After error, the component should re-render with fallback
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const newImg = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
      expect(newImg.src).toContain('fallback.jpg');
    });

  });

  describe('Object-fit styling', () => {
    it('should set data-fit attribute on img element', () => {
      element.src = 'test.jpg';
      element.fit = 'contain';
      
      const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
      expect(img?.getAttribute('data-fit')).toBe('contain');
    });

    it('should handle multiple fit values', () => {
      const fitValues: Array<"contain" | "cover" | "fill" | "scale-down"> = ['contain', 'cover', 'fill', 'scale-down'];
      
      element.src = 'test.jpg'; // Ensure img element exists
      
      fitValues.forEach(fit => {
        element.fit = fit;
        const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
        expect(img?.getAttribute('data-fit')).toBe(fit);
      });
    });
  });

  describe('Accessibility', () => {
    it('should use semantic img element', () => {
      element.src = 'test.jpg';
      
      const img = element.shadowRoot?.querySelector('.ui-image__img');
      expect(img?.tagName.toLowerCase()).toBe('img');
    });

    it('should have proper alt text', () => {
      element.src = 'test.jpg';
      element.alt = 'Descriptive text';
      
      const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
      expect(img.alt).toBe('Descriptive text');
    });

    it('should support empty alt for decorative images', () => {
      element.src = 'test.jpg';
      element.alt = '';
      
      const img = element.shadowRoot?.querySelector('.ui-image__img') as HTMLImageElement;
      expect(img.alt).toBe('');
    });
  });
});