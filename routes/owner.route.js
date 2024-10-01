const express = require('express')
const router = express.Router();
const ownerModel = require('../models/owner.model');
const { default: mongoose } = require('mongoose');



router.get('/admin',(req,res)=>{
 let success=  req.flash('success')
  res.render('createproducts',{success})
})

  router.post('/create',async (req,res)=>{
    let owner =await  ownerModel.find();
    if(owner.length > 0){
      res.send("You are not authorised to do this")
    }
    let {fullname,email,password} = req.body
    let createdowner = await ownerModel.create({
      fullname,
      email,
      password  
    })
    
    res.send(createdowner)

  })




module.exports = router;