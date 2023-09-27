const express = require('express')
const { authJwt } = require('../middlewares')
const router = express.Router()
const {
  getDelivery,
  addDelivery,
  updateDelivery,
  deleteDelivery,
} = require('../controllers/delivery')

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
 *     security:
 *        - bearerAuth: []
 *     summary: Get a list of Delivery process
 *     tags: [Delivery]
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: 'Access token is missing or invalid'
 */
router.get('/', [authJwt.verifyToken], getDelivery)

//create-swagger
/**
 * @swagger
 * /delivery:
 *   post:
 *     security:
 *        - bearerAuth: []
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
 *       '401':
 *         description: 'Access token is missing or invalid'
 */
router.post('/', [authJwt.verifyToken], addDelivery)

//update-swagger
/**
 * @swagger
 * /delivery/{_id}:
 *   put:
 *     security:
 *        - bearerAuth: []
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
 *       '401':
 *         description: 'Access token is missing or invalid'
 */
router.put('/:_id', [authJwt.verifyToken], updateDelivery)

//delete-swagger
/**
 * @swagger
 * /delivery/{_id}:
 *   delete:
 *     security:
 *        - bearerAuth: []
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
 *       '401':
 *         description: 'Access token is missing or invalid'
 */
router.delete('/:_id', [authJwt.verifyToken], deleteDelivery)
module.exports = router
