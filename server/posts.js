import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
})

const PostModel = model('posts', PostSchema);
export default PostModel;
