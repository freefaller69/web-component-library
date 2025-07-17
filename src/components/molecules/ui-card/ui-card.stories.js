import './ui-card.js';

export default {
  title: 'Molecules/Card',
  component: 'ui-card',
  parameters: {
    docs: {
      description: {
        component: 'A flexible card component demonstrating "one component, infinite possibilities" through slot-based composition. Supports multiple variants for different use cases: user profiles, products, statistics, and activity lists.'
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
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'stat', 'list'],
      description: 'Card variant for different use cases',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Card size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      }
    },
    clickable: {
      control: 'boolean',
      description: 'Makes the card interactive with click handlers and keyboard navigation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    elevated: {
      control: 'boolean',
      description: 'Adds elevation shadow to the card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    bordered: {
      control: 'boolean',
      description: 'Shows border around the card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  }
};

// Default variant - Product card
export const Default = {
  args: {
    variant: 'default',
    size: 'medium',
    clickable: false,
    elevated: false,
    bordered: true
  },
  render: (args) => {
    return `
      <ui-card 
        variant="${args.variant}" 
        size="${args.size}" 
        ${args.clickable ? 'clickable' : ''}
        ${args.elevated ? 'elevated' : ''}
        ${args.bordered ? 'bordered' : ''}
        style="max-width: 320px;"
      >
        <img slot="media" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop" alt="Product" style="width: 100%; height: 200px; object-fit: cover;" />
        <h3 slot="title">Premium Wireless Headphones</h3>
        <p>Experience crystal-clear audio with our flagship wireless headphones featuring active noise cancellation and 30-hour battery life.</p>
        <div slot="actions" style="display: flex; gap: 12px; align-items: center;">
          <span style="font-size: 20px; font-weight: 700; color: #059669;">$199.99</span>
          <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Add to Cart</button>
        </div>
      </ui-card>
    `;
  }
};

// User Profile Card
export const UserProfile = {
  args: {
    variant: 'default',
    size: 'medium',
    clickable: true,
    elevated: true,
    bordered: true
  },
  render: (args) => {
    return `
      <ui-card 
        variant="${args.variant}" 
        size="${args.size}" 
        ${args.clickable ? 'clickable' : ''}
        ${args.elevated ? 'elevated' : ''}
        ${args.bordered ? 'bordered' : ''}
        style="max-width: 280px;"
        aria-label="User profile for Sarah Johnson"
      >
        <div slot="media" style="display: flex; justify-content: center; padding: 20px;">
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face" alt="Sarah Johnson" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" />
        </div>
        <h3 slot="title" style="text-align: center;">Sarah Johnson</h3>
        <div style="text-align: center; color: #6b7280;">
          <p>Senior Product Designer</p>
          <p style="margin: 8px 0;">📍 San Francisco, CA</p>
          <p style="font-size: 14px;">5 years experience • 127 projects</p>
        </div>
        <div slot="actions" style="display: flex; gap: 8px; justify-content: center;">
          <button style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 6px 12px; border-radius: 6px; cursor: pointer;">Message</button>
          <button style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">Connect</button>
        </div>
      </ui-card>
    `;
  }
};

// Stat Card
export const StatCard = {
  args: {
    variant: 'stat',
    size: 'medium',
    clickable: false,
    elevated: false,
    bordered: true
  },
  render: (args) => {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div slot="icon">📊</div>
          <div slot="title">Total Sales</div>
          <div slot="value">$124,390</div>
          <div slot="subtitle">+12% from last month</div>
        </ui-card>
        
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div slot="icon">👥</div>
          <div slot="title">Active Users</div>
          <div slot="value">8,425</div>
          <div slot="subtitle">+5% from last week</div>
        </ui-card>
        
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div slot="icon">⚡</div>
          <div slot="title">Performance</div>
          <div slot="value">98.2%</div>
          <div slot="subtitle">-0.1% from yesterday</div>
        </ui-card>
      </div>
    `;
  }
};

// List Card - Activity Feed
export const ActivityList = {
  args: {
    variant: 'list',
    size: 'medium',
    clickable: true,
    elevated: false,
    bordered: true
  },
  render: (args) => {
    return `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 8px;">
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div slot="media" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">JD</div>
          <div slot="title">John Doe commented on your post</div>
          <div slot="subtitle">"Great insights about the new design system!"</div>
          <div slot="meta">2 min ago</div>
          <div slot="actions">
            <button style="background: none; border: none; color: #6b7280; cursor: pointer;">Reply</button>
          </div>
        </ui-card>
        
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div slot="media" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">AS</div>
          <div slot="title">Alice Smith liked your article</div>
          <div slot="subtitle">"Building Scalable Component Libraries"</div>
          <div slot="meta">1 hour ago</div>
          <div slot="actions">
            <button style="background: none; border: none; color: #6b7280; cursor: pointer;">View</button>
          </div>
        </ui-card>
        
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div slot="media" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">MT</div>
          <div slot="title">Mike Thompson started following you</div>
          <div slot="subtitle">Senior Frontend Developer at TechCorp</div>
          <div slot="meta">3 hours ago</div>
          <div slot="actions">
            <button style="background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">Follow Back</button>
          </div>
        </ui-card>
      </div>
    `;
  }
};

// Minimal Card
export const MinimalCard = {
  args: {
    variant: 'minimal',
    size: 'medium',
    clickable: true,
    elevated: false,
    bordered: false
  },
  render: (args) => {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; max-width: 800px;">
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div style="text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">📁</div>
            <div style="font-weight: 600;">Documents</div>
            <div style="color: #6b7280; font-size: 14px;">247 files</div>
          </div>
        </ui-card>
        
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div style="text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🖼️</div>
            <div style="font-weight: 600;">Photos</div>
            <div style="color: #6b7280; font-size: 14px;">1,429 items</div>
          </div>
        </ui-card>
        
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div style="text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">🎵</div>
            <div style="font-weight: 600;">Music</div>
            <div style="color: #6b7280; font-size: 14px;">89 songs</div>
          </div>
        </ui-card>
        
        <ui-card 
          variant="${args.variant}" 
          size="${args.size}" 
          ${args.clickable ? 'clickable' : ''}
          ${args.elevated ? 'elevated' : ''}
          ${args.bordered ? 'bordered' : ''}
        >
          <div style="text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">💾</div>
            <div style="font-weight: 600;">Downloads</div>
            <div style="color: #6b7280; font-size: 14px;">52 files</div>
          </div>
        </ui-card>
      </div>
    `;
  }
};

// Size Variations
export const SizeVariations = {
  args: {
    variant: 'default',
    size: 'medium',
    clickable: false,
    elevated: true,
    bordered: true
  },
  render: (args) => {
    return `
      <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
        <ui-card variant="default" size="small" elevated bordered style="max-width: 200px;">
          <div slot="media" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">SMALL</div>
          <h4 slot="title">Small Card</h4>
          <p>This is a small card with compact spacing.</p>
          <div slot="actions">
            <button style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">Action</button>
          </div>
        </ui-card>
        
        <ui-card variant="default" size="medium" elevated bordered style="max-width: 250px;">
          <div slot="media" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 120px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">MEDIUM</div>
          <h3 slot="title">Medium Card</h3>
          <p>This is a medium card with standard spacing and proportions.</p>
          <div slot="actions">
            <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Action</button>
          </div>
        </ui-card>
        
        <ui-card variant="default" size="large" elevated bordered style="max-width: 300px;">
          <div slot="media" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 140px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">LARGE</div>
          <h2 slot="title">Large Card</h2>
          <p>This is a large card with generous spacing and prominent elements for important content.</p>
          <div slot="actions">
            <button style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px;">Action</button>
          </div>
        </ui-card>
      </div>
    `;
  }
};

// Interactive Demo - All Variants
export const InteractiveDemo = {
  args: {
    variant: 'default',
    size: 'medium',
    clickable: true,
    elevated: true,
    bordered: true
  },
  render: (args) => {
    return `
      <div style="display: grid; gap: 24px;">
        <h3>One Component, Infinite Possibilities</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <!-- Product Card -->
          <ui-card variant="default" clickable elevated style="max-width: 320px;">
            <img slot="media" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop" alt="Headphones" style="width: 100%; height: 180px; object-fit: cover;" />
            <h3 slot="title">Wireless Headphones</h3>
            <p>Premium sound quality with noise cancellation.</p>
            <div slot="actions" style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 18px; font-weight: 700; color: #059669;">$149.99</span>
              <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Buy Now</button>
            </div>
          </ui-card>
          
          <!-- User Profile Card -->
          <ui-card variant="default" clickable elevated>
            <div slot="media" style="display: flex; justify-content: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <div style="width: 60px; height: 60px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #667eea;">AK</div>
            </div>
            <h3 slot="title" style="text-align: center;">Alex Kim</h3>
            <div style="text-align: center; color: #6b7280;">
              <p>UX Designer</p>
              <p style="font-size: 14px;">📍 Seattle, WA</p>
            </div>
            <div slot="actions" style="display: flex; gap: 8px; justify-content: center;">
              <button style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 6px 12px; border-radius: 6px; cursor: pointer;">Follow</button>
              <button style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">Message</button>
            </div>
          </ui-card>
        </div>
        
        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
          <ui-card variant="stat" elevated>
            <div slot="icon">💰</div>
            <div slot="title">Revenue</div>
            <div slot="value">$84,200</div>
            <div slot="subtitle">+18% this month</div>
          </ui-card>
          
          <ui-card variant="stat" elevated>
            <div slot="icon">👥</div>
            <div slot="title">Users</div>
            <div slot="value">12,847</div>
            <div slot="subtitle">+23% this week</div>
          </ui-card>
          
          <ui-card variant="stat" elevated>
            <div slot="icon">📈</div>
            <div slot="title">Growth</div>
            <div slot="value">+15.3%</div>
            <div slot="subtitle">vs last quarter</div>
          </ui-card>
        </div>
        
        <!-- Activity List -->
        <div style="max-width: 500px;">
          <h4 style="margin-bottom: 16px;">Recent Activity</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <ui-card variant="list" clickable>
              <div slot="media" style="background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 50%;">📊</div>
              <div slot="title">New report generated</div>
              <div slot="subtitle">Q4 Performance Summary</div>
              <div slot="meta">2 min ago</div>
              <div slot="actions">
                <button style="background: none; border: none; color: #3b82f6; cursor: pointer; font-size: 14px;">View</button>
              </div>
            </ui-card>
            
            <ui-card variant="list" clickable>
              <div slot="media" style="background: #10b981; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 50%;">✅</div>
              <div slot="title">Task completed</div>
              <div slot="subtitle">Design system documentation</div>
              <div slot="meta">1 hour ago</div>
              <div slot="actions">
                <button style="background: none; border: none; color: #6b7280; cursor: pointer; font-size: 14px;">Archive</button>
              </div>
            </ui-card>
          </div>
        </div>
      </div>
    `;
  }
};