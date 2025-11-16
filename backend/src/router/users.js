import { Router } from "express";

const router = Router()

router.get('/users', (req, res) => {
  res.json({message: 'Method not implemented'})
})

export { router }