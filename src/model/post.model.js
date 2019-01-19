const mongoose = require('mongoose');

// Creating schema with mongoose.
// This part is just schema definiton 
const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    imagePath: {type: String, required: true}
});

// This model function create the model with the schema defined above.
module.exports = mongoose.model('Post', postSchema); 