import { describe, it, expect, beforeEach, vi } from 'vitest';
import './ui-card.js';
import { UiCard } from './ui-card.js';

describe('UiCard', () => {
  let card: UiCard;

  beforeEach(() => {
    card = document.createElement('ui-card') as UiCard;
    document.body.appendChild(card);
  });

  it('should render with default properties', () => {
    expect(card.padding).toBe('md');
    expect(card.clickable).toBe(false);
  });

  it('should update padding attribute', () => {
    card.padding = 'lg';
    expect(card.getAttribute('padding')).toBe('lg');
  });

  it('should update clickable attribute', () => {
    card.clickable = true;
    expect(card.hasAttribute('clickable')).toBe(true);
  });

  it('should emit card-click event when clickable', () => {
    let eventFired = false;
    card.addEventListener('card-click', () => { eventFired = true; });
    
    card.clickable = true;
    const cardElement = card.shadowRoot?.querySelector('.ui-card');
    cardElement?.dispatchEvent(new Event('click'));
    
    expect(eventFired).toBe(true);
  });

  it('should handle keyboard events when clickable', () => {
    let eventFired = false;
    card.addEventListener('card-click', () => { eventFired = true; });
    
    card.clickable = true;
    const cardElement = card.shadowRoot?.querySelector('.ui-card');
    cardElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    
    expect(eventFired).toBe(true);
  });

  it('should set aria-label attribute', () => {
    card.ariaLabel = 'Custom card label';
    expect(card.getAttribute('aria-label')).toBe('Custom card label');
    expect(card.ariaLabel).toBe('Custom card label');
  });

  it('should set aria-describedby attribute', () => {
    card.ariaDescribedby = 'card-description';
    expect(card.getAttribute('aria-describedby')).toBe('card-description');
    expect(card.ariaDescribedby).toBe('card-description');
  });

  it('should add default aria-label when clickable without custom label', () => {
    card.clickable = true;
    const cardElement = card.shadowRoot?.querySelector('.ui-card');
    expect(cardElement?.getAttribute('aria-label')).toBe('Interactive card');
  });

  it('should use custom aria-label when clickable', () => {
    card.ariaLabel = 'Product card';
    card.clickable = true;
    const cardElement = card.shadowRoot?.querySelector('.ui-card');
    expect(cardElement?.getAttribute('aria-label')).toBe('Product card');
  });

  it('should add aria-describedby when clickable', () => {
    card.ariaDescribedby = 'card-help';
    card.clickable = true;
    const cardElement = card.shadowRoot?.querySelector('.ui-card');
    expect(cardElement?.getAttribute('aria-describedby')).toBe('card-help');
  });

  it('should have semantic HTML structure', () => {
    const header = card.shadowRoot?.querySelector('header.ui-card__header');
    const main = card.shadowRoot?.querySelector('main.ui-card__content');
    const footer = card.shadowRoot?.querySelector('footer.ui-card__footer');
    
    expect(header).toBeTruthy();
    expect(main).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  it('should have role="button" when clickable', () => {
    card.clickable = true;
    const cardElement = card.shadowRoot?.querySelector('.ui-card');
    expect(cardElement?.getAttribute('role')).toBe('button');
  });

  it('should have tabindex="0" when clickable', () => {
    card.clickable = true;
    const cardElement = card.shadowRoot?.querySelector('.ui-card');
    expect(cardElement?.getAttribute('tabindex')).toBe('0');
  });

  it('should focus the card element when focus() is called', () => {
    card.clickable = true;
    document.body.appendChild(card);
    
    const cardElement = card.shadowRoot?.querySelector('.ui-card') as HTMLElement;
    const focusSpy = vi.spyOn(cardElement, 'focus');
    
    card.focus();
    expect(focusSpy).toHaveBeenCalled();
  });
});