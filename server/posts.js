const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
})

const PostModel = mongoose.model('posts', PostSchema);
module.exports = PostModel;
