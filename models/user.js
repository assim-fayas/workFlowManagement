const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Project Manager', 'Team Lead', 'Team Member'],
    default: 'Team Member'
  }
});

// // Pre-save middleware to hash the password before saving
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password') || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// // Instance method to compare passwords
// userSchema.methods.comparePassword = function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);
