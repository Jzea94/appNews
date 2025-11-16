import { Router } from "express";
import { newsController } from '../controllers/news.js'

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
router.get('/', getNewsByID)
router.post('/', createNews)
router.patch('/', updateNews)
router.delete('/', removeNews)

export { router }