// ==========================================
// 1. 全局状态定义 (含国际化配置和模板配置)
// ==========================================
const state = {
    lang: 'zh', // 'zh' 或 'en'
    template: 'tpl-left', // 默认左对齐模式
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
        {
            id: 'mod_basic', type: 'basic', visible: true, title: '基本信息',
            data: { name: '张三', phone: '138-0000-0000', email: 'zhangsan@example.com', location: '北京市', intent: '目标职位：前端开发', photo: '' }
        },
        {
            id: 'mod_edu', type: 'list', visible: true, title: '教育经历',
            items: [{ id: generateId(), title: '某某高等学府', subtitle: '计算机科学与技术 (本科)', date: '2018.09 - 2022.06', desc: '<ul><li>GPA: 3.8/4.0，专业排名前 5%</li><li>获得国家励志奖学金</li></ul>' }]
        },
        {
            id: 'mod_exp', type: 'list', visible: true, title: '工作经历',
            items: [{ id: generateId(), title: '某某科技有限公司', subtitle: '前端开发工程师', date: '2022.07 - 至今', desc: '负责公司核心业务系统的重构，提升了页面加载速度 30%。\n主导开发了内部可视化低代码平台，节省了开发团队约 40% 的重复工作量。' }]
        },
        {
            id: 'mod_skill', type: 'text', visible: true, title: '专业技能',
            content: '精通 HTML/CSS/JavaScript，熟练掌握 Vue 和 React，熟悉前端工程化与性能优化方案。'
        }
    ]
};

// 国际化词典
const i18n = {
    zh: {
        app_title: "魔方简历", app_badge: "青春版", export_pdf: "导出高清 PDF",
        tab_modules: "模块管理", tab_layout: "排版设置", drag_hint: "拖拽左侧图标排序，点击眼睛隐藏。",
        add_list: "新增经历模块", add_text: "新增文本模块", tpl_select: "排版风格",
        tpl_left: "左对齐", tpl_center: "居中对齐", tpl_right: "右对齐",
        bg_color: "简历背景颜色", font_hierarchy: "字体排版层级", font_name: "大标题",
        font_title: "一级标题", font_sub: "二级标题", font_text: "全局正文",
        font_sans: "默认黑体", font_serif: "经典宋体", font_kai: "优雅楷体",
        line_height: "全局行高", page_margin: "页面边距 (mm)", mod_spacing: "模块间距 (px)",
        mod_edit: "模块编辑", select_mod_hint: "请在左侧选择一个模块进行编辑",
        // 模块占位符翻译
        def_basic: "基本信息", def_edu: "教育经历", def_exp: "工作经历", def_skill: "专业技能",
        def_new_list: "新经历模块", def_new_text: "新文本模块", def_title: "主标题", def_sub: "副标题", def_date: "时间", def_desc: "描述...",
        btn_add: "添加", alert_min: "至少保留一项！", confirm_del: "确定删除该项？", confirm_del_mod: "确定要删除这个模块吗？",
        // 编辑器表单翻译
        l_mod_title: "模块显示标题", l_photo: "个人照片", l_name: "姓名", l_phone: "电话", l_email: "邮箱", l_loc: "所在地", l_intent: "求职意向/介绍",
        l_text_content: "文本内容 (支持直接回车换行，也支持 HTML 标签)", l_main_title: "主标题 (公司/学校)", l_sub_title: "副标题 (职位/专业)", l_time: "时间区间", l_detail: "详细描述 (支持回车换行或 HTML)",
        btn_remove_photo: "移除照片"
    },
    en: {
        app_title: "Cube Resume", app_badge: "Youth", export_pdf: "Export HD PDF",
        tab_modules: "Modules", tab_layout: "Layout", drag_hint: "Drag icons to sort, click eye to hide.",
        add_list: "Add Experience", add_text: "Add Text Block", tpl_select: "Layout Style",
        tpl_left: "Left Align", tpl_center: "Centered", tpl_right: "Right Align",
        bg_color: "Background Color", font_hierarchy: "Typography", font_name: "Name",
        font_title: "H1 Title", font_sub: "H2 Title", font_text: "Body Text",
        font_sans: "Sans-Serif", font_serif: "Serif", font_kai: "Script",
        line_height: "Line Height", page_margin: "Page Margin (mm)", mod_spacing: "Mod Spacing (px)",
        mod_edit: "Module Editor", select_mod_hint: "Please select a module on the left to edit",
        def_basic: "Basic Info", def_edu: "Education", def_exp: "Experience", def_skill: "Skills",
        def_new_list: "New Experience", def_new_text: "New Text Block", def_title: "Main Title", def_sub: "Subtitle", def_date: "Date", def_desc: "Description...",
        btn_add: "Add Item", alert_min: "Keep at least one item!", confirm_del: "Delete this item?", confirm_del_mod: "Delete this module?",
        l_mod_title: "Display Title", l_photo: "Photo", l_name: "Name", l_phone: "Phone", l_email: "Email", l_loc: "Location", l_intent: "Intent/Summary",
        l_text_content: "Text Content (Supports line breaks and HTML)", l_main_title: "Main Title (Company/School)", l_sub_title: "Subtitle (Role/Major)", l_time: "Time Period", l_detail: "Details (Supports line breaks/HTML)",
        btn_remove_photo: "Remove Photo"
    }
};

function t(key) { return i18n[state.lang][key] || key; }

function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2); }

// ==========================================
// 2. DOM 获取与初始化
// ==========================================
const rootVars = document.documentElement.style;
const els = {
    btnLang: document.getElementById('btn-toggle-lang'),
    langText: document.getElementById('lang-text'),
    btnExportPdf: document.getElementById('btn-export-pdf'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    tplCards: document.querySelectorAll('.tpl-card'),
    bgColorPicker: document.getElementById('config-bg-color'),
    moduleList: document.getElementById('module-list'),
    editorArea: document.getElementById('dynamic-editor-area'),
    editorHeader: document.getElementById('editor-header'),
    preview: document.getElementById('resume-preview')
};

function init() {
    bindTabEvents();
    bindTemplateEvents();
    bindLangEvent();
    initConfigPanel(); 
    initFontControls(); 
    initSortable();
    bindExportEvent();
    
    state.activeModuleId = state.modules[0].id; 
    translateUI(); 
    renderModuleList();
    renderEditor();
    renderPreview();
}

// ==========================================
// 3. UI 交互与事件绑定
// ==========================================

function bindLangEvent() {
    els.btnLang.addEventListener('click', () => {
        state.lang = state.lang === 'zh' ? 'en' : 'zh';
        els.langText.textContent = state.lang === 'zh' ? 'EN' : '中';
        translateUI();
        renderModuleList();
        renderEditor();
        renderPreview();
    });
}

function translateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

function bindTabEvents() {
    els.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            els.tabBtns.forEach(b => b.classList.remove('active'));
            els.tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });
}

function bindTemplateEvents() {
    els.tplCards.forEach(card => {
        card.addEventListener('click', () => {
            els.tplCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.template = card.getAttribute('data-tpl');
            els.preview.className = `resume-paper ${state.template}`;
        });
    });
}

function initConfigPanel() {
    els.bgColorPicker.value = state.config.bgColor;
    els.bgColorPicker.addEventListener('input', (e) => setBgColor(e.target.value));

    const bindStepperAndSlider = (stateKey, stepperContainerId, sliderId) => {
        const stepperContainer = document.getElementById(stepperContainerId);
        const decreaseBtn = stepperContainer.querySelector('.decrease');
        const numInput = stepperContainer.querySelector('.num-display');
        const increaseBtn = stepperContainer.querySelector('.increase');
        const slider = document.getElementById(sliderId);
        
        const minVal = parseFloat(slider.getAttribute('min'));
        const maxVal = parseFloat(slider.getAttribute('max'));
        const stepVal = parseFloat(slider.getAttribute('step'));

        const updateAllVal = (rawVal) => {
            let val = parseFloat(rawVal);
            if (isNaN(val)) val = state.config[stateKey]; 
            if (val < minVal) val = minVal;
            if (val > maxVal) val = maxVal;
            val = parseFloat((Math.round(val / stepVal) * stepVal).toFixed(2)); 

            state.config[stateKey] = val;
            numInput.value = val;
            slider.value = val;
            applyCSSVariables(); 
        };

        numInput.value = state.config[stateKey];
        slider.value = state.config[stateKey];

        decreaseBtn.addEventListener('click', () => updateAllVal(state.config[stateKey] - stepVal));
        increaseBtn.addEventListener('click', () => updateAllVal(state.config[stateKey] + stepVal));
        numInput.addEventListener('input', (e) => updateAllVal(e.target.value));
        slider.addEventListener('input', (e) => updateAllVal(e.target.value));
    };

    bindStepperAndSlider('lineHeight', 'stepper-line-height', 'slider-line-height');
    bindStepperAndSlider('pageMargin', 'stepper-page-margin', 'slider-page-margin');
    bindStepperAndSlider('moduleSpacing', 'stepper-module-spacing', 'slider-module-spacing');
    applyCSSVariables();
}

function initFontControls() {
    const levels = ['name', 'title', 'sub', 'text'];
    levels.forEach(level => {
        const sel = document.getElementById(`sel-font-${level}`);
        const decrease = document.getElementById(`btn-dec-${level}`);
        const increase = document.getElementById(`btn-inc-${level}`);
        const input = document.getElementById(`inp-size-${level}`);
        const bold = document.getElementById(`btn-bold-${level}`);

        sel.value = state.config[`${level}Font`];
        input.value = state.config[`${level}Size`];
        if (state.config[`${level}Bold`]) bold.classList.add('active');

        const updateSize = (newVal) => {
            let val = parseInt(newVal);
            if(isNaN(val)) val = state.config[`${level}Size`];
            if(val < 10) val = 10; 
            if(val > 60) val = 60;
            state.config[`${level}Size`] = val;
            input.value = val;
            applyCSSVariables();
        };

        sel.addEventListener('change', (e) => { state.config[`${level}Font`] = e.target.value; applyCSSVariables(); });
        decrease.addEventListener('click', () => updateSize(state.config[`${level}Size`] - 1));
        increase.addEventListener('click', () => updateSize(state.config[`${level}Size`] + 1));
        input.addEventListener('input', (e) => updateSize(e.target.value));
        bold.addEventListener('click', () => {
            state.config[`${level}Bold`] = !state.config[`${level}Bold`];
            bold.classList.toggle('active');
            applyCSSVariables();
        });
    });
}

window.setBgColor = function(colorHex) {
    state.config.bgColor = colorHex;
    els.bgColorPicker.value = colorHex;
    applyCSSVariables();
}

function applyCSSVariables() {
    rootVars.setProperty('--r-bg-color', state.config.bgColor);
    rootVars.setProperty('--r-line-height', state.config.lineHeight);
    rootVars.setProperty('--r-page-margin', state.config.pageMargin + 'mm');
    rootVars.setProperty('--r-module-spacing', state.config.moduleSpacing + 'px');
    
    rootVars.setProperty('--r-name-font', state.config.nameFont);
    rootVars.setProperty('--r-name-size', state.config.nameSize + 'px');
    rootVars.setProperty('--r-name-weight', state.config.nameBold ? 'bold' : 'normal');

    rootVars.setProperty('--r-title-font', state.config.titleFont);
    rootVars.setProperty('--r-title-size', state.config.titleSize + 'px');
    rootVars.setProperty('--r-title-weight', state.config.titleBold ? 'bold' : 'normal');

    rootVars.setProperty('--r-sub-font', state.config.subFont);
    rootVars.setProperty('--r-sub-size', state.config.subSize + 'px');
    rootVars.setProperty('--r-sub-weight', state.config.subBold ? 'bold' : 'normal');

    rootVars.setProperty('--r-text-font', state.config.textFont);
    rootVars.setProperty('--r-text-size', state.config.textSize + 'px');
    rootVars.setProperty('--r-text-weight', state.config.textBold ? 'bold' : 'normal');
}

function initSortable() {
    new Sortable(els.moduleList, {
        animation: 150,
        handle: '.mod-drag-handle',
        onEnd: function (evt) {
            const movedItem = state.modules.splice(evt.oldIndex, 1)[0];
            state.modules.splice(evt.newIndex, 0, movedItem);
            renderPreview();
        }
    });
}

function bindExportEvent() {
    els.btnExportPdf.addEventListener('click', () => {
        const element = els.preview;
        const opt = {
            margin:       0,
            filename:     'Resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        document.body.style.overflow = 'visible';
        html2pdf().set(opt).from(element).save().then(() => {
            document.body.style.overflow = 'hidden'; 
        });
    });
}

// ==========================================
// 4. 数据与渲染逻辑 
// ==========================================

function formatText(text) {
    if (!text) return '';
    if (/<[a-z][\s\S]*>/i.test(text)) return text; 
    return text.replace(/\n/g, '<br>'); 
}

function getIndexedTitle(baseTitle, index) {
    if (state.lang === 'en') {
        return `${baseTitle} ${index}`;
    }
    const cnNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    let cnStr = '';
    if (index <= 10) cnStr = cnNums[index];
    else if (index < 20) cnStr = '十' + (index % 10 === 0 ? '' : cnNums[index % 10]);
    else {
        const tens = Math.floor(index / 10);
        const units = index % 10;
        cnStr = cnNums[tens] + '十' + (units === 0 ? '' : cnNums[units]);
    }
    return `${baseTitle}${cnStr}`;
}

function renderModuleList() {
    els.moduleList.innerHTML = '';
    state.modules.forEach(mod => {
        const li = document.createElement('li');
        li.className = `module-item ${mod.id === state.activeModuleId ? 'active-mod' : ''} ${!mod.visible ? 'hidden-mod' : ''}`;
        
        let deleteBtnHTML = mod.type !== 'basic' ? `<i class="fas fa-trash" onclick="deleteModule('${mod.id}', event)"></i>` : '';

        li.innerHTML = `
            <div class="mod-info" onclick="selectModule('${mod.id}')">
                <i class="fas fa-grip-vertical mod-drag-handle"></i>
                <span>${mod.title}</span>
            </div>
            <div class="mod-actions">
                <i class="fas ${mod.visible ? 'fa-eye' : 'fa-eye-slash'}" onclick="toggleModuleVisibility('${mod.id}', event)"></i>
                ${deleteBtnHTML}
            </div>
        `;
        els.moduleList.appendChild(li);
    });
}

window.selectModule = function(id) {
    state.activeModuleId = id;
    renderModuleList(); 
    renderEditor();         
}

window.toggleModuleVisibility = function(id, event) {
    event.stopPropagation();
    const mod = state.modules.find(m => m.id === id);
    if(mod) {
        mod.visible = !mod.visible;
        renderModuleList();
        renderPreview();
    }
}

window.addNewModule = function(type) {
    const newId = 'mod_' + generateId();
    const newMod = { id: newId, type: type, visible: true, title: type === 'list' ? t('def_new_list') : t('def_new_text') };
    if (type === 'list') {
        newMod.items = [{ id: generateId(), title: t('def_title'), subtitle: t('def_sub'), date: t('def_date'), desc: t('def_desc') }];
    } else {
        newMod.content = t('def_desc');
    }
    state.modules.push(newMod);
    state.activeModuleId = newId;
    renderModuleList(); renderEditor(); renderPreview();
}

window.deleteModule = function(id, event) {
    event.stopPropagation();
    if (confirm(t('confirm_del_mod'))) {
        state.modules = state.modules.filter(m => m.id !== id);
        if (state.activeModuleId === id) state.activeModuleId = state.modules[0].id; 
        renderModuleList(); renderEditor(); renderPreview();
    }
}

function renderEditor() {
    const mod = state.modules.find(m => m.id === state.activeModuleId);
    if (!mod) {
        els.editorArea.innerHTML = `<div class="empty-state"><i class="fas fa-ghost" style="font-size:30px; color:#cbd5e1; margin-bottom:10px; display:block;"></i>${t('select_mod_hint')}</div>`;
        return;
    }

    els.editorHeader.textContent = `${t('mod_edit')} - ${mod.title}`;
    let html = '';

    if (mod.type !== 'basic') {
        html += `
            <div class="control-group">
                <label>${t('l_mod_title')}</label>
                <input type="text" value="${mod.title}" oninput="updateModuleTitle('${mod.id}', this.value)">
            </div>
            <div class="divider"></div>
        `;
    }

    if (mod.type === 'basic') {
        html += `
            <div class="control-group" style="background:#f9fafb; padding:15px; border-radius:12px; border:1px solid #d1d5db">
                <label><i class="fas fa-camera"></i> ${t('l_photo')}</label>
                <input type="file" accept="image/*" onchange="uploadPhoto('${mod.id}', this)" style="font-size:13px;">
                ${mod.data.photo ? `<div style="margin-top:10px;"><button class="btn btn-danger" onclick="removePhoto('${mod.id}')">${t('btn_remove_photo')}</button></div>` : ''}
            </div>
            <div class="control-group"><label>${t('l_name')}</label><input type="text" value="${mod.data.name}" oninput="updateBasicData('${mod.id}', 'name', this.value)"></div>
            <div class="control-group"><label>${t('l_phone')}</label><input type="text" value="${mod.data.phone}" oninput="updateBasicData('${mod.id}', 'phone', this.value)"></div>
            <div class="control-group"><label>${t('l_email')}</label><input type="text" value="${mod.data.email}" oninput="updateBasicData('${mod.id}', 'email', this.value)"></div>
            <div class="control-group"><label>${t('l_loc')}</label><input type="text" value="${mod.data.location}" oninput="updateBasicData('${mod.id}', 'location', this.value)"></div>
            <div class="control-group"><label>${t('l_intent')}</label><input type="text" value="${mod.data.intent}" oninput="updateBasicData('${mod.id}', 'intent', this.value)"></div>
        `;
    } 
    else if (mod.type === 'text') {
        html += `
            <div class="control-group">
                <label>${t('l_text_content')}</label>
                <textarea oninput="updateTextContent('${mod.id}', this.value)">${mod.content}</textarea>
            </div>
        `;
    }
    else if (mod.type === 'list') {
        mod.items.forEach((item, index) => {
            const dynamicItemTitle = getIndexedTitle(mod.title, index + 1);
            html += `
                <div class="list-item-editor">
                    <div class="list-item-header">
                        <span><i class="fas fa-bookmark" style="color:#cbd5e1; margin-right:8px;"></i>${dynamicItemTitle}</span>
                        <i class="fas fa-trash text-danger" style="cursor:pointer" onclick="deleteListItem('${mod.id}', '${item.id}')"></i>
                    </div>
                    <div class="control-group"><label>${t('l_main_title')}</label><input type="text" value="${item.title}" oninput="updateListItem('${mod.id}', '${item.id}', 'title', this.value)"></div>
                    <div class="control-group"><label>${t('l_sub_title')}</label><input type="text" value="${item.subtitle}" oninput="updateListItem('${mod.id}', '${item.id}', 'subtitle', this.value)"></div>
                    <div class="control-group"><label>${t('l_time')}</label><input type="text" value="${item.date}" oninput="updateListItem('${mod.id}', '${item.id}', 'date', this.value)"></div>
                    <div class="control-group"><label>${t('l_detail')}</label><textarea style="height:100px" oninput="updateListItem('${mod.id}', '${item.id}', 'desc', this.value)">${item.desc}</textarea></div>
                </div>
            `;
        });
        html += `<button class="btn btn-outline" style="width:100%; border-style:dashed; margin-top: 5px;" onclick="addListItem('${mod.id}')"><i class="fas fa-plus"></i> ${t('btn_add')}</button>`;
    }
    els.editorArea.innerHTML = html;
}

window.updateModuleTitle = function(id, val) { state.modules.find(m => m.id === id).title = val; renderModuleList(); renderEditor(); renderPreview(); }
window.updateBasicData = function(id, key, val) { state.modules.find(m => m.id === id).data[key] = val; renderPreview(); }
window.updateTextContent = function(id, val) { state.modules.find(m => m.id === id).content = val; renderPreview(); }
window.updateListItem = function(modId, itemId, key, val) { state.modules.find(m => m.id === modId).items.find(i => i.id === itemId)[key] = val; renderPreview(); }

window.uploadPhoto = function(modId, inputEl) {
    const file = inputEl.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { state.modules.find(m => m.id === modId).data.photo = e.target.result; renderEditor(); renderPreview(); };
        reader.readAsDataURL(file);
    }
}
window.removePhoto = function(modId) { state.modules.find(m => m.id === modId).data.photo = ''; renderEditor(); renderPreview(); }

window.addListItem = function(modId) {
    state.modules.find(m => m.id === modId).items.push({ id: generateId(), title: t('def_title'), subtitle: '', date: '', desc: '' });
    renderEditor(); renderPreview();
}
window.deleteListItem = function(modId, itemId) {
    const mod = state.modules.find(m => m.id === modId);
    if (mod.items.length <= 1) { alert(t('alert_min')); return; } 
    if(confirm(t('confirm_del'))) { mod.items = mod.items.filter(i => i.id !== itemId); renderEditor(); renderPreview(); }
}

// ==========================================
// 5. 渲染预览区
// ==========================================
function renderPreview() {
    let html = '';
    state.modules.forEach(mod => {
        if (!mod.visible) return; 

        if (mod.type === 'basic') {
            const hasPhoto = mod.data.photo ? 'has-photo' : '';
            html += `
                <div class="r-module r-basic-info ${hasPhoto}">
                    <div class="r-basic-text">
                        <div class="r-basic-name">${mod.data.name}</div>
                        <div class="r-basic-details">
                            ${mod.data.phone ? `<span><i class="fas fa-phone"></i> ${mod.data.phone}</span>` : ''}
                            ${mod.data.email ? `<span><i class="fas fa-envelope"></i> ${mod.data.email}</span>` : ''}
                            ${mod.data.location ? `<span><i class="fas fa-map-marker-alt"></i> ${mod.data.location}</span>` : ''}
                        </div>
                        ${mod.data.intent ? `<div style="margin-top:8px; font-weight:bold; color: #374151;">${mod.data.intent}</div>` : ''}
                    </div>
                    ${mod.data.photo ? `<div class="r-basic-photo-wrap"><img src="${mod.data.photo}" /></div>` : ''}
                </div>
            `;
        } else {
            html += `<div class="r-module">`;
            if (mod.title) html += `<div class="r-mod-title">${mod.title}</div>`;

            if (mod.type === 'text') {
                html += `<div class="r-text-content">${formatText(mod.content)}</div>`;
            } else if (mod.type === 'list') {
                mod.items.forEach(item => {
                    html += `
                        <div class="r-list-item">
                            <div class="r-list-header">
                                <div class="r-list-title">${item.title}</div>
                                <div class="r-list-date">${item.date}</div>
                            </div>
                            ${item.subtitle ? `<div class="r-list-subtitle">${item.subtitle}</div>` : ''}
                            <div class="r-list-desc">${formatText(item.desc)}</div>
                        </div>
                    `;
                });
            }
            html += `</div>`;
        }
    });
    els.preview.innerHTML = html;
}

init();