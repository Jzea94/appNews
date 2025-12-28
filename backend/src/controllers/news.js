import News from '../models/News.js'

  
export const getNews = async (req, res) =>  {
  try {
    const data = await News.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    res.json(data)
    
  } catch (error) {
    res.status(500).json({msg: 'Error getting news', error})
  }
}

export const getNewsByID = async (req, res) => {
  try {
    const { id } = req.params
    // Incrementa usando $inc para evitar condiciones de carrera
    const news = await News.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    if (!news) {
      return res.status(404).json({ msg: "Noticia no encontrada" });
    }

    res.json(news);
    
  } catch (error) {
    res.status(500).json({msg: 'News not found', error})      
  }
}

export const createNews = async (req, res) => {    
  try {
    const { title, category, content, views, image, excerpt, featured } = req.body
    const data = await News.create({
      title,
      category,
      author: req.userId,
      content,
      views,
      image,
      excerpt,
      featured
    })
    console.log('data',data);
    res.status(201).json({msg: "Notice created successfully", data})
    
  } catch (error) {
    res.status(500).json({msg: 'Error creating news', error})      
  }
}

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params
    delete req.body.readTime;

    const updated = await News.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Noticia no encontrada" });
    }

    res.json({
      msg: "Noticia actualizada correctamente",
      updated
    });

    
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
