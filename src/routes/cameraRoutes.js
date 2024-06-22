const express = require('express');
const cameraController = require('../controllers/cameraController');
const router = express.Router();

router.get('/', cameraController.getAllCameras);
router.get('/:id', cameraController.getCameraById);
router.post('/', cameraController.createCamera);
router.put('/:id', cameraController.updateCamera);
router.delete('/:id', cameraController.deleteCamera);

module.exports = router;
