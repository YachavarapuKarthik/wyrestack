const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: false},
    dob: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String },
  });
  
  const UserModel = mongoose.model('User', UserSchema);
  

module.exports = UserModel;
