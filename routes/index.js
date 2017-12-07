const express = require('express')
const router = express()

router.get('/', (req, res) => {
  res.render('index', null)
})

module.exports = router
