import './ui-multi-select.js';

export default {
  title: 'Primitives/ui-multi-select',
  component: 'ui-multi-select',
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => {
  const select = document.createElement('ui-multi-select');
  
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
  placeholder: 'Select languages',
  options: [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'py', label: 'Python' },
    { value: 'rs', label: 'Rust' },
    { value: 'go', label: 'Go' },
  ],
};

export const WithSelections = Template.bind({});
WithSelections.args = {
  ...Default.args,
  value: 'js,ts',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  value: 'js,py',
};