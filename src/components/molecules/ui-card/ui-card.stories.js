import './ui-card.js';

export default {
  title: 'Molecules/UiCard',
  component: 'ui-card',
  parameters: {
    docs: {
      description: {
        component: 'A simple semantic container with header, content, and footer slots.'
      }
    }
  },
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      defaultValue: 'md'
    },
    clickable: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for clickable cards'
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'ID of element that describes the card'
    }
  }
};

export const Default = {
  args: {
    padding: 'md',
    clickable: false
  },
  render: (args) => `
    <ui-card padding="${args.padding}" ${args.clickable ? 'clickable' : ''}>
      <div slot="header"><strong>Card Header</strong></div>
      <p>This is the main content of the card. It can contain any content you want.</p>
      <div slot="footer"><small>Card Footer</small></div>
    </ui-card>
  `
};

export const ContentOnly = {
  render: () => `
    <ui-card>
      <p>A simple card with just content, no header or footer.</p>
    </ui-card>
  `
};

export const Clickable = {
  args: {
    clickable: true,
    'aria-label': 'Product details card'
  },
  render: (args) => `
    <ui-card ${args.clickable ? 'clickable' : ''} 
             ${args['aria-label'] ? `aria-label="${args['aria-label']}"` : ''}
             onclick="alert('Card clicked!')">
      <div slot="header"><strong>Clickable Card</strong></div>
      <p>Click anywhere on this card to trigger an action.</p>
    </ui-card>
  `
};

export const PaddingVariants = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <ui-card padding="none">
        <div slot="header"><strong>No Padding</strong></div>
        <p>Content with no padding</p>
      </ui-card>
      <ui-card padding="sm">
        <div slot="header"><strong>Small Padding</strong></div>
        <p>Content with small padding</p>
      </ui-card>
      <ui-card padding="md">
        <div slot="header"><strong>Medium Padding</strong></div>
        <p>Content with medium padding</p>
      </ui-card>
      <ui-card padding="lg">
        <div slot="header"><strong>Large Padding</strong></div>
        <p>Content with large padding</p>
      </ui-card>
    </div>
  `
};

export const AccessibilityExamples = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
      <ui-card clickable aria-label="User profile card" onclick="alert('Profile clicked')">
        <div slot="header"><strong>With Aria Label</strong></div>
        <p>This clickable card has a custom aria-label for screen readers.</p>
        <div slot="footer"><small>Try using a screen reader</small></div>
      </ui-card>
      
      <div>
        <ui-card clickable aria-describedby="card-help" onclick="alert('Help card clicked')">
          <div slot="header"><strong>With Description</strong></div>
          <p>This card is described by external text for additional context.</p>
        </ui-card>
        <div id="card-help" style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
          This card provides help information and can be activated with click or keyboard.
        </div>
      </div>
      
      <ui-card>
        <div slot="header"><strong>Semantic Structure</strong></div>
        <p>Non-clickable cards use semantic HTML: header, main, and footer elements for better screen reader navigation.</p>
        <div slot="footer"><small>Semantic HTML structure</small></div>
      </ui-card>
    </div>
  `
};