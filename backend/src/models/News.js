import mongoose from 'mongoose'

const newsScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim:true
    },
    content: {
      type: String,
      require: true
    },
    author: {
      type: String,
      require: true,
      trim:true
    }
  },
  {
    timestamps: true
  }
)

const News = mongoose.model('News', newsScheme)

export default News


