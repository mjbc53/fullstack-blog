const router = require('express').Router()

const apiRoutes = require('./api')

const homeRoutes = require('./home-routes')

const dashbooardRoutes = require('./dashboard-routes')


router.use('/api', apiRoutes)
router.use('/', homeRoutes)
router.use('/dashboard', dashbooardRoutes)

// router.use((req, res) => {
//   res.status(404).end()
// })

module.exports = router