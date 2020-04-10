const express = require('express');
const posts = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Post = require('../models/Post');
posts.use(cors());

process.env.SECRET_KEY = 'password';

posts.post('/createPost', (req, res) => {
    console.log("try to save a post....");
    console.log(req.body);
    const postData = {
        title: req.body.title,
        content:req.body.content,
        authorEmail:req.body.authorEmail,
        images:''
    };
    console.log(postData);
    Post.create(postData)
    .then(course => {
        res.json({ status: 'A chosen post added!'});
    })
    .catch(err => {
        res.send('Adding post error: ' + err);
    })
});

posts.post('/updatePost/:id', (req, res) => {
    console.log("try to update a course....");
    console.log(req.body);
    Post.findById(req.params.id, function(err, post) {
        if(!post){
            res.status(404).send('Data is not found');
        } else {
            post.title=req.body.title;
            post.content=req.body.content;
            post.save().then(post => {
                res.json('A post updated.');
            })
            .catch(err => {
                res.status(400).send("Update not possible.");
            })
        }

    });
});

posts.get('/getPosts', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    console.log("getting posts");
    Post.find({
    }).sort( { post_time: -1 } )
    .then(posts => {
        if(posts){
            res.json(posts);
        } else {
            res.send(" Posts does not exist.");
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
});

posts.get('/getPostById/:id', (req, res) => {
    console.log("get post by id.....");
    
    Post.findOne({
        _id: req.params.id
    }).then( post => {
        res.status(200).json({
            post:post}
            );
    });
});



posts.delete("/:id", (req, res, next) => {
    console.log("Delete ...: " + req.params.id);
    
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Course deleted!"});
    });
})


module.exports = posts
