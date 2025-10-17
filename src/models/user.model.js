import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import toJSON from '../connections/plugins/to-json.js';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  phone:     { type: String, required: true },
  gender:    { type: String, enum: ['male','female','other'], required: true },
  dob:       { type: Date, required: true },
  password:  { type: String, required: true, minlength: 6 },
  role:      { type: String, enum: ['USER','ADMIN'], default: 'USER' },
  isActive:  { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

userSchema.plugin(toJSON)

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
