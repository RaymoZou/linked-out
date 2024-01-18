// require('dotenv').config();
const mongoose = require('mongoose');
try {
	mongoose.connect(process.env.MONGODB_URI, {
		dbName: process.env.DB_NAME ? process.env.DB_NAME : 'database'
	})
	console.log("connected to database")
} catch (err) {
	console.log(err);
}
