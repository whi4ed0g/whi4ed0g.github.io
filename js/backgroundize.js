/**
 * 返回当前的主题模式（dark或light）
 * @returns {string} 当前的主题模式
 */
function getThemeMode() {
  /*const theme = localStorage.getItem('Fluid_Color_Scheme');*/
  const iconElement = document.getElementById('color-toggle-icon');
  const className = iconElement.className;
  const classes = className.split(' ');
  const themeClass = classes.find(c => c.startsWith('icon-'));
  if (themeClass) {
	const theme = themeClass.split('-')[1]; 
	console.log('当前主题模式为：', theme || 'dark');
	return theme === 'light' ? 'light' : 'dark';
  }
}

/**
 * 根据主题模式和设备类型设置背景图片
 * @param {String} themeMode - 'light' 或 'dark'
 */
function setBackgroundImage(themeMode) {
  const isMobile = window.innerWidth < 768;
  const webBgElement = document.querySelector('#web_bg');

  if (isMobile) {
    webBgElement.style.backgroundImage = `var(--mobile-bg-image)`;
  } else if (themeMode === 'dark') {
    webBgElement.style.backgroundImage = `var(--desktop-bg-image-night)`;
  } else {
    webBgElement.style.backgroundImage = `var(--desktop-bg-image-normal)`;
  }
}

/**
 * 初始化背景图片设置
 * @returns {void}
 */
function initBackground() {
  const theme = getThemeMode();
  setBackgroundImage(theme);
}

/**
 * 重置Banner样式，隐藏背景图片和遮罩层
 * @returns {void}
 */
function resetBannerStyles() {
  document.querySelector("#banner").setAttribute('style', 'background-image: none');
  document.querySelector("#banner .mask").setAttribute('style', 'background-color: rgba(0,0,0,0)');
}

// 监听主题切换按钮点击事件
const themeBtn = document.querySelector('#color-toggle-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const theme = getThemeMode();
    setBackgroundImage(theme);
    console.log(`切换到${theme === 'light' ? '日间' : '夜间'}模式`);
  });
}

// 初始化背景和样式
initBackground();
resetBannerStyles();

// 监听窗口大小变化，做防抖处理调整背景
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setBackgroundImage(getThemeMode());
  }, 200);
}, {
  passive: true // 防止默认事件
});


// 为日夜切换功能添加对导航栏样式的控制，不修改原有代码，仅追加

// 点击主题按钮时，额外切换导航栏的样式
document.getElementById('color-toggle-btn').addEventListener('click', function() {
  const navbar = document.getElementById('navbar');
  
  // 根据当前导航栏状态进行切换
  if (navbar.classList.contains('navbar-night')) {
    navbar.classList.remove('navbar-night');
    navbar.classList.add('navbar-day');
  } else {
    navbar.classList.remove('navbar-day');
    navbar.classList.add('navbar-night');
  }
});

