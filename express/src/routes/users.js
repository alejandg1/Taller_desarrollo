const express = require('express');
const router = express.Router({ mergeParams: true });
const usersController = require('../controllers/usersController');
const { authenticate } = require('../middleware/auth');

// All routes except GET for list require auth per spec; here we'll protect all except signup/login which are in auth routes
router.use(authenticate);

router.get('/', usersController.list);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;
