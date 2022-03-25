const express = require('express')
const router = express.Router()
const State = require('../../models/state')

router.get('/', (req, res) => {
    res.redirect('/home')
})

router.get('/home', (req, res) => {
    res.render('home')
})

module.exports = router