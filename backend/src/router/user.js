import { Router } from "express";
import { authRequired } from "../middlewares/auth.js";
import { requireSuperAdmin } from "../middlewares/role.js";
import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleActiveStatus
} from "../controllers/user.js";

const router = Router();

// SOLO superadmin puede hacer todo esto
router.get("/", authRequired, requireSuperAdmin, listUsers);
router.post("/", authRequired, requireSuperAdmin, createUser);
router.put("/:id", authRequired, requireSuperAdmin, updateUser);
router.delete("/:id", authRequired, requireSuperAdmin, deleteUser);
router.patch("/:id/toggle", authRequired, requireSuperAdmin, toggleActiveStatus);

export default router;
