/**
 * 获取当前的主题模式（'dark' 或 'light'）
 * @returns {string} 当前的主题模式
 */
function getThemeMode() {
  let theme = localStorage.getItem('Fluid_Color_Scheme');
  if (!theme) {
    theme = 'light'; // 默认浅色模式
    localStorage.setItem('Fluid_Color_Scheme', theme);
  }
  return theme;
}

/**
 * 设置主题模式并更新 localStorage
 * @param {string} newTheme - 目标主题（'light' 或 'dark'）
 */
function setThemeMode(newTheme) {
  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme); // 可能用于其他样式适配
  setBackgroundImage(newTheme);
}

/**
 * 根据主题模式和设备类型设置背景图片
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
 * 初始化背景图片设置
 */
function initBackground() {
  const theme = getThemeMode();
  document.documentElement.setAttribute('data-theme', theme); // 适配主题
  setBackgroundImage(theme);
}

/**
 * 处理主题切换
 */
function toggleTheme() {
  const currentTheme = getThemeMode();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  setThemeMode(newTheme);
  console.log(`主题已切换为: ${newTheme}`);
}

/**
 * 重置 Banner 样式，隐藏背景图片和遮罩层
 */
function resetBannerStyles() {
  const banner = document.querySelector("#banner");
  const mask = document.querySelector("#banner .mask");

  if (banner) banner.style.backgroundImage = 'none';
  if (mask) mask.style.backgroundColor = 'rgba(0,0,0,0)';
}

// 监听主题切换按钮点击事件
document.addEventListener("DOMContentLoaded", () => {
  initBackground();
  resetBannerStyles();

  const themeBtn = document.querySelector('#color-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
});

// 监听窗口大小变化，调整背景
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setBackgroundImage(getThemeMode());
  }, 200);
}, { passive: true });
