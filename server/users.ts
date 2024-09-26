import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	hash: {
		type: String,
		required: true
	},
})

const UserModel = model('users', UserSchema);
export default UserModel;
