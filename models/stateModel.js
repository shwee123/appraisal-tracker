const mongoose = require("mongoose")
const Schema = mongoose.Schema
const stateModel = new Schema({
    name:{
        type:String
    }
},{
    timestamps:true
})
module.exports = mongoose.model("state",stateModel)