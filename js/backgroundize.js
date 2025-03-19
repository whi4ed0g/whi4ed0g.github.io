// ==================== 主题管理核心模块 ====================
/**
 * 获取当前主题模式（同步检查）
 * @returns {'light' | 'dark'} 当前主题模式
 */
function getThemeMode() {
  const theme = localStorage.getItem('Fluid_Color_Scheme');
  console.log('[Theme] Current mode:', theme || 'default(light)');
  return theme === 'dark' ? 'dark' : 'light'; // 确保始终返回合法值
}

/**
 * 设置背景图片（设备自适应）
 * @param {'light' | 'dark'} themeMode - 主题模式
 */
function setBackgroundImage(themeMode) {
  const isMobile = window.innerWidth < 768;
  const webBgElement = document.querySelector('#web_bg');

  // 防御性检查
  if (!webBgElement) {
    console.error('[Error] Missing #web_bg element');
    return;
  }

  // 动态生成CSS变量名
  const deviceType = isMobile ? 'mobile' : 'desktop';
  const themeVariant = themeMode === 'dark' ? 'dark' : isMobile ? 'light' : 'normal';
  const cssVar = `--${deviceType}-bg-image-${themeVariant}`;

  // 应用背景
  webBgElement.style.backgroundImage = `var(${cssVar})`;
  console.log(`[Background] ${deviceType} ${themeMode} applied`);
}

/**
 * 切换主题模式（核心逻辑）
 * @param {'light' | 'dark'} newTheme - 目标主题
 */
function setThemeMode(newTheme) {
  // 合法性校验
  if (!['light', 'dark'].includes(newTheme)) {
    console.error('[Error] Invalid theme:', newTheme);
    return;
  }

  // 持久化存储
  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  
  // 同步更新DOM属性
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // 应用背景
  setBackgroundImage(newTheme);
  console.log(`[Theme] Switched to ${newTheme}`);
}

// ==================== 事件监听模块 ====================
let isThemeListenerActive = false;

/**
 * 初始化主题切换按钮监听
 */
function initThemeButton() {
  const themeBtn = document.querySelector('#color-toggle-btn');
  
  if (!themeBtn) {
    console.warn('[Warning] Theme button not found');
    return;
  }

  // 防止重复绑定
  if (isThemeListenerActive) {
    console.warn('[Warning] Listener already bound');
    return;
  }

  const handleThemeToggle = () => {
    const currentTheme = getThemeMode();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
  };

  themeBtn.addEventListener('click', handleThemeToggle);
  isThemeListenerActive = true;
  console.log('[Event] Theme button listener activated');
}

// ==================== 初始化模块 ====================
/**
 * 初始化主题系统
 */
function initThemeSystem() {
  // 首次加载设置默认主题
  if (!localStorage.getItem('Fluid_Color_Scheme')) {
    localStorage.setItem('Fluid_Color_Scheme', 'light');
    console.log('[Init] Default theme set');
  }

  // 应用存储的主题
  const initialTheme = getThemeMode();
  setThemeMode(initialTheme); // 触发完整更新流程
  
  // 初始化事件监听
  initThemeButton();

  // 响应式背景处理
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setBackgroundImage(getThemeMode());
    }, 200);
  }, { passive: true });
}

// ==================== 启动入口 ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('[System] Theme system initializing...');
  initThemeSystem();
});