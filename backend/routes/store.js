const router = require('express').Router();
let goods = require('../models/goods');

router.route('/').get((req,res)=>{
    goods.find()
    .then((goods)=>res.json(goods))
    .catch(err=>{console.log(err)})
})

router.route('/items').get((req,res)=>{
    goods.find({type:"item"},{name:1})
    .then((goods)=>res.json(goods))
    .catch(err=>{console.log(err)})
})

router.route('/parent/:name').get((req,res)=>{
    goods.findOne({name:req.params.name})
    .then(goods=>res.json(goods.parent))
    .catch(err=>{console.log(err)})
})

router.route('/:parent').get((req,res)=>{
    goods.find({parent:req.params.parent},null,{sort:{type:1}})
    .then(goods=>res.json(goods))
    .catch(err=>{console.log(err)})
})

router.route('/details/:name').get((req,res)=>{
    goods.findOne({name:req.params.name})
    .then(goods=>res.json(goods))
    .catch(err=>{console.log(err)})
})

router.route('/child/:parent').get((req,res)=>{
    goods.findOne({parent:req.params.parent})
    .then(goods=>res.json(goods))
    .catch(err=>{console.log(err)})
})

router.route('/:parent').post((req,res)=>{
    const name = req.body.name;
    const number = req.body.number;
    const type = req.body.type;
    const image = req.body.image;
      
    const newgoods = new goods({
        name:name,
        type:type,
        image:image,
        parent:req.params.parent
    })
    if(type==="item"){
        newgoods.number=number;
    }
    newgoods.save()
    .then(()=>res.json('Added Successfully'))
    .catch(() => res.send('Something went wrong, make sure that name is not repeated and try again'));

})

router.route('/:name').delete((req,res)=>{
    goods.deleteOne({name:req.params.name})
    .then(()=>res.json('Deleted'))
    .catch(()=>res.json('error'))
    
})

router.route('/edit/:name').patch((req,res)=>{
    goods.updateOne({name:req.params.name},{$set:{name:req.body.newName,image:req.body.newImage}})
    .then(()=>res.json("Updated Successfully"))
    .catch(()=>res.json('Something went wrong, make sure that name is not repeated and try again'))
})

router.route('/editParents/:name').patch((req,res)=>{
    goods.updateMany({parent:req.params.name},{$set:{parent:req.body.newName}})
    .then(()=>res.json("parents updated successfully"))
    .catch(()=>res.json("something went wrong"))
})


router.route('/operation/:name').patch((req,res)=>{
    if(req.body.type=="Add"){
        goods.updateOne({name:req.params.name},
                        {$inc:{number:req.body.number}})
        .then(()=>res.json("Succeed"))
        .catch(()=>res.json("Failed"))
    }else if (req.body.type=="Withdraw"){
        goods.updateOne({name:req.params.name},
                        {$inc:{number:-req.body.number}})
        .then(()=>res.json("Succeed"))
        .catch(()=>res.json("Failed"))
    }   
})

module.exports = router;