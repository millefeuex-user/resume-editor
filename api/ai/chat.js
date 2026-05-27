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
      temperature: options.temperature ?? 0.7,
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
    const { message, resume } = getRequestBody(req);

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    const reply = await callDeepSeek([
      {
        role: 'system',
        content:
          '你是一个专业的中文简历优化助手。请根据用户的问题，给出清晰、实用、具体的简历建议。不要编造不存在的经历。',
      },
      {
        role: 'user',
        content: JSON.stringify(
          {
            userMessage: message,
            resume,
          },
          null,
          2
        ),
      },
    ]);

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('AI chat error:', error);

    return res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
      detail: error.detail,
    });
  }
};
