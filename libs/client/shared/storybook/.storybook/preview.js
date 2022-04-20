import GlobalStyles from './tailwind.css';

const storybookStyles = document.createElement('style');
storybookStyles.innerHTML = GlobalStyles;
document.body.appendChild(storybookStyles);
