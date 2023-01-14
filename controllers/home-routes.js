const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth');

// route to get all posts
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll()
        // console.log(postData);
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log("logging posts in home-routes: ", posts);
        res.render('post', { posts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/login", async (req, res) => {
    res.render('login');
})

router.get("/dashboard", withAuth, async (req, res) => {
    const postData = await Post.findAll().catch((err) => {
        res.json(err);
    });
    console.log("logging postData in home-routes: ", postData);
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts });
})

module.exports = router;