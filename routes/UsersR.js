const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'password';

users.post('/register', (req, res) => {
    console.log("try to save....");
    console.log(req.body);
    const userData = {
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        address:req.body.address,
        city:req.body.city,
        phone_number:req.body.phone_number,
        email:req.body.email
    };
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                userData.password = hash;
                User.create(userData)
                .then(user => {
                    res.json({ status: user.email + ' registered!'});
                })
                .catch(err => {
                    res.send('error: ' + err);
                })
            })
        } else {
            console.log("find One with same email, please change the email and try again. ");
            res.json({ error: 'User already exists' });
        }
    })
    .catch(error => {
        res.send('error: ' + error);
    })
})

users.post('/login', (req, res) => {
    let fetchUser;
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        console.log("user email: " + user.email);
        if(user){
            console.log("user.first_name : " + user.first_name);
            console.log("user password: " + user.password);
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload = {
                    _id:user._id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    address:user.address,
                    city:user.city,
                    phone_number:user.phone_number,
                    email:user.email,
                    role:user.role
                };
                fetchUser = user;
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                });
                //res.send(token);
                res.status(200).json({
                    token: token,
                    user:user
                });
            } else {
                res.json({err: "User does not exist first."});
            }
        } else {
            res.json({err: "User does not exist second"})
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
})

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        if(user){
            res.json(user);
        } else {
            res.send(" User does not exist.");
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
});

module.exports = users
