import { Router } from "express";
import { newsController } from '../controllers/news.js'
import { validatorNews } from "../validators/news.js"

const router = Router()

const {
  getNews,
  getNewsByID,
  createNews,
  updateNews,
  removeNews
} = newsController

//localhost:400/news
router.get('/', getNews)

// localhost:4000/news/:id  --> params
// localhost:4000/news?id=  --> query
router.get('/:id', getNewsByID)

router.post('/', validatorNews, createNews)
router.patch('/:id', updateNews)
router.delete('/:id', removeNews)

export { router }