import { Router } from "express";
import { newsController } from '../controllers/news.js'
import { validatorNews } from "../validators/news.js"
import { authRequired } from "../middlewares/auth.js";

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

// rutas protegidas
router.post('/', authRequired, validatorNews, createNews)
router.patch('/:id', authRequired, validatorNews, updateNews)
router.delete('/:id', authRequired, removeNews)

export { router }