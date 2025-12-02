import { Router } from "express";
import { createNewsValidator, updateNewsValidator } from "../validators/news.js"
import { validateRequest } from "../middlewares/validator.js";
import { authRequired } from "../middlewares/auth.js";
import {
  getNews,
  getNewsByID,
  createNews,
  updateNews,
  removeNews
} from '../controllers/news.js'

const router = Router()

//ENDPOINT: localhost:400/news
router.get('/', getNews)
router.get('/:id', getNewsByID)
// rutas protegidas
router.post('/', authRequired, createNewsValidator, validateRequest, createNews)
router.patch('/:id', authRequired, updateNewsValidator, validateRequest, updateNews)
router.delete('/:id', authRequired, removeNews)

export { router }