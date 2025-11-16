import mongoose from 'mongoose'

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model('User', userScheme)

export default User