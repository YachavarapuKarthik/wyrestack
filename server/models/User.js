const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
  });
  
  const UserModel = mongoose.model('User', UserSchema);
  

module.exports = UserModel;
