import 'dotenv/config.js'
// import './database.js';
import Post from './posts.js';
import User from './users.js';
import cors from 'cors';
import express, { json, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const app = express();
import morgan from 'morgan';
import { connect } from 'mongoose';

const { sign, verify } = jwt;
const { hash, compare } = bcrypt;

// TODO:
// create protected routes with valid JWTs (such as Login Page, POST requests for creating posts)
// and general routes (such as the POST login requests)
//
try {
    connect(process.env.MONGODB_URI as string, {
        dbName: process.env.DB_NAME ? process.env.DB_NAME : 'database'
    });
    console.log("connected to database")
} catch (err) {
    console.error(err);
};
// middleware
app.use(json());
app.use(cors({
    // TODO: figure out how to allow multiple origins for the future
    // for the time being, set origin to gh-pages branch
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
}));
app.use(morgan('dev'));

function generateJWT(payload: object): string {
    const token = sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: process.env.JWT_EXPIRATION_LENGTH as string });
    return token;
};

app.use(cookieParser());

app.get('/', (_, res) => {
    res.status(200).send("welcome to linked-out");
});

// TODO: this should be a middleware, not an endpoint
app.get('/protected-route', (req, res) => {
    try {
        const token = req.cookies.jwt_token;
        const decoded_token = verify(token, process.env.JWT_SECRET_KEY as string);
        res.status(200).send(decoded_token);
    } catch (error) {
        res.status(400).send("jwt is not valid");
    }
});

// post routing 
app.route('/post')
    .get(async (_, res) => {
        const allPosts = await Post.find().sort({ _id: -1 });
        res.status(200).json(allPosts);
    })
    .post(async (req, res) => {
        try {
            const decoded_token = verify(req.cookies.jwt_token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
            const username = decoded_token.username;
            const { text } = req.body;
            const post = new Post({ name: username, text })
            await post.save();
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })
    .delete(async (req, res) => {
        try {
            const { post_id, author } = req.body;
            console.log(post_id)
            // check if jwt is valid
            const decoded_token = verify(req.cookies.jwt_token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
            const jwt_user = decoded_token.username;
            // delete only if author is the same as the username on the jwt token
            if (jwt_user === author) {
                await Post.deleteOne({ _id: post_id });
                res.status(200).send("post deleted succesfully");
            } else {
                res.status(401).send("you are not authorized to make this request");
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })

// TODO: refactor? this route is pretty much the same as /login
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body as { username: string, password: string }
        hash(password, 10, async (err, hash) => {
            if (err) throw err;
            try {
                const user = new User({ username, hash });
                await user.save();
                res.status(200)
                    .cookie('jwt_token', generateJWT({ username }), { httpOnly: true, sameSite: "none", secure: true })
                    .send('cookie set');
            } catch (err) {
                res.status(500)
                    .send("error creating the user");
                console.error();
            }
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
});

app.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            compare(password, user.hash, async (_, result) => {
                if (result) {
                    // set httpOnly true to make cookie inaccessible via javascript client side
                    // set sameSite to "lax" to allow for cookies to be sent to requests from another site
                    var token: string = generateJWT({ username });
                    res.status(200)
                        .cookie('jwt_token', token, { httpOnly: true, sameSite: "none", secure: true })
                        .send('cookie set');
                } else {
                    res.status(401)
                        .json({ message: "user unauthorized" });
                }
            });
        } else {
            res.status(401)
                .json({ message: "user not found" })
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

// send 200 on successful cookie clear - 500 otherwise
app.get('/logout', (_, res) => {
    try {
        // TODO: should jwt_token be a constant string?
        res.clearCookie('jwt_token', { httpOnly: true, sameSite: "none", secure: true })
            .sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
});
