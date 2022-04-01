const fips = require('./lib/fips_lookup_by_state')
const mongoose = require('mongoose')
const states = Object.values(fips)

const State = require('./models/state')

const db = require('./config/connection')

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection
	.on("open", () => {
		console.log(`Connected to ${db}`)
	const seedStates = []

	states.forEach(state => {
		const newState = {}

		newState.name = state._name
		newState.stateFips = state._fips
		newState.abbrev = state._abbrev
		newState.counties = []

		// turn the object's attributes into arrays
		let counties = Object.entries(state)
		// remove the first three array items because they're state info
		counties.splice(0, 3)
		//turn each of the remaining arrays into a county object inside the new state's counties array
		counties.forEach(county => {
			newState.counties.push({
				county: county[0],
				fips: county[1]
			})	
		})
		seedStates.push(newState)
	})
	console.log('before deleteMany')
	State.deleteMany({})
        .then((deletedStates) => {
        // Seed Starter States
            State.create(seedStates)
            .then((newStates) => {
                // log the new States to confirm their creation
                console.log("States created");
                mongoose.connection.close();
            })
            .catch((error) => {
                console.log(error);
                mongoose.connection.close();
            });
        })
        .catch((error) => {
            console.log(error);
            mongoose.connection.close();
        });
})