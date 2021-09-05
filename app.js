const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const _ = require('lodash');
const port = 80;
let posts = [];
let myArray = Object.values(posts);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

// mongoose.connect("mongodb://localhost:27017/blogDBpost", {useNewUrlParser: true});
mongoose.connect('mongodb+srv://ar7fitness:Aroo7aditya%40@cluster0.d2w23.mongodb.net/AR7-blog', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    Post.find({}, function(err, posts){
    res.render('home.ejs', {
        posts: posts
    });
})
});
app.get("/compose", (req, res) => {
    res.render('compose.ejs');
})

app.post('/compose', (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save();
    res.redirect("/");

});

app.get('/posts/:userId', function (req, res) {
    let requestedTitle = _.lowerCase(req.params.userId);

    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render('post.ejs', {
                title: posts.title,
                content: posts.content
            
            });
        }
    });
});

app.get("/about", (req, res) => {
    res.render('about.ejs');
})
app.get("/contact", (req, res) => {
    res.render('contact.ejs');
})
app.get("/project", (req, res) => {
    res.render('project.ejs');
})
app.get("/project/readmore1", (req, res) => {
    res.render('readmore1.ejs');
})
app.get("/skill", (req, res) => {
    res.render('skill.ejs');
})

app.listen(process.env.PORT || port,()=>{
    console.log(`The application started successfully on port ${port}`);
});

