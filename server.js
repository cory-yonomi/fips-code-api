const express = require('express')
const app = express()
require('dotenv').config()

const apiRoutes = require('./app/routes/api_routes')

app.use(apiRoutes)

app.listen(process.env.PORT || 3000, ()=>{
	console.log('server listening on ' + process.env.PORT)
})