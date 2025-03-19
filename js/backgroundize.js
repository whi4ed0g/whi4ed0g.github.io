function getThemeMode() {
  let theme = localStorage.getItem('Fluid_Color_Scheme');
  if (!theme) {
    theme = 'light';
    localStorage.setItem('Fluid_Color_Scheme', theme);
  }
  console.log('当前主题模式为：', theme);
  return theme;
}

function setBackgroundImage(themeMode) {
  const webBgElement = document.querySelector('#web_bg');
  if (!webBgElement) {
    console.error("Error: #web_bg 元素未找到！");
    return;
  }

  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    webBgElement.style.backgroundImage =
      themeMode === 'dark' ? 'var(--mobile-bg-image-dark)' : 'var(--mobile-bg-image-light)';
  } else {
    webBgElement.style.backgroundImage =
      themeMode === 'dark' ? 'var(--desktop-bg-image-night)' : 'var(--desktop-bg-image-normal)';
  }
}

function toggleTheme() {
  let currentTheme = getThemeMode();
  let newTheme = currentTheme === 'light' ? 'dark' : 'light';

  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  console.log('更新后的主题模式为：', newTheme);

  setTimeout(() => {
    setBackgroundImage(newTheme);
  }, 50);
}

function resetBannerStyles() {
  let banner = document.querySelector("#banner");
  let mask = document.querySelector("#banner .mask");

  if (banner) banner.style.backgroundImage = 'none';
  if (mask) mask.style.backgroundColor = 'rgba(0,0,0,0)';
}

document.addEventListener("DOMContentLoaded", () => {
  const webBgElement = document.querySelector('#web_bg');
  if (!webBgElement) {
    console.error("Error: #web_bg 元素未正确加载！");
    return;
  }
  initBackground();
  resetBannerStyles();
});

const themeBtn = document.querySelector('#color-toggle-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', toggleTheme);
}

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    let currentTheme = localStorage.getItem('Fluid_Color_Scheme') || 'light';
    setBackgroundImage(currentTheme);
  }, 200);
}, { passive: true });
