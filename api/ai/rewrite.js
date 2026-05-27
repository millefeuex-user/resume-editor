async function callDeepSeek(messages, options = {}) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

  if (!apiKey) {
    const error = new Error('DeepSeek API key is missing');
    error.status = 500;
    throw error;
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: options.model || 'deepseek-chat',
      messages,
      temperature: options.temperature ?? 0.6,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    const error = new Error('DeepSeek request failed');
    error.status = response.status;
    error.detail = errorText;
    throw error;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

function sendCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function getRequestBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return {};
    }
  }

  return req.body || {};
}

module.exports = async function handler(req, res) {
  sendCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { instruction, text, context } = getRequestBody(req);

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'text is required' });
    }

    const finalInstruction =
      instruction && typeof instruction === 'string'
        ? instruction
        : '请优化这段简历内容，使表达更专业、清晰、有竞争力。';

    const optimizedText = await callDeepSeek(
      [
        {
          role: 'system',
          content:
            '你是一个专业的中文简历润色助手。你只负责改写用户提供的简历文本。请保留真实经历，不要编造公司、学校、职位、时间和数据。禁止修改字体、颜色、边距、布局、模块顺序等排版格式。不要返回 Markdown 标题、代码块、解释说明或额外前后缀。如果原文是普通换行文本，返回普通换行文本；如果原文包含 HTML 标签，不要新增 style、class 或任何样式属性。直接返回优化后的文本。',
        },
        {
          role: 'user',
          content: JSON.stringify(
            {
              instruction: finalInstruction,
              originalText: text,
              context,
            },
            null,
            2
          ),
        },
      ],
      {
        temperature: 0.6,
      }
    );

    return res.status(200).json({ optimizedText });
  } catch (error) {
    console.error('AI rewrite error:', error);

    return res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
      detail: error.detail,
    });
  }
};
