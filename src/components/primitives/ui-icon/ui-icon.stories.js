import "./ui-icon.js";

export default {
  title: "Primitives/ui-icon",
  component: "ui-icon",
  argTypes: {
    name: {
      control: "select",
      options: [
        "check", "x", "chevron-right", "chevron-left", "chevron-down", "chevron-up",
        "menu", "more-vertical", "more-horizontal", "search", "settings", "filter",
        "plus", "minus", "edit", "trash", "copy", "download", "upload", "save",
        "mail", "phone", "message-square", "alert-circle", "alert-triangle",
        "info", "check-circle", "x-circle", "home", "arrow-right", "arrow-left",
        "arrow-up", "arrow-down", "external-link", "play", "pause", "stop",
        "skip-back", "skip-forward", "volume-2", "volume-x", "image", "video",
        "file", "file-text", "folder", "folder-open", "user", "users",
        "user-plus", "user-minus", "clock", "calendar", "shopping-cart",
        "shopping-bag", "heart", "sun", "moon", "cloud", "umbrella", "wifi",
        "bluetooth", "battery", "zap", "cpu", "monitor", "smartphone", "tablet"
      ],
      description: "The icon name to display"
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      description: "Size of the icon"
    },
    color: {
      control: "color",
      description: "Color of the icon"
    },
    strokeWidth: {
      control: "text",
      description: "Stroke width of the icon"
    },
    fill: {
      control: "text",
      description: "Fill color of the icon"
    },
    clickable: {
      control: "boolean",
      description: "Whether the icon is clickable"
    },
    label: {
      control: "text",
      description: "Accessibility label for the icon"
    }
  },
  parameters: {
    docs: {
      description: {
        component: "A versatile icon component with a comprehensive icon library, multiple sizes, and interactive capabilities."
      }
    }
  }
};

export const Default = {
  args: {
    name: "check",
    size: "md"
  }
};

export const AllSizes = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="xs"></ui-icon>
        <span style="font-size: 0.75rem;">xs</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="sm"></ui-icon>
        <span style="font-size: 0.75rem;">sm</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="md"></ui-icon>
        <span style="font-size: 0.75rem;">md</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="lg"></ui-icon>
        <span style="font-size: 0.75rem;">lg</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="xl"></ui-icon>
        <span style="font-size: 0.75rem;">xl</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="2xl"></ui-icon>
        <span style="font-size: 0.75rem;">2xl</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="3xl"></ui-icon>
        <span style="font-size: 0.75rem;">3xl</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="4xl"></ui-icon>
        <span style="font-size: 0.75rem;">4xl</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="5xl"></ui-icon>
        <span style="font-size: 0.75rem;">5xl</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="check" size="6xl"></ui-icon>
        <span style="font-size: 0.75rem;">6xl</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "All available icon sizes from xs to 6xl."
      }
    }
  }
};

export const CommonIcons = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; padding: 1rem;">
      ${[
        "check", "x", "chevron-right", "chevron-left", "chevron-down", "chevron-up",
        "menu", "more-vertical", "search", "settings", "filter", "plus", "minus",
        "edit", "trash", "copy", "download", "upload", "save", "mail", "phone",
        "message-square", "alert-circle", "info", "home", "arrow-right", "play",
        "pause", "image", "file", "folder", "user", "clock", "calendar",
        "shopping-cart", "heart", "sun", "moon", "wifi", "battery"
      ].map(iconName => `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 0.5rem; border: 1px solid hsl(220, 13%, 91%); border-radius: 0.5rem;">
          <ui-icon name="${iconName}" size="lg"></ui-icon>
          <span style="font-size: 0.75rem; text-align: center;">${iconName}</span>
        </div>
      `).join('')}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "A showcase of commonly used icons from the library."
      }
    }
  }
};

export const Colored = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem;">
      <ui-icon name="heart" size="xl" color="hsl(0, 84%, 60%)"></ui-icon>
      <ui-icon name="check-circle" size="xl" color="hsl(142, 71%, 45%)"></ui-icon>
      <ui-icon name="alert-triangle" size="xl" color="hsl(38, 92%, 50%)"></ui-icon>
      <ui-icon name="x-circle" size="xl" color="hsl(0, 84%, 60%)"></ui-icon>
      <ui-icon name="info" size="xl" color="hsl(220, 85%, 57%)"></ui-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Icons with custom colors using HSL values."
      }
    }
  }
};

export const CustomStroke = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="circle" size="2xl" stroke-width="1"></ui-icon>
        <span style="font-size: 0.75rem;">stroke-width: 1</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="circle" size="2xl" stroke-width="2"></ui-icon>
        <span style="font-size: 0.75rem;">stroke-width: 2</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="circle" size="2xl" stroke-width="3"></ui-icon>
        <span style="font-size: 0.75rem;">stroke-width: 3</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <ui-icon name="circle" size="2xl" stroke-width="4"></ui-icon>
        <span style="font-size: 0.75rem;">stroke-width: 4</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Icons with different stroke widths."
      }
    }
  }
};

export const Clickable = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem;">
      <ui-icon name="heart" size="xl" clickable label="Like"></ui-icon>
      <ui-icon name="bookmark" size="xl" clickable label="Bookmark"></ui-icon>
      <ui-icon name="share" size="xl" clickable label="Share"></ui-icon>
      <ui-icon name="download" size="xl" clickable label="Download"></ui-icon>
      <ui-icon name="settings" size="xl" clickable label="Settings"></ui-icon>
    </div>
    <p style="margin-top: 1rem; font-size: 0.875rem; color: hsl(220, 13%, 46%);">
      These icons are clickable and focusable. Try clicking them or navigating with Tab and Enter/Space.
    </p>
  `,
  parameters: {
    docs: {
      description: {
        story: "Interactive icons that can be clicked and focused. They include proper ARIA labels and keyboard navigation."
      }
    }
  }
};

export const InText = {
  render: () => `
    <div style="font-size: 1rem; line-height: 1.5;">
      <p>You can use icons inline with text <ui-icon name="arrow-right" size="sm"></ui-icon> like this.</p>
      <p>Icons align with text baseline and maintain proper spacing <ui-icon name="external-link" size="sm"></ui-icon> automatically.</p>
      <p>Status indicators work great too: <ui-icon name="check-circle" size="sm" color="hsl(142, 71%, 45%)"></ui-icon> Success <ui-icon name="alert-triangle" size="sm" color="hsl(38, 92%, 50%)"></ui-icon> Warning <ui-icon name="x-circle" size="sm" color="hsl(0, 84%, 60%)"></ui-icon> Error</p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Icons used inline with text content, showing proper vertical alignment and spacing."
      }
    }
  }
};

export const Interactive = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="user" size="md"></ui-icon>
        <span>Profile</span>
        <ui-icon name="chevron-right" size="sm" style="margin-left: auto;"></ui-icon>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="settings" size="md"></ui-icon>
        <span>Settings</span>
        <ui-icon name="chevron-right" size="sm" style="margin-left: auto;"></ui-icon>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <ui-icon name="mail" size="md"></ui-icon>
        <span>Messages</span>
        <ui-icon name="chevron-right" size="sm" style="margin-left: auto;"></ui-icon>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Icons used in interactive list items and navigation elements."
      }
    }
  }
};

export const ButtonIcons = {
  render: () => `
    <div style="display: flex; align-items: center; gap: 1rem;">
      <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid hsl(220, 13%, 91%); border-radius: 0.375rem; background: white; cursor: pointer;">
        <ui-icon name="download" size="sm"></ui-icon>
        Download
      </button>
      <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid hsl(220, 13%, 91%); border-radius: 0.375rem; background: white; cursor: pointer;">
        <ui-icon name="upload" size="sm"></ui-icon>
        Upload
      </button>
      <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid hsl(220, 13%, 91%); border-radius: 0.375rem; background: white; cursor: pointer;">
        <ui-icon name="save" size="sm"></ui-icon>
        Save
      </button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Icons used within buttons to enhance visual communication."
      }
    }
  }
};

export const Accessibility = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem;">Decorative Icons (no interaction)</h3>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <ui-icon name="check" size="md"></ui-icon>
          <span>Task completed</span>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem;">Interactive Icons (with labels)</h3>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <ui-icon name="heart" size="md" clickable label="Add to favorites"></ui-icon>
          <ui-icon name="share" size="md" clickable label="Share this item"></ui-icon>
          <ui-icon name="bookmark" size="md" clickable label="Bookmark for later"></ui-icon>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem;">Status Icons (with semantic meaning)</h3>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <ui-icon name="check-circle" size="md" color="hsl(142, 71%, 45%)" label="Success"></ui-icon>
          <ui-icon name="alert-triangle" size="md" color="hsl(38, 92%, 50%)" label="Warning"></ui-icon>
          <ui-icon name="x-circle" size="md" color="hsl(0, 84%, 60%)" label="Error"></ui-icon>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Examples of proper accessibility implementation with icons. Interactive icons have labels, while decorative icons do not."
      }
    }
  }
};

export const Theming = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Default Theme</h3>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <ui-icon name="home" size="xl" clickable label="Home"></ui-icon>
          <ui-icon name="search" size="xl" clickable label="Search"></ui-icon>
          <ui-icon name="user" size="xl" clickable label="Profile"></ui-icon>
        </div>
      </div>
      
      <div style="--ui-icon-hover-color: hsl(280, 100%, 70%); --ui-icon-hover-background: hsl(280, 100%, 95%); --ui-icon-active-color: hsl(280, 100%, 60%); --ui-icon-focus-outline: 2px solid hsl(280, 100%, 70%);">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Custom Purple Theme</h3>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <ui-icon name="heart" size="xl" clickable label="Like"></ui-icon>
          <ui-icon name="bookmark" size="xl" clickable label="Bookmark"></ui-icon>
          <ui-icon name="share" size="xl" clickable label="Share"></ui-icon>
        </div>
      </div>
      
      <div style="--ui-icon-hover-color: hsl(142, 71%, 45%); --ui-icon-hover-background: hsl(142, 71%, 95%); --ui-icon-active-color: hsl(142, 71%, 40%); --ui-icon-focus-outline: 2px solid hsl(142, 71%, 45%);">
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Custom Green Theme</h3>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <ui-icon name="download" size="xl" clickable label="Download"></ui-icon>
          <ui-icon name="upload" size="xl" clickable label="Upload"></ui-icon>
          <ui-icon name="save" size="xl" clickable label="Save"></ui-icon>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Examples of theming capabilities using CSS custom properties. Colors, hover states, and focus styles can be customized."
      }
    }
  }
};

export const EventHandling = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <ui-icon name="heart" size="xl" clickable label="Like" id="like-btn"></ui-icon>
        <ui-icon name="bookmark" size="xl" clickable label="Bookmark" id="bookmark-btn"></ui-icon>
        <ui-icon name="share" size="xl" clickable label="Share" id="share-btn"></ui-icon>
      </div>
      <div id="event-log" style="padding: 1rem; background: hsl(220, 13%, 98%); border-radius: 0.5rem; font-family: monospace; font-size: 0.875rem; max-height: 150px; overflow-y: auto;">
        Click the icons above to see events...
      </div>
    </div>
    <script>
      (function() {
        const log = document.getElementById('event-log');
        const icons = document.querySelectorAll('#like-btn, #bookmark-btn, #share-btn');
        
        icons.forEach(icon => {
          icon.addEventListener('ui-icon-click', (e) => {
            const time = new Date().toLocaleTimeString();
            const entry = document.createElement('div');
            entry.textContent = \`[\${time}] \${e.detail.name} clicked (size: \${e.detail.size})\`;
            log.appendChild(entry);
            log.scrollTop = log.scrollHeight;
          });
        });
      })();
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing how to handle click events from icons. Events include details about the clicked icon."
      }
    }
  }
};