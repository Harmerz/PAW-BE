const Order = require('../models/order')
const Inventory = require('../models/inventory')
const { calculateTotalPrice } = require('./utils/order_utils')

exports.addOrder = async (req, res) => {
  const currentDate = new Date()

  const orderItems = req.body.items
  const itemsToSave = []

  try {
    for (const item of orderItems) {
      const inventoryId = item.inventoryId
      const quantityToOrder = item.quantity

      const inventoryItem = await Inventory.findById(inventoryId)

      if (!inventoryItem) {
        return res.status(400).json({ error: `Inventory item with ID ${inventoryId} not found` })
      }

      if (inventoryItem.quantity < quantityToOrder) {
        return res.status(400).json({ error: `Quantity of ${inventoryItem.name} is low` })
      }

      inventoryItem.quantity -= quantityToOrder
      await inventoryItem.save()

      const itemPrice = inventoryItem.price

      itemsToSave.push({
        inventory: {
          id: inventoryItem._id,
          name: inventoryItem.name,
        },
        quantity: quantityToOrder,
        price: itemPrice,
      })
    }

    const totalPrice = calculateTotalPrice(itemsToSave)

    const newOrder = new Order({
      date: currentDate,
      items: itemsToSave,
      totalPrice: totalPrice,
    })

    await newOrder.validate()
    const savedOrder = await newOrder.save()

    res.status(201).json(savedOrder)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getOrders = (req, res) => {
  Order.find()
    .then((orders) => {
      res.status(200).json(orders)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

exports.getOrderById = (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        res.status(404).json({ message: 'Order not found' })
      } else {
        res.status(200).json(order)
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

exports.updateOrderById = async (req, res) => {
  const currentDate = new Date()
  const orderItems = req.body.items
  const itemsToUpdate = []

  try {
    for (const item of orderItems) {
      const inventoryId = item.inventoryId
      const quantityToOrder = item.quantity

      const inventoryItem = await Inventory.findById(inventoryId)

      if (!inventoryItem) {
        return res.status(400).json({ error: `Inventory item with ID ${inventoryId} not found` })
      }

      if (inventoryItem.quantity < quantityToOrder) {
        return res.status(400).json({ error: `Quantity of ${inventoryItem.name} is low` })
      }

      inventoryItem.quantity -= quantityToOrder
      await inventoryItem.save()

      const itemPrice = inventoryItem.price

      itemsToUpdate.push({
        inventory: {
          id: inventoryItem._id,
          name: inventoryItem.name,
        },
        quantity: quantityToOrder,
        price: itemPrice,
      })
    }

    const totalPrice = calculateTotalPrice(itemsToUpdate)

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        date: currentDate,
        items: itemsToUpdate,
        totalPrice: totalPrice,
      },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(updatedOrder)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteOrderById = (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then((order) => {
      if (!order) {
        res.status(404).json({ message: 'Order not found' })
      } else {
        res.status(204).json()
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

exports.calculateTotalProfit = (req, res) => {
  Order.aggregate([
    {
      $group: {
        _id: null,
        totalProfit: { $sum: '$totalPrice' },
      },
    },
  ])
    .then((result) => {
      if (result.length === 0) {
        res.status(200).json({ totalProfit: 0 })
      } else {
        res.status(200).json({ totalProfit: result[0].totalProfit })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}
