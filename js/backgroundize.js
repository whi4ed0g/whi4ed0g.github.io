// ==================== 元素加载保障系统 ====================
let webBgElement = null;
let retryCount = 0;

function ensureWebBgElement() {
  return new Promise((resolve, reject) => {
    const checkElement = () => {
      webBgElement = document.querySelector('#web_bg');
      
      if (webBgElement) {
        console.log('[DOM] #web_bg 元素已确认');
        resolve(webBgElement);
      } else if (retryCount < 5) {
        retryCount++;
        console.warn(`[DOM] 第 ${retryCount} 次重试查找 #web_bg`);
        setTimeout(checkElement, 300);
      } else {
        reject(new Error('[Fatal] 无法找到 #web_bg 元素'));
      }
    };

    checkElement();
  });
}

// ==================== 主题管理模块 ====================
const ThemeManager = {
  get mode() {
    const theme = localStorage.getItem('Fluid_Color_Scheme');
    return theme === 'dark' ? 'dark' : 'light';
  },

  set mode(newTheme) {
    if (!['light', 'dark'].includes(newTheme)) return;
    
    localStorage.setItem('Fluid_Color_Scheme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    this.applyBackground(newTheme);
  },

  async applyBackground(themeMode) {
    await ensureWebBgElement(); // 确保元素存在
    
    const isMobile = window.innerWidth < 768;
    const deviceType = isMobile ? 'mobile' : 'desktop';
    const themeVariant = themeMode === 'dark' ? 'dark' : isMobile ? 'light' : 'normal';
    
    webBgElement.style.backgroundImage = `var(--${deviceType}-bg-image-${themeVariant})`;
    console.log(`[Theme] ${deviceType} ${themeMode} applied`);
  }
};

// ==================== 事件管理系统 ====================
const EventManager = {
  init() {
    this.initThemeButton();
    this.initResizeHandler();
  },

  initThemeButton() {
    const btn = document.querySelector('#color-toggle-btn');
    if (!btn) return;

    btn.removeEventListener('click', this.handleThemeToggle);
    btn.addEventListener('click', this.handleThemeToggle);
    console.log('[Event] 主题按钮已初始化');
  },

  handleThemeToggle: () => {
    ThemeManager.mode = ThemeManager.mode === 'light' ? 'dark' : 'light';
  },

  initResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ThemeManager.applyBackground(ThemeManager.mode);
      }, 200);
    }, { passive: true });
  }
};

// ==================== 初始化流程 ====================
async function initializeThemeSystem() {
  try {
    await ensureWebBgElement();
    
    // 初始化默认主题
    if (!localStorage.getItem('Fluid_Color_Scheme')) {
      localStorage.setItem('Fluid_Color_Scheme', 'light');
    }
    
    // 应用当前主题
    ThemeManager.applyBackground(ThemeManager.mode);
    
    // 初始化事件
    EventManager.init();
    
  } catch (error) {
    console.error(error.message);
    // 此处可添加用户提示逻辑
  }
}

// ==================== 启动系统 ====================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeThemeSystem);
} else {
  initializeThemeSystem();
}