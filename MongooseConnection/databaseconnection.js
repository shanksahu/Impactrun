var mongoose    = require('mongoose');  
require('dotenv').config({path: "./config.env"})

const databaseConnection = mongoose.connect(process.env.DATABASE,
{useNewUrlParser:true, useUnifiedTopology: true})  
.then(()=>console.log('Database is Connected'))  
.catch((err)=>console.log(err))

module.exports = databaseConnection