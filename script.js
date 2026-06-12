const titleElement = document.getElementById('hero-title');
const roleElement = document.getElementById('hero-role');
const themeToggle = document.getElementById('theme-toggle');
const toggleIconImg = document.getElementById('toggle-icon-img');
const titleText = 'Humphrey Mungai';
const roleTextPart1 = 'Full-Stack Developer';
const roleTextPart2 = 'UI/UX Designer';
const roleTextPart3 = 'Mobile App Developer';
const typingSpeed = 90;
const pauseTime = 600;

function typeText(element, text, speed) {
  element.textContent = '';
  let index = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      element.textContent = text.slice(0, index + 1);
      index += 1;

      if (index === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

function deleteText(element, speed) {
  let index = element.textContent.length;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      element.textContent = element.textContent.slice(0, index - 1);
      index -= 1;

      if (index === 0) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (toggleIconImg) toggleIconImg.src = 'Images/brightness_5_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg';
  } else {
    if (toggleIconImg) toggleIconImg.src = 'Images/brightness_2_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg';
  }
}

function toggleTheme() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  const theme = isDarkMode ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  if (toggleIconImg) {
    toggleIconImg.src = isDarkMode 
      ? 'Images/brightness_5_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg'
      : 'Images/brightness_2_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

function initNavActiveState() {
  const sections = document.querySelectorAll('main[id], section[id]');
  const navLinks = document.querySelectorAll('.header nav a');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-120px 0px -66% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

window.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initNavActiveState();
  if (titleElement) await typeText(titleElement, titleText, typingSpeed);
  if (roleElement) {
    await new Promise((resolve) => setTimeout(resolve, pauseTime));
    await typeText(roleElement, roleTextPart1, typingSpeed);
    await new Promise((resolve) => setTimeout(resolve, 800));
    await deleteText(roleElement, 50);
    await new Promise((resolve) => setTimeout(resolve, 400));
    await typeText(roleElement, roleTextPart2, typingSpeed);
    await new Promise((resolve) => setTimeout(resolve, 800));
    await deleteText(roleElement, 50);
    await new Promise((resolve) => setTimeout(resolve, 400));
    await typeText(roleElement, roleTextPart3, typingSpeed);
  }
});
