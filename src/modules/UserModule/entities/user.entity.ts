import mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  name: {
    type: String,
    require: false,
  },
  phone: String,
  email: String,
  password: String,
});

userSchema.pre('save', function (next) {
  this.name = this.get('lastName') + ' ' + this.firstName;
  next();
});

const UserModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default UserModel;
