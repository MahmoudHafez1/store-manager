const router = require('express').Router();
let client = require('../models/client');

router.route('/').get((req,res)=>{
    client.find()
    .then((clients)=>res.json(clients))
    .catch(err=>{console.log(err)})
})

router.route('/:name').get((req,res)=>{
    client.findOne({name:req.params.name})
    .then((client)=>res.json(client))
    .catch(err=>{console.log(err)})
})

router.route('/').post((req,res)=>{
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const newClient = new client({
        name:name,
        phone:phone,
        address:address
    })
    newClient.save()
    .then(()=>res.json('Added Successfully'))
    .catch(() => res.send("Something went wrong, make sure that name is not repeated and try again"));
})

router.route('/:name').delete((req,res)=>{
    client.deleteOne({name:req.params.name})
    .then(()=>res.json('Deleted'))
    .catch(()=>res.json('error'))
    
})

router.route('/edit/:name').patch((req,res)=>{
    client.updateOne({name:req.params.name},
        {$set:{name:req.body.newName,phone:req.body.newPhone,address:req.body.newAddress}})
    .then(()=>res.json("Updated Successfully"))
    .catch(()=>res.json('Something went wrong, make sure that name is not repeated and try again'))
})


module.exports = router;