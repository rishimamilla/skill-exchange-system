const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skillsOffered: [{ type: String }],  // Skills user can teach
  skillsNeeded: [{ type: String }]    // Skills user wants to learn
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
