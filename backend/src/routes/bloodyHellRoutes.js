const express = require('express');
const bloodyHellController = require('../controllers/bloodyHellController');
const router = express.Router();

router.post('/start', bloodyHellController.start);
router.post('/stop', bloodyHellController.stop);

module.exports = router;
