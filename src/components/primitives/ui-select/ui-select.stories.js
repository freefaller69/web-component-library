import './ui-select.js';

export default {
  title: 'Primitives/Interactive/Select',
  component: 'ui-select',
  parameters: {
    docs: {
      description: {
        component: 'A flexible select component with dropdown functionality, keyboard navigation, and accessibility features.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value(s)',
      table: {
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select an option...' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Select size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      }
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

// Sample options for stories
const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' }
];

const countriesOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' }
];

// Template for creating select instances
const Template = (args) => {
  const select = document.createElement('ui-select');
  
  // Set options
  select.options = sampleOptions;
  
  // Apply args
  Object.keys(args).forEach(key => {
    if (key === 'aria-label') {
      if (args[key]) select.setAttribute(key, args[key]);
    } else if (typeof args[key] === 'boolean') {
      if (args[key]) select.setAttribute(key, '');
    } else if (args[key]) {
      select.setAttribute(key, args[key]);
    }
  });
  
  return select;
};

// Individual stories
export const Default = Template.bind({});
Default.args = {};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'banana'
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  value: 'apple,cherry'
};

export const Searchable = Template.bind({});
Searchable.args = {
  searchable: true,
  placeholder: 'Search for a fruit...'
};

export const SearchableMultiple = Template.bind({});
SearchableMultiple.args = {
  searchable: true,
  multiple: true,
  placeholder: 'Search and select fruits...'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'apple'
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
  value: 'invalid-selection'
};

export const Required = Template.bind({});
Required.args = {
  required: true,
  placeholder: 'Please select an option *'
};

// Complex examples
export const Countries = () => {
  const select = document.createElement('ui-select');
  select.options = countriesOptions;
  select.placeholder = 'Select a country...';
  select.searchable = true;
  select.setAttribute('aria-label', 'Country selection');
  return select;
};

export const AllSizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; max-width: 300px;';
  
  ['small', 'medium', 'large'].forEach(size => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem;';
    
    const label = document.createElement('label');
    label.textContent = `${size.charAt(0).toUpperCase() + size.slice(1)} Select`;
    label.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: #374151;';
    
    const select = document.createElement('ui-select');
    select.options = sampleOptions;
    select.setAttribute('size', size);
    select.placeholder = `${size} select...`;
    
    wrapper.appendChild(label);
    wrapper.appendChild(select);
    container.appendChild(wrapper);
  });
  
  return container;
};

export const InteractiveExample = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; max-width: 400px;';
  
  const select = document.createElement('ui-select');
  select.options = sampleOptions;
  select.searchable = true;
  select.placeholder = 'Select your favorite fruit...';
  
  const output = document.createElement('div');
  output.style.cssText = 'padding: 1rem; background: #f3f4f6; border-radius: 0.375rem; min-height: 100px;';
  
  const events = [];
  
  const updateOutput = () => {
    output.innerHTML = `
      <h4 style="margin: 0 0 0.5rem 0;">Events:</h4>
      <div style="font-family: monospace; font-size: 0.875rem;">
        ${events.map(event => `<div>${event}</div>`).join('')}
      </div>
    `;
  };
  
  select.addEventListener('ui-select-change', (event) => {
    const selectedLabels = event.detail.selectedOptions.map(opt => opt.label).join(', ');
    events.unshift(`Selection changed: ${selectedLabels || 'None'}`);
    if (events.length > 5) events.pop();
    updateOutput();
  });
  
  select.addEventListener('ui-select-open', () => {
    events.unshift('Dropdown opened');
    if (events.length > 5) events.pop();
    updateOutput();
  });
  
  select.addEventListener('ui-select-close', () => {
    events.unshift('Dropdown closed');
    if (events.length > 5) events.pop();
    updateOutput();
  });
  
  updateOutput();
  
  container.appendChild(select);
  container.appendChild(output);
  
  return container;
};

export const FormExample = () => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 400px;';
  
  const form = document.createElement('form');
  form.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 0.375rem;';
  
  const title = document.createElement('h3');
  title.textContent = 'Preferences Form';
  title.style.cssText = 'margin: 0 0 1rem 0;';
  
  // Single select
  const singleWrapper = document.createElement('div');
  singleWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem;';
  
  const singleLabel = document.createElement('label');
  singleLabel.textContent = 'Favorite Fruit *';
  singleLabel.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: #374151;';
  
  const singleSelect = document.createElement('ui-select');
  singleSelect.options = sampleOptions;
  singleSelect.name = 'favorite-fruit';
  singleSelect.required = true;
  singleSelect.placeholder = 'Select your favorite...';
  
  singleWrapper.appendChild(singleLabel);
  singleWrapper.appendChild(singleSelect);
  
  // Multiple select
  const multipleWrapper = document.createElement('div');
  multipleWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem;';
  
  const multipleLabel = document.createElement('label');
  multipleLabel.textContent = 'Liked Fruits';
  multipleLabel.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: #374151;';
  
  const multipleSelect = document.createElement('ui-select');
  multipleSelect.options = sampleOptions;
  multipleSelect.name = 'liked-fruits';
  multipleSelect.multiple = true;
  multipleSelect.searchable = true;
  multipleSelect.placeholder = 'Select multiple...';
  
  multipleWrapper.appendChild(multipleLabel);
  multipleWrapper.appendChild(multipleSelect);
  
  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.style.cssText = 'padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.375rem; font-weight: 500; cursor: pointer;';
  
  // Form handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Get select values manually since FormData doesn't capture custom elements
    data['favorite-fruit'] = singleSelect.value;
    data['liked-fruits'] = multipleSelect.value;
    
    alert('Form submitted!\\n\\n' + JSON.stringify(data, null, 2));
  });
  
  form.appendChild(title);
  form.appendChild(singleWrapper);
  form.appendChild(multipleWrapper);
  form.appendChild(submitButton);
  
  container.appendChild(form);
  
  return container;
};