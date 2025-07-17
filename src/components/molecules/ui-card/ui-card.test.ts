import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './ui-card.ts';
import type { UiCard } from './ui-card.ts';

describe('ui-card', () => {
  let element: UiCard;
  let container: HTMLDivElement;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    element = document.createElement('ui-card') as UiCard;
    container.appendChild(element);
    
    // Wait for component to be fully connected and rendered
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.variant).toBe('default');
      expect(element.size).toBe('medium');
      expect(element.clickable).toBe(false);
      expect(element.elevated).toBe(false);
      expect(element.bordered).toBe(true);
      expect(element.ariaLabel).toBe(null);
      expect(element.ariaDescribedby).toBe(null);
    });

    it('should have proper shadow DOM structure', () => {
      expect(element.shadowRoot).toBeDefined();
      
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card).toBeDefined();
      expect(card?.getAttribute('data-variant')).toBe('default');
      expect(card?.getAttribute('data-size')).toBe('medium');
      expect(card?.classList.contains('ui-card--clickable')).toBe(false);
    });

    it('should contain appropriate slots for default variant', () => {
      const slots = element.shadowRoot?.querySelectorAll('slot');
      expect(slots?.length).toBe(4); // media, title, default, actions
      
      const namedSlots = Array.from(slots || [])
        .map(slot => slot.getAttribute('name'))
        .filter(name => name !== null);
      
      expect(namedSlots).toContain('media');
      expect(namedSlots).toContain('title');
      expect(namedSlots).toContain('actions');
    });
  });

  describe('Property management', () => {
    it('should update variant property and attribute', () => {
      element.variant = 'stat';
      expect(element.variant).toBe('stat');
      expect(element.getAttribute('variant')).toBe('stat');
      
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.getAttribute('data-variant')).toBe('stat');
    });

    it('should validate variant values', () => {
      element.variant = 'invalid' as any;
      expect(element.variant).toBe('default'); // Should fallback to default
    });

    it('should update size property and attribute', () => {
      element.size = 'large';
      expect(element.size).toBe('large');
      expect(element.getAttribute('size')).toBe('large');
      
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.getAttribute('data-size')).toBe('large');
    });

    it('should validate size values', () => {
      element.size = 'invalid' as any;
      expect(element.size).toBe('medium'); // Should fallback to default
    });

    it('should update boolean properties correctly', () => {
      element.clickable = true;
      expect(element.clickable).toBe(true);
      expect(element.hasAttribute('clickable')).toBe(true);
      
      element.elevated = true;
      expect(element.elevated).toBe(true);
      expect(element.hasAttribute('elevated')).toBe(true);
      
      element.bordered = false;
      expect(element.bordered).toBe(false);
      expect(element.getAttribute('bordered')).toBe('false');
    });

    it('should handle aria properties', () => {
      element.ariaLabel = 'Test card';
      expect(element.ariaLabel).toBe('Test card');
      expect(element.getAttribute('aria-label')).toBe('Test card');
      
      element.ariaDescribedby = 'description-id';
      expect(element.ariaDescribedby).toBe('description-id');
      expect(element.getAttribute('aria-describedby')).toBe('description-id');
    });
  });

  describe('Attribute synchronization', () => {
    it('should sync attributes to properties on initialization', () => {
      // Create element with attributes
      const elementWithAttrs = document.createElement('ui-card') as UiCard;
      elementWithAttrs.setAttribute('variant', 'minimal');
      elementWithAttrs.setAttribute('size', 'small');
      elementWithAttrs.setAttribute('clickable', '');
      elementWithAttrs.setAttribute('elevated', '');
      container.appendChild(elementWithAttrs);
      
      expect(elementWithAttrs.variant).toBe('minimal');
      expect(elementWithAttrs.size).toBe('small');
      expect(elementWithAttrs.clickable).toBe(true);
      expect(elementWithAttrs.elevated).toBe(true);
    });

    it('should sync attribute changes to properties', () => {
      element.setAttribute('variant', 'list');
      expect(element.variant).toBe('list');
      
      element.setAttribute('clickable', '');
      expect(element.clickable).toBe(true);
      
      element.removeAttribute('clickable');
      expect(element.clickable).toBe(false);
    });
  });

  describe('Variant-specific behavior', () => {
    it('should render correct slots for stat variant', async () => {
      element.variant = 'stat';
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const slots = element.shadowRoot?.querySelectorAll('slot');
      const namedSlots = Array.from(slots || [])
        .map(slot => slot.getAttribute('name'))
        .filter(name => name !== null);
      
      expect(namedSlots).toContain('icon');
      expect(namedSlots).toContain('title');
      expect(namedSlots).toContain('value');
      expect(namedSlots).toContain('subtitle');
    });

    it('should render correct slots for list variant', async () => {
      element.variant = 'list';
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const slots = element.shadowRoot?.querySelectorAll('slot');
      const namedSlots = Array.from(slots || [])
        .map(slot => slot.getAttribute('name'))
        .filter(name => name !== null);
      
      expect(namedSlots).toContain('media');
      expect(namedSlots).toContain('title');
      expect(namedSlots).toContain('subtitle');
      expect(namedSlots).toContain('meta');
      expect(namedSlots).toContain('actions');
    });

    it('should render minimal slots for minimal variant', async () => {
      element.variant = 'minimal';
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const slots = element.shadowRoot?.querySelectorAll('slot');
      const defaultSlot = Array.from(slots || []).find(slot => !slot.getAttribute('name'));
      
      expect(defaultSlot).toBeDefined();
      expect(slots?.length).toBe(1); // Only default slot
    });
  });

  describe('Clickable behavior', () => {
    beforeEach(async () => {
      element.clickable = true;
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    it('should add clickable class and role when clickable', () => {
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.classList.contains('ui-card--clickable')).toBe(true);
      expect(card?.getAttribute('role')).toBe('button');
      expect(card?.getAttribute('tabindex')).toBe('0');
    });

    it('should dispatch ui-card-action event on click', () => {
      const mockHandler = vi.fn();
      element.addEventListener('ui-card-action', mockHandler);
      
      const card = element.shadowRoot?.querySelector('.ui-card') as HTMLElement;
      card?.click();
      
      expect(mockHandler).toHaveBeenCalledOnce();
      const event = mockHandler.mock.calls[0][0];
      expect(event.detail.action).toBe('click');
      expect(event.detail.originalEvent).toBeDefined();
    });

    it('should dispatch ui-card-action event on Enter key', () => {
      const mockHandler = vi.fn();
      element.addEventListener('ui-card-action', mockHandler);
      
      const card = element.shadowRoot?.querySelector('.ui-card') as HTMLElement;
      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      card?.dispatchEvent(keyEvent);
      
      expect(mockHandler).toHaveBeenCalledOnce();
      const event = mockHandler.mock.calls[0][0];
      expect(event.detail.action).toBe('activate');
    });

    it('should dispatch ui-card-action event on Space key', () => {
      const mockHandler = vi.fn();
      element.addEventListener('ui-card-action', mockHandler);
      
      const card = element.shadowRoot?.querySelector('.ui-card') as HTMLElement;
      const keyEvent = new KeyboardEvent('keydown', { key: ' ' });
      card?.dispatchEvent(keyEvent);
      
      expect(mockHandler).toHaveBeenCalledOnce();
      const event = mockHandler.mock.calls[0][0];
      expect(event.detail.action).toBe('activate');
    });

    it('should not dispatch events when not clickable', () => {
      element.clickable = false;
      const mockHandler = vi.fn();
      element.addEventListener('ui-card-action', mockHandler);
      
      const card = element.shadowRoot?.querySelector('.ui-card') as HTMLElement;
      card?.click();
      
      expect(mockHandler).not.toHaveBeenCalled();
    });

    it('should focus the card element with focus() method', () => {
      const card = element.shadowRoot?.querySelector('.ui-card') as HTMLElement;
      const focusSpy = vi.spyOn(card, 'focus');
      
      element.focus();
      expect(focusSpy).toHaveBeenCalledOnce();
    });
  });

  describe('CSS classes and styling', () => {
    it('should apply elevated class when elevated is true', async () => {
      element.elevated = true;
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.classList.contains('ui-card--elevated')).toBe(true);
    });

    it('should apply borderless class when bordered is false', async () => {
      element.bordered = false;
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.classList.contains('ui-card--borderless')).toBe(true);
    });

    it('should not have borderless class when bordered is true (default)', () => {
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.classList.contains('ui-card--borderless')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should set aria-label when clickable and ariaLabel is provided', async () => {
      element.clickable = true;
      element.ariaLabel = 'User profile card';
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.getAttribute('aria-label')).toBe('User profile card');
    });

    it('should set aria-describedby when clickable and ariaDescribedby is provided', async () => {
      element.clickable = true;
      element.ariaDescribedby = 'card-description';
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.getAttribute('aria-describedby')).toBe('card-description');
    });

    it('should not set aria attributes when not clickable', async () => {
      element.clickable = false;
      element.ariaLabel = 'Test label';
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const card = element.shadowRoot?.querySelector('.ui-card');
      expect(card?.hasAttribute('aria-label')).toBe(false);
      expect(card?.hasAttribute('role')).toBe(false);
      expect(card?.hasAttribute('tabindex')).toBe(false);
    });
  });

  describe('Event bubbling', () => {
    it('should bubble ui-card-action events to parent elements', () => {
      element.clickable = true;
      
      const parentHandler = vi.fn();
      container.addEventListener('ui-card-action', parentHandler);
      
      const card = element.shadowRoot?.querySelector('.ui-card') as HTMLElement;
      card?.click();
      
      expect(parentHandler).toHaveBeenCalledOnce();
    });
  });

  describe('Dynamic updates', () => {
    it('should re-render when variant changes', async () => {
      element.variant = 'stat';
      await new Promise(resolve => setTimeout(resolve, 0));
      
      let slots = element.shadowRoot?.querySelectorAll('slot[name]');
      let slotNames = Array.from(slots || []).map(slot => slot.getAttribute('name'));
      expect(slotNames).toContain('icon');
      
      element.variant = 'list';
      await new Promise(resolve => setTimeout(resolve, 0));
      
      slots = element.shadowRoot?.querySelectorAll('slot[name]');
      slotNames = Array.from(slots || []).map(slot => slot.getAttribute('name'));
      expect(slotNames).toContain('media');
      expect(slotNames).toContain('subtitle');
    });

    it('should update event listeners when clickable changes', async () => {
      const mockHandler = vi.fn();
      element.addEventListener('ui-card-action', mockHandler);
      
      // Not clickable initially
      expect(element.clickable).toBe(false);
      const card = element.shadowRoot?.querySelector('.ui-card') as HTMLElement;
      card?.click();
      expect(mockHandler).not.toHaveBeenCalled();
      
      // Make clickable
      element.clickable = true;
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const updatedCard = element.shadowRoot?.querySelector('.ui-card') as HTMLElement;
      updatedCard?.click();
      expect(mockHandler).toHaveBeenCalledOnce();
    });
  });
});