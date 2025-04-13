const mongoose  = require("mongoose")
const Schema = mongoose.Schema

const userModel = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        default:"12345678"
    },
    contact:{
        type:String
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:"role"
    },
    joiningDate:{
        type:String //dd/mm//yyyy
    },
    lastCompnayName:{
        type:String
    },
    lastSalary:{
        type:Number
    },
    currentSalary:{
        type:Number
    },
    department:{
        enum:["DEVELOPMENT","MARKETING","FINANCE","HR","IT","PRODUCTION","DELIVERY"],
        type:String
    },
    designation:{
        enum:["JR DEVELOPER","SR DEVELOPER","TESTER","JR HR","SR HR","MANAGER","SUPERVISER","TL","MARKETING HEAD","DELIVERY HEAD","DIRECTOR"],
        type:String
    },
    totalExp:{
        type:Number
    }
},{
    timestamps:true
})
module.exports = mongoose.model("user",userModel)