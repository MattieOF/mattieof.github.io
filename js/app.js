import '../css/style.css';

function applyTheme() {
  // Figure out if the theme should be dark
  let dark = false;
  if ('theme' in localStorage) {
    dark = localStorage.theme === 'dark';
  } else {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Update the class list to apply the theme
  document.documentElement.classList.toggle('dark', dark);

  // Update the theme toggler button (if it has been created) to reflect the current theme
  const button = document.getElementsByName("theme-button");
  if (button.length > 0) { // The button won't exist when this is first called
    button[0].innerText = localStorage.theme === 'dark' ? '☀️' : '🌙';
  }
}

// Apply the theme on page load
applyTheme();

window.toggleDarkMode = function() {
  if ('theme' in localStorage) {
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark';
  } else {
    // If the user has manually toggled the theme, we should respect that over the system preference going forward,
    // so we add the theme to localStorage
    localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
  }
  applyTheme();
}

// Add dark mode toggle
window.onload = function() {
  const button = document.createElement('button');
  button.className = 'theme-button-color floating-button';
  button.name = "theme-button";
  button.onclick = toggleDarkMode;
  button.innerText = document.documentElement.classList.contains("dark") ? '☀️' : '🌙';
  document.body.appendChild(button);
}
