import { describe, it, expect, beforeEach } from 'vitest';
import './ui-multi-select.js';
import type { UiMultiSelect } from './ui-multi-select.js';

describe('UiMultiSelect', () => {
  let element: UiMultiSelect;

  beforeEach(() => {
    element = document.createElement('ui-multi-select') as UiMultiSelect;
    document.body.appendChild(element);
  });

  it('should render with default placeholder', () => {
    expect(element.placeholder).toBe('Select an option');
  });

  it('should always be multiple', () => {
    expect(element.multiple).toBe(true);
    element.multiple = false;
    expect(element.multiple).toBe(true); // Should remain true
  });

  it('should handle comma-separated values', () => {
    element.value = 'a,b,c';
    expect(element.value).toBe('a,b,c');
  });

  it('should handle options', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ];
    element.options = options;
    expect(element.options).toEqual(options);
  });
});