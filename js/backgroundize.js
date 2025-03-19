// ========== 主题管理核心逻辑 ==========
function getThemeMode() {
  const theme = localStorage.getItem('Fluid_Color_Scheme') || 'light'; // 默认值移到获取时
  console.log('[状态] 当前主题模式为：', theme);
  return theme;
}

function setThemeMode(newTheme) {
  if (!['light', 'dark'].includes(newTheme)) {
    console.error('非法主题值:', newTheme);
    return;
  }
  
  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  const updatedTheme = localStorage.getItem('Fluid_Color_Scheme');
  
  if (updatedTheme !== newTheme) {
    console.error('[严重错误] 存储不一致！预期:', newTheme, '实际:', updatedTheme);
    return;
  }
  
  console.log('[操作] 更新后的主题模式为：', updatedTheme);
  document.documentElement.setAttribute('data-theme', updatedTheme);
  setBackgroundImage(updatedTheme);
}

// ========== 事件监听 ==========
let isListenerBound = false; // 防止重复绑定

function initThemeListener() {
  const themeBtn = document.querySelector('#color-toggle-btn');
  
  if (!themeBtn) {
    console.warn('⚠️ 未找到主题切换按钮');
    return;
  }
  
  if (isListenerBound) {
    console.warn('⚠️ 监听器已绑定，跳过重复操作');
    return;
  }
  
  function handleThemeToggle() {
    const currentTheme = getThemeMode();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.groupCollapsed(`[事件] 主题切换请求 (${newTheme})`);
    setThemeMode(newTheme);
    console.log(`[完成] 主题已切换为: ${newTheme}`);
    console.groupEnd();
  }
  
  themeBtn.addEventListener('click', handleThemeToggle);
  isListenerBound = true;
  console.log('[初始化] 主题按钮监听器已绑定');
}

// ========== 初始化 ==========
function initBackground() {
  if (!localStorage.getItem('Fluid_Color_Scheme')) {
    localStorage.setItem('Fluid_Color_Scheme', 'light');
    console.log('[初始化] 设置默认主题为 light');
  }
  setBackgroundImage(getThemeMode());
}

// 主初始化流程
function mainInit() {
  initBackground();
  initThemeListener();
  
  // 防抖处理窗口resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setBackgroundImage(getThemeMode());
    }, 200);
  }, { passive: true });
}

// 启动
mainInit();