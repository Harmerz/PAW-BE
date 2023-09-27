const express = require('express')
const router = express.Router()
const { getDelivery, addDelivery, updateDelivery, deleteDelivery } = require('../controllers/delivery')


/**
 * @swagger
 * tags:
 *   name: Delivery
 *   description: Delivery operations
 */

//read-swagger
/**
 * @swagger
 * /delivery:
 *   get:
 *     summary: Get a list of Delivery process
 *     tags: [Delivery]
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/', getDelivery)

//create-swagger
/**
 * @swagger
 * /delivery:
 *   post:
 *     summary: Create a new Delivery process
 *     tags: [Delivery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delivery'
 *     responses:
 *       '201':
 *         description: Delivery has been created
 */
router.post('/', addDelivery)


//update-swagger
/**
 * @swagger
 * /delivery/{_id}:
 *   put:
 *     summary: Update an existing Delivery process
 *     tags: [Delivery]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the delivery process to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delivery'
 *     responses:
 *       '200':
 *         description: Delivery process has been updated
 */
router.put('/:_id', updateDelivery);

//delete-swagger
/**
 * @swagger
 * /delivery/{_id}:
 *   delete:
 *     summary: Delete a Delivery process
 *     tags: [Delivery]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the delivery process to delete
 *     responses:
 *       '200':
 *         description: Delivery item deleted
 */
router.delete('/:_id', deleteDelivery);
module.exports = router