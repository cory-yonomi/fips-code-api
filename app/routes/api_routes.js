const express = require('express')
const router = express.Router()
const State = require('../../models/state')

// show all states and counties
router.get('/index', (req, res)=>{
	State.find({})
		.then(foundStates => {
		res.json(foundStates)
		})
		.catch(err => console.log(err))
})

router.get('/state/:state', (req, res) => {
	// if the request only has a state parameter, return the whole state
	if (!req.query.countyName) {
		State.find({ abbrev: req.params.state.toUpperCase() })
			.then(foundState => {
				res.json(foundState)
			})
			.catch(err => console.log(err))
	// but if there's a query, return just that county specified
	} else {
		State.findOne({ abbrev: req.params.state.toUpperCase() })
			.then(foundState => {
				const foundCounty = foundState.counties.filter(county => county.county.includes(req.query.countyName))
				res.json(foundCounty)
			})
			.catch(err => console.log(err))
	}
})

// router.get('/fips/many', (req, res) => {
// 	let queries = req.query.countyCodes.split(',')
// 	let statesArray = []
// 	let fipsArray = []

// 	queries.forEach(query => {
// 		let stateCode = query.slice(0, 2)
// 		statesArray.push(parseInt(stateCode))
// 		fipsArray.push(parseInt(query))
// 	})

// 	State.find({ stateFips: statesArray })
// 		.then(states => {
// 			console.log(states)
// 			let codes = []
// 			states.forEach((state, i) => {
// 				codes.push(state.counties.find(county => parseInt(county.fips) === parseInt(fipsArray[i])))
// 			})
// 			res.json(codes)
// 		})
// })

router.get('/fips', (req, res) => {
	// extract the state code from the county's FIPS code
	let stateCode = req.query.code.toString().slice(0, 2)
	// use it to find the single state
	console.log('state code:', stateCode)
	State.findOne({ stateFips: stateCode })
		.then(foundState => {
			// filter for the county with the matching name
			let foundCounty = foundState.counties.filter(county => {
				return county.fips === parseInt(req.query.code)
			})
			res.json(foundCounty)
		})
		.catch(err=>console.log(err))
})


module.exports = router