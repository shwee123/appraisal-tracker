const mongoose = require("mongoose")
const Schema = mongoose.Schema
const cityModel = new Schema({
    name:{
        type:String
    },
    state:{
        type:Schema.Types.ObjectId,
        ref:"state"
    }
},{
    timestamps:true
})
module.exports = mongoose.model("city",cityModel)