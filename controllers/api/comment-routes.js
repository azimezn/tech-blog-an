const router = require('express').Router();
const Comment = require('../../models/Comment');

// GET all comments
router.get('/', async (req, res) => {
    console.log("--- im in the comment routes get /")
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new comment
// /api/comments/
router.post('/', async (req, res) => {
    console.log("--- im in the comment routes post /")
    console.log("--- creating a new comment")
    console.log("user id: ", req.session.user_id);
    console.log("post id: ", req.body.postID);
    try {
        const commentData = await Comment.create({
            body: req.body.body,
            user_id: req.session.user_id,
            post_id: req.body.postID,
        });
        console.log("--- commentData: ", commentData);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
    console.log("--- im in the post routes delete /:id")
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
