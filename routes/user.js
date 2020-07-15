const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const userController = require('../controllers/user');
router.post('/create',[
    body('name')
        .trim()
        .isLength({min: 5}),
    body('email')
        .trim()
        .isLength({max:100})
        .isEmail()
]
, userController.createUser
);

router.put('/:userId',[
    body('name')
        .trim()
        .isLength({min: 5})  
]
, userController.updateUser
);

router.delete('/:userId', userController.deleteUser);
router.get('/:userId', userController.getUser);
router.get('/', userController.getUsers);

module.exports = router;