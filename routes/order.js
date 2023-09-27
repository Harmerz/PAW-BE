const express = require('express')
const router = express.Router()
const {
  getOrders,
  getOrderById,
  addOrder,
  updateOrderById,
  deleteOrderById,
} = require('../controllers/order')
const { authJwt } = require('../middlewares')

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders in a grocery store.
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get all orders
 *     tags: [Orders]
 *     description: Retrieve a list of all orders in the grocery store.
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderResponse'
 *       401:
 *         description: 'Access token is missing or invalid'
 *       500:
 *         description: Internal server error
 */
router.get('/', [authJwt.verifyToken], getOrders)

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get a specific order by ID
 *     tags: [Orders]
 *     description: Retrieve a specific order in the grocery store by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: The order with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       401:
 *         description: 'Access token is missing or invalid'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', [authJwt.verifyToken], getOrderById)

/**
 * @swagger
 * /orders:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a new order
 *     tags: [Orders]
 *     description: Create a new order in the grocery store.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderRequest'
 *     responses:
 *       201:
 *         description: The created order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: 'Access token is missing or invalid'
 *       500:
 *         description: Internal server error
 */
router.post('/', [authJwt.verifyToken], addOrder)

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update an existing order by ID
 *     tags: [Orders]
 *     description: Update an existing order in the grocery store by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderRequest'
 *     responses:
 *       200:
 *         description: The updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       401:
 *         description: 'Access token is missing or invalid'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', [authJwt.verifyToken], updateOrderById)

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     description: Delete an order in the grocery store by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to delete
 *     responses:
 *       204:
 *         description: No content (successful delete)
 *       401:
 *         description: 'Access token is missing or invalid'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', [authJwt.verifyToken], deleteOrderById)

module.exports = router
