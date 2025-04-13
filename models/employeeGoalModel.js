const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const employeeGoleModel = new Schema({
    title:{
        type:String
    },
    startDate:{
        type:String
    },
    endDate:{
        type:String
    },
    status:{
        type:String,
        enum:["done","pending"],
        default:"pending"
    },
    type:{
        type:String,
        enum:["Certification","Team mentoring","Upgrade New Tech","Blog Writting","Interview Taking","Help in Marketing","Refer New Employee"]

    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})
module.exports = mongoose.model("empGoal",employeeGoleModel)