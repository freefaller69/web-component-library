import "./ui-icon.js";

export default {
  title: "Primitives/ui-icon",
  component: "ui-icon",
  argTypes: {
    name: {
      control: "select",
      options: ["chevron-down", "chevron-up", "chevron-left", "chevron-right", "arrow-up", "arrow-down", "arrow-left", "arrow-right", "menu", "mail", "file", "x", "check", "plus", "minus"],
      description: "Built-in icon name"
    },
    size: {
      control: "select", 
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "Icon size"
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for the icon"
    }
  },
  parameters: {
    docs: {
      description: {
        component: "A flexible icon component that supports both built-in named icons and custom SVG content via slots. Includes proper accessibility attributes and theming support."
      }
    }
  }
};

export const Default = {
  args: {
    name: "check",
    size: "md"
  },
  render: (args) => `<ui-icon ${Object.entries(args).map(([key, value]) => value !== undefined && value !== null ? `${key}="${value}"` : '').filter(Boolean).join(' ')}></ui-icon>`
};

export const BuiltInIcons = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; align-items: center;">
      <div style="text-align: center;">
        <ui-icon name="chevron-down" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">chevron-down</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="chevron-up" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">chevron-up</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="chevron-left" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">chevron-left</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="chevron-right" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">chevron-right</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="arrow-up" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">arrow-up</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="arrow-down" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">arrow-down</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="arrow-left" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">arrow-left</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="arrow-right" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">arrow-right</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="menu" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">menu</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="mail" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">mail</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="file" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">file</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="x" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">x</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="check" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">check</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="plus" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">plus</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="minus" size="lg"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">minus</div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Built-in icons available via the name attribute. These are common UI icons rendered as SVG."
      }
    }
  }
};

export const Sizes = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="xs"></ui-icon>
        <span>xs (0.75rem)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="sm"></ui-icon>
        <span>sm (0.875rem)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="md"></ui-icon>
        <span>md (1rem) - default</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="lg"></ui-icon>
        <span>lg (1.125rem)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="xl"></ui-icon>
        <span>xl (1.25rem)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="2xl"></ui-icon>
        <span>2xl (1.5rem)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="3xl"></ui-icon>
        <span>3xl (2rem)</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Available icon sizes from xs to 3xl. Icons scale proportionally while maintaining crisp rendering."
      }
    }
  }
};

export const CustomSVG = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      <ui-icon size="lg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </ui-icon>
      <ui-icon size="lg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19c-5 0-5-5.5-3-7l1-1c0-.8.8-1.2 1.5-1l1 1c.5-1 1.5-1 2.5-1h3l3 3"/>
          <path d="M19 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        </svg>
      </ui-icon>
      <ui-icon size="lg">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </ui-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Custom SVG icons using slotted content. The icon component handles sizing and color inheritance automatically."
      }
    }
  }
};

export const WithText = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="sm"></ui-icon>
        <span>Task completed</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="x" size="sm" style="color: hsl(0, 84%, 60%);"></ui-icon>
        <span>Error occurred</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>Navigate</span>
        <ui-icon name="chevron-right" size="xs"></ui-icon>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="plus" size="sm" style="color: hsl(142, 71%, 45%);"></ui-icon>
        <span>Add new item</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Icons used alongside text for common UI patterns like status indicators and navigation."
      }
    }
  }
};

export const Accessibility = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="sm" aria-label="Success"></ui-icon>
        <span>Form submission successful (icon has aria-label)</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="x" size="sm"></ui-icon>
        <span>Decorative icon (no aria-label, marked as aria-hidden)</span>
      </div>
      <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid hsl(220, 13%, 91%); border-radius: 0.25rem; background: white; cursor: pointer;">
        <ui-icon name="plus" size="sm" aria-label="Add"></ui-icon>
        <span>Add Item</span>
      </button>
      <button style="padding: 0.5rem; border: 1px solid hsl(220, 13%, 91%); border-radius: 0.25rem; background: white; cursor: pointer;" aria-label="Close dialog">
        <ui-icon name="x" size="sm"></ui-icon>
      </button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Accessibility examples showing proper use of aria-label for meaningful icons and aria-hidden for decorative ones."
      }
    }
  }
};

export const Theming = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 1rem 0;">Default Theme</h4>
        <div style="display: flex; gap: 1rem;">
          <ui-icon name="check" size="lg"></ui-icon>
          <ui-icon name="x" size="lg"></ui-icon>
          <ui-icon name="plus" size="lg"></ui-icon>
        </div>
      </div>
      
      <div style="--ui-icon-color: hsl(220, 85%, 57%);">
        <h4 style="margin: 0 0 1rem 0;">Blue Theme</h4>
        <div style="display: flex; gap: 1rem;">
          <ui-icon name="check" size="lg"></ui-icon>
          <ui-icon name="x" size="lg"></ui-icon>
          <ui-icon name="plus" size="lg"></ui-icon>
        </div>
      </div>
      
      <div style="--ui-icon-color: hsl(142, 71%, 45%);">
        <h4 style="margin: 0 0 1rem 0;">Green Theme</h4>
        <div style="display: flex; gap: 1rem;">
          <ui-icon name="check" size="lg"></ui-icon>
          <ui-icon name="x" size="lg"></ui-icon>
          <ui-icon name="plus" size="lg"></ui-icon>
        </div>
      </div>

      <div style="--ui-icon-size: 2.5rem; --ui-icon-color: hsl(280, 100%, 50%);">
        <h4 style="margin: 0 0 1rem 0;">Custom Size & Purple</h4>
        <div style="display: flex; gap: 1rem;">
          <ui-icon name="check"></ui-icon>
          <ui-icon name="x"></ui-icon>
          <ui-icon name="plus"></ui-icon>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Theming capabilities using CSS custom properties for color and size customization."
      }
    }
  }
};

export const DarkMode = {
  render: () => `
    <div style="display: flex; gap: 2rem;">
      <div style="padding: 1rem; background: white; border-radius: 0.5rem; border: 1px solid hsl(220, 13%, 91%);">
        <h4 style="margin: 0 0 1rem 0; color: black;">Light Mode</h4>
        <div style="display: flex; gap: 1rem; color: hsl(220, 9%, 20%);">
          <ui-icon name="check" size="lg"></ui-icon>
          <ui-icon name="x" size="lg"></ui-icon>
          <ui-icon name="plus" size="lg"></ui-icon>
        </div>
      </div>
      
      <div style="padding: 1rem; background: hsl(220, 13%, 15%); border-radius: 0.5rem; border: 1px solid hsl(220, 13%, 25%);">
        <h4 style="margin: 0 0 1rem 0; color: white;">Dark Mode</h4>
        <div style="display: flex; gap: 1rem; color: hsl(220, 9%, 80%);">
          <ui-icon name="check" size="lg"></ui-icon>
          <ui-icon name="x" size="lg"></ui-icon>
          <ui-icon name="plus" size="lg"></ui-icon>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Icons automatically adapt to light and dark themes by inheriting the text color from their parent context."
      }
    }
  }
};

export const InteractiveElements = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border: none; border-radius: 0.375rem; background: hsl(220, 85%, 57%); color: white; cursor: pointer; font-size: 1rem;">
        <ui-icon name="plus" size="sm"></ui-icon>
        Create New
      </button>
      
      <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border: 1px solid hsl(220, 13%, 91%); border-radius: 0.375rem; background: white; color: hsl(220, 9%, 20%); cursor: pointer;">
        Download
        <ui-icon name="chevron-down" size="sm"></ui-icon>
      </button>
      
      <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: hsl(142, 71%, 96%); border: 1px solid hsl(142, 71%, 85%); border-radius: 0.375rem; color: hsl(142, 71%, 25%);">
        <ui-icon name="check" size="sm"></ui-icon>
        <span>Operation completed successfully</span>
      </div>
      
      <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: hsl(0, 84%, 96%); border: 1px solid hsl(0, 84%, 85%); border-radius: 0.375rem; color: hsl(0, 84%, 30%);">
        <ui-icon name="x" size="sm"></ui-icon>
        <span>Error: Unable to process request</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Icons integrated with interactive elements like buttons and status messages."
      }
    }
  }
};