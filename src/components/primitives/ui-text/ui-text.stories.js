import "./ui-text.js";

export default {
  title: "Primitives/ui-text",
  component: "ui-text",
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong", "em", "small", "code"],
      description: "The HTML element to render"
    },
    level: {
      control: { type: "number", min: 1, max: 6, step: 1 },
      description: "Heading level (1-6), automatically sets 'as' to h1-h6"
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      description: "Text size"
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight"
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Text alignment"
    },
    color: {
      control: "color",
      description: "Text color"
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with ellipsis"
    },
    clickable: {
      control: "boolean",
      description: "Make text clickable"
    }
  },
  parameters: {
    docs: {
      description: {
        component: "A semantic text component that renders proper HTML elements for accessibility and SEO. Supports headings, paragraphs, and inline text elements."
      }
    }
  }
};

export const Default = {
  args: {
    as: "span"
  },
  render: (args) => `<ui-text ${Object.entries(args).map(([key, value]) => value !== undefined && value !== null ? `${key}="${value}"` : '').filter(Boolean).join(' ')}>Default text content</ui-text>`
};

export const SemanticHeadings = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="h1">Heading Level 1</ui-text>
      <ui-text as="h2">Heading Level 2</ui-text>
      <ui-text as="h3">Heading Level 3</ui-text>
      <ui-text as="h4">Heading Level 4</ui-text>
      <ui-text as="h5">Heading Level 5</ui-text>
      <ui-text as="h6">Heading Level 6</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Semantic heading elements (h1-h6) with proper hierarchy and default styling."
      }
    }
  }
};

export const HeadingLevels = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text level="1">Heading Level 1 (using level prop)</ui-text>
      <ui-text level="2">Heading Level 2 (using level prop)</ui-text>
      <ui-text level="3">Heading Level 3 (using level prop)</ui-text>
      <ui-text level="4">Heading Level 4 (using level prop)</ui-text>
      <ui-text level="5">Heading Level 5 (using level prop)</ui-text>
      <ui-text level="6">Heading Level 6 (using level prop)</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Using the level prop (1-6) to automatically create heading elements. This is a convenient shorthand for setting as='h1' through as='h6'."
      }
    }
  }
};

export const TextElements = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="p">This is a paragraph element with proper block-level display.</ui-text>
      <ui-text as="span">This is a span element for inline text.</ui-text>
      <ui-text as="strong">This is strong text (bold).</ui-text>
      <ui-text as="em">This is emphasized text (italic).</ui-text>
      <ui-text as="small">This is small text, typically for fine print.</ui-text>
      <ui-text as="code">This is code text with monospace font.</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Various text elements including paragraph, span, strong, emphasis, small, and code elements."
      }
    }
  }
};

export const InlineUsage = {
  render: () => `
    <div style="line-height: 1.6;">
      <ui-text as="p">
        This paragraph contains <ui-text as="strong">bold text</ui-text>, 
        <ui-text as="em">italic text</ui-text>, and 
        <ui-text as="code">inline code</ui-text>. 
        You can also include <ui-text as="small">small text</ui-text> 
        within the same paragraph.
      </ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Inline text elements used within paragraphs, showing how they integrate naturally with text flow."
      }
    }
  }
};

export const Sizes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="p" size="xs">Extra small text (xs)</ui-text>
      <ui-text as="p" size="sm">Small text (sm)</ui-text>
      <ui-text as="p" size="md">Medium text (md) - default</ui-text>
      <ui-text as="p" size="lg">Large text (lg)</ui-text>
      <ui-text as="p" size="xl">Extra large text (xl)</ui-text>
      <ui-text as="p" size="2xl">2x large text (2xl)</ui-text>
      <ui-text as="p" size="3xl">3x large text (3xl)</ui-text>
      <ui-text as="p" size="4xl">4x large text (4xl)</ui-text>
      <ui-text as="p" size="5xl">5x large text (5xl)</ui-text>
      <ui-text as="p" size="6xl">6x large text (6xl)</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "All available text sizes from xs to 6xl. Size can be applied to any element type."
      }
    }
  }
};

export const Weights = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="p" weight="normal">Normal weight text</ui-text>
      <ui-text as="p" weight="medium">Medium weight text</ui-text>
      <ui-text as="p" weight="semibold">Semibold weight text</ui-text>
      <ui-text as="p" weight="bold">Bold weight text</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Different font weights available for any text element."
      }
    }
  }
};

export const Alignment = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="p" align="left">Left aligned text (default)</ui-text>
      <ui-text as="p" align="center">Center aligned text</ui-text>
      <ui-text as="p" align="right">Right aligned text</ui-text>
      <ui-text as="p" align="justify">Justified text. This is a longer paragraph that will demonstrate how justified text works with proper spacing between words to create even margins on both sides.</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Text alignment options: left, center, right, and justify."
      }
    }
  }
};

export const Colors = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="p" color="hsl(0, 0%, 10%)">Default text color</ui-text>
      <ui-text as="p" color="hsl(220, 85%, 57%)">Primary blue text</ui-text>
      <ui-text as="p" color="hsl(142, 71%, 45%)">Success green text</ui-text>
      <ui-text as="p" color="hsl(38, 92%, 50%)">Warning orange text</ui-text>
      <ui-text as="p" color="hsl(0, 84%, 60%)">Error red text</ui-text>
      <ui-text as="p" color="hsl(220, 9%, 46%)">Muted gray text</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Custom colors using HSL values for semantic color meanings."
      }
    }
  }
};

export const Truncation = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <ui-text as="p">Normal text that will wrap to multiple lines when it exceeds the container width.</ui-text>
      <ui-text as="p" truncate>Truncated text that will be cut off with an ellipsis when it exceeds the container width.</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Text truncation with ellipsis for single-line text overflow."
      }
    }
  }
};

export const Clickable = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="span" clickable>Clickable inline text</ui-text>
      <ui-text as="p" clickable>Clickable paragraph text</ui-text>
      <ui-text as="h3" clickable>Clickable heading</ui-text>
    </div>
    <script>
      document.querySelectorAll('ui-text[clickable]').forEach(element => {
        element.addEventListener('ui-text-click', (e) => {
          console.log('Text clicked:', e.detail);
          alert(\`Clicked \${e.detail.as} element\`);
        });
      });
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story: "Clickable text elements with proper accessibility attributes and keyboard navigation."
      }
    }
  }
};

export const AccessibilityDemo = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="h1">Page Title (H1)</ui-text>
      <ui-text as="h2">Section Title (H2)</ui-text>
      <ui-text as="p">This is a paragraph with <ui-text as="strong">important text</ui-text> and <ui-text as="em">emphasized text</ui-text>.</ui-text>
      <ui-text as="p">Code example: <ui-text as="code">const example = "Hello World";</ui-text></ui-text>
      <ui-text as="small">Fine print or disclaimers should use the small element.</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Proper semantic HTML structure for accessibility and SEO. Screen readers will correctly interpret the document structure."
      }
    }
  }
};

export const ResponsiveHeadings = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="h1" size="6xl">Large Hero Title</ui-text>
      <ui-text as="h2" size="3xl">Section Title</ui-text>
      <ui-text as="h3" size="2xl">Subsection Title</ui-text>
      <ui-text as="p" size="lg">Large paragraph text for better readability.</ui-text>
      <ui-text as="p" size="md">Regular paragraph text.</ui-text>
      <ui-text as="small" size="sm">Small text for captions or notes.</ui-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Combining semantic elements with custom sizes for responsive typography that maintains accessibility."
      }
    }
  }
};

export const EventHandling = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ui-text as="h3" clickable id="heading-click">Click this heading</ui-text>
      <ui-text as="p" clickable id="paragraph-click">Click this paragraph</ui-text>
      <ui-text as="span" clickable id="span-click">Click this span</ui-text>
      <div id="event-log" style="padding: 1rem; background: hsl(220, 13%, 98%); border-radius: 0.5rem; font-family: monospace; font-size: 0.875rem; max-height: 150px; overflow-y: auto;">
        Click the elements above to see events...
      </div>
    </div>
    <script>
      (function() {
        const log = document.getElementById('event-log');
        const elements = document.querySelectorAll('#heading-click, #paragraph-click, #span-click');
        
        elements.forEach(element => {
          element.addEventListener('ui-text-click', (e) => {
            const time = new Date().toLocaleTimeString();
            const entry = document.createElement('div');
            entry.textContent = \`[\${time}] \${e.detail.as} element clicked (level: \${e.detail.level || 'N/A'})\`;
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
        story: "Interactive example showing event handling with semantic text elements."
      }
    }
  }
};

export const DocumentStructure = {
  render: () => `
    <article style="max-width: 600px; margin: 0 auto; line-height: 1.6;">
      <ui-text as="h1">Article Title</ui-text>
      <ui-text as="p" size="lg" color="hsl(220, 9%, 46%)">
        Article subtitle or lead paragraph with larger text and muted color.
      </ui-text>
      
      <ui-text as="h2">First Section</ui-text>
      <ui-text as="p">
        This is the first paragraph of the article. It contains 
        <ui-text as="strong">important information</ui-text> and 
        <ui-text as="em">emphasized points</ui-text>.
      </ui-text>
      
      <ui-text as="p">
        Here's a code example: <ui-text as="code">npm install ui-text</ui-text>
      </ui-text>
      
      <ui-text as="h3">Subsection</ui-text>
      <ui-text as="p">
        This subsection provides additional details.
      </ui-text>
      
      <ui-text as="h2">Second Section</ui-text>
      <ui-text as="p">
        Another section with regular paragraph text.
      </ui-text>
      
      <ui-text as="small" color="hsl(220, 9%, 64%)">
        Published on January 1, 2024
      </ui-text>
    </article>
  `,
  parameters: {
    docs: {
      description: {
        story: "Complete document structure example showing proper semantic hierarchy for articles and content."
      }
    }
  }
};

export const Theming = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <ui-text as="h3">Default Theme</ui-text>
        <ui-text as="p">Regular paragraph text</ui-text>
        <ui-text as="code">Code element</ui-text>
      </div>
      
      <div style="--ui-text-color-default: hsl(280, 100%, 50%); --ui-text-font-family-heading: 'Georgia, serif'; --ui-text-font-family-mono: 'Courier New, monospace';">
        <ui-text as="h3">Custom Theme</ui-text>
        <ui-text as="p">Paragraph with custom color</ui-text>
        <ui-text as="code">Code with custom font</ui-text>
      </div>
      
      <div style="--ui-text-color-default: hsl(142, 71%, 45%); --ui-text-font-size-md: 1.125rem; --ui-text-line-height-md: 1.75rem;">
        <ui-text as="h3">Green Theme with Larger Text</ui-text>
        <ui-text as="p">Paragraph with green color and larger size</ui-text>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Theming capabilities using CSS custom properties for colors, fonts, and sizes."
      }
    }
  }
};