require('dotenv').config()
const express = require('express'),
  swaggerJsdoc = require('swagger-jsdoc'),
  swaggerOption = require('./swagger'),
  swaggerUI = require('swagger-ui-express'),
  specs = swaggerJsdoc(swaggerOption)
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const morgan = require('morgan')
const Initial = require('./models/initial/role.initial.js')
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('DB CONNECTED')
    Initial()
  })
  .catch((err) => {
    console.error('UNABLE to connect to DB:', err)
  })

var allowedOrigins = ['http://localhost:3000', 'https://paw-be.vercel.app']
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' + 'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
  })
)
app.use(morgan('dev'))
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
const delivery = require('./routes/delivery')

app.use('/recipe', recipe)

app.use('/auth', auth)

app.use('/orders', order)

app.use('/finance', finance)

app.use('/inventory', inventory)

app.use('/delivery', delivery)

// CDN CSS
const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css'

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, { customCssUrl: CSS_URL }))
app.use('/', swaggerUI.serve, swaggerUI.setup(specs, { customCssUrl: CSS_URL }))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
