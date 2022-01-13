const express = require("express")
const passport = require("passport")
const List = require("../models/list")
const customErrors = require("../../lib/custom_errors")
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require("../../lib/remove_blank_fields")
const requireToken = passport.authenticate("bearer", { session: false })
const router = express.Router()
const User = require("../models/user")


//GET ROUTE 
router.get("/list", (req, res, next) => {
  List.find()
    .then((foundList) => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return foundList.map((list) => list.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then((list) => res.status(200).json({list: list}))
    // if an error occurs, pass it to the handler
    .catch(next)
})

//POST 
router.post("/list", requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.list.owner = req.user.id
  console.log("this is req.body", req.body)
  //   console.log('looking for anime id ',req.body.List.animeId)
  List.create(req.body.list)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then((createdList) => {
      //   console.log('this is req.body', req.body)
      //   console.log("this is created list ", createdList)
      res.status(201).json({createdList: createdList.toObject()})
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

//DELETE 
router.delete("/list/:id", (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    .then((deletedList) => {
      // throw an error if current user doesn't own `example`
      // requireOwnership(req, example)
      // delete the example ONLY IF the above didn't throw
      deletedList.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router 