const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exporterSchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    phone:String,
    address:String
});

const Exporter = mongoose.model("Exporter",exporterSchema);

module.exports = Exporter;