import mongoose from 'mongoose'

const newsScheme = new mongoose.Schema({
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
  },
  createdAt: { 
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

const News = mongoose.model('News', newsScheme)

export default News


