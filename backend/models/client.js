const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    phone:String,
    address:String
});

const Client = mongoose.model("Client",clientSchema);

module.exports = Client;