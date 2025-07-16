import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-select.ts';
import type { UiSelect } from './ui-select.ts';

describe('ui-select', () => {
  let element: UiSelect;
  let container: HTMLDivElement;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    element = document.createElement('ui-select') as UiSelect;
    container.appendChild(element);
    
    // Wait for component to be fully connected and rendered
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.value).toBe('');
      expect(element.placeholder).toBe('Select an option...');
      expect(element.multiple).toBe(false);
      expect(element.searchable).toBe(false);
      expect(element.disabled).toBe(false);
      expect(element.required).toBe(false);
      expect(element.invalid).toBe(false);
      expect(element.size).toBe('medium');
    });

    it('should have proper shadow DOM structure', () => {
      expect(element.shadowRoot).toBeDefined();
      
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger');
      expect(trigger).toBeDefined();
      expect(trigger?.getAttribute('role')).toBe('combobox');
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
      
      const dropdown = element.shadowRoot?.querySelector('.ui-select__dropdown');
      expect(dropdown).toBeDefined();
      expect(dropdown?.getAttribute('role')).toBe('listbox');
    });
  });

  describe('Options management', () => {
    it('should accept and store options', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];
      
      element.options = options;
      expect(element.options).toEqual(options);
    });

    it('should update display when options change', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];
      
      element.options = options;
      element.value = 'option1';
      
      const display = element.shadowRoot?.querySelector('.ui-select__display');
      expect(display?.textContent).toBe('Option 1');
    });
  });

  describe('Single selection', () => {
    beforeEach(() => {
      element.options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ];
    });

    it('should display selected option', () => {
      element.value = 'option2';
      
      const display = element.shadowRoot?.querySelector('.ui-select__display');
      expect(display?.textContent).toBe('Option 2');
      expect(display?.classList.contains('ui-select__display--placeholder')).toBe(false);
    });

    it('should show placeholder when no selection', () => {
      const display = element.shadowRoot?.querySelector('.ui-select__display');
      expect(display?.textContent).toBe('Select an option...');
      expect(display?.classList.contains('ui-select__display--placeholder')).toBe(true);
    });
  });

  describe('Multiple selection', () => {
    beforeEach(() => {
      element.multiple = true;
      element.options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ];
    });

    it('should display multiple selected options', () => {
      element.value = 'option1,option3';
      
      const display = element.shadowRoot?.querySelector('.ui-select__display');
      expect(display?.textContent).toBe('Option 1, Option 3');
    });
  });

  describe('Dropdown functionality', () => {
    beforeEach(() => {
      element.options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];
    });

    it('should open dropdown when trigger is clicked', () => {
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger') as HTMLElement;
      trigger?.click();
      
      expect(trigger?.getAttribute('aria-expanded')).toBe('true');
      
      const dropdown = element.shadowRoot?.querySelector('.ui-select__dropdown') as HTMLElement;
      expect(dropdown?.style.display).toBe('block');
    });

    it('should close dropdown when clicking outside', () => {
      // Open dropdown first
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger') as HTMLElement;
      trigger?.click();
      
      // Click outside
      document.body.click();
      
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
      
      const dropdown = element.shadowRoot?.querySelector('.ui-select__dropdown') as HTMLElement;
      expect(dropdown?.style.display).toBe('none');
    });
  });

  describe('Keyboard navigation', () => {
    beforeEach(() => {
      element.options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];
    });

    it('should open dropdown on arrow down', () => {
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger') as HTMLElement;
      trigger?.focus();
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      trigger?.dispatchEvent(event);
      
      expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should close dropdown on escape', () => {
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger') as HTMLElement;
      trigger?.click(); // Open dropdown
      
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      trigger?.dispatchEvent(event);
      
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      element.options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];
    });

    it('should dispatch ui-select-change event on selection', () => {
      let eventFired = false;
      let eventDetail: any;

      element.addEventListener('ui-select-change', (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      });

      element.value = 'option1';
      
      // Simulate option selection by calling the internal method
      (element as any)._selectOption('option1');

      expect(eventFired).toBe(true);
      expect(eventDetail.value).toBe('option1');
      expect(eventDetail.selectedOptions).toHaveLength(1);
      expect(eventDetail.selectedOptions[0].value).toBe('option1');
    });

    it('should dispatch open and close events', () => {
      let openEventFired = false;
      let closeEventFired = false;

      element.addEventListener('ui-select-open', () => {
        openEventFired = true;
      });

      element.addEventListener('ui-select-close', () => {
        closeEventFired = true;
      });

      element.open();
      expect(openEventFired).toBe(true);

      element.close();
      expect(closeEventFired).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger');
      expect(trigger?.getAttribute('role')).toBe('combobox');
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
      expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
      expect(trigger?.getAttribute('tabindex')).toBe('0');
    });

    it('should support aria-label', () => {
      element.setAttribute('aria-label', 'Select option');
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger');
      expect(trigger?.getAttribute('aria-label')).toBe('Select option');
    });

    it('should be disabled when disabled attribute is set', () => {
      element.disabled = true;
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger');
      expect(trigger?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Public methods', () => {
    it('should support programmatic open/close', () => {
      element.open();
      const trigger = element.shadowRoot?.querySelector('.ui-select__trigger');
      expect(trigger?.getAttribute('aria-expanded')).toBe('true');

      element.close();
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should support programmatic focus', () => {
      element.focus();
      expect(document.activeElement).toBe(element);
    });
  });
});