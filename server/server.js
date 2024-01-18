require('dotenv').config()
const express = require('express');
require('./database');
const Post = require('./posts');
const app = express()

// for parsing JSON requests
app.use(express.json());

// TODO:
app.get('/', (req, res) => {
	res.json({ message: 'hello world' });
})

// TODO: proper error handling
app.route('/post/:id')
	.get(async (req, res) => {
		try {
			const post = await Post.findById(req.params.id);
			res.status(200).json(post);
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	})
	.post(async (req, res) => {
		try {
			const { name, text } = req.body
			const post = new Post({ name, text })
			await post.save();
			console.log("post has been saved");
			res.sendStatus(200);
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	})

app.listen(process.env.PORT, () => {
	console.log(`Listening on port: ${process.env.PORT}`)
});
