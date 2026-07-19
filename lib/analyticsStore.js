const { put, list } = require('@vercel/blob');

const BLOB_PATH = 'analytics/pageviews.json';
const RETENTION_MS = 90 * 24 * 60 * 60 * 1000; // 3 ay

const getToken = () => process.env.BLOB_READ_WRITE_TOKEN;

async function findBlobUrl() {
  const { blobs } = await list({ prefix: BLOB_PATH, limit: 1, token: getToken() });
  const match = blobs.find((b) => b.pathname === BLOB_PATH);
  return match ? match.url : null;
}

async function readData() {
  try {
    const url = await findBlobUrl();
    if (!url) return { pageviews: [] };

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return { pageviews: [] };

    const data = await res.json();
    if (!Array.isArray(data.pageviews)) return { pageviews: [] };
    return data;
  } catch (err) {
    console.error('analyticsStore.readData error:', err);
    return { pageviews: [] };
  }
}

async function writeData(data) {
  await put(BLOB_PATH, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token: getToken(),
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
