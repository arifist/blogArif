const express = require('express');
const router = express.Router();
const cronController = require('../controller/cron');

router.get('/api/cron/monthly-report', cronController.monthlyReport);

module.exports = router;
