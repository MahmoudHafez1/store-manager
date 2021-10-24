const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operationSchema = new Schema ({
    itemName:{
        type:String,
        required:true,
    },
    dealerName:{
        type:String,
        required:true,
    },
    type:String,
    number:Number,
    cost:Number,
    instalments:Array,
    paid:Boolean,
    date:Date
});

const Operation = mongoose.model("Operation",operationSchema);

module.exports = Operation;