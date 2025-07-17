import './ui-select.js';

export default {
  title: 'Primitives/ui-select',
  component: 'ui-select',
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => {
  const select = document.createElement('ui-select');
  
  Object.keys(args).forEach(key => {
    if (key === 'options') {
      select.options = args[key];
    } else {
      select[key] = args[key];
    }
  });

  return select;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select an option',
  options: [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'py', label: 'Python' },
    { value: 'rs', label: 'Rust' },
  ],
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...Default.args,
  value: 'ts',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

