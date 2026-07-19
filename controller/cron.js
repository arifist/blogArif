const nodemailer = require('nodemailer');
const { readData, writeData, pruneOldEntries, RETENTION_MS } = require('../lib/analyticsStore');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

function formatDuration(ms) {
  if (!ms || ms <= 0) return '-';
  const totalSec = Math.round(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return min > 0 ? `${min}dk ${sec}sn` : `${sec}sn`;
}

function buildReportHtml({ periodStart, periodEnd, totalVisits, uniqueVisitors, topPages, avgDuration }) {
  const rows = topPages
    .map(
      (p, i) => `
        <tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">${i + 1}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">${escapeHtml(p.path)}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">${p.visits}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">${p.avgDuration}</td>
        </tr>`
    )
    .join('');

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Aylık Site Ziyaretçi Raporu</title>
    </head>
    <body style="font-family: sans-serif; background:#f6f6f6; padding:20px; margin:0;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:6px;padding:24px;">
        <h2 style="margin-top:0;">Aylık Ziyaretçi Raporu</h2>
        <p style="color:#666;">${escapeHtml(periodStart)} – ${escapeHtml(periodEnd)} arası (elde tutulan son 3 aylık veri havuzu üzerinden)</p>
        <p><b>Toplam sayfa görüntüleme:</b> ${totalVisits}</p>
        <p><b>Tekil ziyaretçi (tarayıcı bazlı, tahmini):</b> ${uniqueVisitors}</p>
        <p><b>Ortalama sayfada kalma süresi:</b> ${avgDuration}</p>
        <h3>En çok görüntülenen sayfalar</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #333;">#</th>
              <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #333;">Sayfa</th>
              <th style="text-align:right;padding:6px 10px;border-bottom:2px solid #333;">Ziyaret</th>
              <th style="text-align:right;padding:6px 10px;border-bottom:2px solid #333;">Ort. Süre</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="4" style="padding:10px;">Bu dönemde veri yok.</td></tr>'}</tbody>
        </table>
        <p style="color:#999;font-size:12px;margin-top:24px;">Bu rapor otomatik olarak her ayın 1'inde gönderilir. Ham veri 3 aydan eski kayıtlar silinerek tutulur.</p>
      </div>
    </body>
  </html>`;
}

function buildTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAIL,
      pass: process.env.NODE_PASS,
    },
  });
}

exports.monthlyReport = async (req, res) => {
  // Vercel Cron, CRON_SECRET tanımlıysa isteğe otomatik "Authorization: Bearer <secret>" ekler.
  if (process.env.CRON_SECRET) {
    const authHeader = req.get('authorization') || '';
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ succeeded: false, error: 'unauthorized' });
    }
  }

  try {
    const data = await readData();
    pruneOldEntries(data);

    const pageviews = data.pageviews;
    const totalVisits = pageviews.length;
    const uniqueVisitors = new Set(pageviews.map((p) => p.visitorId)).size;

    const byPath = new Map();
    for (const pv of pageviews) {
      if (!byPath.has(pv.path)) byPath.set(pv.path, { visits: 0, durationSum: 0, durationCount: 0 });
      const entry = byPath.get(pv.path);
      entry.visits += 1;
      if (typeof pv.duration === 'number') {
        entry.durationSum += pv.duration;
        entry.durationCount += 1;
      }
    }

    const topPages = [...byPath.entries()]
      .map(([path, v]) => ({
        path,
        visits: v.visits,
        avgDuration: formatDuration(v.durationCount ? v.durationSum / v.durationCount : 0),
      }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 15);

    const durations = pageviews.filter((p) => typeof p.duration === 'number').map((p) => p.duration);
    const avgDurationMs = durations.length ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;

    const now = new Date();
    const periodStart = new Date(now.getTime() - RETENTION_MS).toLocaleDateString('tr-TR');
    const periodEnd = now.toLocaleDateString('tr-TR');

    const html = buildReportHtml({
      periodStart,
      periodEnd,
      totalVisits,
      uniqueVisitors,
      topPages,
      avgDuration: formatDuration(avgDurationMs),
    });

    const transporter = buildTransporter();
    await transporter.sendMail({
      to: 'arif.kalayci444@gmail.com',
      subject: `Aylık Site Ziyaretçi Raporu - ${periodEnd}`,
      html,
    });

    // Rapor sonrası veriyi 3 aylık pencereye budanmış haliyle geri yaz.
    await writeData(data);

    res.status(200).json({ succeeded: true, totalVisits, uniqueVisitors });
  } catch (err) {
    console.error('monthlyReport cron error:', err);
    res.status(500).json({
      succeeded: false,
      error: 'internal_error',
      debug: { name: err.name, message: err.message },
    });
  }
};
