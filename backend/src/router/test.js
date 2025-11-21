import { Router } from 'express'
import Test from '../models/Test.js'

const router = Router()

//localhost:4000/api/test
router.get('/', async (req, res) => {
  const news = await Test.find()
  res.json({ data: news })
})

router.post('/', async (req, res) => {
  const { title } = req.body
  const newNews = await Test.create({ title: title })
  res.json( newNews )
})

export default router