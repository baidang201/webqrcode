// 检查是否已经存在QR码容器
function isQRContainerExists() {
  return document.querySelector('.web-qr-container');
}

// 创建并注入UI元素
function createQRButton() {
  console.log('开始创建二维码按钮...');  // 添加调试日志
  
  // 避免重复创建
  if (isQRContainerExists()) {
    console.log('二维码按钮已存在，跳过创建');
    return;
  }

  try {
    // 创建容器
    const container = document.createElement('div');
    container.className = 'web-qr-container';
    
    // 创建favicon按钮
    const faviconBtn = document.createElement('div');
    faviconBtn.className = 'web-qr-favicon-btn';
    faviconBtn.title = '点击显示二维码';
    
    // 设置favicon图标
    const favicon = document.createElement('img');
    favicon.src = `https://www.google.com/s2/favicons?domain=${window.location.hostname}&sz=64`;
    favicon.onerror = () => {
      // 如果favicon加载失败，使用默认图标
      favicon.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIHJ5PSIyIj48L3JlY3Q+PHJlY3QgeD0iNyIgeT0iNyIgd2lkdGg9IjMiIGhlaWdodD0iMyI+PC9yZWN0PjxyZWN0IHg9IjE0IiB5PSI3IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIj48L3JlY3Q+PHJlY3QgeD0iNyIgeT0iMTQiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiPjwvcmVjdD48cmVjdCB4PSIxNCIgeT0iMTQiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiPjwvcmVjdD48L3N2Zz4=';
    };
    faviconBtn.appendChild(favicon);
    
    // 创��QR码面板
    const qrPanel = document.createElement('div');
    qrPanel.className = 'web-qr-panel';
    
    // 创建QR码容器
    const qrWrapper = document.createElement('div');
    qrWrapper.className = 'web-qr-wrapper';
    
    // 创建QR码元素
    const qrCode = document.createElement('div');
    qrCode.id = 'qrcode';
    
    // 创建网站标题
    const title = document.createElement('div');
    title.className = 'web-qr-title';
    title.textContent = document.title;
    
    // 创建关闭按钮
    const closeBtn = document.createElement('div');
    closeBtn.className = 'web-qr-close';
    closeBtn.innerHTML = '×';
    
    // 组装UI
    qrWrapper.appendChild(qrCode);
    qrPanel.appendChild(closeBtn);
    qrPanel.appendChild(qrWrapper);
    qrPanel.appendChild(title);
    
    container.appendChild(faviconBtn);
    container.appendChild(qrPanel);
    
    // 确保容器被添加到body
    if (document.body) {
      document.body.appendChild(container);
      console.log('二维码按钮已添加到页面');
      
      // 生成QR码
      try {
        new QRCode(qrCode, {
          text: window.location.href,
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
        console.log('QR码生成成功');
      } catch (error) {
        console.error('QR码生成失败:', error);
      }
    } else {
      console.error('document.body不存在');
    }
    
    // 绑定事件
    faviconBtn.addEventListener('click', () => {
      container.classList.add('expanded');
    });
    
    closeBtn.addEventListener('click', () => {
      container.classList.remove('expanded');
    });

    // 点击外部关闭面板
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target) && container.classList.contains('expanded')) {
        container.classList.remove('expanded');
      }
    });

  } catch (error) {
    console.error('创建二维码按钮时发生错误:', error);
  }
}

// 确保在页面加载完成后执行
function init() {
  console.log('初始化二维码功能...');
  if (document.readyState === 'complete') {
    createQRButton();
  } else {
    window.addEventListener('load', createQRButton);
  }
}

// 立即执行初始化
init();

// 监听页面变化
const observer = new MutationObserver((mutations) => {
  if (!isQRContainerExists() && document.body) {
    console.log('检测到页面变化，重新创建二维码按钮');
    createQRButton();
  }
});

// 开始监听
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  // 如果body还不存在，等待它创建完成
  const bodyObserver = new MutationObserver(() => {
    if (document.body) {
      bodyObserver.disconnect();
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      createQRButton();
    }
  });
  
  bodyObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
} 