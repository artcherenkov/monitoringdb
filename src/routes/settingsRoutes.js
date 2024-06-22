const express = require('express');
const settingsController = require('../controllers/settingsController');
const router = express.Router();

router.get('/', settingsController.getAllSettings);
router.get('/:id', settingsController.getSettingsById);
router.post('/', settingsController.createSettings);
router.put('/:id', settingsController.updateSettings);
router.delete('/:id', settingsController.deleteSettings);

module.exports = router;
