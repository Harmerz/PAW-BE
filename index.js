require('dotenv').config()
const express = require('express'),
  swaggerJsdoc = require('swagger-jsdoc'),
  swaggerOption = require('./swagger'),
  swaggerUI = require('swagger-ui-express'),
  specs = swaggerJsdoc(swaggerOption)
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')

const Initial = require('./models/initial/role.initial.js')
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  .then(() => {
    console.log('DB CONNECTED')
    Initial()
  })
  .catch((err) => {
    console.error('UNABLE to connect to DB:', err)
  })

//middleware
app.use(express.json())
app.get('/ping', (req, res) => {
  return res.status(200).send({
    status: 200,
    condition: 'success',
    message: 'PONG',
  })
})

// Routes Require and Uses
const recipe = require('./routes/recipe')
const auth = require('./routes/auth')
const order = require('./routes/order')
const finance = require('./routes/finance')
const inventory = require('./routes/inventory')

app.use('/recipe', recipe)

app.use('/auth', auth)

app.use('/orders', order)

app.use('/finance', finance)

app.use('/inventory', inventory)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use('/', swaggerUI.serve, swaggerUI.setup(specs))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
