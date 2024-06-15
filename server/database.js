import { connect } from 'mongoose';
try {
    connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME ? process.env.DB_NAME : 'database'
    });
    console.log("connected to database")
} catch (err) {
    console.error(err);
};
