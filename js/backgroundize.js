/**
 * 获取当前主题模式 ('dark' 或 'light')
 * @returns {string} 当前主题模式
 */
function getThemeMode() {
  const theme = localStorage.getItem('Fluid_Color_Scheme');
  console.log('当前主题模式为：', theme);
  return theme;
}

/**
 * 设置主题模式并更新 localStorage
 * @param {string} newTheme - 目标主题（'light' 或 'dark'）
 */
function setThemeMode(newTheme) {
  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  const updatedTheme = localStorage.getItem('Fluid_Color_Scheme');
  console.log('更新后的主题模式为：', updatedTheme);
  document.documentElement.setAttribute('data-theme', updatedTheme);
  setBackgroundImage(updatedTheme);
}

/**
 * 根据主题模式和设备类型设置背景图片
 * @param {String} themeMode - 'light' 或 'dark'
 */
function setBackgroundImage(themeMode) {
  const isMobile = window.innerWidth < 768;
  const webBgElement = document.querySelector('#web_bg');

  if (!webBgElement) {
    console.error('❌ 未找到 #web_bg 元素');
    return;
  }

  if (isMobile) {
    webBgElement.style.backgroundImage = themeMode === 'dark'
      ? 'var(--mobile-bg-image-dark)'
      : 'var(--mobile-bg-image-light)';
  } else {
    webBgElement.style.backgroundImage = themeMode === 'dark'
      ? 'var(--desktop-bg-image-night)'
      : 'var(--desktop-bg-image-normal)';
  }

  console.log(`背景已更新为 ${themeMode} 模式`);
}

/**
 * 初始化背景图片设置（包含默认值初始化）
 */
function initBackground() {
  let theme = getThemeMode();
  if (!theme) {
    theme = 'light';
    localStorage.setItem('Fluid_Color_Scheme', theme);
  }
  setBackgroundImage(theme);
}

/**
 * 监听主题切换按钮点击事件
 */
const themeBtn = document.querySelector('#color-toggle-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = getThemeMode();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    console.log(`主题已切换为: ${newTheme}`);
  });
} else {
  console.warn('⚠️ 未找到 #color-toggle-btn 按钮');
}

// 初始化背景
initBackground();

// 监听窗口大小变化（防抖处理）
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setBackgroundImage(getThemeMode());
  }, 200);
}, { passive: true });