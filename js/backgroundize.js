// ========== 核心函数定义 ==========
/**
 * 根据主题设置背景图片
 * @param {string} themeMode - 'light' 或 'dark'
 */
function setBackgroundImage(themeMode) {
  const isMobile = window.innerWidth < 768;
  const webBgElement = document.querySelector('#web_bg');

  if (!webBgElement) {
    console.error('❌ 未找到 #web_bg 元素');
    return;
  }

  const imageType = isMobile ? 'mobile' : 'desktop';
  const imageVariant = themeMode === 'dark' ? 'dark' : 'light';

  // 通过模板字符串动态生成 CSS 变量名
  const cssVar = `--${imageType}-bg-image-${imageVariant}`;
  webBgElement.style.backgroundImage = `var(${cssVar})`;

  console.log(`[背景] 已切换为 ${themeMode} 模式 (设备: ${imageType})`);
}

// ========== 其他核心函数 ==========
function getThemeMode() {
  const theme = localStorage.getItem('Fluid_Color_Scheme') || 'light';
  console.log('[主题] 当前模式:', theme);
  return theme;
}

function setThemeMode(newTheme) {
  if (!['light', 'dark'].includes(newTheme)) {
    console.error('[错误] 非法主题值:', newTheme);
    return;
  }
  
  localStorage.setItem('Fluid_Color_Scheme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  setBackgroundImage(newTheme); // ✅ 确保此处调用已定义的函数
  console.log('[主题] 已切换至:', newTheme);
}

// ========== 初始化流程 ==========
function initBackground() {
  if (!localStorage.getItem('Fluid_Color_Scheme')) {
    localStorage.setItem('Fluid_Color_Scheme', 'light');
  }
  setBackgroundImage(getThemeMode()); // ✅ 确保函数已定义
}

// 其他初始化代码保持不变...