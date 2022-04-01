const express = require('express')
const router = express.Router()
const State = require('../../models/state')

router.get('/', (req, res) => {
    res.redirect('/docs')
})

router.get('/docs', (req, res) => {
    res.render('home')
})

router.get('/search', (req, res) => {
    if (!req.query.countyName || !req.query.state) {
        res.render('search')
    } else {
        State.findOne({ abbrev: req.query.state.toUpperCase() })
            .then(foundState => {
                const foundCounty = foundState.counties.filter(county => county.county.includes(req.query.countyName))
                console.log(foundCounty)
				res.render('search', {state: foundState, county: foundCounty})
			})
			.catch(err => console.log(err))
    }
    
})

module.exports = router