const router = require('express').Router();
const User = require('../../models/User');

// CREATE a new user
// api/users/
router.post('/', async (req, res) => {
    console.log("--- im in the user routes post /")
    console.log("--- creating a new user")
    // console.log("--- req.body: ", req.body);
    // console.log("--- req.session: ", req.session)
    try {
        // req.body = { username: req.body.username, password: req.body.password }
        const userData = await User.create(req.body);
        console.log("--- userData: ", userData);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        // console.log("--- user_id (should be the same): ", req.session.user_id, userData.id)
        console.log("--- session loggedin? (should be true): ", req.session.loggedIn)
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
// api/users/login
router.post('/login', async (req, res) => {
    console.log("--- im in the user routes post /login")
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            console.log(
                '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
                req.session.cookie
            );

            res
                .status(200)
                .json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
// api/users/logout
router.post('/logout', (req, res) => {
    console.log("--- im in the user routes post /logout")
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;