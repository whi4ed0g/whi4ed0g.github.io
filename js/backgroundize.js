/**
 * 获取当前主题模式 ('dark' 或 'light')
 * @returns {string} 当前的主题模式
 */
function getThemeMode() {
  return localStorage.getItem('Fluid_Color_Scheme') || 'light'; // 默认是 light
}

/**
 * 设置主题模式并更新 localStorage
 * @param {string} newTheme - 'light' 或 'dark'
 */
function setThemeMode(newTheme) {
  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  console.log('主题已切换为:', newTheme);

  // **强制同步获取最新值**
  setTimeout(() => {
    console.log('确认存储的主题模式:', localStorage.getItem('Fluid_Color_Scheme'));
    setBackgroundImage(newTheme);
  }, 0); // 使用 `setTimeout` 确保数据存储后再读取
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

  const bgImage = isMobile
    ? themeMode === 'dark'
      ? 'var(--mobile-bg-image-dark)'
      : 'var(--mobile-bg-image-light)'
    : themeMode === 'dark'
      ? 'var(--desktop-bg-image-night)'
      : 'var(--desktop-bg-image-normal)';

  webBgElement.style.backgroundImage = bgImage;
  console.log(`背景已更新为 ${themeMode} 模式`);
}

/**
 * 初始化背景图片设置
 */
function initBackground() {
  const theme = getThemeMode();
  console.log('初始化时的主题模式:', theme);
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
  });
} else {
  console.warn('⚠️ 未找到 #color-toggle-btn 按钮');
}

// 初始化背景
initBackground();

// 监听窗口大小变化，做防抖处理调整背景
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setBackgroundImage(getThemeMode());
  }, 200);
}, {
  passive: true
});
