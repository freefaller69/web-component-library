import { describe, it, expect, beforeEach } from 'vitest';
import './ui-select.js';
import type { UiSelect } from './ui-select.js';

describe('UiSelect', () => {
  let element: UiSelect;

  beforeEach(() => {
    element = document.createElement('ui-select') as UiSelect;
    document.body.appendChild(element);
  });

  it('should render with default placeholder', () => {
    expect(element.placeholder).toBe('Select an option');
  });

  it('should set and get value', () => {
    element.value = 'test';
    expect(element.value).toBe('test');
  });

  it('should handle options', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ];
    element.options = options;
    expect(element.options).toEqual(options);
  });

  it('should be disabled when disabled attribute is set', () => {
    element.disabled = true;
    expect(element.disabled).toBe(true);
  });
});