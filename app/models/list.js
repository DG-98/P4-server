const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("./user")


const listSchema = new mongoose.Schema(
    {
        animeId: {
            type: Number,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    }
)

const List = mongoose.model("List", listSchema)

module.exports = List 