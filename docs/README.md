# Simple Resume

Simple Resume 是一个在线简历编辑器，支持模块化编辑、A4 预览、排版调整、本地保存、撤销重做和 PDF 导出。

项目目前已增加本地 AI 后端，用于安全调用 DeepSeek API。前端不直接保存或暴露 API Key。

## 功能

- 简历内容编辑
- 模块新增、删除、隐藏和排序
- A4 实时预览
- 字体、字号、行高、页边距和模块间距调整
- 智能铺满纸张
- 导出高清 PDF
- 本地保存
- 撤销 / 重做
- 中英文切换
- DeepSeek AI 对话接口
- DeepSeek AI 文本润色接口

## 项目结构

```text
vibe_coding/
  index.html
  styles.css
  script.js
  docs/
    README.md
    Simple_Resume_PRD.md
  server/
    app.js
    package.json
    package-lock.json
    .env
```

## 前端运行

可以直接打开：

```text
index.html
```

也可以使用 VS Code Live Server 运行。

## 后端运行

进入后端目录：

```bash
cd server
```

安装依赖：

```bash
npm install
```

创建 `server/.env`：

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
PORT=3001
```

启动后端：

```bash
npm run dev
```

成功后会看到：

```text
Server running at http://localhost:3001
DeepSeek API key loaded
```

## 后端接口

健康检查：

```bash
curl http://localhost:3001/api/health
```

AI 对话：

```http
POST /api/ai/chat
```

AI 文本润色：

```http
POST /api/ai/rewrite
```

## 安全说明

不要上传以下内容：

```text
server/.env
server/node_modules/
```

`server/.env` 包含 DeepSeek API Key，上传后可能导致额度被他人消耗。

## 后续计划

- 在前端增加 AI 助手面板
- 支持当前文本字段润色
- 支持用户确认后应用 AI 修改
- 支持 Word / 文本型 PDF 简历导入

产品说明见：

```text
docs/Simple_Resume_PRD.md
```
