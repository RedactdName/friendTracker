const router = require('express').Router()

const locationRoutes = require('./locationRoute.js');

router.use('/update-location', locationRoutes)

module.exports = router