const router = require('express').Router();
//const User = require('../models/User');
const Post = require('../models/Post');
//const Comment = require('../models/Comment');

// route to get all posts
router.get('/', async (req, res) => {
    const postData = await Post.findAll().catch((err) => {
        res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all', { posts });
});

module.exports = router;