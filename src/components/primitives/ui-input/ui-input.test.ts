import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-input.ts';
import type { UiInput } from './ui-input.ts';

describe('ui-input', () => {
  let element: UiInput;
  let container: HTMLDivElement;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    element = document.createElement('ui-input') as UiInput;
    container.appendChild(element);
    
    // Wait for component to be fully connected and rendered
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Component initialization and defaults', () => {
    it('should create with default values', () => {
      expect(element.type).toBe('text');
      expect(element.size).toBe('medium');
      expect(element.disabled).toBe(false);
      expect(element.readonly).toBe(false);
      expect(element.required).toBe(false);
      expect(element.value).toBe('');
      expect(element.placeholder).toBe('');
      expect(element.invalid).toBe(false);
    });

    it('should have proper shadow DOM structure', () => {
      expect(element.shadowRoot).toBeDefined();
      
      const input = element.shadowRoot?.querySelector('input');
      expect(input).toBeDefined();
      expect(input?.classList.contains('ui-input')).toBe(true);
      expect(input?.getAttribute('data-size')).toBe('medium');
      expect(input?.type).toBe('text');
    });
  });

  describe('Attribute/property synchronization', () => {
    describe('type', () => {
      it('should sync property to attribute', () => {
        element.type = 'email';
        expect(element.getAttribute('type')).toBe('email');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('type', 'password');
        expect(element.type).toBe('password');
      });

      it('should update input type when type changes', () => {
        element.type = 'number';
        
        const input = element.shadowRoot?.querySelector('input');
        expect(input?.type).toBe('number');
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
        
        const input = element.shadowRoot?.querySelector('input');
        expect(input?.getAttribute('data-size')).toBe('large');
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

      it('should set disabled attribute on internal input', () => {
        element.disabled = true;
        
        const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
        expect(input?.disabled).toBe(true);
      });
    });

    describe('readonly', () => {
      it('should sync property to attribute', () => {
        element.readonly = true;
        expect(element.hasAttribute('readonly')).toBe(true);
      });

      it('should sync attribute to property', () => {
        element.setAttribute('readonly', '');
        expect(element.readonly).toBe(true);
      });

      it('should set readonly attribute on internal input', () => {
        element.readonly = true;
        
        const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
        expect(input?.readOnly).toBe(true);
      });
    });

    describe('required', () => {
      it('should sync property to attribute', () => {
        element.required = true;
        expect(element.hasAttribute('required')).toBe(true);
      });

      it('should sync attribute to property', () => {
        element.setAttribute('required', '');
        expect(element.required).toBe(true);
      });

      it('should set required attribute on internal input', () => {
        element.required = true;
        
        const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
        expect(input?.required).toBe(true);
      });
    });

    describe('value', () => {
      it('should sync property to attribute', () => {
        element.value = 'test value';
        expect(element.getAttribute('value')).toBe('test value');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('value', 'attribute value');
        expect(element.value).toBe('attribute value');
      });

      it('should update input value when value changes', () => {
        element.value = 'new value';
        
        const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
        expect(input?.value).toBe('new value');
      });
    });

    describe('placeholder', () => {
      it('should sync property to attribute', () => {
        element.placeholder = 'Enter text';
        expect(element.getAttribute('placeholder')).toBe('Enter text');
      });

      it('should sync attribute to property', () => {
        element.setAttribute('placeholder', 'Placeholder text');
        expect(element.placeholder).toBe('Placeholder text');
      });

      it('should update input placeholder when placeholder changes', () => {
        element.placeholder = 'New placeholder';
        
        const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
        expect(input?.placeholder).toBe('New placeholder');
      });
    });

    describe('invalid', () => {
      it('should sync property to attribute', () => {
        element.invalid = true;
        expect(element.hasAttribute('invalid')).toBe(true);
      });

      it('should sync attribute to property', () => {
        element.setAttribute('invalid', '');
        expect(element.invalid).toBe(true);
      });

      it('should set aria-invalid when invalid', () => {
        element.invalid = true;
        
        const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
        expect(input?.getAttribute('aria-invalid')).toBe('true');
      });
    });
  });

  describe('Event handling', () => {
    it('should dispatch ui-input event when input changes', () => {
      let eventFired = false;
      let eventDetail: any;

      element.addEventListener('ui-input', (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      });

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        value: 'test',
        originalEvent: expect.any(Event)
      });
    });

    it('should dispatch ui-change event when input changes', () => {
      let eventFired = false;
      let eventDetail: any;

      element.addEventListener('ui-change', (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      });

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('change'));

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        value: 'test',
        originalEvent: expect.any(Event)
      });
    });

    it('should dispatch ui-focus event when input is focused', () => {
      let eventFired = false;
      let eventDetail: any;

      element.addEventListener('ui-focus', (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      });

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('focus'));

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        value: '',
        originalEvent: expect.any(Event)
      });
    });

    it('should dispatch ui-blur event when input loses focus', () => {
      let eventFired = false;
      let eventDetail: any;

      element.addEventListener('ui-blur', (event: Event) => {
        eventFired = true;
        eventDetail = (event as CustomEvent).detail;
      });

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('blur'));

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        value: '',
        originalEvent: expect.any(Event)
      });
    });

    it('should bubble events', () => {
      let eventFired = false;

      container.addEventListener('ui-input', () => {
        eventFired = true;
      });

      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));

      expect(eventFired).toBe(true);
    });
  });

  describe('Form validation', () => {
    it('should support checkValidity method', () => {
      expect(typeof element.checkValidity).toBe('function');
    });

    it('should support reportValidity method', () => {
      expect(typeof element.reportValidity).toBe('function');
    });

    it('should support setCustomValidity method', () => {
      expect(typeof element.setCustomValidity).toBe('function');
      element.setCustomValidity('Custom error');
      // Test that the method doesn't throw
    });

    it('should validate required fields', () => {
      element.required = true;
      element.value = '';
      
      expect(element.checkValidity()).toBe(false);
      
      element.value = 'some value';
      expect(element.checkValidity()).toBe(true);
    });

    it('should validate email type', () => {
      element.type = 'email';
      element.value = 'invalid-email';
      
      expect(element.checkValidity()).toBe(false);
      
      element.value = 'valid@email.com';
      expect(element.checkValidity()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should use semantic input element', () => {
      const input = element.shadowRoot?.querySelector('input');
      expect(input?.tagName.toLowerCase()).toBe('input');
    });

    it('should be focusable by default', () => {
      element.focus();
      expect(document.activeElement).toBe(element);
    });

    it('should focus internal input when focus() is called', () => {
      element.focus();
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(element.shadowRoot?.activeElement).toBe(input);
    });

    it('should not be focusable when disabled', () => {
      element.disabled = true;
      element.focus();
      expect(document.activeElement).not.toBe(element);
    });

    it('should support aria-label', () => {
      element.setAttribute('aria-label', 'Test input');
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.getAttribute('aria-label')).toBe('Test input');
    });

    it('should support aria-describedby', () => {
      element.setAttribute('aria-describedby', 'help-text');
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.getAttribute('aria-describedby')).toBe('help-text');
    });

    it('should set aria-invalid when invalid', () => {
      element.invalid = true;
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Programmatic methods', () => {
    it('should support programmatic focus', () => {
      element.focus();
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(element.shadowRoot?.activeElement).toBe(input);
    });

    it('should support programmatic blur', () => {
      element.focus();
      element.blur();
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(element.shadowRoot?.activeElement).not.toBe(input);
    });

    it('should support programmatic select', () => {
      element.value = 'test value';
      element.select();
      // Note: select() behavior is hard to test in jsdom, but we ensure it doesn't throw
    });
  });

  describe('Input types', () => {
    it('should support text input', () => {
      element.type = 'text';
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('text');
    });

    it('should support password input', () => {
      element.type = 'password';
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('password');
    });

    it('should support email input', () => {
      element.type = 'email';
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('email');
    });

    it('should support number input', () => {
      element.type = 'number';
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('number');
    });

    it('should support number input with min/max/step', () => {
      element.type = 'number';
      element.setAttribute('min', '0');
      element.setAttribute('max', '100');
      element.setAttribute('step', '5');
      
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.min).toBe('0');
      expect(input?.max).toBe('100');
      expect(input?.step).toBe('5');
    });

    it('should support search input', () => {
      element.type = 'search';
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('search');
    });

    it('should support tel input', () => {
      element.type = 'tel';
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('tel');
    });

    it('should support url input', () => {
      element.type = 'url';
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('url');
    });
  });

  describe('Additional attributes', () => {
    it('should support pattern attribute', () => {
      element.setAttribute('pattern', '[0-9]+');
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.pattern).toBe('[0-9]+');
    });

    it('should support autocomplete attribute', () => {
      element.setAttribute('autocomplete', 'email');
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.autocomplete).toBe('email');
    });

    it('should support name attribute', () => {
      element.setAttribute('name', 'test-input');
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.name).toBe('test-input');
    });

    it('should support id attribute', () => {
      element.setAttribute('id', 'test-id');
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.id).toBe('test-id');
    });
  });

  describe('State management', () => {
    it('should update internal value when user types', () => {
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.value = 'user typed value';
      input.dispatchEvent(new Event('input'));

      expect(element.value).toBe('user typed value');
    });

    it('should prevent input when disabled', () => {
      element.disabled = true;
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.disabled).toBe(true);
    });

    it('should prevent input when readonly', () => {
      element.readonly = true;
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      expect(input?.readOnly).toBe(true);
    });
  });

  describe('Validation', () => {
    it('should validate email input', () => {
      element.type = 'email';
      element.value = 'invalid-email';
      
      const result = element.validate();
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid email address');
      
      element.value = 'valid@email.com';
      const result2 = element.validate();
      expect(result2.isValid).toBe(true);
      expect(result2.errorMessage).toBe('');
    });

    it('should validate tel input', () => {
      element.type = 'tel';
      element.value = 'invalid-phone-abc';
      
      const result = element.validate();
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Please enter only numbers and valid phone formatting characters');
      
      element.value = '(123) 456-7890';
      const result2 = element.validate();
      expect(result2.isValid).toBe(true);
      expect(result2.errorMessage).toBe('');
    });

    it('should validate required field', () => {
      element.required = true;
      element.value = '';
      
      const result = element.validate();
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('This field is required');
      
      element.value = 'some value';
      const result2 = element.validate();
      expect(result2.isValid).toBe(true);
      expect(result2.errorMessage).toBe('');
    });

    it('should dispatch validation events', () => {
      let validationFired = false;
      let validationDetail: any;

      element.addEventListener('ui-validation', (event: Event) => {
        validationFired = true;
        validationDetail = (event as CustomEvent).detail;
      });

      element.type = 'email';
      element.value = 'invalid-email';
      
      const input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('change'));

      expect(validationFired).toBe(true);
      expect(validationDetail.isValid).toBe(false);
      expect(validationDetail.errorMessage).toBe('Please enter a valid email address');
      expect(validationDetail.value).toBe('invalid-email');
    });

    it('should automatically set invalid state based on validation', () => {
      element.type = 'email';
      element.value = 'invalid-email';
      
      element.validate();
      expect(element.invalid).toBe(true);
      
      element.value = 'valid@email.com';
      element.validate();
      expect(element.invalid).toBe(false);
    });

    it('should return validation result', () => {
      element.type = 'email';
      element.value = 'invalid-email';
      element.validate();
      
      const result = element.validationResult;
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid email address');
    });
  });
});