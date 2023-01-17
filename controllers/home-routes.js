const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth');

// route to get all posts
router.get('/', withAuth, async (req, res) => {
    console.log("--- im in the home routes /")
    try {
        const postData = await Post.findAll()
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log("--- all posts: ", posts, "--- now it should render to the post handlebars with the posts");
        res.render('post', { posts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/login", async (req, res) => {
    console.log("--- im in the home routes /login")
    res.render('login');
})

router.get("/dashboard", withAuth, async (req, res) => {
    console.log("--- im in the home routes /dashboard")
    const postData = await Post.findAll().catch((err) => {
        res.json(err);
    });
    console.log("--- postData: ", postData);
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts });
})

module.exports = router;