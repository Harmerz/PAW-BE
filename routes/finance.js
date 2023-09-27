const express = require('express')
const router = express.Router()
const { calculateTotalProfit } = require('../controllers/order')
const { authJwt } = require('../middlewares')

/**
 * @swagger
 * /finance/profit:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Calculate Total Profit
 *     tags: [Finance]
 *     description: Calculate the total profit from all orders.
 *     responses:
 *       200:
 *         description: Total profit calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TotalProfitResponse'
 *       401:
 *         description: 'Access token is missing or invalid'
 *       500:
 *         description: Internal server error
 */
router.get('/profit', [authJwt.verifyToken, authJwt.isAdmin], calculateTotalProfit)

module.exports = router
