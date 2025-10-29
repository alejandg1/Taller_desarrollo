const express = require('express');
const router = express.Router({ mergeParams: true });
const usersController = require('../controllers/usersController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', usersController.list);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;
