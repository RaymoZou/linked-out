require('dotenv').config();
require('./database');
const Post = require('./posts');
const User = require('./users');
// node packages
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();


// parse requests in json format
app.use(express.json());
// cross origin cookies
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// for bcrypt hashing
// TODO: maybe make this a dotenv variable?
const saltRounds = 10;
// jwt with payload claim (payload is typically a JSON object)
function generateJWT(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        // TODO: change expiration date
        expiresIn: "10s"
    });
    console.log(token);
    return token;
}

app.use(cookieParser());
app.use((req, res, next) => {
    // verify jwt
    const token = req.cookies.jwt_token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if (err) console.error("jwt error");
            if (decoded) console.log("jwt is good");
        });
    }
    next()
});

app.get('/', (req, res) => {
    res.status(200).send("hello world");
});

app.get('/protected-route', (req, res) => {
    // check if jwt
    const token = req.cookies.jwt_token;
    const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (isValid) {
        res.status(200).send("authenticated route");
    } else {
        res.status(400).send("not authenticated!");
    }
});

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
        if (user) {
            bcrypt.compare(password, user.hash, async (err, result) => {
                // result ?
                if (result) {
                    res.status(200).cookie('jwt_token', generateJWT({ username })).send('cookie set');
                } else {
                    res.status(401).json({ message: "user unauthorized" });
                }
            });
        } else {
            res.status(401).json({ message: "user not found" })
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
});
