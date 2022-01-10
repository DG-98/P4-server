const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
    {
        // body{
        //     type: String,
        //     require: true,
        // },
    body:String,
    require: true,
}
)


const Review = mongoose.model("Review", reviewSchema)

module.exports = Review  