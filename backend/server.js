const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true});

const connection =mongoose.connection;
connection.once('open',()=>{
    console.log("MongodDB connection established successfully")
})

const store = require('./routes/store');
const clients = require('./routes/clients');
const exporters = require('./routes/exporters');
const operations = require('./routes/operations');
const users = require('./routes/users');


app.use('/store',store)
app.use('/clients',clients)
app.use('/exporters',exporters)
app.use('/operations',operations)
app.use('/users',users)

app.listen(port,()=>{console.log("successful")})