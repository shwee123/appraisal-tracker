const express  = require("express")
const cors = require("cors")
const mongoose  = require("mongoose")
const dotenv = require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())


const roleRoutes = require("./routes/roleRoutes")
app.use("/roles",roleRoutes)

const userRoutes = require("./routes/userRoutes")
app.use("/users",userRoutes)

const stateRoutes = require("./routes/stateRoutes")
app.use("/states",stateRoutes)

const cityRoutes = require("./routes/cityRoutes")
app.use("/cities",cityRoutes)

const employeeGoalRoutes = require("./routes/goalRoutes")
app.use("/empgoal",employeeGoalRoutes)

const appriciationRoutes = require('./routes/employeeAppriciationRoutes');
app.use("/appriciations", appriciationRoutes);

const employeeAttandance = require("./routes/employeeAttandanceRoutes")
app.use("/empattendance",employeeAttandance)

const leaveRoutes = require("./routes/leaveRoutes")
app.use("/leave",leaveRoutes)

const appricialRoutes = require("./routes/apprasialRoutes")
app.use("/appricial",appricialRoutes)

mongoose.connect(process.env.MONGO_URL).then((data)=>{
    console.log("database connected")
})




const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("server started on port",PORT)

})