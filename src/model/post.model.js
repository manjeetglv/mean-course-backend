const mongoose = require('mongoose');

//1 Creating schema with mongoose.
// This part is just schema definiton 
//2 Adding user info with post in a variable of type ObjectId
const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    imagePath: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}
});

// This model function create the model with the schema defined above.
module.exports = mongoose.model('Post', postSchema); 