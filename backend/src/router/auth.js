import { Router } from "express"
import { login, singup, logout, me } from "../controllers/auth.js"
import { authRequired } from "../middlewares/auth.js"

const router = Router()

// localhost:4000/auth/singup
// Solo un superadmin ya logueado puede crear otro usuario
router.post('/singup', authRequired, singup)

// localhost:4000/auth/login
router.post('/login', login)

// localhost:4000/auth/logout
router.post('/logout', authRequired, logout)

router.get('/me', authRequired, me)

export default router