// ==========================================
// 1. 全局状态定义
// ==========================================
let state = {
    lang: 'zh',
    template: 'tpl-left',
    config: {
        bgColor: '#ffffff',    
        lineHeight: 1.4,       
        pageMargin: 14,        
        moduleSpacing: 15,
        nameFont: 'system-ui, -apple-system, sans-serif', nameSize: 26, nameBold: true,
        titleFont: 'system-ui, -apple-system, sans-serif', titleSize: 16, titleBold: true,
        subFont: 'system-ui, -apple-system, sans-serif', subSize: 14, subBold: true,
        textFont: 'system-ui, -apple-system, sans-serif', textSize: 13, textBold: false,
    },
    activeModuleId: null,
    modules: [
        { id: 'mod_basic', type: 'basic', visible: true, title: '个人信息', data: { name: '沈知珩', phone: '136-9988-2211', email: 'shenzhiheng@protonmail.com', location: '深圳市', intent: '求职意向：AI 产品负责人 / 智能硬件高级产品经理\n证书：PMP、数据分析高级认证 | 英语：CET-6、商务流利', photo: '' } },
        { id: 'mod_edu', type: 'list', visible: true, title: '教育背景', items: [{ id: generateId(), title: '北京大学光华管理学院', subtitle: '商业分析 | 硕士', date: '2020.09 – 2023.06', desc: '<ul><li>主修：产品战略、用户增长、商业模型、AI 商业化</li><li>导师项目：《智能硬件产品全球化增长策略》负责人</li></ul>' }, { id: generateId(), title: '清华大学', subtitle: '电子信息工程 | 本科', date: '2016.09 – 2020.06', desc: '<ul><li>GPA 3.8/4.0，专业前 5%，获国家奖学金、学业优秀一等奖、科创特等奖</li><li>清华 AI 兴趣小组核心成员、机器人队产品负责人</li><li>发表校级论文《基于深度学习的用户意图识别系统》</li></ul>' }] },
        { id: 'mod_exp', type: 'list', visible: true, title: '工作经历', items: [{ id: generateId(), title: '头部 AI 科技公司', subtitle: '高级产品经理（AI + 硬件）', date: '2023.07 – 至今', desc: '<ul><li>主导 AI 全景影像 / 智能运动相机产品线从 0 到 1 落地，年度营收破 1.2 亿。</li><li>搭建 AI 自动剪辑、场景识别、追踪拍摄核心功能，用户满意度提升 42%。</li><li>负责跨部门团队（产品/研发/算法/设计/市场/供应链）整体项目管理。</li><li>制定产品 roadmap，完成 3 代硬件迭代，竞品行业排名进入 TOP3。</li><li>输出用户研究、需求池、PRD、数据分析体系，提升团队效率 60%。</li><li>推动海外市场上线，支持多语言 AI 交互，海外销量占比达 35%。</li></ul>' }, { id: generateId(), title: '互联网大厂（对标字节/阿里）', subtitle: '产品经理（增长与商业化）', date: '2020.07 – 2023.06', desc: '<ul><li>负责亿级用户 APP 增长策略，实现年度新增用户 3200 万。</li><li>搭建 AI 推荐引擎、用户分层体系、全链路转化漏斗，转化率提升 28%。</li><li>主导大型活动策划与落地，单场活动 GMV 超 8000 万。</li><li>建立数据看板体系，周度复盘驱动策略迭代，大幅降低获客成本。</li><li>输出行业分析报告多篇，被公司级战略会议采纳。</li></ul>' }] },
        { id: 'mod_proj', type: 'list', visible: true, title: '核心项目经历', items: [{ id: generateId(), title: 'AI 智能影像硬件产品', subtitle: '项目总负责人', date: '2023.07 – 至今', desc: '<ul><li>定义产品定位：AI + 全景拍摄 + 运动相机 + 自动剪辑一体化旗舰产品。</li><li>完成用户调研 1000+ 份，竞品分析 20+ 品牌，输出完整产品战略。</li><li>主导 AI 算法落地：智能追踪、防抖优化、一键成片、语音控制。</li><li>带领 18 人团队完成研发、测试、量产、上市全流程。</li><li>上市 6 个月销量破 15 万台，成为细分领域爆款机型。</li></ul>' }, { id: generateId(), title: '全球用户增长 AI 系统', subtitle: '核心产品负责人', date: '2020.07 – 2023.06', desc: '<ul><li>构建 AI 用户画像、智能触达、个性化推荐系统。</li><li>覆盖全球 12 个国家，支持 7 种语言，留存提升 23%。</li><li>实现自动化投放、智能素材生成、ROI 优化闭环。</li><li>年度节省营销成本超 2000 万。</li></ul>' }] },
        { id: 'mod_skill', type: 'text', visible: true, title: '专业能力', content: '<ul><li><b>产品能力：</b>全栈产品设计、战略规划、需求分析、PRD、项目管理、商业化落地</li><li><b>AI 能力：</b>大模型应用、提示词工程、AI 交互设计、智能硬件 AI 功能落地</li><li><b>数据能力：</b>SQL、Python、用户行为分析、漏斗模型、A/B 测试、数据驱动决策</li><li><b>工具软件：</b>Axure、Figma、XMind、Notion、飞书、Tableau、Jira</li><li><b>语言与管理：</b>英语商务流利（CET-6）、日语基础；具备跨部门协同、海外对接、供应链沟通经验</li></ul>' },
        { id: 'mod_eval', type: 'text', visible: true, title: '自我评价', content: '具备清北教育背景与大厂硬核履历，拥有 AI + 智能硬件全栈经验，擅长从 0 到 1 打造爆款产品、搭建商业化体系、推动全球化增长。逻辑极强，视野开阔，具备战略思维、产品思维、数据思维、商业思维合一的综合能力。能独立负责千万级/亿级产品线，抗压能力强，执行力顶尖，适合担任核心项目负责人角色。' }
    ]
};

const LOCAL_STORAGE_KEY = 'cube_resume_state_v1_5';

// ==========================================
// 🚀 核心新增：历史记录引擎 (撤销/重做)
// ==========================================
let historyStack = [];
let historyIndex = -1;
let isUndoRedoing = false;
let historyDebounceTimer = null;

function pushHistory() {
    if (isUndoRedoing) return; // 如果正在撤销过程中，不记录
    
    // 如果在撤销后又进行了新操作，砍掉后面的未来历史
    historyStack = historyStack.slice(0, historyIndex + 1);
    
    // 深拷贝当前 state 并推入栈
    historyStack.push(JSON.stringify(state));
    
    // 限制历史记录最多 50 步，防止撑爆内存
    if (historyStack.length > 50) {
        historyStack.shift();
    } else {
        historyIndex++;
    }
    updateHistoryButtons();
}

function debouncedPushHistory() {
    clearTimeout(historyDebounceTimer);
    historyDebounceTimer = setTimeout(pushHistory, 400); // 停止打字 400ms 后记录
}

function updateHistoryButtons() {
    document.getElementById('btn-undo').disabled = historyIndex <= 0;
    document.getElementById('btn-redo').disabled = historyIndex >= historyStack.length - 1;
}

function undo() {
    if (historyIndex > 0) {
        isUndoRedoing = true;
        historyIndex--;
        restoreState(historyStack[historyIndex]);
        isUndoRedoing = false;
        updateHistoryButtons();
    }
}

function redo() {
    if (historyIndex < historyStack.length - 1) {
        isUndoRedoing = true;
        historyIndex++;
        restoreState(historyStack[historyIndex]);
        isUndoRedoing = false;
        updateHistoryButtons();
    }
}

function restoreState(stateJSON) {
    state = JSON.parse(stateJSON);
    localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON); // 强制存入本地，但不触发防抖
    
    applyCSSVariables();
    els.paper.className = `resume-paper ${state.template}`;
    
    syncConfigUI(); // 撤销时，左侧控制面板的数值也要变回去
    translateUI();
    renderModuleList();
    renderEditor();
    renderPreview();
}

// 修改原有的本地存储函数，将其与历史记录引擎绑定
function saveStateToLocal() { 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state)); 
    if(!isUndoRedoing) debouncedPushHistory();
}

function loadStateFromLocal() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(state.config, parsed.config); 
            state.modules = parsed.modules || state.modules;
            state.lang = parsed.lang || state.lang;
            state.template = parsed.template || state.template;
        } catch (e) { console.error("Local storage error", e); }
    }
}


// ==========================================
// 词典与基础工具
// ==========================================
const i18n = {
    zh: {
        app_title: "魔方简历", app_badge: "青春版", export_pdf: "导出高清 PDF",
        tab_modules: "模块管理", tab_layout: "排版设置", drag_hint: "拖拽左侧图标排序，点击眼睛隐藏。", smart_fit: "智能一键铺满纸张", add_list: "新增经历模块", add_text: "新增文本模块", tpl_select: "排版风格", tpl_left: "左对齐", tpl_center: "居中对齐", tpl_right: "右对齐", bg_color: "简历背景颜色", font_hierarchy: "字体排版层级", font_name: "大标题", font_title: "一级标题", font_sub: "二级标题", font_text: "全局正文", font_sans: "默认黑体", font_serif: "经典宋体", font_kai: "优雅楷体", line_height: "全局行高", page_margin: "页面边距 (mm)", mod_spacing: "模块间距 (px)", mod_edit: "模块编辑", select_mod_hint: "请在左侧选择一个模块进行编辑", def_basic: "基本信息", def_edu: "教育经历", def_exp: "工作经历", def_skill: "专业技能", def_new_list: "新经历模块", def_new_text: "新文本模块", def_title: "主标题", def_sub: "副标题", def_date: "时间", def_desc: "描述...", btn_add: "添加", alert_min: "至少保留一项！", confirm_del: "确定删除该项？", confirm_del_mod: "确定要删除这个模块吗？", l_mod_title: "模块显示标题", l_photo: "个人照片", l_name: "姓名", l_phone: "电话", l_email: "邮箱", l_loc: "所在地", l_intent: "求职意向/介绍", l_text_content: "文本内容 (支持直接回车换行，也支持 HTML 标签)", l_main_title: "主标题 (公司/学校)", l_sub_title: "副标题 (职位/专业)", l_time: "时间区间", l_detail: "详细描述 (支持回车换行或 HTML)", btn_remove_photo: "移除照片", modal_export_title: "PDF 导出确认", modal_warning_text: "已开启智能防割裂引擎，跨页文字已被安全推至次页。如果感觉留白太多，请点击左侧“智能铺满”。", btn_cancel: "再调调", btn_confirm_export: "确认无误并导出"
    },
    en: {
        app_title: "Cube Resume", app_badge: "Youth", export_pdf: "Export HD PDF",
        tab_modules: "Modules", tab_layout: "Layout", drag_hint: "Drag icons to sort, click eye to hide.", smart_fit: "Smart Fit to Page", add_list: "Add Experience", add_text: "Add Text Block", tpl_select: "Layout Style", tpl_left: "Left Align", tpl_center: "Centered", tpl_right: "Right Align", bg_color: "Background Color", font_hierarchy: "Typography", font_name: "Name", font_title: "H1 Title", font_sub: "H2 Title", font_text: "Body Text", font_sans: "Sans-Serif", font_serif: "Serif", font_kai: "Script", line_height: "Line Height", page_margin: "Page Margin (mm)", mod_spacing: "Mod Spacing (px)", mod_edit: "Module Editor", select_mod_hint: "Please select a module on the left to edit", def_basic: "Basic Info", def_edu: "Education", def_exp: "Experience", def_skill: "Skills", def_new_list: "New Experience", def_new_text: "New Text Block", def_title: "Main Title", def_sub: "Subtitle", def_date: "Date", def_desc: "Description...", btn_add: "Add Item", alert_min: "Keep at least one item!", confirm_del: "Delete this item?", confirm_del_mod: "Delete this module?", l_mod_title: "Display Title", l_photo: "Photo", l_name: "Name", l_phone: "Phone", l_email: "Email", l_loc: "Location", l_intent: "Intent/Summary", l_text_content: "Text Content", l_main_title: "Main Title", l_sub_title: "Subtitle", l_time: "Time Period", l_detail: "Details", btn_remove_photo: "Remove Photo", modal_export_title: "Export Confirmation", modal_warning_text: "Smart Anti-Cut Engine is ON. If there is too much whitespace, please click 'Smart Fit' on the left.", btn_cancel: "Adjust", btn_confirm_export: "Confirm & Export"
    }
};

function t(key) { return i18n[state.lang][key] || key; }
function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2); }

const rootVars = document.documentElement.style;
const els = {
    btnLang: document.getElementById('btn-toggle-lang'), langText: document.getElementById('lang-text'), btnPreExport: document.getElementById('btn-pre-export'), btnConfirmExport: document.getElementById('btn-export-pdf'), btnSmartFit: document.getElementById('btn-smart-fit'), exportModal: document.getElementById('export-modal'), tabBtns: document.querySelectorAll('.tab-btn'), tabContents: document.querySelectorAll('.tab-content'), tplCards: document.querySelectorAll('.tpl-card'), bgColorPicker: document.getElementById('config-bg-color'), moduleList: document.getElementById('module-list'), editorArea: document.getElementById('dynamic-editor-area'), editorHeader: document.getElementById('editor-header'), paper: document.getElementById('resume-paper')
};

function init() {
    loadStateFromLocal(); 
    bindTabEvents(); 
    bindTemplateEvents(); 
    bindLangEvent(); 
    initConfigPanel(); 
    initFontControls(); 
    initSortable(); 
    bindExportEvents(); 
    bindSmartFitEvent();
    bindHistoryEvents(); // 绑定快捷键和按钮

    if(!state.activeModuleId || !state.modules.find(m => m.id === state.activeModuleId)) state.activeModuleId = state.modules[0].id; 
    els.paper.className = `resume-paper ${state.template}`;
    
    syncConfigUI();
    translateUI(); 
    renderModuleList(); 
    renderEditor(); 
    renderPreview();

    // 网页加载完毕后，打底存入第一针历史记录
    pushHistory();
}

function bindHistoryEvents() {
    document.getElementById('btn-undo').addEventListener('click', undo);
    document.getElementById('btn-redo').addEventListener('click', redo);

    // 绑定键盘快捷键 Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) { // 兼容 Windows 和 Mac
            if (e.key === 'z' || e.key === 'Z') {
                e.preventDefault();
                if (e.shiftKey) redo(); else undo();
            } else if (e.key === 'y' || e.key === 'Y') {
                e.preventDefault();
                redo();
            }
        }
    });
}

// 强制同步左侧面板UI数值 (用于撤销时)
function syncConfigUI() {
    els.bgColorPicker.value = state.config.bgColor;
    
    document.querySelectorAll('.tpl-card').forEach(c => c.classList.remove('active'));
    const activeTpl = document.querySelector(`.tpl-card[data-tpl="${state.template}"]`);
    if(activeTpl) activeTpl.classList.add('active');

    const setVal = (id, val) => {
        const slider = document.getElementById(`slider-${id}`);
        const display = document.querySelector(`#stepper-${id} .num-display`);
        if (slider) slider.value = val;
        if (display) display.value = val;
    };
    setVal('line-height', state.config.lineHeight);
    setVal('page-margin', state.config.pageMargin);
    setVal('module-spacing', state.config.moduleSpacing);

    ['name', 'title', 'sub', 'text'].forEach(level => {
        document.getElementById(`sel-font-${level}`).value = state.config[`${level}Font`];
        document.getElementById(`inp-size-${level}`).value = state.config[`${level}Size`];
        const boldBtn = document.getElementById(`btn-bold-${level}`);
        if (state.config[`${level}Bold`]) boldBtn.classList.add('active');
        else boldBtn.classList.remove('active');
    });
}


// ==========================================
// 智能推行引擎 (Auto-Spacer)
// ==========================================
function renderPreview() {
    let html = '';
    state.modules.forEach(mod => {
        if (!mod.visible) return; 
        if (mod.type === 'basic') { html += `<div class="r-module r-basic-info ${mod.data.photo ? 'has-photo' : ''}"><div class="r-basic-text"><div class="r-basic-name">${mod.data.name}</div><div class="r-basic-details">${mod.data.phone ? `<span><i class="fas fa-phone"></i> ${mod.data.phone}</span>` : ''}${mod.data.email ? `<span><i class="fas fa-envelope"></i> ${mod.data.email}</span>` : ''}${mod.data.location ? `<span><i class="fas fa-map-marker-alt"></i> ${mod.data.location}</span>` : ''}</div>${mod.data.intent ? `<div style="margin-top:8px; font-weight:bold; color: #374151;">${mod.data.intent}</div>` : ''}</div>${mod.data.photo ? `<div class="r-basic-photo-wrap"><img src="${mod.data.photo}" /></div>` : ''}</div>`;
        } else {
            html += `<div class="r-module">`;
            if (mod.title) html += `<div class="r-mod-title">${mod.title}</div>`;
            if (mod.type === 'text') html += `<div class="r-text-content">${formatText(mod.content)}</div>`;
            else if (mod.type === 'list') mod.items.forEach(item => { html += `<div class="r-list-item"><div class="r-list-header"><div class="r-list-title">${item.title}</div><div class="r-list-date">${item.date}</div></div>${item.subtitle ? `<div class="r-list-subtitle">${item.subtitle}</div>` : ''}<div class="r-list-desc">${formatText(item.desc)}</div></div>`; });
            html += `</div>`;
        }
    });
    els.paper.innerHTML = html;
    
    setTimeout(applySmartPagination, 20); 
}

function applySmartPagination() {
    const paper = els.paper;
    const a4PxHeight = document.getElementById('a4-measure').clientHeight;

    paper.querySelectorAll('.visual-page-gap').forEach(gap => gap.remove());
    const allItems = paper.querySelectorAll('.r-mod-title, .r-list-item, .r-text-content, .r-basic-info');
    allItems.forEach(item => item.style.marginTop = '0px');

    const topPadding = allItems.length > 0 ? allItems[0].offsetTop : 40;

    allItems.forEach(item => {
        const offsetTop = item.offsetTop;
        const offsetBottom = offsetTop + item.offsetHeight;
        
        const pageStart = Math.floor(offsetTop / a4PxHeight);
        const pageEnd = Math.floor(offsetBottom / a4PxHeight);

        if (item.classList.contains('r-mod-title')) {
            const distanceToBoundary = (pageStart + 1) * a4PxHeight - offsetTop;
            if (distanceToBoundary < 70) { 
                item.style.marginTop = `${(pageStart + 1) * a4PxHeight + topPadding - offsetTop}px`;
                return;
            }
        }

        if (pageEnd > pageStart && item.offsetHeight < a4PxHeight * 0.8) {
            const targetTop = pageEnd * a4PxHeight + topPadding;
            item.style.marginTop = `${targetTop - offsetTop}px`;
        }
    });

    const totalHeight = paper.scrollHeight;
    const totalPages = Math.ceil(totalHeight / a4PxHeight);
    
    paper.style.height = `${totalPages * a4PxHeight}px`;

    for (let i = 1; i < totalPages; i++) {
        const gap = document.createElement('div');
        gap.className = 'visual-page-gap';
        gap.style.top = `${i * a4PxHeight}px`;
        gap.innerHTML = `<span class="gap-badge">Page ${i} - ${i+1}</span>`;
        paper.appendChild(gap);
    }
}

// ==========================================
// 交互与面板逻辑
// ==========================================
function bindSmartFitEvent() {
    els.btnSmartFit.addEventListener('click', () => {
        const paper = els.paper;
        const a4PxHeight = document.getElementById('a4-measure').clientHeight;
        
        paper.querySelectorAll('.visual-page-gap').forEach(gap => gap.remove());
        paper.querySelectorAll('.r-mod-title, .r-list-item, .r-text-content, .r-basic-info').forEach(item => item.style.marginTop = '0px');
        paper.style.height = 'auto'; 
        
        let currentH = paper.scrollHeight;
        let pages = Math.max(1, Math.ceil(currentH / a4PxHeight));
        let targetHeight = pages * a4PxHeight * 0.94; 
        let loops = 0;
        
        if (currentH < targetHeight) {
            while (paper.scrollHeight < targetHeight && loops < 25) {
                let changed = false;
                if(state.config.lineHeight < 2.0) { state.config.lineHeight += 0.1; changed = true; }
                if(state.config.moduleSpacing < 28) { state.config.moduleSpacing += 1; changed = true; }
                if(state.config.pageMargin < 28) { state.config.pageMargin += 1; changed = true; }
                if(!changed) break;
                state.config.lineHeight = parseFloat(state.config.lineHeight.toFixed(1)); 
                applyCSSVariables(); loops++;
            }
        } else if (currentH > a4PxHeight * pages && currentH < a4PxHeight * (pages + 0.3)) {
            targetHeight = (pages - 1) * a4PxHeight * 0.94; 
            while (paper.scrollHeight > targetHeight && loops < 25) {
                let changed = false;
                if(state.config.lineHeight > 1.2) { state.config.lineHeight -= 0.1; changed = true; }
                if(state.config.moduleSpacing > 8) { state.config.moduleSpacing -= 1; changed = true; }
                if(state.config.pageMargin > 10) { state.config.pageMargin -= 1; changed = true; }
                if(!changed) break;
                state.config.lineHeight = parseFloat(state.config.lineHeight.toFixed(1));
                applyCSSVariables(); loops++;
            }
        }
        
        syncConfigUI();
        saveStateToLocal();
        pushHistory(); // 智能铺满是一个大动作，强制记录一次历史
        applySmartPagination();
    });
}

window.closeExportModal = function() { els.exportModal.classList.remove('active'); }
function bindExportEvents() {
    els.btnPreExport.addEventListener('click', () => els.exportModal.classList.add('active'));
    els.btnConfirmExport.addEventListener('click', () => {
        closeExportModal();
        els.paper.classList.add('export-mode');
        
        const opt = { margin: 0, filename: 'Resume.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
        
        document.body.style.overflow = 'visible';
        html2pdf().set(opt).from(els.paper).save().then(() => {
            document.body.style.overflow = 'hidden'; 
            els.paper.classList.remove('export-mode');
        });
    });
}

function bindLangEvent() { els.btnLang.addEventListener('click', () => { state.lang = state.lang === 'zh' ? 'en' : 'zh'; els.langText.textContent = state.lang === 'zh' ? 'EN' : '中'; translateUI(); renderModuleList(); renderEditor(); renderPreview(); saveStateToLocal(); pushHistory();}); }
function translateUI() { document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.getAttribute('data-i18n')); }); }
function bindTabEvents() { els.tabBtns.forEach(btn => { btn.addEventListener('click', () => { els.tabBtns.forEach(b => b.classList.remove('active')); els.tabContents.forEach(c => c.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.dataset.target).classList.add('active'); }); }); }
function bindTemplateEvents() { els.tplCards.forEach(card => { card.addEventListener('click', () => { els.tplCards.forEach(c => c.classList.remove('active')); card.classList.add('active'); state.template = card.getAttribute('data-tpl'); els.paper.className = `resume-paper ${state.template}`; renderPreview(); saveStateToLocal(); pushHistory();}); }); }

function initConfigPanel() {
    els.bgColorPicker.value = state.config.bgColor; els.bgColorPicker.addEventListener('input', (e) => setBgColor(e.target.value));
    const bindStepperAndSlider = (stateKey, stepperContainerId, sliderId) => {
        const stepperContainer = document.getElementById(stepperContainerId), decreaseBtn = stepperContainer.querySelector('.decrease'), increaseBtn = stepperContainer.querySelector('.increase'), numInput = stepperContainer.querySelector('.num-display'), slider = document.getElementById(sliderId), minVal = parseFloat(slider.getAttribute('min')), maxVal = parseFloat(slider.getAttribute('max')), stepVal = parseFloat(slider.getAttribute('step'));
        const updateAllVal = (rawVal) => { let val = parseFloat(rawVal); if (isNaN(val)) val = state.config[stateKey]; if (val < minVal) val = minVal; if (val > maxVal) val = maxVal; val = parseFloat((Math.round(val / stepVal) * stepVal).toFixed(2)); state.config[stateKey] = val; numInput.value = val; slider.value = val; applyCSSVariables(); renderPreview(); saveStateToLocal(); };
        numInput.value = state.config[stateKey]; slider.value = state.config[stateKey]; decreaseBtn.addEventListener('click', () => updateAllVal(state.config[stateKey] - stepVal)); increaseBtn.addEventListener('click', () => updateAllVal(state.config[stateKey] + stepVal)); numInput.addEventListener('input', (e) => updateAllVal(e.target.value)); slider.addEventListener('input', (e) => updateAllVal(e.target.value));
    };
    bindStepperAndSlider('lineHeight', 'stepper-line-height', 'slider-line-height'); bindStepperAndSlider('pageMargin', 'stepper-page-margin', 'slider-page-margin'); bindStepperAndSlider('moduleSpacing', 'stepper-module-spacing', 'slider-module-spacing'); applyCSSVariables();
}

function initFontControls() {
    ['name', 'title', 'sub', 'text'].forEach(level => {
        const sel = document.getElementById(`sel-font-${level}`), decrease = document.getElementById(`btn-dec-${level}`), increase = document.getElementById(`btn-inc-${level}`), input = document.getElementById(`inp-size-${level}`), bold = document.getElementById(`btn-bold-${level}`);
        sel.value = state.config[`${level}Font`]; input.value = state.config[`${level}Size`]; if (state.config[`${level}Bold`]) bold.classList.add('active');
        const updateSize = (newVal) => { let val = parseInt(newVal); if(isNaN(val)) val = state.config[`${level}Size`]; if(val < 10) val = 10; if(val > 60) val = 60; state.config[`${level}Size`] = val; input.value = val; applyCSSVariables(); renderPreview(); saveStateToLocal(); };
        sel.addEventListener('change', (e) => { state.config[`${level}Font`] = e.target.value; applyCSSVariables(); renderPreview(); saveStateToLocal(); }); decrease.addEventListener('click', () => updateSize(state.config[`${level}Size`] - 1)); increase.addEventListener('click', () => updateSize(state.config[`${level}Size`] + 1)); input.addEventListener('input', (e) => updateSize(e.target.value)); bold.addEventListener('click', () => { state.config[`${level}Bold`] = !state.config[`${level}Bold`]; bold.classList.toggle('active'); applyCSSVariables(); renderPreview(); saveStateToLocal(); pushHistory();});
    });
}

window.setBgColor = function(colorHex) { state.config.bgColor = colorHex; els.bgColorPicker.value = colorHex; applyCSSVariables(); renderPreview(); saveStateToLocal();}
function applyCSSVariables() {
    rootVars.setProperty('--r-bg-color', state.config.bgColor); rootVars.setProperty('--r-line-height', state.config.lineHeight); rootVars.setProperty('--r-page-margin', state.config.pageMargin + 'mm'); rootVars.setProperty('--r-module-spacing', state.config.moduleSpacing + 'px'); rootVars.setProperty('--r-name-font', state.config.nameFont); rootVars.setProperty('--r-name-size', state.config.nameSize + 'px'); rootVars.setProperty('--r-name-weight', state.config.nameBold ? 'bold' : 'normal'); rootVars.setProperty('--r-title-font', state.config.titleFont); rootVars.setProperty('--r-title-size', state.config.titleSize + 'px'); rootVars.setProperty('--r-title-weight', state.config.titleBold ? 'bold' : 'normal'); rootVars.setProperty('--r-sub-font', state.config.subFont); rootVars.setProperty('--r-sub-size', state.config.subSize + 'px'); rootVars.setProperty('--r-sub-weight', state.config.subBold ? 'bold' : 'normal'); rootVars.setProperty('--r-text-font', state.config.textFont); rootVars.setProperty('--r-text-size', state.config.textSize + 'px'); rootVars.setProperty('--r-text-weight', state.config.textBold ? 'bold' : 'normal');
}

function initSortable() { new Sortable(els.moduleList, { animation: 150, handle: '.mod-drag-handle', onEnd: function (evt) { const movedItem = state.modules.splice(evt.oldIndex, 1)[0]; state.modules.splice(evt.newIndex, 0, movedItem); renderPreview(); saveStateToLocal(); pushHistory();} }); }
function formatText(text) { if (!text) return ''; return /<[a-z][\s\S]*>/i.test(text) ? text : text.replace(/\n/g, '<br>'); }
function getIndexedTitle(baseTitle, index) { if (state.lang === 'en') return `${baseTitle} ${index}`; const cnNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']; if (index <= 10) return `${baseTitle}${cnNums[index]}`; if (index < 20) return `${baseTitle}十${index % 10 === 0 ? '' : cnNums[index % 10]}`; return `${baseTitle}${cnNums[Math.floor(index / 10)]}十${index % 10 === 0 ? '' : cnNums[index % 10]}`; }

function renderModuleList() {
    els.moduleList.innerHTML = '';
    state.modules.forEach(mod => {
        const li = document.createElement('li'); li.className = `module-item ${mod.id === state.activeModuleId ? 'active-mod' : ''} ${!mod.visible ? 'hidden-mod' : ''}`;
        li.innerHTML = `<div class="mod-info" onclick="selectModule('${mod.id}')"> <i class="fas fa-grip-vertical mod-drag-handle"></i> <span>${mod.title}</span> </div><div class="mod-actions"> <i class="fas ${mod.visible ? 'fa-eye' : 'fa-eye-slash'}" onclick="toggleModuleVisibility('${mod.id}', event)"></i> ${mod.type !== 'basic' ? `<i class="fas fa-trash" onclick="deleteModule('${mod.id}', event)"></i>` : ''} </div>`;
        els.moduleList.appendChild(li);
    });
}

window.selectModule = function(id) { state.activeModuleId = id; renderModuleList(); renderEditor(); }
window.toggleModuleVisibility = function(id, event) { event.stopPropagation(); const mod = state.modules.find(m => m.id === id); if(mod) { mod.visible = !mod.visible; renderModuleList(); renderPreview(); saveStateToLocal(); pushHistory();} }
window.addNewModule = function(type) { const newId = 'mod_' + generateId(); const newMod = { id: newId, type: type, visible: true, title: type === 'list' ? t('def_new_list') : t('def_new_text') }; if (type === 'list') newMod.items = [{ id: generateId(), title: t('def_title'), subtitle: t('def_sub'), date: t('def_date'), desc: t('def_desc') }]; else newMod.content = t('def_desc'); state.modules.push(newMod); state.activeModuleId = newId; renderModuleList(); renderEditor(); renderPreview(); saveStateToLocal(); pushHistory();}
window.deleteModule = function(id, event) { event.stopPropagation(); if (confirm(t('confirm_del_mod'))) { state.modules = state.modules.filter(m => m.id !== id); if (state.activeModuleId === id) state.activeModuleId = state.modules[0].id; renderModuleList(); renderEditor(); renderPreview(); saveStateToLocal(); pushHistory();} }

function renderEditor() {
    const mod = state.modules.find(m => m.id === state.activeModuleId);
    if (!mod) { els.editorArea.innerHTML = `<div class="empty-state"><i class="fas fa-ghost" style="font-size:30px; color:#cbd5e1; margin-bottom:10px; display:block;"></i>${t('select_mod_hint')}</div>`; return; }
    els.editorHeader.textContent = `${t('mod_edit')} - ${mod.title}`; let html = '';
    if (mod.type !== 'basic') html += `<div class="control-group"><label>${t('l_mod_title')}</label><input type="text" value="${mod.title}" oninput="updateModuleTitle('${mod.id}', this.value)"></div><div class="divider"></div>`;
    if (mod.type === 'basic') {
        html += `<div class="control-group" style="background:#f9fafb; padding:15px; border-radius:12px; border:1px solid #d1d5db"><label><i class="fas fa-camera"></i> ${t('l_photo')}</label><input type="file" accept="image/*" onchange="uploadPhoto('${mod.id}', this)" style="font-size:13px;">${mod.data.photo ? `<div style="margin-top:10px;"><button class="btn btn-danger" onclick="removePhoto('${mod.id}')">${t('btn_remove_photo')}</button></div>` : ''}</div><div class="control-group"><label>${t('l_name')}</label><input type="text" value="${mod.data.name}" oninput="updateBasicData('${mod.id}', 'name', this.value)"></div><div class="control-group"><label>${t('l_phone')}</label><input type="text" value="${mod.data.phone}" oninput="updateBasicData('${mod.id}', 'phone', this.value)"></div><div class="control-group"><label>${t('l_email')}</label><input type="text" value="${mod.data.email}" oninput="updateBasicData('${mod.id}', 'email', this.value)"></div><div class="control-group"><label>${t('l_loc')}</label><input type="text" value="${mod.data.location}" oninput="updateBasicData('${mod.id}', 'location', this.value)"></div><div class="control-group"><label>${t('l_intent')}</label><input type="text" value="${mod.data.intent}" oninput="updateBasicData('${mod.id}', 'intent', this.value)"></div>`;
    } else if (mod.type === 'text') {
        html += `<div class="control-group"><label>${t('l_text_content')}</label><textarea oninput="updateTextContent('${mod.id}', this.value)">${mod.content}</textarea></div>`;
    } else if (mod.type === 'list') {
        mod.items.forEach((item, index) => { html += `<div class="list-item-editor"><div class="list-item-header"><span><i class="fas fa-bookmark" style="color:#cbd5e1; margin-right:8px;"></i>${getIndexedTitle(mod.title, index + 1)}</span><i class="fas fa-trash text-danger" style="cursor:pointer" onclick="deleteListItem('${mod.id}', '${item.id}')"></i></div><div class="control-group"><label>${t('l_main_title')}</label><input type="text" value="${item.title}" oninput="updateListItem('${mod.id}', '${item.id}', 'title', this.value)"></div><div class="control-group"><label>${t('l_sub_title')}</label><input type="text" value="${item.subtitle}" oninput="updateListItem('${mod.id}', '${item.id}', 'subtitle', this.value)"></div><div class="control-group"><label>${t('l_time')}</label><input type="text" value="${item.date}" oninput="updateListItem('${mod.id}', '${item.id}', 'date', this.value)"></div><div class="control-group"><label>${t('l_detail')}</label><textarea style="height:100px" oninput="updateListItem('${mod.id}', '${item.id}', 'desc', this.value)">${item.desc}</textarea></div></div>`; });
        html += `<button class="btn btn-outline" style="width:100%; border-style:dashed; margin-top: 5px;" onclick="addListItem('${mod.id}')"><i class="fas fa-plus"></i> ${t('btn_add')}</button>`;
    }
    els.editorArea.innerHTML = html;
}

window.updateModuleTitle = function(id, val) { state.modules.find(m => m.id === id).title = val; renderModuleList(); renderPreview(); saveStateToLocal(); const mod = state.modules.find(m => m.id === id); if (mod && mod.type === 'list') { const headers = document.querySelectorAll('.list-item-header span'); headers.forEach((header, index) => { header.innerHTML = `<i class="fas fa-bookmark" style="color:#cbd5e1; margin-right:8px;"></i>${getIndexedTitle(mod.title, index + 1)}`; }); } }
window.updateBasicData = function(id, key, val) { state.modules.find(m => m.id === id).data[key] = val; renderPreview(); saveStateToLocal();}
window.updateTextContent = function(id, val) { state.modules.find(m => m.id === id).content = val; renderPreview(); saveStateToLocal();}
window.updateListItem = function(modId, itemId, key, val) { state.modules.find(m => m.id === modId).items.find(i => i.id === itemId)[key] = val; renderPreview(); saveStateToLocal();}
window.uploadPhoto = function(modId, inputEl) { const file = inputEl.files[0]; if (file) { const reader = new FileReader(); reader.onload = function(e) { state.modules.find(m => m.id === modId).data.photo = e.target.result; renderEditor(); renderPreview(); saveStateToLocal(); pushHistory();}; reader.readAsDataURL(file); } }
window.removePhoto = function(modId) { state.modules.find(m => m.id === modId).data.photo = ''; renderEditor(); renderPreview(); saveStateToLocal(); pushHistory();}
window.addListItem = function(modId) { state.modules.find(m => m.id === modId).items.push({ id: generateId(), title: t('def_title'), subtitle: '', date: '', desc: '' }); renderEditor(); renderPreview(); saveStateToLocal(); pushHistory();}
window.deleteListItem = function(modId, itemId) { const mod = state.modules.find(m => m.id === modId); if (mod.items.length <= 1) { alert(t('alert_min')); return; } if(confirm(t('confirm_del'))) { mod.items = mod.items.filter(i => i.id !== itemId); renderEditor(); renderPreview(); saveStateToLocal(); pushHistory();} }

init();