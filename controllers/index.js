const router = require('express').Router();

const blogRoutes = require('./blog-routes.js');

router.use('/', blogRoutes);

module.exports = router;
