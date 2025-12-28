import { body } from "express-validator";

export const createNewsValidator = [
  body("title")
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 0, max: 150 }).withMessage("El título debe tener menos de 150 caracteres"),

  body("category")
    .notEmpty().withMessage("La categoría es obligatoria")
    .toLowerCase()
    .isIn(["politics", "sports", "tech", "economy", "world", "culture", "other"])
    .withMessage("Categoría inválida"),

  body("content")
  .notEmpty().withMessage("El contenido es obligatorio")
  .isLength({ min: 1, max: 1000 }).withMessage("El extracto debe tener entre 1 y 1000 caracteres"),

  body("readTime")
    .optional()
    .isInt({ min: 1, max: 60 }).withMessage("Tiempo de lectura inválido"),

  body("views")
    .optional()
    .isInt({ min: 0 }).withMessage("Las vistas deben ser un número positivo"),

  body("image")
    .notEmpty().withMessage("La imagen es obligatoria")
    .isURL().withMessage("Debe ser una URL válida"),

  body("excerpt")
    .notEmpty().withMessage("El extracto es obligatorio")
    .isLength({ min: 1, max: 250 }).withMessage("El extracto debe tener entre 1 y 250 caracteres"),

  body("featured")
    .optional()
    .isBoolean().withMessage("El campo featured debe ser booleano"),
];

export const updateNewsValidator = [
  body("title")
    .optional()
    .isLength({ min: 1, max: 150 }).withMessage("El título debe tener entre 1 y 150 caracteres"),

  body("category")
    .optional()
    .toLowerCase()
    .isIn(["politics", "sports", "tech", "economy", "world", "culture", "other"])
    .withMessage("Categoría inválida"),

  body("readTime")
  .not().exists().withMessage("readTime no puede enviarse manualmente"),

  body("views")
    .optional()
    .isInt({ min: 0 }).withMessage("Las vistas deben ser un número positivo"),

  body("image")
    .optional()
    .isURL().withMessage("Debe ser una URL válida"),

  body("excerpt")
    .optional()
    .isLength({ min: 1, max: 250 }).withMessage("El extracto debe tener entre 1 y 150 caracteres"),

  body("featured")
    .optional()
    .isBoolean().withMessage("El campo featured debe ser booleano")
];
