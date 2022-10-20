const express = require('express')
const app = express()
const port = 8000

//for accessing API in express
app.use(express.json());

//dotenv
const dotenv = require('dotenv')
dotenv.config()

//DB connection - start
const mongoose = require('mongoose');
const connect = () => {
    try {
        mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }

};

mongoose.connection.on("disconnected", () => {
    console.log("DB is disconnected")
})
mongoose.connection.on("connected", () => {
    console.log("Connected to DB");
})
//DB connection -end

//available routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/hotels", require("./routes/hotels"));
app.use("/api/v1/rooms", require("./routes/rooms"));

//middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage
    });
})

app.listen(port, () => {
    console.log(`Connected to backend on port ${port}`)
    connect();
})