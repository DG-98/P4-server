const router = express.Router()
// require necessary NPM packages
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

// require route files
const exampleRoutes = require("./app/routes/example_routes")
const userRoutes = require("./app/routes/user_routes")
const listRoutes = require("./app/routes/list_routes")

// require middleware
const errorHandler = require("./lib/error_handler")
const replaceToken = require("./lib/replace_token")
const requestLogger = require("./lib/request_logger")

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require("./config/db")

// require configured passport authentication middleware
const auth = require("./lib/auth")

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 8000
const clientDevPort = 3000

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
router.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
  })
)

// define port for API to run on
// adding PORT= to your env file will be necessary for deployment
const port = process.env.PORT || serverDevPort

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
router.use(replaceToken)

// register passport authentication middleware
router.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
router.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
router.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
routerp.use(requestLogger)

// register route files
router.use(exampleRoutes)
router.use(userRoutes)
router.use(listRoutes)

router.get("/", (req, res) => {
  res.json("You've hit the home route of the project 4 server!")
})

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
router.use(errorHandler)

// run API on designated port (4741 in this case)
router.listen(port, () => {
  console.log("listening on port " + port)
})

// needed for testing
module.exports = app
