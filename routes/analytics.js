const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analytics');

router.post('/api/analytics/track', analyticsController.track);

router.post('/api/analytics/duration', analyticsController.duration);

module.exports = router;
