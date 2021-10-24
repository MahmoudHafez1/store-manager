const router = require('express').Router();
let operation = require('../models/operation');

router.route('/').get((req,res)=>{
    operation.find({},null,{sort:{date:-1}})
    .then((operations)=>res.json(operations))
    .catch(err=>{console.log(err)})
})

router.route('/groupByDealer/:item').post((req,res)=>{
    if(req.body.type =="all" && req.body.date=="all"){
        operation.aggregate([
            {
                $match:{
                    itemName:req.params.item,
                }
            },
            {
                $sort:{date:req.body.sort}
            },
            {
                $group:{
                    _id:{dealerName:"$dealerName",type:"$type"},
                    number:{$sum:"$number"},
                    count:{$sum:1}
                }
        }])
        .then((operations)=>res.json(operations))
        .catch(err=>console.log(err))
    }
    else if (req.body.type==="all"){
        operation.aggregate([
            {
                $match:{
                    itemName:req.params.item,
                    date:{$gte:new Date(req.body.dateFrom),$lte:new Date(req.body.dateTo)},
                }
            },
            {
                $sort:{date:req.body.sort}
            },
            {
                $group:{
                    _id:{dealerName:"$dealerName",type:"$type"},
                    number:{$sum:"$number"},
                    count:{$sum:1}
                }
        }])
        .then((operations)=>res.json(operations))
        .catch(err=>console.log(err))
    }
    else if (req.body.date==="all"){
        operation.aggregate([
            {
                $match:{
                    itemName:req.params.item,
                    type:req.body.type
                }
            },
            {
                $sort:{date:req.body.sort}
            },
            {
                $group:{
                    _id:{dealerName:"$dealerName",type:"$type"},
                    number:{$sum:"$number"},
                    count:{$sum:1}
                }
        }])
        .then((operations)=>res.json(operations))
        .catch(err=>console.log(err))
    }
    else {
        operation.aggregate([
            {
                $match:{
                    itemName:req.params.item,
                    date:{$gte:new Date(req.body.dateFrom),$lte:new Date(req.body.dateTo)},
                    type:req.body.type
                }
            },
            {
                $sort:{date:req.body.sort}
            },
            {
                $group:{
                    _id:{dealerName:"$dealerName",type:"$type"},
                    number:{$sum:"$number"},
                    count:{$sum:1}
                }
        }])
        .then((operations)=>res.json(operations))
        .catch(err=>console.log(err))
    }
   
})


router.route('/groupByItems/:dealer').post((req,res)=>{
    if(req.body.itemName =="all" && req.body.date=="all"){
        operation.aggregate([
            {
                $match:{
                    dealerName:req.params.dealer,
                    type:req.body.type
                }
            },
            {
                $sort:{date:req.body.sort}
            },
            {
                $group:{
                    _id:{itemName:"$itemName"},
                    number:{$sum:"$number"},
                    count:{$sum:1}
                }
        }])
        .then((operations)=>res.json(operations))
        .catch(err=>console.log(err))
    }
    else if (req.body.itemName==="all"){
        operation.aggregate([
            {
                $match:{
                    dealerName:req.params.dealer,
                    date:{$gte:new Date(req.body.dateFrom),$lte:new Date(req.body.dateTo)},
                    type:req.body.type
                }
            },
            {
                $sort:{date:req.body.sort}
            },
            {
                $group:{
                    _id:{itemName:"$itemName"},
                    number:{$sum:"$number"},
                    count:{$sum:1}
                }
        }])
        .then((operations)=>res.json(operations))
        .catch(err=>console.log(err))
    }
    else if (req.body.date==="all"){
        operation.aggregate([
            {
                $match:{
                    dealerName:req.params.dealer,
                    itemName:req.body.itemName,
                    type:req.body.type
                }
            },
            {
                $sort:{date:req.body.sort}
            },
            {
                $group:{
                    _id:{itemName:"$itemName"},
                    number:{$sum:"$number"},
                    count:{$sum:1}
                }
        }])
        .then((operations)=>res.json(operations))
        .catch(err=>console.log(err))
    }
    else {
        operation.aggregate([
            {
                $match:{
                    dealerName:req.params.dealer,
                    itemName:req.body.itemName,
                    date:{$gte:new Date(req.body.dateFrom),$lte:new Date(req.body.dateTo)},
                    type:req.body.type
                }
            },
            {
                $sort:{date:req.body.sort}
            },
            {
                $group:{
                    _id:{itemName:"$itemName"},
                    number:{$sum:"$number"},
                    count:{$sum:1}
                }
        }])
        .then((operations)=>res.json(operations))
        .catch(err=>console.log(err))
    }
   
})


router.route('/').post((req,res)=>{
    const newOperation = new operation({
        itemName:req.body.itemName,
        dealerName:req.body.dealerName,
        type:req.body.type,
        number:req.body.number,
        date:req.body.date
    })
    if(req.body.type==="Withdraw"){
        newOperation.cost=req.body.cost;
        newOperation.paid=req.body.paid;
    }
    newOperation.save()
    .then(()=>res.json('Successful Operation'))
    .catch(() => res.send("Something went wrong"))
})

router.route('/instalment/:id').post((req,res)=>{
    operation.updateOne({_id:req.params.id},
        {$push:{instalments:req.body.newInstalment},$set:{paid:req.body.paid}})
    .then(()=>res.json('instalment added successfully'))
    .catch(()=>res.json("something went wrong"))
})

router.route('/item/:itemName').get((req,res)=>{
    operation.find({itemName:req.params.itemName})
    .then((operations)=>res.json(operations))
    .catch(err=>{console.log(err)})
})

router.route('/item/:itemName').post((req,res)=>{
    if(req.body.type==="all" && req.body.date==="all"){
        operation.find(
            {
                itemName:req.params.itemName
            },null,
                {
                    sort:{date:req.body.sort}
                }
            )
            .then(operations=>res.json(operations))
            .catch(err=>{console.log(err)})
    }
    else if(req.body.type==="all"){
        operation.find(
            {
                itemName:req.params.itemName,
                date:{$gte:new Date(req.body.dateFrom),$lte:new Date(req.body.dateTo)}
            },null,
                {
                    sort:{date:req.body.sort}
                }
            )
            .then(operations=>res.json(operations))
            .catch(err=>{console.log(err)})
    }
    else if (req.body.date==="all"){
        operation.find(
            {
                itemName:req.params.itemName,
                type:req.body.type
            },null,
                {
                    sort:{date:req.body.sort}
                }
            )
            .then(operations=>res.json(operations))
            .catch(err=>{console.log(err)})
    }
    else {
        operation.find(
            {
                itemName:req.params.itemName,
                date:{$gte:new Date(req.body.dateFrom),$lte:new Date(req.body.dateTo)},
                type:req.body.type
            },null,
                {
                    sort:{date:req.body.sort}
                }
            )
            .then(operations=>res.json(operations))
            .catch(err=>{console.log(err)})
    }
})

router.route('/item/:itemName').patch((req,res)=>{
    operation.updateMany({itemName:req.params.itemName},{$set:{itemName:req.body.newName}})
    .then(()=>res.json('operation item names updated'))
    .catch(()=>res.json("error"))
})

router.route('/item/:itemName').delete((req,res)=>{
    operation.deleteMany({itemName:req.params.itemName})
    .then(()=>res.json('corresponding operations deleted'))
    .catch(()=>res.json("error"))
})

router.route("/dealer/:dealer").post((req,res)=>{
    if(req.body.itemName==="all" && req.body.date==="all"){
        operation.find(
        {
            dealerName:req.params.dealer,
            type:req.body.type
        },null,
            {
                sort:{date:req.body.sort}
            }
        )
        .then(operations=>res.json(operations))
        .catch(err=>{console.log(err)})
    }
    else if (req.body.itemName==="all"){
        operation.find(
            {
                dealerName:req.params.dealer,
                date:{$gte:new Date(req.body.dateFrom),$lte:new Date(req.body.dateTo)},
                type:req.body.type
            },null,
            {
                sort:{date:req.body.sort}
            }
        )
        .then(operations=>res.json(operations))
        .catch(err=>{console.log(err)})
    }
    else if (req.body.date==="all"){
        operation.find(
            {
                dealerName:req.params.dealer,
                itemName:req.body.itemName,
                type:req.body.type
            },null,
            {
                sort:{date:req.body.sort}
            }
        )
        .then(operations=>res.json(operations))
        .catch(err=>{console.log(err)})
    }
    else {
        operation.find(
            {
                dealerName:req.params.dealer,
                itemName:req.body.itemName,
                date:{$gte:new Date(req.body.dateFrom),$lte:new Date(req.body.dateTo)},
                type:req.body.type
            },null,
            {
                sort:{date:req.body.sort}
            }
        )
        .then(operations=>res.json(operations))
        .catch(err=>{console.log(err)})
    }
})

router.route("/dealerCredit/:dealer").post((req,res)=>{
    if(req.body.allInstalment){
        operation.find({dealerName:req.params.dealer,type:"Withdraw"},null,{sort:{date:-1}})
        .then(operations=>res.json(operations))
        .catch(err=>console.log(err))
    }else{
        operation.find({dealerName:req.params.dealer,type:"Withdraw",paid:false},null,{sort:{date:-1}})
        .then(operations=>res.json(operations))
        .catch(err=>console.log(err))
    }
    
})


router.route('/client/:clientName').delete((req,res)=>{
    operation.deleteMany({dealerName:req.params.clientName,type:"Withdraw"})
    .then(()=>res.json('corresponding operations deleted'))
    .catch(()=>res.json("error"))
})

router.route('/client/:clientName').patch((req,res)=>{
    operation.updateMany({dealerName:req.params.clientName,type:"Withdraw"},{$set:{dealerName:req.body.newName}})
    .then(()=>res.json('operation client names updated'))
    .catch(()=>res.json("error"))
})


router.route('/exporter/:exporterName').delete((req,res)=>{
    operation.deleteMany({dealerName:req.params.exporterName,type:"Add"})
    .then(()=>res.json('corresponding operations deleted'))
    .catch(()=>res.json("error"))
})

router.route('/exporter/:exporterName').patch((req,res)=>{
    operation.updateMany({dealerName:req.params.exporterName,type:"Add"},{$set:{dealerName:req.body.newName}})
    .then(()=>res.json('operation client names updated'))
    .catch(()=>res.json("error"))
})


router.route('/:id').delete((req,res)=>{
    operation.deleteOne({_id:req.params.id})
    .then(()=>res.json('Deleted'))
    .catch(()=>res.json('error'))
    
})

module.exports = router;