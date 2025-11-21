import News from '../models/News.js'

export class newsController {
  
  static getNews = async (req, res) =>  {
    try {
      const data = await News.find()
      res.json(data)
      
    } catch (error) {
      res.status(500).json({msg: 'Error getting news', error})
    }
  }
  
  static getNewsByID = async (req, res) => {
    try {
      const { id } = req.params
      const data = await News.findById(id)
      res.json(data)
      
    } catch (error) {
      res.status(500).json({msg: 'News not found', error})      
    }
  }
  
  static createNews = async (req, res) => {    
    try {
      const { title, content, author } = req.body
      const data = await News.create({
        title: title,
        content: content,
        author: author,
      })
      res.status(201).json(data)
      
    } catch (error) {
      res.status(500).json({msg: 'Error creating news', error})      
    }
  }

  static updateNews = async (req, res) => {
    try {
      const { id } = req.params
      const { title, content, author } = req.body
      const data = await News.updateOne(
        { _id: id },
        { $set: {
          title: title,
          content: content,
          author: author
        }}
      )
      res.json(data)
      
    } catch (error) {
      res.status(500).json({msg: 'Error updating news', error})
    }
  }

  static removeNews = async (req, res) => {
    try {
      const { id } = req.params
      const data = await News.deleteOne({
        _id: id
      })
      res.json({msg: 'News deleted'})

    } catch (error) {
      res.status(500).json({msg: 'Error deleting news', error})
    }
    
  }
}