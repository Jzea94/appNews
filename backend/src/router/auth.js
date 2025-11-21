import { Router } from "express"
import { login, singup } from "../controllers/auth.js"
import { authRequired } from "../middlewares/auth.js"

const router = Router()

// localhost:4000/auth/singup
// Solo un superadmin ya logueado puede crear otro usuario
router.post('/singup', authRequired, singup)

// localhost:4000/auth/login
router.post('/login', login)

export default router