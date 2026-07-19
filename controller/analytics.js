const { addPageview, recordDuration } = require('../lib/analyticsStore');

const isSafePath = (p) =>
  typeof p === 'string' && p.length > 0 && p.length <= 200 && p.startsWith('/') && !p.startsWith('//');

const isSafeId = (id) => typeof id === 'string' && /^[a-zA-Z0-9-]{8,64}$/.test(id);

exports.track = async (req, res) => {
  const { id, path: pagePath, referrer } = req.body || {};

  if (!isSafeId(id) || !isSafePath(pagePath)) {
    return res.status(204).end();
  }

  const visitorId = req.cookies && req.cookies.visitor_id ? req.cookies.visitor_id : 'unknown';
  const safeReferrer = typeof referrer === 'string' ? referrer.slice(0, 300) : '';
  const userAgent = (req.get('user-agent') || '').slice(0, 200);

  try {
    await addPageview({
      id,
      path: pagePath,
      ts: Date.now(),
      visitorId,
      referrer: safeReferrer,
      userAgent,
      duration: null,
    });
  } catch (err) {
    console.error('analytics track error:', err);
  }

  res.status(204).end();
};

exports.duration = async (req, res) => {
  const { id, duration } = req.body || {};

  if (!isSafeId(id) || typeof duration !== 'number') {
    return res.status(204).end();
  }

  try {
    await recordDuration(id, duration);
  } catch (err) {
    console.error('analytics duration error:', err);
  }

  res.status(204).end();
};
