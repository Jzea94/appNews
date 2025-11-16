import News from '../models/news.js'

export const newsController = () =>  {
  
  const getNews = async (req, res) =>  {
    const data = await News.find()
    res.json({ news: data })
  }

  const getNewsByID = async (req, res) => {
    const { id } = req.params
    const data = await News.findById(id)
    res.json({ news: data })
  }

  const createNews = async (req, res) => {    
    const { title, content, author } = req.body
    const data = await News.create({
      title: title,
      content: content,
      author: author
    })
    res.json( data )
  }

  const updateNews = (req, res) => {
    res.json({ message: 'No implemented'})
  }

  const removeNews = (req, res) => {
    res.json({ message: 'No implemented'})
  }

  return {
    getNews,
    getNewsByID,
    createNews,
    updateNews,
    removeNews
  }
}