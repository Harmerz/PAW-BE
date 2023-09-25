const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../index')
const Order = require('../models/order')

require('dotenv').config()

beforeEach(async () => {
  await mongoose.connect(process.env.TEST_DATABASE_URL)
})

afterEach(async () => {
  await mongoose.connection.close()
})

// Mock
const orderData = {
  date: new Date(),
  items: [
    {
      product: 'Product 1',
      quantity: 2,
      price: 1000,
    },
    {
      product: 'Product 2',
      quantity: 2,
      price: 1500,
    },
  ],
}

// Unit Test

describe('GET /orders', () => {
  it('should return all orders', async () => {
    // Arrange
    await request(app).post('/orders').send(orderData)

    // Act
    const res = await request(app).get('/orders')
    // Assert
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

describe('GET /orders/{id}', () => {
  it('should return a specific order by ID', async () => {
    // Arrange
    const postRes = await request(app).post('/orders').send(orderData)
    const orderId = postRes.body._id

    //Act
    const res = await request(app).get(`/orders/${orderId}`)

    // Assert
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('_id', orderId)
    // expect(res.body.totalPrice).toBe(5000)
  })

  it('should return 404 when order ID does not exist', async () => {
    // Arrange
    const nonExistentOrderID = '00000'

    // Act
    const res = await request(app).get(`/api/orders/${nonExistentOrderID}`)

    // Assert
    expect(res.statusCode).toBe(404)
  })
})

describe('POST /orders', () => {
  it('should create a new order', async () => {
    // Arrange

    // Act
    const res = await request(app).post('/orders').send(orderData)

    // Assert
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('_id')
  })

  it('should return 400 when request data is invalid', async () => {
    // Arrange
    const invalidOrderData = {
      items: [
        {
          product: 'Product 3',
        },
      ],
    }

    const res = await request(app).post('/orders').send(invalidOrderData)
    expect(res.statusCode).toBe(400)
  })
})

describe('PUT /orders/{id}', () => {
  it('should update an existing order by ID', async () => {
    // Arrange
    const postRes = await request(app).post(`/orders`).send(orderData)
    const updateOrderData = postRes.body
    updateOrderData.items = [
      ...updateOrderData.items,
      {
        product: 'Product 10',
        quantity: 1,
        price: 2000,
      },
    ]
    const orderId = updateOrderData._id

    // Act
    const res = await request(app).put(`/orders/${orderId}`).send(updateOrderData)

    // Assert
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('_id', orderId)
  })

  it('should return 404 when order ID does not exist', async () => {
    const nonExistentOrderID = '123'
    const updateOrderData = orderData
    const res = await request(app).put(`/api/orders/${nonExistentOrderID}`).send(updateOrderData)
    expect(res.statusCode).toBe(404)
  })
})

describe('DELETE /orders/{id}', () => {
  it('should delete an order by ID', async () => {
    // Arrange
    const postRes = await request(app).post(`/orders`).send(orderData)
    const orderId = postRes.body._id

    // Act
    const res = await request(app).delete(`/orders/${orderId}`)

    // Assert
    expect(res.statusCode).toBe(204)
  })

  it('should return 404 when order ID does not exist', async () => {
    // Arrange
    const nonExistentOrderID = 'bcnc'

    // Act
    const res = await request(app).delete(`/orders/${nonExistentOrderID}`)

    // Assert
    expect(res.statusCode).toBe(404)
  })
})

describe('GET /orders/profit', () => {
  it('should calculate total profit', async () => {
    // Arrange
    await request(app).post(`/orders`).send(orderData)
    await request(app).post(`/orders`).send(orderData)
    // Act
    const res = await request(app).get('/orders/profit')
    // Assert
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(10000)
  })
})
