import News from '../models/news.js'

export class newsController {
  
  static getNews = async (req, res) =>  {
    const data = await News.find()
    res.json({ news: data })
  }

  static getNewsByID = async (req, res) => {
    const { id } = req.params
    const data = await News.findById(id)
    res.json({ news: data })
  }

  static createNews = async (req, res) => {    
    const { title, content, author } = req.body
    const data = await News.create({
      title: title,
      content: content,
      author: author
    })
    res.json( data )
  }

  static updateNews = async (req, res) => {
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
  }

  static removeNews = async (req, res) => {
    const { id } = req.params
    const data = await News.deleteOne({
      _id: id
    })

    res.json(`News deleted: ${ data }`)
  }
}