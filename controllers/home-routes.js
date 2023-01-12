const router = require('express').Router();
//const User = require('../models/User');
const Post = require('../models/Post');
//const Comment = require('../models/Comment');
const withAuth = require('../utils/auth');

// route to get all posts
router.get('/', withAuth, async (req, res) => {
    const postData = await Post.findAll().catch((err) => {
        res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all', { posts });
});

router.get("/login", async (req, res) => {
    res.render('login');
})

module.exports = router;