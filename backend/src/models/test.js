import mongoose from "mongoose"

const testScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date().toString()
  }
})

const Test = mongoose.model('Test', testScheme)

export default Test