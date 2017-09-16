const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const userSchema = new Schema({
    name: { type: String},
    email: { type: String},
    image_path: {type: String}
});
  
//Create a model
let User = mongoose.model('User',userSchema);

module.exports = User;