import './ui-button.js';

export default {
  title: 'Primitives/Interactive/Button',
  component: 'ui-button',
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component supporting multiple variants, sizes, and states with comprehensive accessibility features.'
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
            id: 'focus-order-semantics',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
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
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
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
    },
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'string | HTML' }
      }
    }
  }
};

// Template for creating button instances
const Template = (args) => {
  const button = document.createElement('ui-button');
  
  Object.keys(args).forEach(key => {
    if (key === 'children') {
      button.innerHTML = args[key];
    } else if (key === 'aria-label') {
      if (args[key]) button.setAttribute('aria-label', args[key]);
    } else if (typeof args[key] === 'boolean') {
      if (args[key]) button.setAttribute(key, '');
    } else if (args[key]) {
      button.setAttribute(key, args[key]);
    }
  });
  
  return button;
};

// Individual stories
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button'
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  children: 'Ghost Button'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small Button'
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  children: 'Medium Button'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Large Button'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Disabled Button'
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  children: 'Loading Button'
};

export const WithAriaLabel = Template.bind({});
WithAriaLabel.args = {
  'aria-label': 'Close dialog',
  children: '×'
};

export const ComplexContent = Template.bind({});
ComplexContent.args = {
  children: '<span style="margin-right: 8px;">🚀</span><span>Launch</span>'
};

// Showcase stories
export const AllVariants = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;';
  
  ['primary', 'secondary', 'ghost'].forEach(variant => {
    const button = document.createElement('ui-button');
    button.setAttribute('variant', variant);
    button.textContent = variant.charAt(0).toUpperCase() + variant.slice(1);
    container.appendChild(button);
  });
  
  return container;
};

export const AllSizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;';
  
  ['small', 'medium', 'large'].forEach(size => {
    const button = document.createElement('ui-button');
    button.setAttribute('size', size);
    button.textContent = size.charAt(0).toUpperCase() + size.slice(1);
    container.appendChild(button);
  });
  
  return container;
};

export const AllStates = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;';
  
  // Normal
  const normal = document.createElement('ui-button');
  normal.textContent = 'Normal';
  container.appendChild(normal);
  
  // Disabled
  const disabled = document.createElement('ui-button');
  disabled.setAttribute('disabled', '');
  disabled.textContent = 'Disabled';
  container.appendChild(disabled);
  
  // Loading
  const loading = document.createElement('ui-button');
  loading.setAttribute('loading', '');
  loading.textContent = 'Loading';
  container.appendChild(loading);
  
  return container;
};

export const VariantSizeCombinations = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 600px;';
  
  const variants = ['primary', 'secondary', 'ghost'];
  const sizes = ['small', 'medium', 'large'];
  
  variants.forEach(variant => {
    sizes.forEach(size => {
      const button = document.createElement('ui-button');
      button.setAttribute('variant', variant);
      button.setAttribute('size', size);
      button.textContent = `${variant} ${size}`;
      container.appendChild(button);
    });
  });
  
  return container;
};

// Interactive story with play function
export const Interactive = Template.bind({});
Interactive.args = {
  variant: 'primary',
  children: 'Click me!'
};

Interactive.play = async ({ canvasElement }) => {
  const button = canvasElement.querySelector('ui-button');
  
  // Add event listener for demonstration
  button.addEventListener('ui-click', (event) => {
    console.log('Button clicked:', event.detail);
    
    // Show loading state briefly
    button.loading = true;
    button.textContent = 'Loading...';
    
    setTimeout(() => {
      button.loading = false;
      button.textContent = 'Click me!';
    }, 2000);
  });
};

// Accessibility testing story
export const AccessibilityTest = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; max-width: 400px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Accessibility Features';
  container.appendChild(title);
  
  // Button with aria-label
  const labeledButton = document.createElement('ui-button');
  labeledButton.setAttribute('aria-label', 'Close dialog');
  labeledButton.textContent = '×';
  labeledButton.style.cssText = 'width: 2rem; height: 2rem; font-size: 1.2rem;';
  
  const labelDescription = document.createElement('p');
  labelDescription.textContent = 'Button with aria-label for icon-only buttons';
  labelDescription.style.cssText = 'margin: 0; font-size: 0.875rem; color: #666;';
  
  container.appendChild(labeledButton);
  container.appendChild(labelDescription);
  
  // Button with describedby
  const describedButton = document.createElement('ui-button');
  describedButton.id = 'submit-btn';
  describedButton.textContent = 'Submit';
  describedButton.setAttribute('aria-describedby', 'submit-desc');
  
  const description = document.createElement('div');
  description.id = 'submit-desc';
  description.textContent = 'This will submit the form and cannot be undone';
  description.style.cssText = 'font-size: 0.875rem; color: #666; margin-top: 0.5rem;';
  
  container.appendChild(describedButton);
  container.appendChild(description);
  
  // Focus management demo
  const focusSection = document.createElement('div');
  focusSection.style.cssText = 'margin-top: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 0.375rem;';
  
  const focusTitle = document.createElement('h4');
  focusTitle.textContent = 'Focus Management';
  focusTitle.style.cssText = 'margin: 0 0 0.5rem 0;';
  
  const focusButton1 = document.createElement('ui-button');
  focusButton1.textContent = 'First';
  focusButton1.style.cssText = 'margin-right: 0.5rem;';
  
  const focusButton2 = document.createElement('ui-button');
  focusButton2.textContent = 'Second';
  focusButton2.style.cssText = 'margin-right: 0.5rem;';
  
  const focusButton3 = document.createElement('ui-button');
  focusButton3.textContent = 'Third';
  
  focusSection.appendChild(focusTitle);
  focusSection.appendChild(focusButton1);
  focusSection.appendChild(focusButton2);
  focusSection.appendChild(focusButton3);
  
  container.appendChild(focusSection);
  
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
  
  const defaultButtons = document.createElement('div');
  defaultButtons.style.cssText = 'display: flex; gap: 1rem;';
  
  ['primary', 'secondary', 'ghost'].forEach(variant => {
    const button = document.createElement('ui-button');
    button.setAttribute('variant', variant);
    button.textContent = variant.charAt(0).toUpperCase() + variant.slice(1);
    defaultButtons.appendChild(button);
  });
  
  defaultSection.appendChild(defaultTitle);
  defaultSection.appendChild(defaultButtons);
  container.appendChild(defaultSection);
  
  // Custom theme
  const customSection = document.createElement('div');
  const customTitle = document.createElement('h4');
  customTitle.textContent = 'Custom Theme';
  customTitle.style.cssText = 'margin: 0 0 1rem 0;';
  
  const customButtons = document.createElement('div');
  customButtons.style.cssText = 'display: flex; gap: 1rem;';
  
  const customButton1 = document.createElement('ui-button');
  customButton1.setAttribute('variant', 'primary');
  customButton1.textContent = 'Custom Primary';
  customButton1.style.cssText = `
    --button-bg: #e91e63;
    --button-border: #e91e63;
    --button-border-radius: 1.5rem;
    --button-padding-x: 2rem;
  `;
  
  const customButton2 = document.createElement('ui-button');
  customButton2.setAttribute('variant', 'secondary');
  customButton2.textContent = 'Custom Secondary';
  customButton2.style.cssText = `
    --button-bg: #ff9800;
    --button-border: #ff9800;
    --button-border-radius: 0.125rem;
    --button-font-weight: 700;
  `;
  
  const customButton3 = document.createElement('ui-button');
  customButton3.setAttribute('variant', 'ghost');
  customButton3.textContent = 'Custom Ghost';
  customButton3.style.cssText = `
    --button-color: #9c27b0;
    --button-border: #9c27b0;
    --button-border-radius: 0;
    --button-font-size: 0.875rem;
  `;
  
  customButtons.appendChild(customButton1);
  customButtons.appendChild(customButton2);
  customButtons.appendChild(customButton3);
  
  customSection.appendChild(customTitle);
  customSection.appendChild(customButtons);
  container.appendChild(customSection);
  
  return container;
};

// Form integration story
export const FormIntegration = () => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 400px;';
  
  const form = document.createElement('form');
  form.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 0.375rem;';
  
  const title = document.createElement('h3');
  title.textContent = 'Form Integration';
  title.style.cssText = 'margin: 0 0 1rem 0;';
  
  const input = document.createElement('input');
  input.type = 'email';
  input.placeholder = 'Enter your email';
  input.required = true;
  input.style.cssText = 'padding: 0.5rem; border: 1px solid #ddd; border-radius: 0.375rem;';
  
  const buttonRow = document.createElement('div');
  buttonRow.style.cssText = 'display: flex; gap: 1rem;';
  
  const submitButton = document.createElement('ui-button');
  submitButton.setAttribute('variant', 'primary');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value) {
      submitButton.loading = true;
      submitButton.textContent = 'Submitting...';
      
      setTimeout(() => {
        submitButton.loading = false;
        submitButton.textContent = 'Submit';
        alert('Form submitted successfully!');
      }, 2000);
    } else {
      alert('Please enter an email address');
    }
  });
  
  const cancelButton = document.createElement('ui-button');
  cancelButton.setAttribute('variant', 'ghost');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
    input.focus();
  });
  
  buttonRow.appendChild(submitButton);
  buttonRow.appendChild(cancelButton);
  
  form.appendChild(title);
  form.appendChild(input);
  form.appendChild(buttonRow);
  
  container.appendChild(form);
  
  return container;
};