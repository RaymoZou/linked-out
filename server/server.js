require('dotenv').config()
var cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
require('./database');
const Post = require('./posts');
const User = require('./users');

const app = express()

// for bcrypt hashing
// TODO: maybe make this a dotenv variable?
const saltRounds = 10;

// for parsing JSON requests
app.use(express.json());
app.use(cors());

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
// .post(async (req, res) => {
// 	try {
// 		const { name, text } = req.body
// 		const post = new Post({ name, text })
// 		await post.save();
// 		console.log("post has been saved");
// 		res.sendStatus(200);
// 	} catch (err) {
// 		console.error(err);
// 		res.sendStatus(500);
// 	}
// })

app.get('/post', async (req, res) => {
	const allPosts = await Post.find();
	res.status(200).json(allPosts);
})

app.post('/post', async (req, res) => {
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

app.post('/signup', async (req, res) => {
	try {
		const { username, password } = req.body;
		// console.log(`name: ${username}, raw_password: ${password}`)
		bcrypt.hash(password, saltRounds, async (err, hash) => {
			if (err) throw err;
			try {
				const user = new User({ username, hash });
				await user.save();
				res.sendStatus(200);
			} catch (err) {
				res.status(500).send("error creating the user");
				console.error();
			}
		});
	} catch (err) {
		console.error(err);
		res.sendStatus(500)
	}
});

app.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		bcrypt.compare(password, user.hash, async (err, result) => {
			result ? res.status(200).json({ message: "user authorized" })
				:
				res.status(401).json({ message: "user unauthorized" });
		})
	} catch (err) {
		console.log(err);
		res.sendStatus(500)
	}
})


app.listen(process.env.PORT, () => {
	console.log(`Listening on port: ${process.env.PORT}`)
});
