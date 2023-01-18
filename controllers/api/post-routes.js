const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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

//UPDATE a post
router.put('/postupdate/:id', async (req, res) => {
    console.log("--- im in the post routes delete /:id")
})

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