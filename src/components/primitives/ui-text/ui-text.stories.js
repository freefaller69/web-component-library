import './ui-text.js';

export default {
  title: 'Primitives/Typography/Text',
  component: 'ui-text',
  parameters: {
    docs: {
      description: {
        component: 'A flexible text component supporting multiple variants, sizes, weights, and styling options with comprehensive accessibility features.'
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
      options: ['body', 'heading', 'caption', 'label', 'link'],
      description: 'Text variant affecting default styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description: 'Text size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' }
      }
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' }
      }
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' }
      }
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    clickable: {
      control: 'boolean',
      description: 'Make text clickable with keyboard support',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    color: {
      control: 'color',
      description: 'Custom text color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
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
      description: 'Text content',
      table: {
        type: { summary: 'string | HTML' }
      }
    }
  }
};

// Template for creating text instances
const Template = (args) => {
  const text = document.createElement('ui-text');
  
  Object.keys(args).forEach(key => {
    if (key === 'children') {
      text.innerHTML = args[key];
    } else if (key === 'aria-label') {
      if (args[key]) text.setAttribute('aria-label', args[key]);
    } else if (typeof args[key] === 'boolean') {
      if (args[key]) text.setAttribute(key, '');
    } else if (args[key]) {
      text.setAttribute(key, args[key]);
    }
  });
  
  return text;
};

// Basic variant stories
export const Body = Template.bind({});
Body.args = {
  variant: 'body',
  children: 'This is body text that can be used for paragraphs and general content.'
};

export const Heading = Template.bind({});
Heading.args = {
  variant: 'heading',
  size: 'xl',
  children: 'This is a heading'
};

export const Caption = Template.bind({});
Caption.args = {
  variant: 'caption',
  size: 'sm',
  children: 'This is caption text for additional context'
};

export const Label = Template.bind({});
Label.args = {
  variant: 'label',
  size: 'sm',
  children: 'Form Label'
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
  clickable: true,
  children: 'This is a clickable link'
};

// Size variations
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: 'xs',
  children: 'Extra small text'
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Small text'
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  size: 'md',
  children: 'Medium text (default)'
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Large text'
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xl',
  children: 'Extra large text'
};

// Weight variations
export const Normal = Template.bind({});
Normal.args = {
  weight: 'normal',
  children: 'Normal weight text'
};

export const MediumWeight = Template.bind({});
MediumWeight.args = {
  weight: 'medium',
  children: 'Medium weight text'
};

export const Semibold = Template.bind({});
Semibold.args = {
  weight: 'semibold',
  children: 'Semibold weight text'
};

export const Bold = Template.bind({});
Bold.args = {
  weight: 'bold',
  children: 'Bold weight text'
};

// Alignment variations
export const LeftAlign = Template.bind({});
LeftAlign.args = {
  align: 'left',
  children: 'Left aligned text'
};

export const CenterAlign = Template.bind({});
CenterAlign.args = {
  align: 'center',
  children: 'Center aligned text'
};

export const RightAlign = Template.bind({});
RightAlign.args = {
  align: 'right',
  children: 'Right aligned text'
};

export const JustifyAlign = Template.bind({});
JustifyAlign.args = {
  align: 'justify',
  children: 'Justified text that will be evenly distributed across the line with spaces adjusted to create clean edges on both sides of the paragraph.'
};

// Special features
export const Truncated = Template.bind({});
Truncated.args = {
  truncate: true,
  children: 'This is a very long text that will be truncated with an ellipsis when it exceeds the available width of its container'
};

export const Clickable = Template.bind({});
Clickable.args = {
  clickable: true,
  children: 'Click me! I am interactive text'
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  color: 'hsl(340, 82%, 52%)',
  children: 'Text with custom color'
};

export const WithAriaLabel = Template.bind({});
WithAriaLabel.args = {
  'aria-label': 'Close button',
  clickable: true,
  children: '×'
};

// Showcase stories
export const AllVariants = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  
  const variants = ['body', 'heading', 'caption', 'label', 'link'];
  
  variants.forEach(variant => {
    const text = document.createElement('ui-text');
    text.setAttribute('variant', variant);
    if (variant === 'link') text.setAttribute('clickable', '');
    text.textContent = `${variant.charAt(0).toUpperCase() + variant.slice(1)} variant`;
    container.appendChild(text);
  });
  
  return container;
};

export const AllSizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
  
  sizes.forEach(size => {
    const text = document.createElement('ui-text');
    text.setAttribute('size', size);
    text.textContent = `Size ${size}`;
    container.appendChild(text);
  });
  
  return container;
};

export const AllWeights = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  
  const weights = ['normal', 'medium', 'semibold', 'bold'];
  
  weights.forEach(weight => {
    const text = document.createElement('ui-text');
    text.setAttribute('weight', weight);
    text.textContent = `${weight.charAt(0).toUpperCase() + weight.slice(1)} weight`;
    container.appendChild(text);
  });
  
  return container;
};

export const AllAlignments = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; width: 300px; border: 1px solid hsl(220, 9%, 86%); padding: 1rem;';
  
  const alignments = ['left', 'center', 'right', 'justify'];
  
  alignments.forEach(align => {
    const text = document.createElement('ui-text');
    text.setAttribute('align', align);
    text.textContent = `${align.charAt(0).toUpperCase() + align.slice(1)} aligned text that demonstrates the alignment behavior`;
    container.appendChild(text);
  });
  
  return container;
};

export const HeadingHierarchy = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  
  const headingSizes = ['6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg'];
  
  headingSizes.forEach((size, index) => {
    const text = document.createElement('ui-text');
    text.setAttribute('variant', 'heading');
    text.setAttribute('size', size);
    text.textContent = `H${index + 1} Heading (${size})`;
    container.appendChild(text);
  });
  
  return container;
};

export const TypographyScale = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
  
  const scales = [
    { size: '6xl', label: 'Display 1' },
    { size: '5xl', label: 'Display 2' },
    { size: '4xl', label: 'Display 3' },
    { size: '3xl', label: 'Heading 1' },
    { size: '2xl', label: 'Heading 2' },
    { size: 'xl', label: 'Heading 3' },
    { size: 'lg', label: 'Heading 4' },
    { size: 'md', label: 'Body Large' },
    { size: 'sm', label: 'Body Small' },
    { size: 'xs', label: 'Caption' }
  ];
  
  scales.forEach(({ size, label }) => {
    const text = document.createElement('ui-text');
    text.setAttribute('size', size);
    text.setAttribute('variant', size.includes('xl') || size === 'lg' ? 'heading' : 'body');
    text.textContent = `${label} (${size})`;
    container.appendChild(text);
  });
  
  return container;
};

// Interactive story
export const Interactive = Template.bind({});
Interactive.args = {
  clickable: true,
  children: 'Click me to see interaction!'
};

Interactive.play = async ({ canvasElement }) => {
  const text = canvasElement.querySelector('ui-text');
  
  // Add event listener for demonstration
  text.addEventListener('ui-text-click', (event) => {
    console.log('Text clicked:', event.detail);
    
    // Change color briefly
    const originalColor = text.color;
    text.color = 'hsl(340, 82%, 52%)';
    
    setTimeout(() => {
      text.color = originalColor;
    }, 500);
  });
};

// Accessibility testing story
export const AccessibilityTest = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; max-width: 600px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Accessibility Features';
  container.appendChild(title);
  
  // Clickable text with aria-label
  const labeledText = document.createElement('ui-text');
  labeledText.setAttribute('clickable', '');
  labeledText.setAttribute('aria-label', 'Close dialog');
  labeledText.textContent = '×';
  labeledText.style.cssText = 'font-size: 1.5rem; cursor: pointer;';
  
  const labelDescription = document.createElement('p');
  labelDescription.textContent = 'Icon text with aria-label for screen readers';
  labelDescription.style.cssText = 'margin: 0.5rem 0; font-size: 0.875rem; color: hsl(220, 9%, 40%);';
  
  container.appendChild(labeledText);
  container.appendChild(labelDescription);
  
  // Keyboard navigation demo
  const keyboardSection = document.createElement('div');
  keyboardSection.style.cssText = 'margin-top: 1rem; padding: 1rem; border: 1px solid hsl(220, 9%, 86%); border-radius: 0.375rem;';
  
  const keyboardTitle = document.createElement('h4');
  keyboardTitle.textContent = 'Keyboard Navigation';
  keyboardTitle.style.cssText = 'margin: 0 0 0.5rem 0;';
  
  const clickableText1 = document.createElement('ui-text');
  clickableText1.setAttribute('clickable', '');
  clickableText1.textContent = 'First clickable text';
  clickableText1.style.cssText = 'display: block; margin: 0.5rem 0;';
  
  const clickableText2 = document.createElement('ui-text');
  clickableText2.setAttribute('clickable', '');
  clickableText2.textContent = 'Second clickable text';
  clickableText2.style.cssText = 'display: block; margin: 0.5rem 0;';
  
  const clickableText3 = document.createElement('ui-text');
  clickableText3.setAttribute('clickable', '');
  clickableText3.textContent = 'Third clickable text';
  clickableText3.style.cssText = 'display: block; margin: 0.5rem 0;';
  
  keyboardSection.appendChild(keyboardTitle);
  keyboardSection.appendChild(clickableText1);
  keyboardSection.appendChild(clickableText2);
  keyboardSection.appendChild(clickableText3);
  
  container.appendChild(keyboardSection);
  
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
  
  const defaultTexts = document.createElement('div');
  defaultTexts.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
  
  ['body', 'heading', 'caption', 'label', 'link'].forEach(variant => {
    const text = document.createElement('ui-text');
    text.setAttribute('variant', variant);
    if (variant === 'link') text.setAttribute('clickable', '');
    text.textContent = `${variant.charAt(0).toUpperCase() + variant.slice(1)} variant`;
    defaultTexts.appendChild(text);
  });
  
  defaultSection.appendChild(defaultTitle);
  defaultSection.appendChild(defaultTexts);
  container.appendChild(defaultSection);
  
  // Custom theme
  const customSection = document.createElement('div');
  const customTitle = document.createElement('h4');
  customTitle.textContent = 'Custom Theme';
  customTitle.style.cssText = 'margin: 0 0 1rem 0;';
  
  const customTexts = document.createElement('div');
  customTexts.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
  
  const customText1 = document.createElement('ui-text');
  customText1.setAttribute('variant', 'heading');
  customText1.setAttribute('size', 'xl');
  customText1.textContent = 'Custom Heading';
  customText1.style.cssText = `
    --ui-text-color-default: hsl(340, 82%, 52%);
    --ui-text-font-weight-semibold: 800;
  `;
  
  const customText2 = document.createElement('ui-text');
  customText2.setAttribute('variant', 'body');
  customText2.textContent = 'Custom Body Text';
  customText2.style.cssText = `
    --ui-text-color-default: hsl(36, 100%, 50%);
    --ui-text-font-size-md: 1.1rem;
  `;
  
  const customText3 = document.createElement('ui-text');
  customText3.setAttribute('variant', 'link');
  customText3.setAttribute('clickable', '');
  customText3.textContent = 'Custom Link';
  customText3.style.cssText = `
    --ui-text-color-link: hsl(292, 74%, 42%);
    --ui-text-color-link-hover: hsl(292, 74%, 32%);
  `;
  
  customTexts.appendChild(customText1);
  customTexts.appendChild(customText2);
  customTexts.appendChild(customText3);
  
  customSection.appendChild(customTitle);
  customSection.appendChild(customTexts);
  container.appendChild(customSection);
  
  return container;
};

// Truncation demo
export const TruncationDemo = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; width: 300px; border: 1px solid hsl(220, 9%, 86%); padding: 1rem;';
  
  const title = document.createElement('h3');
  title.textContent = 'Truncation Examples';
  title.style.cssText = 'margin: 0 0 1rem 0;';
  container.appendChild(title);
  
  const normalText = document.createElement('ui-text');
  normalText.textContent = 'This is normal text that will wrap naturally to multiple lines when it exceeds the container width.';
  normalText.style.cssText = 'margin-bottom: 1rem;';
  
  const truncatedText = document.createElement('ui-text');
  truncatedText.setAttribute('truncate', '');
  truncatedText.textContent = 'This is truncated text that will be cut off with an ellipsis when it exceeds the container width.';
  
  container.appendChild(normalText);
  container.appendChild(truncatedText);
  
  return container;
};