/**
 * 获取当前主题模式 ('dark' 或 'light')
 * @returns {string} 当前的主题模式
 */
function getThemeMode() {
  let theme = localStorage.getItem('Fluid_Color_Scheme'); // 读取存储的主题模式

  if (!theme) {
    theme = 'light'; // 默认浅色模式
    localStorage.setItem('Fluid_Color_Scheme', theme);
  }

  console.log('当前主题模式为：', theme);
  return theme;
}

/**
 * 设置主题模式并更新 localStorage
 * @param {string} newTheme - 目标主题（'light' 或 'dark'）
 */
function setThemeMode(newTheme) {
  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  
  // **强制重新读取，确保 localStorage 立即生效**
  let updatedTheme = localStorage.getItem('Fluid_Color_Scheme');
  console.log('更新后的主题模式为：', updatedTheme);

  // 直接修改 HTML 标签上的 data-theme
  document.documentElement.setAttribute('data-theme', updatedTheme);

  setBackgroundImage(updatedTheme);
}

/**
 * 设置背景图片
 * @param {String} themeMode - 'light' 或 'dark'
 */
function setBackgroundImage(themeMode) {
  const isMobile = window.innerWidth < 768;
  const webBgElement = document.querySelector('#web_bg');

  if (!webBgElement) {
    console.error("Error: #web_bg 元素未找到！");
    return;
  }

  if (isMobile) {
    webBgElement.style.backgroundImage =
      themeMode === 'dark' ? 'var(--mobile-bg-image-dark)' : 'var(--mobile-bg-image-light)';
  } else {
    webBgElement.style.backgroundImage =
      themeMode === 'dark' ? 'var(--desktop-bg-image-night)' : 'var(--desktop-bg-image-normal)';
  }
}

/**
 * 初始化主题模式
 */
function initBackground() {
  const theme = getThemeMode();
  document.documentElement.setAttribute('data-theme', theme);
  setBackgroundImage(theme);
}

/**
 * 主题切换
 */
function toggleTheme() {
  const currentTheme = getThemeMode();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  setThemeMode(newTheme);
  console.log(`主题已切换为: ${newTheme}`);
}

// 页面加载后初始化
document.addEventListener("DOMContentLoaded", () => {
  initBackground();

  const themeBtn = document.querySelector('#color-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
});
