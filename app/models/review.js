const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            require: true,
        },
        // owner: {
            
        // }
    // body:String,
    // require: true,
}
)
//add owner field that's a reference to a user 
//add field that will be the api's anime id
//make a call for comments and filter that checks for anime ID
//and the only shows comments that match the anime ID(the one from the API not from this DB)

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review  