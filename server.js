const express = require("express")
require('dotenv').config({ path: "./config.env" })
const cors = require("cors")
const bodyparser = require("body-parser")
const router = require("./Router/router")
require("./MongooseConnection/databaseconnection")
const app = express()
const port = process.env.PORT

var mongoose = require('mongoose');

app.use(bodyparser.urlencoded({ extended: true }))



var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));


app.use("/", router)

app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})