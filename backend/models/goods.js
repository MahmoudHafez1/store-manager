const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goodsSchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    number:Number,
    parent:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    image:{
        type:String,
        require:true
    }
});

const Goods = mongoose.model("Goods",goodsSchema);

module.exports = Goods;