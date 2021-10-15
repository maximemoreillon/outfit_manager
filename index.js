// NPM modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const {author, name: application_name, version} = require('./package.json')
const db = require('./db.js')
const outfit_router = require('./routes/outfits.js')
const garment_router = require('./routes/garments.js')
const auth = require('@moreillon/express_identification_middleware')
const {uploads_directory} = require('./config.js')

dotenv.config()


const app_port = process.env.APP_PORT ?? 80
const auth_options = { url: `${process.env.AUTHENTICATION_API_URL}/v2/whoami` }

// Express configuration
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({
    application_name,
    author,
    version,
    mongodb: {
      url: db.url,
      db: db.db,
      connected: db.get_connected(),
    },
    uploads_directory,
  })
})

app.use('/outfits', auth(auth_options), outfit_router)
app.use('/garments', auth(auth_options), garment_router)





// Start server
app.listen(app_port, () => {
  console.log(`Outfit manager API v${version} listening on port ${app_port}`);
})
