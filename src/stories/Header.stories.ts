import type { Meta, StoryObj } from '@storybook/html-vite';

import { fn } from 'storybook/test';

import type { HeaderProps } from '../components/Header/Header';
import { Header } from '../components/Header/Header';

const meta = {
  title: 'Example/Header',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => Header(args),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<HeaderProps>;

export default meta;
type Story = StoryObj<HeaderProps>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
