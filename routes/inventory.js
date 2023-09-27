const express = require('express')
const router = express.Router()
const { getInventory, addInventory, deleteInventory, updateInventory } = require('../controllers/inventory')

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
 *       '404':
 *         description: No items found
 */
router.get('/', getInventory);

//create-swagger
/**
 * @swagger
 * /inventory:
 *   post:
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
 */
router.post('/', addInventory);

//update-swagger
/**
 * @swagger
 * /inventory/{_id}:
 *   put:
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
 */
router.put('/:_id', updateInventory);

//delete-swagger
/**
 * @swagger
 * /inventory/{_id}:
 *   delete:
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
 */
router.delete('/:_id', deleteInventory);

module.exports = router
