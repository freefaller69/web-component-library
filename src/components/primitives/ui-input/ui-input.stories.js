import './ui-input.js';

export default {
  title: 'Primitives/Interactive/Input',
  component: 'ui-input',
  parameters: {
    docs: {
      description: {
        component: 'A versatile input component supporting multiple types, sizes, and validation states with comprehensive accessibility features and form integration.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          },
          {
            id: 'label-title-only',
            enabled: false
          }
        ]
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Input size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
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
    readonly: {
      control: 'boolean',
      description: 'Read-only state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Required state',
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
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'text',
      description: 'Input value',
      table: {
        type: { summary: 'string' }
      }
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' }
      }
    },
    'aria-describedby': {
      control: 'text',
      description: 'ID of element that describes the input',
      table: {
        type: { summary: 'string' }
      }
    },
    name: {
      control: 'text',
      description: 'Form name attribute',
      table: {
        type: { summary: 'string' }
      }
    },
    pattern: {
      control: 'text',
      description: 'Validation pattern (regex)',
      table: {
        type: { summary: 'string' }
      }
    },
    min: {
      control: 'text',
      description: 'Minimum value (for number/date types)',
      table: {
        type: { summary: 'string' }
      }
    },
    max: {
      control: 'text',
      description: 'Maximum value (for number/date types)',
      table: {
        type: { summary: 'string' }
      }
    },
    step: {
      control: 'text',
      description: 'Step value (for number type)',
      table: {
        type: { summary: 'string' }
      }
    },
    autocomplete: {
      control: 'text',
      description: 'Autocomplete attribute',
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

// Template for creating input instances
const Template = (args) => {
  const input = document.createElement('ui-input');
  
  Object.keys(args).forEach(key => {
    if (key === 'aria-label' || key === 'aria-describedby') {
      if (args[key]) input.setAttribute(key, args[key]);
    } else if (typeof args[key] === 'boolean') {
      if (args[key]) input.setAttribute(key, '');
    } else if (args[key]) {
      input.setAttribute(key, args[key]);
    }
  });
  
  return input;
};

// Individual stories
export const Text = Template.bind({});
Text.args = {
  type: 'text',
  placeholder: 'Enter text'
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: 'Enter password'
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  placeholder: 'Enter email address'
};

export const Number = Template.bind({});
Number.args = {
  type: 'number',
  placeholder: 'Enter number',
  min: '0',
  max: '100',
  step: '1'
};

export const Search = Template.bind({});
Search.args = {
  type: 'search',
  placeholder: 'Search...'
};

export const Tel = Template.bind({});
Tel.args = {
  type: 'tel',
  placeholder: 'Enter phone number'
};

export const URL = Template.bind({});
URL.args = {
  type: 'url',
  placeholder: 'Enter URL'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  placeholder: 'Small input'
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  placeholder: 'Medium input'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  placeholder: 'Large input'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Disabled input',
  value: 'Cannot edit this'
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readonly: true,
  value: 'Read-only value'
};

export const Required = Template.bind({});
Required.args = {
  required: true,
  placeholder: 'This field is required'
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
  value: 'invalid@',
  placeholder: 'Enter valid email'
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'Pre-filled value',
  placeholder: 'Enter text'
};

export const WithPattern = Template.bind({});
WithPattern.args = {
  pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
  placeholder: '123-456-7890'
};

// Showcase stories
export const AllTypes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; max-width: 400px;';
  
  const types = [
    { type: 'text', placeholder: 'Text input' },
    { type: 'password', placeholder: 'Password input' },
    { type: 'email', placeholder: 'Email input' },
    { type: 'number', placeholder: 'Number input' },
    { type: 'search', placeholder: 'Search input' },
    { type: 'tel', placeholder: 'Phone input' },
    { type: 'url', placeholder: 'URL input' }
  ];
  
  types.forEach(({ type, placeholder }) => {
    const input = document.createElement('ui-input');
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    container.appendChild(input);
  });
  
  return container;
};

export const AllSizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; max-width: 400px;';
  
  ['small', 'medium', 'large'].forEach(size => {
    const input = document.createElement('ui-input');
    input.setAttribute('size', size);
    input.setAttribute('placeholder', `${size.charAt(0).toUpperCase() + size.slice(1)} input`);
    container.appendChild(input);
  });
  
  return container;
};

export const AllStates = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; max-width: 400px;';
  
  const states = [
    { label: 'Normal', props: { placeholder: 'Normal input' } },
    { label: 'Disabled', props: { disabled: true, placeholder: 'Disabled input' } },
    { label: 'Read-only', props: { readonly: true, value: 'Read-only value' } },
    { label: 'Required', props: { required: true, placeholder: 'Required input' } },
    { label: 'Invalid', props: { invalid: true, value: 'invalid@', placeholder: 'Invalid input' } }
  ];
  
  states.forEach(({ label, props }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem;';
    
    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    labelEl.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: #374151;';
    
    const input = document.createElement('ui-input');
    Object.keys(props).forEach(key => {
      if (typeof props[key] === 'boolean') {
        if (props[key]) input.setAttribute(key, '');
      } else {
        input.setAttribute(key, props[key]);
      }
    });
    
    wrapper.appendChild(labelEl);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  });
  
  return container;
};

// Interactive story with event handling
export const Interactive = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; max-width: 400px;';
  
  const input = document.createElement('ui-input');
  input.setAttribute('placeholder', 'Type something...');
  
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
  
  input.addEventListener('ui-input', (event) => {
    events.unshift(`ui-input: "${event.detail.value}"`);
    if (events.length > 5) events.pop();
    updateOutput();
  });
  
  input.addEventListener('ui-change', (event) => {
    events.unshift(`ui-change: "${event.detail.value}"`);
    if (events.length > 5) events.pop();
    updateOutput();
  });
  
  input.addEventListener('ui-focus', () => {
    events.unshift('ui-focus');
    if (events.length > 5) events.pop();
    updateOutput();
  });
  
  input.addEventListener('ui-blur', () => {
    events.unshift('ui-blur');
    if (events.length > 5) events.pop();
    updateOutput();
  });
  
  updateOutput();
  
  container.appendChild(input);
  container.appendChild(output);
  
  return container;
};

// Form integration story
export const FormIntegration = () => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 400px;';
  
  const form = document.createElement('form');
  form.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 0.375rem;';
  
  const title = document.createElement('h3');
  title.textContent = 'User Registration';
  title.style.cssText = 'margin: 0 0 1rem 0;';
  
  // Name field
  const nameWrapper = document.createElement('div');
  nameWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem;';
  
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Full Name *';
  nameLabel.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: #374151;';
  
  const nameInput = document.createElement('ui-input');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('required', '');
  nameInput.setAttribute('placeholder', 'Enter your full name');
  nameInput.setAttribute('aria-describedby', 'name-help');
  
  const nameHelp = document.createElement('div');
  nameHelp.id = 'name-help';
  nameHelp.textContent = 'Enter your first and last name';
  nameHelp.style.cssText = 'font-size: 0.75rem; color: #6b7280;';
  
  nameWrapper.appendChild(nameLabel);
  nameWrapper.appendChild(nameInput);
  nameWrapper.appendChild(nameHelp);
  
  // Email field
  const emailWrapper = document.createElement('div');
  emailWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem;';
  
  const emailLabel = document.createElement('label');
  emailLabel.textContent = 'Email Address *';
  emailLabel.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: #374151;';
  
  const emailInput = document.createElement('ui-input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('name', 'email');
  emailInput.setAttribute('required', '');
  emailInput.setAttribute('placeholder', 'Enter your email address');
  emailInput.setAttribute('autocomplete', 'email');
  
  emailWrapper.appendChild(emailLabel);
  emailWrapper.appendChild(emailInput);
  
  // Phone field
  const phoneWrapper = document.createElement('div');
  phoneWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem;';
  
  const phoneLabel = document.createElement('label');
  phoneLabel.textContent = 'Phone Number';
  phoneLabel.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: #374151;';
  
  const phoneInput = document.createElement('ui-input');
  phoneInput.setAttribute('type', 'tel');
  phoneInput.setAttribute('name', 'phone');
  phoneInput.setAttribute('placeholder', '(123) 456-7890');
  phoneInput.setAttribute('pattern', '\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}');
  phoneInput.setAttribute('autocomplete', 'tel');
  
  phoneWrapper.appendChild(phoneLabel);
  phoneWrapper.appendChild(phoneInput);
  
  // Age field
  const ageWrapper = document.createElement('div');
  ageWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem;';
  
  const ageLabel = document.createElement('label');
  ageLabel.textContent = 'Age';
  ageLabel.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: #374151;';
  
  const ageInput = document.createElement('ui-input');
  ageInput.setAttribute('type', 'number');
  ageInput.setAttribute('name', 'age');
  ageInput.setAttribute('min', '18');
  ageInput.setAttribute('max', '120');
  ageInput.setAttribute('placeholder', '25');
  
  ageWrapper.appendChild(ageLabel);
  ageWrapper.appendChild(ageInput);
  
  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Register';
  submitButton.style.cssText = 'padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.375rem; font-weight: 500; cursor: pointer;';
  
  // Form validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Reset validation states
    [nameInput, emailInput, phoneInput, ageInput].forEach(input => {
      input.removeAttribute('invalid');
    });
    
    let isValid = true;
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
      nameInput.setAttribute('invalid', '');
      isValid = false;
    }
    
    // Validate email
    if (!data.email || !data.email.includes('@')) {
      emailInput.setAttribute('invalid', '');
      isValid = false;
    }
    
    // Validate phone (if provided)
    if (data.phone && !data.phone.match(/\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}/)) {
      phoneInput.setAttribute('invalid', '');
      isValid = false;
    }
    
    // Validate age (if provided)
    if (data.age && (data.age < 18 || data.age > 120)) {
      ageInput.setAttribute('invalid', '');
      isValid = false;
    }
    
    if (isValid) {
      alert('Registration successful!\\n\\n' + JSON.stringify(data, null, 2));
    } else {
      alert('Please fix the validation errors and try again.');
    }
  });
  
  form.appendChild(title);
  form.appendChild(nameWrapper);
  form.appendChild(emailWrapper);
  form.appendChild(phoneWrapper);
  form.appendChild(ageWrapper);
  form.appendChild(submitButton);
  
  container.appendChild(form);
  
  return container;
};

// Accessibility story
export const AccessibilityTest = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem; max-width: 500px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Accessibility Features';
  container.appendChild(title);
  
  // Labeled input
  const labeledSection = document.createElement('div');
  labeledSection.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
  
  const labeledTitle = document.createElement('h4');
  labeledTitle.textContent = 'Labeled Input';
  labeledTitle.style.cssText = 'margin: 0;';
  
  const label = document.createElement('label');
  label.textContent = 'Username';
  label.style.cssText = 'font-weight: 500;';
  
  const labeledInput = document.createElement('ui-input');
  labeledInput.setAttribute('placeholder', 'Enter username');
  labeledInput.setAttribute('aria-label', 'Username');
  
  labeledSection.appendChild(labeledTitle);
  labeledSection.appendChild(label);
  labeledSection.appendChild(labeledInput);
  
  // Described input
  const describedSection = document.createElement('div');
  describedSection.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
  
  const describedTitle = document.createElement('h4');
  describedTitle.textContent = 'Input with Description';
  describedTitle.style.cssText = 'margin: 0;';
  
  const describedLabel = document.createElement('label');
  describedLabel.textContent = 'Password';
  describedLabel.style.cssText = 'font-weight: 500;';
  
  const describedInput = document.createElement('ui-input');
  describedInput.setAttribute('type', 'password');
  describedInput.setAttribute('placeholder', 'Enter password');
  describedInput.setAttribute('aria-describedby', 'password-desc');
  
  const description = document.createElement('div');
  description.id = 'password-desc';
  description.textContent = 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.';
  description.style.cssText = 'font-size: 0.875rem; color: #6b7280;';
  
  describedSection.appendChild(describedTitle);
  describedSection.appendChild(describedLabel);
  describedSection.appendChild(describedInput);
  describedSection.appendChild(description);
  
  // Error state
  const errorSection = document.createElement('div');
  errorSection.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
  
  const errorTitle = document.createElement('h4');
  errorTitle.textContent = 'Error State';
  errorTitle.style.cssText = 'margin: 0;';
  
  const errorLabel = document.createElement('label');
  errorLabel.textContent = 'Email';
  errorLabel.style.cssText = 'font-weight: 500;';
  
  const errorInput = document.createElement('ui-input');
  errorInput.setAttribute('type', 'email');
  errorInput.setAttribute('value', 'invalid-email');
  errorInput.setAttribute('invalid', '');
  errorInput.setAttribute('aria-describedby', 'email-error');
  
  const errorMessage = document.createElement('div');
  errorMessage.id = 'email-error';
  errorMessage.textContent = 'Please enter a valid email address.';
  errorMessage.style.cssText = 'font-size: 0.875rem; color: #dc2626;';
  
  errorSection.appendChild(errorTitle);
  errorSection.appendChild(errorLabel);
  errorSection.appendChild(errorInput);
  errorSection.appendChild(errorMessage);
  
  container.appendChild(labeledSection);
  container.appendChild(describedSection);
  container.appendChild(errorSection);
  
  return container;
};

// Theming story
export const Theming = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem;';
  
  const title = document.createElement('h3');
  title.textContent = 'Theme Customization';
  container.appendChild(title);
  
  // Default theme
  const defaultSection = document.createElement('div');
  const defaultTitle = document.createElement('h4');
  defaultTitle.textContent = 'Default Theme';
  defaultTitle.style.cssText = 'margin: 0 0 1rem 0;';
  
  const defaultInput = document.createElement('ui-input');
  defaultInput.setAttribute('placeholder', 'Default theme');
  defaultInput.setAttribute('value', 'Default styling');
  
  defaultSection.appendChild(defaultTitle);
  defaultSection.appendChild(defaultInput);
  
  // Custom theme
  const customSection = document.createElement('div');
  const customTitle = document.createElement('h4');
  customTitle.textContent = 'Custom Theme';
  customTitle.style.cssText = 'margin: 0 0 1rem 0;';
  
  const customInput = document.createElement('ui-input');
  customInput.setAttribute('placeholder', 'Custom theme');
  customInput.setAttribute('value', 'Custom styling');
  customInput.style.cssText = `
    --ui-input-background: #fef3c7;
    --ui-input-border: #f59e0b;
    --ui-input-border-radius: 1rem;
    --ui-input-padding-medium: 1rem 1.5rem;
    --ui-input-color: #92400e;
    --ui-input-border-focus: #d97706;
    --ui-input-focus-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
  `;
  
  customSection.appendChild(customTitle);
  customSection.appendChild(customInput);
  
  container.appendChild(defaultSection);
  container.appendChild(customSection);
  
  return container;
};