const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res
                .status(422)
                .json({
                    message:'Validation errors', 
                    errors: errors.array()
                });
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contact = req.body.contact;
    const image = req.body.image;
    const user = new User({
        name:name,
        email:email,
        password: password,
        contact: contact,
        image: image,
    });

    user
    .save()
    .then(result => {
        res.status(200).json({
            status: true,
            message : 'User created successfully',
            data: {user: result }
        });
    })
    .catch(err => {
        res.status(200).json({
            status: false,
            message : 'Unable to create user',
            error: err
        });
    });
};

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res
                .status(422)
                .json({
                    message:'Validation errors', 
                    errors: errors.array()
                });
    }
    const name = req.body.name;        
    const contact = req.body.contact;
    const image = req.body.image;

    User
    .findByPk(userId)
    .then(user => {    
        
        user.name = name;
        user.contact = contact;
        user.image = image;
        return user.save();
        
    })
    .then(result => {
        res.status(200).json({
            status: true,
            message : 'User updated successfully',
            data: { user: result }
        });
    })
    .catch(err => {
        res.status(200).json({
            status: false,
            message : 'Users not found',
            error: err
        });
    });

};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;    

    User
    .findByPk(userId)
    .then(user => {    
        
       return User.destroy({
        where: {
            id: userId
        }
         });
        
    })
    .then(result => {
        res.status(200).json({
            status: true,
            message : 'User deleted successfully',            
        });
    })
    .catch(err => {
        res.status(200).json({
            status: false,
            message : 'User not found',
            error: err
        });
    });

};
exports.getUser = (req, res ,next) => {
    const userId = req.params.userId;
    User
    .findByPk(userId)
    .then(user => {
        if(!user){
            const error = new Error('Could not find user');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            status: true,
            message : 'User found successfully',
            data: { user: user }
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getUsers = (req, res ,next) => {    
    User
    .findAll()
    .then(users => {       
        res.status(200).json({
            status: true,
            message : 'Users found successfully',
            data: { users: users }
        });
    })
    .catch(err => {
        res.status(200).json({
            status: false,
            message : 'Users not found',
            error: err
        });
    });
};