import { body, validationResult } from 'express-validator'

export const validatorNews = [
  body('title')
    .exists().withMessage('Title is required')        // ← Verifica existencia
    .bail()                                           // ← Si falla, para aquí
    .trim()
    .escape()
    .isString().withMessage('Title must be a string')
    .isLength({ max: 25 }).withMessage('Title must be less than 25 characters')
    .notEmpty().withMessage('Title cannot be empty'),
  
  body('content')
    .exists().withMessage('Content is required')      // ← Verifica existencia
    .bail()                                           // ← Si falla, para aquí
    .trim()
    .escape()
    .isString().withMessage('Content must be a string')
    .isLength({ min: 5, max: 150 }).withMessage('Content must be between 5 and 150 characters')
    .notEmpty().withMessage('Content cannot be empty'),
  
  body('author')
    .exists().withMessage('Author is required')       // ← Verifica existencia
    .bail()                                           // ← Si falla, para aquí
    .trim()
    .isString().withMessage('Author must be a string')
    .notEmpty().withMessage('Author cannot be empty'),

  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      res.status(400).send({ errors: error.array() }) 
    }
  }
]