import News from '../models/News.js'

  
export const getNews = async (req, res) =>  {
  try {
    const data = await News.find()
    res.json(data)
    
  } catch (error) {
    res.status(500).json({msg: 'Error getting news', error})
  }
}

export const getNewsByID = async (req, res) => {
  try {
    const { id } = req.params
    const data = await News.findById(id)
    res.json(data)
    
  } catch (error) {
    res.status(500).json({msg: 'News not found', error})      
  }
}

export const createNews = async (req, res) => {    
  try {
    const { title, content, tags, author } = req.body
    const data = await News.insertOne({
      title: title,
      content: content,
      tags: tags,
      author: author
    })
    console.log('data',data);
    res.status(201).json(data)
    
  } catch (error) {
    res.status(500).json({msg: 'Error creating news', error})      
  }
}

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, tags, author } = req.body
    const data = await News.updateOne(
      { _id: id },
      { $set: {
        title: title,
        content: content,
        tags: tags,
        author: author
      }}
    )
    res.json(data)
    
  } catch (error) {
    res.status(500).json({msg: 'Error updating news', error})
  }
}

export const removeNews = async (req, res) => {
  try {
    const { id } = req.params

    const exists = await News.findOne({_id: id}) 

    if(!exists) return res.json({msg: "News not found"})

    const data = await News.deleteOne({
      _id: id
    })
    res.json({msg: 'News deleted'})

  } catch (error) {
    res.status(500).json({msg: 'Error deleting news', error})
  }  
}
