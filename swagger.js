const port = process.env.PORT || 5000

const option = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Pengembangan Aplikasi Web Backend',
      version: '0.0.0',
      description:
        'This project is part of our final task from Web Development course that contains a backend API for managing food recipes using Express.js and MongoDB. You can do CRUD operation for recipe, inventory, order, delivery, and auth feature.',
    },
    components: {
      schemas: {
        OrderRequest: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  inventoryId: {
                    type: 'string',
                    description: 'The ID of the inventory item associated with this order item.',
                  },
                  quantity: {
                    type: 'number',
                    description: 'The quantity of the product.',
                  },
                },
                required: ['inventoryId', 'quantity'],
                description: 'The list of items in the order.',
              },
            },
          },
        },
        OrderResponse: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description:
                'The unique identifier for the order. Automatically generated by MongoDB.',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the order was created.',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  inventory: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description:
                          'The ID of the inventory item associated with this order item.',
                      },
                      name: {
                        type: 'string',
                        description: 'The name of the inventory item.',
                      },
                    },
                    description: 'Information about the inventory item in the order.',
                  },
                  _id: {
                    type: 'string',
                    description:
                      'The unique identifier for the order item. Automatically generated by MongoDB.',
                  },
                  quantity: {
                    type: 'number',
                    description: 'The quantity of the inventory item in the order.',
                  },
                  price: {
                    type: 'number',
                    description: 'The price of the inventory item in the order.',
                  },
                },
                description: 'An item in the order.',
              },
              description: 'The list of items in the order.',
            },
            totalPrice: {
              type: 'number',
              description: 'The total price of the order.',
            },
          },
          description: 'An order response from api',
        },
        TotalProfitResponse: {
          type: 'object',
          properties: {
            totalProfit: {
              type: 'number',
              description: 'The total profit calculated from orders.',
            },
          },
          required: ['totalProfit'],
        },
      },
    },
    servers: [
      {
        url: `http://127.0.0.1:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
}

module.exports = option
