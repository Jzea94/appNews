import { Router } from "express";
import { authRequired } from "../middlewares/auth.js";
import { requireSuperAdmin } from "../middlewares/role.js";
import { createUserValidator, updateUserValidator } from "../validators/users.js";
import { validateRequest } from "../middlewares/validator.js";

import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleActiveStatus
} from "../controllers/user.js";

const router = Router();

// SOLO superadmin puede hacer todo esto
// localhost:4000/user
router.get("/", authRequired, requireSuperAdmin, listUsers);
router.post("/", authRequired, requireSuperAdmin, createUserValidator, validateRequest, createUser);
router.put("/:id", authRequired, requireSuperAdmin, updateUserValidator, validateRequest, updateUser);
router.delete("/:id", authRequired, requireSuperAdmin, deleteUser);
router.patch("/:id/toggle", authRequired, requireSuperAdmin, toggleActiveStatus);

export default router;
