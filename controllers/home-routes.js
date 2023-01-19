const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth');

// route to get all posts
router.get('/', async (req, res) => {
    console.log("--- im in the home routes /");
    console.log("--- getting all posts");
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        })
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log("--- all posts: ", posts, "--- now it should render to the post handlebars with the posts");
        
        res.render('homepage', { posts, logged_in: req.session.loggedIn });
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
    const postData = await Post.findAll({
        include: [{ model: User }, { model: Comment }],
        where: {
            user_id: req.session.user_id,
        },
    }).catch((err) => {
        res.json(err);
    });
    console.log("--- postData: ", postData);
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("--- posts: ", posts);
    res.render('dashboard', { posts, logged_in: req.session.loggedIn });
})

// GET one post
// /:id
router.get('/post/:id', withAuth, async (req, res) => {
    console.log("--- im in the home routes get /:id")
    try {
        const postData = await Post.findOne({
            include: [{ model: User }, { model: Comment }],
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        console.log("--- req.params.id: ", req.params.id)
        // console.log("--- post_id: ", post_id)

        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        const post = postData.get({ plain: true });
        console.log("--- post: ", post);
        const postID = req.params.id
        console.log("--- postID: ", postID);

        // res.status(200).json(post);
        res.render('post', { post, logged_in: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one post (to update)
// /postupdate/:id
router.get('/postupdate/:id', async (req, res) => {
    console.log("--- im in the home routes get /postupdate/:id")
    try {
        const postData = await Post.findOne({
            include: [{ model: User }, { model: Comment }],
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        console.log("--- req.params.id: ", req.params.id)
        // console.log("--- post_id: ", post_id)

        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        const post = postData.get({ plain: true });
        console.log("--- post: ", post);

        res.render('postupdate', { post, logged_in: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;