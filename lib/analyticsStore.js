const { put, get } = require('@vercel/blob');

const BLOB_PATH = 'analytics/pageviews.json';
const RETENTION_MS = 90 * 24 * 60 * 60 * 1000; // 3 ay

async function readData() {
  try {
    const result = await get(BLOB_PATH, { access: 'private' });
    if (!result || !result.stream) return { pageviews: [] };

    const text = await new Response(result.stream).text();
    const data = JSON.parse(text);
    if (!Array.isArray(data.pageviews)) return { pageviews: [] };
    return data;
  } catch (err) {
    console.error('analyticsStore.readData error:', err);
    return { pageviews: [] };
  }
}

async function writeData(data) {
  await put(BLOB_PATH, JSON.stringify(data), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

// Yalnızca son 3 aya ait ziyaret kayıtlarını tutar; eski kayıtları eler.
function pruneOldEntries(data, now = Date.now()) {
  const cutoff = now - RETENTION_MS;
  data.pageviews = data.pageviews.filter((pv) => pv.ts >= cutoff);
  return data;
}

async function addPageview(entry) {
  const data = await readData();
  pruneOldEntries(data);
  data.pageviews.push(entry);
  await writeData(data);
}

async function recordDuration(id, duration) {
  const data = await readData();
  pruneOldEntries(data);
  const pv = data.pageviews.find((p) => p.id === id);
  if (pv && Number.isFinite(duration) && duration >= 0 && duration < 24 * 60 * 60 * 1000) {
    pv.duration = duration;
  }
  await writeData(data);
}

module.exports = {
  BLOB_PATH,
  RETENTION_MS,
  readData,
  writeData,
  pruneOldEntries,
  addPageview,
  recordDuration,
};
