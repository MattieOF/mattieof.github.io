import '../css/style.css';

const pages = [
  { file: '/', title: 'Work' },
  { file: '/blog.html', title: 'Blog' },
  { file: '/contact.html', title: 'Contact' },
]

function applyTheme() {
  // Figure out if the theme should be dark
  let dark = false;
  if ('theme' in localStorage) {
    dark = localStorage.theme === 'dark';
  } else {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  window.darkThemeEnabled = dark;

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

function createThemeButton() {
  const button = document.createElement('button');
  button.className = 'hide-on-print theme-button-color floating-button';
  button.name = "theme-button";
  button.onclick = toggleDarkMode;
  button.innerText = document.documentElement.classList.contains("dark") ? '☀️' : '🌙';
  document.body.appendChild(button);
}

function createNav() {
  const nav = document.createElement('nav');
  nav.className = 'main-nav';

  const ul = document.createElement('ul');
  nav.appendChild(ul);

  for (const page of pages) {
    const li = document.createElement('li');
    ul.appendChild(li);

    li.innerText = page.title;
    if (page.file == window.location.pathname)
    {
      li.classList.add('selected');
    } else {
      li.classList.add('clickable');

      li.onclick = function() {
        window.location = page.file;
      }
    }
  }

  document.body.insertBefore(nav, document.body.firstChild);
}

window.onload = function() {
  createThemeButton();
  if (window.location.pathname.includes("cv"))
    return;
  createNav();
}
