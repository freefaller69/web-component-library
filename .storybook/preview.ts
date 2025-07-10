import type { Preview } from '@storybook/html-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    themes: {
      default: 'light',
      list: [
        {
          name: 'light',
          class: '',
          color: '#ffffff',
        },
        {
          name: 'dark',
          class: 'dark',
          color: '#000000',
        },
      ],
    },
  },
};

export default preview;