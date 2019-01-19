const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creating schema with mongoose.
// This part is just schema definiton
// unique is not a validation like required which through error if the propery is not provided.
// But this is used by mongoose for internal optimizations. 
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

// This model function create the model with the schema defined above.
module.exports = mongoose.model('User', userSchema); 