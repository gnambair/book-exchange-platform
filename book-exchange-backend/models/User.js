const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Only hash the password if it's being modified (or newly set)
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next(); // Continue with saving the user
    } catch (error) {
      next(error); // Handle error if hashing fails
    }
  } else {
    next(); // If the password is not modified, proceed as is
  }
});

// Create model
const User = mongoose.model('User', UserSchema);

module.exports = User;
