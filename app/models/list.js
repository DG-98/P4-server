const mongoose = require("mongoose")


const listSchema = new mongoose.Schema(
    {
        animeId: {
            type: Number,
            require: true,
        },
        title: {
            type: String,
            require: true,
        }
    }
)

const List = mongoose.model("List", listSchema)

module.exports = List 