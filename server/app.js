const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

app.use(cors());
app.use(express.json());

async function callDeepSeek(messages, options = {}) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key is missing');
  }

  const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
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

app.get('/', (req, res) => {
  res.send('Simple Resume AI backend is running');
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Backend is healthy',
    hasDeepSeekKey: Boolean(DEEPSEEK_API_KEY),
  });
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, resume } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'message is required',
      });
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

    res.json({ reply });
  } catch (error) {
    console.error('AI chat error:', error);

    res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
      detail: error.detail,
    });
  }
});

app.post('/api/ai/rewrite', async (req, res) => {
  try {
    const { instruction, text, context } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'text is required',
      });
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
            '你是一个专业的中文简历润色助手。你只负责改写用户提供的简历文本。请保留真实经历，不要编造公司、学校、职位、时间和数据。直接返回优化后的文本，不要解释。',
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

    res.json({ optimizedText });
  } catch (error) {
    console.error('AI rewrite error:', error);

    res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
      detail: error.detail,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(
    DEEPSEEK_API_KEY
      ? 'DeepSeek API key loaded'
      : 'DeepSeek API key missing'
  );
});