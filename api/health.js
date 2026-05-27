module.exports = function handler(req, res) {
  res.status(200).json({
    ok: true,
    message: 'Vercel API is healthy',
    hasDeepSeekKey: Boolean(process.env.DEEPSEEK_API_KEY),
  });
};
