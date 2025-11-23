import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'editor', 'superadmin'],
      default: 'admin'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

userScheme.pre('save', async function (next) {
  if( !this.isModified('password') ) return next()
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userScheme.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate()
  if(update.username) {
    const exists = await this.model.findOne({ username: update.username })
    if ( exists ) return next(new Error("Username is already registered"))
  }
  if(update.email) {
    const exists = await this.model.findOne({ email: update.email })
    if ( exists ) return next(new Error("Email is already registered"))
  }
  
  next()
})


userScheme.methods.comparePassword = function ( candidatePassword ) {
  return bcrypt.compare(candidatePassword, this.password)
}


const User = mongoose.model('User', userScheme)

export default User