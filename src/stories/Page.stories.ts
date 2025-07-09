import type { Meta, StoryObj } from '@storybook/html-vite';


import type { PageProps } from './Page';
import { Page } from './Page';

const meta = {
  title: 'Example/Page',
  render: (args) => Page(args),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<PageProps>;

export default meta;

type Story = StoryObj<PageProps>;

export const LoggedOut: Story = {
  args: {}
};

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};
