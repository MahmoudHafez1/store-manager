const router = require('express').Router();
let user = require('../models/user');

router.route('/:name').get((req,res)=>{
    user.findOne({name:req.params.name})
    .then(user=>{
        res.json(user.password)
    })
    .catch(err=>{res.json("nameNotFound")})
})

router.route('/').post((req,res)=>{
    const newUser = new user({
        name:req.body.userName,
        password:req.body.password,
    })
    newUser.save()
    .then(()=>res.json('Added Successfully'))
    .catch(() => res.send("Something went wrong, make sure that name is not repeated and try again"));
})

module.exports = router;