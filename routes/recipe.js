const express = require('express')
const router = express.Router()
const {
  getRecipe,
  getOneRecipe,
  addRecipe,
  deleteRecipe,
  updateRecipe,
} = require('../controllers/recipe')
const { authJwt } = require('../middlewares')

/**
 * @swagger
 * tags:
 *   name: Recipe
 *   description: Recipe operations
 */

//read-swagger
/**
 * @swagger
 * /recipe:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get a list of recipe items
 *     tags: [Recipe]
 *     responses:
 *       '200':
 *         description: Successful response
 *       401:
 *         description: 'Access token is missing or invalid'
 */
router.get('/', [authJwt.verifyToken], getRecipe)

//read-swagger
/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get a recipe by ID
 *     tags: [Recipe]
 *     responses:
 *       '200':
 *         description: Successful response
 *       '400':
 *         description: Invalid status value
 *       401:
 *         description: 'Access token is missing or invalid'
 */
router.get('/:_id', [authJwt.verifyToken], getOneRecipe)

//create-swagger
/**
 * @swagger
 * /recipe:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a new recipe item
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       '201':
 *         description: Recipe item created
 *       401:
 *         description: 'Access token is missing or invalid'
 */
router.post('/', [authJwt.verifyToken, authJwt.isKoki], addRecipe)

//delete-swagger
/**
 * @swagger
 * /recipe/{id}:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Delete an recipe item
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *             required:
 *               - _id
 *     responses:
 *       '200':
 *         description: Recipe item deleted
 *       401:
 *         description: 'Access token is missing or invalid'
 */
router.delete('/:_id', [authJwt.verifyToken, authJwt.isKoki], deleteRecipe)

//update-swagger
/**
 * @swagger
 * /recipe/{id}:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update an existing recipe item
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       '200':
 *         description: Recipe item updated
 *       401:
 *         description: 'Access token is missing or invalid'
 */
router.put('/:_id', [authJwt.verifyToken, authJwt.isKoki], updateRecipe)

module.exports = router
