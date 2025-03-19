/**
 * 返回当前的主题模式（'dark' 或 'light'）
 * @returns {string} 当前的主题模式
 */
function getThemeMode() {
  let theme = localStorage.getItem('Fluid_Color_Scheme');
  if (!theme) {
    theme = 'light'; 
    localStorage.setItem('Fluid_Color_Scheme', theme);
  }
  console.log('当前主题模式为：', theme);
  return theme;
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
  setBackgroundImage(theme);
}

/**
 * 处理主题切换
 */
function toggleTheme() {
  let currentTheme = getThemeMode();
  let newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // 更新 localStorage 并重新设置背景
  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  console.log('更新后的主题模式为：', newTheme);
  setBackgroundImage(newTheme);
}

/**
 * 重置 Banner 样式，隐藏背景图片和遮罩层
 */
function resetBannerStyles() {
  let banner = document.querySelector("#banner");
  let mask = document.querySelector("#banner .mask");

  if (banner) banner.style.backgroundImage = 'none';
  if (mask) mask.style.backgroundColor = 'rgba(0,0,0,0)';
}

// 监听主题切换按钮点击事件
const themeBtn = document.querySelector('#color-toggle-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', toggleTheme);
}

// 初始化背景和样式
document.addEventListener("DOMContentLoaded", () => {
  initBackground();
  resetBannerStyles();
});

// 监听窗口大小变化，调整背景
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setBackgroundImage(getThemeMode());
  }, 200);
}, { passive: true });
