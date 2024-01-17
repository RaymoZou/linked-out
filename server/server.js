const express = require('express');
const mongodb = require('./database');
require('dotenv').config()

const app = express()
const port = 3000

// TODO:
app.get('/', (req, res) => {
	res.json({ message: 'hello world' });
})

// TODO:
// get a post by ID
app.get('/post/:id', (req, res) => {
	console.log(req.params.id)
	res.json({ message: `this is the post with id ${req.params.id}` });
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`)
});
