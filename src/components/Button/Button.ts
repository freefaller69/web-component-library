import './button.css';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({ primary, backgroundColor, size, label, onClick }: ButtonProps): HTMLElement => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  
  const button = document.createElement('button');
  button.type = 'button';
  button.className = ['storybook-button', `storybook-button--${size || 'medium'}`, mode].join(' ');
  
  if (backgroundColor) {
    button.style.backgroundColor = backgroundColor;
  }
  
  button.textContent = label;
  
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  
  return button;
};