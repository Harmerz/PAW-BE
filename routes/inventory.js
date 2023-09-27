const express = require('express')
const router = express.Router()
const {
  getInventory,
  addInventory,
  deleteInventory,
  updateInventory,
} = require('../controllers/inventory')
const { authJwt } = require('../middlewares')

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory operations
 */

//read-swagger
/**
 * @swagger
 * /inventory:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get a list of inventory items or filter by name or type
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name to filter inventory items by (optional)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type to filter inventory items by (optional)
 *     responses:
 *       '200':
 *         description: Successful response
 *       401:
 *         description: 'Access token is missing or invalid'
 *       '404':
 *         description: No items found
 */
router.get('/', [authJwt.verifyToken], getInventory)

//create-swagger
/**
 * @swagger
 * /inventory:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       '201':
 *         description: Inventory item created
 *       401:
 *         description: 'Access token is missing or invalid'
 */
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], addInventory)

//update-swagger
/**
 * @swagger
 * /inventory/{_id}:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update an existing inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the inventory item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       '200':
 *         description: Inventory item updated
 *       401:
 *         description: 'Access token is missing or invalid'
 */
router.put('/:_id', [authJwt.verifyToken, authJwt.isAdmin], updateInventory)

//delete-swagger
/**
 * @swagger
 * /inventory/{_id}:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Delete an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the inventory item to delete
 *     responses:
 *       '200':
 *         description: Inventory item deleted
 *       401:
 *         description: 'Access token is missing or invalid'
 */
router.delete('/:_id', [authJwt.verifyToken, authJwt.isAdmin], deleteInventory)

module.exports = router
