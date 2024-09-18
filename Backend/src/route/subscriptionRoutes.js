const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, subscriptionController.createSubscription);
router.put('/update', authMiddleware, subscriptionController.updateSubscription);
router.get('/:userId', authMiddleware, subscriptionController.getSubscription);
router.put('/business-info', authMiddleware, subscriptionController.updateBusinessInfo);

module.exports = router;
