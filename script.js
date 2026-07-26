// 预装脚手架代码模版字典
const templateFiles = {
    'index.html': `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的个人主题网站</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="hero">
        <div class="container">
            <h1 id="main-title">欢迎来到我的 AI 实战作品集</h1>
            <p class="subtitle">用 AI Agent 打造的个人主页与项目探索</p>
            <button id="cta-button" class="btn">探索我的作品</button>
        </div>
    </header>
    <main class="container">
        <section class="card-grid">
            <article class="card">
                <h2>🚀 关于项目</h2>
                <p>这是我在 AI Agent 课程中独立设计和构建的个人主页。</p>
            </article>
        </section>
    </main>
    <script src="script.js"></script>
</body>
</html>`,
    'style.css': `/* 基础全局样式 */
:root {
    --primary-color: #4f46e5;
    --bg-color: #f8fafc;
    --card-bg: #ffffff;
    --text-color: #1e293b;
    --border-radius: 12px;
}
body {
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
}
.hero {
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    color: white;
    text-align: center;
    padding: 60px 20px;
}
.card {
    background: var(--card-bg);
    padding: 24px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}`,
    'script.js': `// 页面基础交互脚本
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            alert('🎉 恭喜！你已成功触发网页的第一个 JavaScript 交互动作。');
        });
    }
});`,
    'AGENTS.md': `# AGENT 工作准则 (AGENTS.md)
1. 代码修改原则：保持结构清晰，优先修改 style.css 调整样式，在 index.html 维护结构。
2. 防止破坏性重构：不要一次性抹掉重写整个 HTML 文件，请按模块或区域进行精准更新。
3. 安全防护：严禁在代码中写死真实个人敏感信息与 API Key。`,
    'README.md': `# 个人主题网站 - 我的第一个 AI 实战项目
通过与 AI Agent 协作，我构建了这个属于自己的个人主题网站。

## 我的版本记录
- v0.1: 初始化网页骨架与主题框架（第 1 课）
- v0.2: 完善样式、新增交互组件与响应式布局（第 2 课）`
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化主题切换
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // 检查本地缓存
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeBtnUI(true);
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeBtnUI(isDark);
    });

    function updateThemeBtnUI(isDark) {
        const icon = themeToggleBtn.querySelector('.icon');
        const label = themeToggleBtn.querySelector('.label');
        if (isDark) {
            icon.textContent = '🌙';
            label.textContent = '深色模式';
        } else {
            icon.textContent = '☀️';
            label.textContent = '浅色模式';
        }
    }

    // 2. 初始化代码查看器
    switchCodeFile('index.html');
});

// Tab 切换函数
function openLessonTab(event, tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabContents.forEach(content => content.classList.remove('active'));
    tabBtns.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 复制框内 Prompt
function copyCode(btn) {
    const promptBox = btn.previousElementSibling;
    const codeText = promptBox.innerText;

    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ 已复制！';
        btn.style.background = '#10b981';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// 代码模版查看器文件切换
function switchCodeFile(filename) {
    const codeViewer = document.getElementById('codeViewer');
    const currentFileName = document.getElementById('currentFileName');
    const fileItems = document.querySelectorAll('.file-tree li');

    fileItems.forEach(item => {
        if (item.textContent.includes(filename)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    if (currentFileName) currentFileName.textContent = filename;
    if (codeViewer) codeViewer.textContent = templateFiles[filename] || '// 暂无内容';
}

// 复制代码查看器内容
function copyCodeDisplay() {
    const codeViewer = document.getElementById('codeViewer');
    const btn = document.querySelector('.code-header .copy-btn');

    navigator.clipboard.writeText(codeViewer.textContent).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ 已复制模版！';
        btn.style.background = '#10b981';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    });
}
