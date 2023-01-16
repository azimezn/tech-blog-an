const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
// api/posts
router.get('/', withAuth, async (req, res) => {
    console.log("--- im in the post routes get /")
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });
        // res.status(200).json(postData);
        res.render('post', { postData });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one post
// api/posts/:id
router.get('/:id', async (req, res) => {
    console.log("--- im in the post routes get /:id")
    try {
        const postData = await Post.findOne({
            include: [{ model: User }, { model: Comment }],
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        const post = postData.get({ plain: true });
        const postID = post.id

        const commentData = await Comment.findAll({
            where: { post_id: post.id }
        })
        console.log("--- comment data: ", commentData);

        // res.status(200).json(post);
        res.render('post', { post, postID, commentData });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// CREATE a new post
router.post('/', async (req, res) => {
    console.log("--- im in the post routes post /")
    console.log("--- creating a new post")
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        console.log(postData);
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
    console.log("--- im in the post routes delete /:id")
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;