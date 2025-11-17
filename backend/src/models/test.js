import mongoose from "mongoose"

const testScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
)

const Test = mongoose.model('Test', testScheme)

export default Test