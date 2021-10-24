const router = require('express').Router();
let exporter = require('../models/exporter');

router.route('/').get((req,res)=>{
    exporter.find()
    .then((exporters)=>res.json(exporters))
    .catch(err=>{console.log(err)})
})

router.route('/:name').get((req,res)=>{
    exporter.findOne({name:req.params.name})
    .then((exporter)=>res.json(exporter))
    .catch(err=>{console.log(err)})
})

router.route('/').post((req,res)=>{
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const newExporter = new exporter({
        name:name,
        phone:phone,
        address:address
    })
    newExporter.save()
    .then(()=>res.json('Added Successfully'))
    .catch(() => res.send("Something went wrong, make sure that name is not repeated and try again"));
})

router.route('/:name').delete((req,res)=>{
    exporter.deleteOne({name:req.params.name})
    .then(()=>res.json('Deleted'))
    .catch(()=>res.json('error'))
    
})

router.route('/edit/:name').patch((req,res)=>{
    exporter.updateOne({name:req.params.name},
        {$set:{name:req.body.newName,phone:req.body.newPhone,address:req.body.newAddress}})
    .then(()=>res.json("Updated Successfully"))
    .catch(()=>res.json('Something went wrong, make sure that name is not repeated and try again'))
})


module.exports = router;