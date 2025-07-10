import './ui-box.js';

export default {
  title: 'Primitives/Layout/Box',
  component: 'ui-box',
  parameters: {
    docs: {
      description: {
        component: 'A flexible layout component providing spacing, styling, and container functionality with comprehensive theming support.'
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
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description: 'Internal spacing',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' }
      }
    },
    margin: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description: 'External spacing',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' }
      }
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' }
      }
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner'],
      description: 'Box shadow',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' }
      }
    },
    background: {
      control: 'color',
      description: 'Background color or gradient',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    border: {
      control: 'text',
      description: 'Border style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    width: {
      control: 'text',
      description: 'Box width',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    height: {
      control: 'text',
      description: 'Box height',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    overflow: {
      control: 'select',
      options: ['', 'visible', 'hidden', 'scroll', 'auto'],
      description: 'Overflow behavior',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    display: {
      control: 'select',
      options: ['', 'block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid'],
      description: 'Display type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    'flex-direction': {
      control: 'select',
      options: ['', 'row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Flex direction (when display is flex)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    'justify-content': {
      control: 'select',
      options: ['', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justify content (when display is flex)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    'align-items': {
      control: 'select',
      options: ['', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Align items (when display is flex)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    gap: {
      control: 'text',
      description: 'Gap between flex/grid items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    clickable: {
      control: 'boolean',
      description: 'Make box clickable with keyboard support',
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
      description: 'Box content',
      table: {
        type: { summary: 'string | HTML' }
      }
    }
  }
};

// Template for creating box instances
const Template = (args) => {
  const box = document.createElement('ui-box');
  
  Object.keys(args).forEach(key => {
    if (key === 'children') {
      box.innerHTML = args[key];
    } else if (key === 'aria-label') {
      if (args[key]) box.setAttribute('aria-label', args[key]);
    } else if (typeof args[key] === 'boolean') {
      if (args[key]) box.setAttribute(key, '');
    } else if (args[key]) {
      box.setAttribute(key, args[key]);
    }
  });
  
  return box;
};

// Basic spacing stories
export const BasicBox = Template.bind({});
BasicBox.args = {
  padding: 'md',
  background: 'hsl(210, 100%, 95%)',
  border: '1px solid hsl(210, 100%, 85%)',
  children: 'This is a basic box with padding and border'
};

export const WithShadow = Template.bind({});
WithShadow.args = {
  padding: 'lg',
  radius: 'md',
  shadow: 'md',
  background: 'hsl(0, 0%, 100%)',
  children: 'Box with shadow and rounded corners'
};

export const ClickableBox = Template.bind({});
ClickableBox.args = {
  padding: 'md',
  radius: 'lg',
  shadow: 'sm',
  background: 'hsl(200, 100%, 95%)',
  clickable: true,
  children: 'Click me! I am an interactive box'
};

// Padding variations
export const PaddingXS = Template.bind({});
PaddingXS.args = {
  padding: 'xs',
  background: 'hsl(120, 100%, 95%)',
  border: '1px solid hsl(120, 100%, 85%)',
  children: 'Extra small padding'
};

export const PaddingSmall = Template.bind({});
PaddingSmall.args = {
  padding: 'sm',
  background: 'hsl(120, 100%, 95%)',
  border: '1px solid hsl(120, 100%, 85%)',
  children: 'Small padding'
};

export const PaddingMedium = Template.bind({});
PaddingMedium.args = {
  padding: 'md',
  background: 'hsl(120, 100%, 95%)',
  border: '1px solid hsl(120, 100%, 85%)',
  children: 'Medium padding'
};

export const PaddingLarge = Template.bind({});
PaddingLarge.args = {
  padding: 'lg',
  background: 'hsl(120, 100%, 95%)',
  border: '1px solid hsl(120, 100%, 85%)',
  children: 'Large padding'
};

export const PaddingXL = Template.bind({});
PaddingXL.args = {
  padding: 'xl',
  background: 'hsl(120, 100%, 95%)',
  border: '1px solid hsl(120, 100%, 85%)',
  children: 'Extra large padding'
};

// Margin variations
export const MarginSmall = Template.bind({});
MarginSmall.args = {
  margin: 'sm',
  padding: 'md',
  background: 'hsl(300, 100%, 95%)',
  border: '1px solid hsl(300, 100%, 85%)',
  children: 'Small margin'
};

export const MarginMedium = Template.bind({});
MarginMedium.args = {
  margin: 'md',
  padding: 'md',
  background: 'hsl(300, 100%, 95%)',
  border: '1px solid hsl(300, 100%, 85%)',
  children: 'Medium margin'
};

export const MarginLarge = Template.bind({});
MarginLarge.args = {
  margin: 'lg',
  padding: 'md',
  background: 'hsl(300, 100%, 95%)',
  border: '1px solid hsl(300, 100%, 85%)',
  children: 'Large margin'
};

// Radius variations
export const RadiusSmall = Template.bind({});
RadiusSmall.args = {
  padding: 'md',
  radius: 'sm',
  background: 'hsl(60, 100%, 95%)',
  border: '1px solid hsl(60, 100%, 85%)',
  children: 'Small radius'
};

export const RadiusMedium = Template.bind({});
RadiusMedium.args = {
  padding: 'md',
  radius: 'md',
  background: 'hsl(60, 100%, 95%)',
  border: '1px solid hsl(60, 100%, 85%)',
  children: 'Medium radius'
};

export const RadiusLarge = Template.bind({});
RadiusLarge.args = {
  padding: 'md',
  radius: 'lg',
  background: 'hsl(60, 100%, 95%)',
  border: '1px solid hsl(60, 100%, 85%)',
  children: 'Large radius'
};

export const RadiusFull = Template.bind({});
RadiusFull.args = {
  padding: 'md',
  radius: 'full',
  background: 'hsl(60, 100%, 95%)',
  border: '1px solid hsl(60, 100%, 85%)',
  width: '100px',
  height: '100px',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  children: 'Circle'
};

// Shadow variations
export const ShadowSmall = Template.bind({});
ShadowSmall.args = {
  padding: 'md',
  shadow: 'sm',
  background: 'hsl(0, 0%, 100%)',
  children: 'Small shadow'
};

export const ShadowMedium = Template.bind({});
ShadowMedium.args = {
  padding: 'md',
  shadow: 'md',
  background: 'hsl(0, 0%, 100%)',
  children: 'Medium shadow'
};

export const ShadowLarge = Template.bind({});
ShadowLarge.args = {
  padding: 'md',
  shadow: 'lg',
  background: 'hsl(0, 0%, 100%)',
  children: 'Large shadow'
};

export const ShadowXL = Template.bind({});
ShadowXL.args = {
  padding: 'md',
  shadow: 'xl',
  background: 'hsl(0, 0%, 100%)',
  children: 'Extra large shadow'
};

export const ShadowInner = Template.bind({});
ShadowInner.args = {
  padding: 'md',
  shadow: 'inner',
  background: 'hsl(0, 0%, 95%)',
  children: 'Inner shadow'
};

// Layout examples
export const FlexRow = Template.bind({});
FlexRow.args = {
  display: 'flex',
  'flex-direction': 'row',
  gap: '1rem',
  padding: 'md',
  background: 'hsl(200, 100%, 95%)',
  border: '1px solid hsl(200, 100%, 85%)',
  children: '<div style="background: hsl(0, 100%, 95%); padding: 0.5rem;">Item 1</div><div style="background: hsl(120, 100%, 95%); padding: 0.5rem;">Item 2</div><div style="background: hsl(240, 100%, 95%); padding: 0.5rem;">Item 3</div>'
};

export const FlexColumn = Template.bind({});
FlexColumn.args = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '1rem',
  padding: 'md',
  background: 'hsl(200, 100%, 95%)',
  border: '1px solid hsl(200, 100%, 85%)',
  children: '<div style="background: hsl(0, 100%, 95%); padding: 0.5rem;">Item 1</div><div style="background: hsl(120, 100%, 95%); padding: 0.5rem;">Item 2</div><div style="background: hsl(240, 100%, 95%); padding: 0.5rem;">Item 3</div>'
};

export const FlexCenter = Template.bind({});
FlexCenter.args = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  height: '200px',
  background: 'hsl(200, 100%, 95%)',
  border: '1px solid hsl(200, 100%, 85%)',
  children: '<div style="background: hsl(0, 100%, 95%); padding: 1rem;">Centered Content</div>'
};

export const FlexSpaceBetween = Template.bind({});
FlexSpaceBetween.args = {
  display: 'flex',
  'justify-content': 'space-between',
  'align-items': 'center',
  padding: 'md',
  background: 'hsl(200, 100%, 95%)',
  border: '1px solid hsl(200, 100%, 85%)',
  children: '<div style="background: hsl(0, 100%, 95%); padding: 0.5rem;">Left</div><div style="background: hsl(120, 100%, 95%); padding: 0.5rem;">Right</div>'
};

// Sizing examples
export const FixedSize = Template.bind({});
FixedSize.args = {
  width: '200px',
  height: '100px',
  padding: 'md',
  background: 'hsl(240, 100%, 95%)',
  border: '1px solid hsl(240, 100%, 85%)',
  children: 'Fixed size box (200x100px)'
};

export const ResponsiveSize = Template.bind({});
ResponsiveSize.args = {
  width: '50%',
  height: '10vh',
  padding: 'md',
  background: 'hsl(240, 100%, 95%)',
  border: '1px solid hsl(240, 100%, 85%)',
  children: 'Responsive size box (50% width, 10vh height)'
};

// Overflow examples
export const OverflowHidden = Template.bind({});
OverflowHidden.args = {
  width: '200px',
  height: '100px',
  padding: 'md',
  overflow: 'hidden',
  background: 'hsl(30, 100%, 95%)',
  border: '1px solid hsl(30, 100%, 85%)',
  children: 'This is a very long text that will be clipped because the overflow is set to hidden and the container has fixed dimensions.'
};

export const OverflowScroll = Template.bind({});
OverflowScroll.args = {
  width: '200px',
  height: '100px',
  padding: 'md',
  overflow: 'auto',
  background: 'hsl(30, 100%, 95%)',
  border: '1px solid hsl(30, 100%, 85%)',
  children: 'This is a very long text that will show scrollbars because the overflow is set to auto and the container has fixed dimensions. You can scroll to see all the content.'
};

// Showcase stories
export const AllPaddings = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;';
  
  const paddings = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  
  paddings.forEach(padding => {
    const box = document.createElement('ui-box');
    box.setAttribute('padding', padding);
    box.setAttribute('background', 'hsl(200, 100%, 95%)');
    box.setAttribute('border', '1px solid hsl(200, 100%, 85%)');
    box.textContent = `Padding: ${padding}`;
    container.appendChild(box);
  });
  
  return container;
};

export const AllMargins = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-wrap: wrap; align-items: flex-start; background: hsl(0, 0%, 95%); padding: 1rem;';
  
  const margins = ['xs', 'sm', 'md', 'lg', 'xl'];
  
  margins.forEach(margin => {
    const box = document.createElement('ui-box');
    box.setAttribute('margin', margin);
    box.setAttribute('padding', 'sm');
    box.setAttribute('background', 'hsl(300, 100%, 95%)');
    box.setAttribute('border', '1px solid hsl(300, 100%, 85%)');
    box.textContent = `Margin: ${margin}`;
    container.appendChild(box);
  });
  
  return container;
};

export const AllRadii = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;';
  
  const radii = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  
  radii.forEach(radius => {
    const box = document.createElement('ui-box');
    box.setAttribute('padding', 'md');
    box.setAttribute('radius', radius);
    box.setAttribute('background', 'hsl(60, 100%, 95%)');
    box.setAttribute('border', '1px solid hsl(60, 100%, 85%)');
    box.textContent = `Radius: ${radius}`;
    container.appendChild(box);
  });
  
  return container;
};

export const AllShadows = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start; padding: 2rem;';
  
  const shadows = ['sm', 'md', 'lg', 'xl', '2xl'];
  
  shadows.forEach(shadow => {
    const box = document.createElement('ui-box');
    box.setAttribute('padding', 'md');
    box.setAttribute('shadow', shadow);
    box.setAttribute('background', 'hsl(0, 0%, 100%)');
    box.textContent = `Shadow: ${shadow}`;
    container.appendChild(box);
  });
  
  return container;
};

export const LayoutPatterns = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem;';
  
  // Card pattern
  const card = document.createElement('ui-box');
  card.setAttribute('padding', 'lg');
  card.setAttribute('radius', 'lg');
  card.setAttribute('shadow', 'md');
  card.setAttribute('background', 'hsl(0, 0%, 100%)');
  card.innerHTML = `
    <h3 style="margin: 0 0 1rem 0;">Card Pattern</h3>
    <p style="margin: 0;">This is a card-style layout with padding, radius, and shadow.</p>
  `;
  
  const cardLabel = document.createElement('div');
  cardLabel.style.cssText = 'font-weight: bold; margin-bottom: 0.5rem;';
  cardLabel.textContent = 'Card Layout:';
  
  // Panel pattern
  const panel = document.createElement('ui-box');
  panel.setAttribute('padding', 'md');
  panel.setAttribute('radius', 'md');
  panel.setAttribute('background', 'hsl(210, 100%, 95%)');
  panel.setAttribute('border', '1px solid hsl(210, 100%, 85%)');
  panel.innerHTML = `
    <h4 style="margin: 0 0 0.5rem 0;">Panel Pattern</h4>
    <p style="margin: 0;">A panel with background and border.</p>
  `;
  
  const panelLabel = document.createElement('div');
  panelLabel.style.cssText = 'font-weight: bold; margin-bottom: 0.5rem;';
  panelLabel.textContent = 'Panel Layout:';
  
  // Hero section pattern
  const hero = document.createElement('ui-box');
  hero.setAttribute('padding', '3xl');
  hero.setAttribute('display', 'flex');
  hero.setAttribute('flex-direction', 'column');
  hero.setAttribute('align-items', 'center');
  hero.setAttribute('justify-content', 'center');
  hero.setAttribute('background', 'linear-gradient(135deg, hsl(240, 100%, 95%), hsl(300, 100%, 95%))');
  hero.setAttribute('radius', 'xl');
  hero.innerHTML = `
    <h2 style="margin: 0 0 1rem 0; text-align: center;">Hero Section</h2>
    <p style="margin: 0; text-align: center;">Centered content with gradient background.</p>
  `;
  
  const heroLabel = document.createElement('div');
  heroLabel.style.cssText = 'font-weight: bold; margin-bottom: 0.5rem;';
  heroLabel.textContent = 'Hero Section:';
  
  container.appendChild(cardLabel);
  container.appendChild(card);
  container.appendChild(panelLabel);
  container.appendChild(panel);
  container.appendChild(heroLabel);
  container.appendChild(hero);
  
  return container;
};

// Interactive story
export const Interactive = Template.bind({});
Interactive.args = {
  padding: 'lg',
  radius: 'md',
  shadow: 'sm',
  background: 'hsl(200, 100%, 95%)',
  clickable: true,
  children: 'Click me to see interaction!'
};

Interactive.play = async ({ canvasElement }) => {
  const box = canvasElement.querySelector('ui-box');
  
  // Add event listener for demonstration
  box.addEventListener('ui-box-click', (event) => {
    console.log('Box clicked:', event.detail);
    
    // Change background briefly
    const originalBackground = box.background;
    box.background = 'hsl(120, 100%, 95%)';
    
    setTimeout(() => {
      box.background = originalBackground;
    }, 500);
  });
};

// Accessibility testing story
export const AccessibilityTest = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem; max-width: 600px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Accessibility Features';
  container.appendChild(title);
  
  // Clickable box with aria-label
  const labeledBox = document.createElement('ui-box');
  labeledBox.setAttribute('clickable', '');
  labeledBox.setAttribute('aria-label', 'Interactive card');
  labeledBox.setAttribute('padding', 'md');
  labeledBox.setAttribute('radius', 'md');
  labeledBox.setAttribute('shadow', 'sm');
  labeledBox.setAttribute('background', 'hsl(0, 0%, 100%)');
  labeledBox.innerHTML = `
    <h4 style="margin: 0 0 0.5rem 0;">Clickable Card</h4>
    <p style="margin: 0;">This card has an aria-label for screen readers.</p>
  `;
  
  const labelDescription = document.createElement('p');
  labelDescription.textContent = 'Clickable box with aria-label for accessibility';
  labelDescription.style.cssText = 'margin: 0.5rem 0; font-size: 0.875rem; color: hsl(220, 9%, 40%);';
  
  container.appendChild(labeledBox);
  container.appendChild(labelDescription);
  
  // Keyboard navigation demo
  const keyboardSection = document.createElement('div');
  keyboardSection.style.cssText = 'margin-top: 1rem; padding: 1rem; border: 1px solid hsl(220, 9%, 86%); border-radius: 0.375rem;';
  
  const keyboardTitle = document.createElement('h4');
  keyboardTitle.textContent = 'Keyboard Navigation';
  keyboardTitle.style.cssText = 'margin: 0 0 1rem 0;';
  
  const keyboardBoxes = document.createElement('div');
  keyboardBoxes.style.cssText = 'display: flex; gap: 1rem; flex-wrap: wrap;';
  
  ['First', 'Second', 'Third'].forEach(label => {
    const box = document.createElement('ui-box');
    box.setAttribute('clickable', '');
    box.setAttribute('padding', 'md');
    box.setAttribute('radius', 'md');
    box.setAttribute('shadow', 'sm');
    box.setAttribute('background', 'hsl(210, 100%, 95%)');
    box.textContent = `${label} Box`;
    keyboardBoxes.appendChild(box);
  });
  
  keyboardSection.appendChild(keyboardTitle);
  keyboardSection.appendChild(keyboardBoxes);
  
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
  
  const defaultBoxes = document.createElement('div');
  defaultBoxes.style.cssText = 'display: flex; gap: 1rem; flex-wrap: wrap;';
  
  ['sm', 'md', 'lg'].forEach(shadow => {
    const box = document.createElement('ui-box');
    box.setAttribute('padding', 'md');
    box.setAttribute('radius', 'md');
    box.setAttribute('shadow', shadow);
    box.setAttribute('background', 'hsl(0, 0%, 100%)');
    box.textContent = `Shadow: ${shadow}`;
    defaultBoxes.appendChild(box);
  });
  
  defaultSection.appendChild(defaultTitle);
  defaultSection.appendChild(defaultBoxes);
  container.appendChild(defaultSection);
  
  // Custom theme
  const customSection = document.createElement('div');
  const customTitle = document.createElement('h4');
  customTitle.textContent = 'Custom Theme';
  customTitle.style.cssText = 'margin: 0 0 1rem 0;';
  
  const customBoxes = document.createElement('div');
  customBoxes.style.cssText = 'display: flex; gap: 1rem; flex-wrap: wrap;';
  
  const customBox1 = document.createElement('ui-box');
  customBox1.setAttribute('padding', 'md');
  customBox1.setAttribute('radius', 'xl');
  customBox1.setAttribute('shadow', 'lg');
  customBox1.setAttribute('background', 'hsl(340, 82%, 52%)');
  customBox1.textContent = 'Custom Colors';
  customBox1.style.cssText = `
    --ui-box-shadow-lg: 0 10px 15px -3px hsla(340, 82%, 52%, 0.3);
    color: white;
  `;
  
  const customBox2 = document.createElement('ui-box');
  customBox2.setAttribute('padding', 'lg');
  customBox2.setAttribute('radius', '2xl');
  customBox2.setAttribute('shadow', 'xl');
  customBox2.setAttribute('background', 'hsl(200, 100%, 95%)');
  customBox2.textContent = 'Custom Spacing';
  customBox2.style.cssText = `
    --ui-box-spacing-lg: 3rem;
    --ui-box-radius-2xl: 2rem;
  `;
  
  const customBox3 = document.createElement('ui-box');
  customBox3.setAttribute('padding', 'md');
  customBox3.setAttribute('radius', 'md');
  customBox3.setAttribute('shadow', 'inner');
  customBox3.setAttribute('background', 'hsl(120, 100%, 95%)');
  customBox3.textContent = 'Custom Shadow';
  customBox3.style.cssText = `
    --ui-box-shadow-inner: inset 0 4px 8px 0 hsla(120, 100%, 25%, 0.2);
  `;
  
  customBoxes.appendChild(customBox1);
  customBoxes.appendChild(customBox2);
  customBoxes.appendChild(customBox3);
  
  customSection.appendChild(customTitle);
  customSection.appendChild(customBoxes);
  container.appendChild(customSection);
  
  return container;
};

// Complex layout example
export const ComplexLayout = () => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 800px;';
  
  const layout = document.createElement('ui-box');
  layout.setAttribute('display', 'flex');
  layout.setAttribute('flex-direction', 'column');
  layout.setAttribute('gap', '1rem');
  layout.setAttribute('padding', 'lg');
  layout.setAttribute('radius', 'lg');
  layout.setAttribute('shadow', 'lg');
  layout.setAttribute('background', 'hsl(0, 0%, 100%)');
  
  // Header
  const header = document.createElement('ui-box');
  header.setAttribute('display', 'flex');
  header.setAttribute('justify-content', 'space-between');
  header.setAttribute('align-items', 'center');
  header.setAttribute('padding', 'md');
  header.setAttribute('radius', 'md');
  header.setAttribute('background', 'hsl(210, 100%, 95%)');
  header.innerHTML = `
    <h3 style="margin: 0;">Dashboard</h3>
    <span style="color: hsl(220, 9%, 46%);">Welcome back!</span>
  `;
  
  // Content area
  const content = document.createElement('ui-box');
  content.setAttribute('display', 'flex');
  content.setAttribute('gap', '1rem');
  
  // Main content
  const main = document.createElement('ui-box');
  main.setAttribute('padding', 'md');
  main.setAttribute('radius', 'md');
  main.setAttribute('background', 'hsl(0, 0%, 98%)');
  main.style.cssText = 'flex: 1;';
  main.innerHTML = `
    <h4 style="margin: 0 0 1rem 0;">Main Content</h4>
    <p style="margin: 0;">This is the main content area of the dashboard.</p>
  `;
  
  // Sidebar
  const sidebar = document.createElement('ui-box');
  sidebar.setAttribute('padding', 'md');
  sidebar.setAttribute('radius', 'md');
  sidebar.setAttribute('background', 'hsl(200, 100%, 95%)');
  sidebar.setAttribute('width', '200px');
  sidebar.innerHTML = `
    <h4 style="margin: 0 0 1rem 0;">Sidebar</h4>
    <ul style="margin: 0; padding-left: 1.5rem;">
      <li>Menu Item 1</li>
      <li>Menu Item 2</li>
      <li>Menu Item 3</li>
    </ul>
  `;
  
  // Footer
  const footer = document.createElement('ui-box');
  footer.setAttribute('padding', 'sm');
  footer.setAttribute('radius', 'md');
  footer.setAttribute('background', 'hsl(220, 9%, 95%)');
  footer.innerHTML = `
    <p style="margin: 0; text-align: center; color: hsl(220, 9%, 46%); font-size: 0.875rem;">
      © 2024 Dashboard. All rights reserved.
    </p>
  `;
  
  content.appendChild(main);
  content.appendChild(sidebar);
  
  layout.appendChild(header);
  layout.appendChild(content);
  layout.appendChild(footer);
  
  container.appendChild(layout);
  
  return container;
};