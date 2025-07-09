import { Button } from '../Button/Button';
import './header.css';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps): HTMLElement => {
  const header = document.createElement('header');
  
  const headerDiv = document.createElement('div');
  headerDiv.className = 'storybook-header';
  
  // Left side with logo and title
  const leftDiv = document.createElement('div');
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 32 32');
  svg.innerHTML = `
    <g fill="none" fillRule="evenodd">
      <path
        d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
        fill="#FFF"
      />
      <path
        d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
        fill="#555AB9"
      />
      <path
        d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
        fill="#91BAF8"
      />
    </g>
  `;
  
  const title = document.createElement('h1');
  title.textContent = 'Acme';
  
  leftDiv.appendChild(svg);
  leftDiv.appendChild(title);
  
  // Right side with buttons
  const rightDiv = document.createElement('div');
  
  if (user) {
    const logoutButton = Button({ size: 'small', onClick: onLogout, label: 'Log out' });
    rightDiv.appendChild(logoutButton);
  } else {
    const loginButton = Button({ size: 'small', onClick: onLogin, label: 'Log in' });
    const signupButton = Button({ primary: true, size: 'small', onClick: onCreateAccount, label: 'Sign up' });
    rightDiv.appendChild(loginButton);
    rightDiv.appendChild(signupButton);
  }
  
  headerDiv.appendChild(leftDiv);
  headerDiv.appendChild(rightDiv);
  header.appendChild(headerDiv);
  
  return header;
};