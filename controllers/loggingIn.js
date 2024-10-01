const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const generateToken = require('../utils/generateToken')


async function loggingIn(req,res){
   try {
    
    let {password,email} = req.body
    let user =await userModel.findOne({email:email})
    if(!user){ req.flash("error","Email not register , Please register")
      return res.redirect('/')
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(!result){
          req.flash("error","Password Incorrect!")
        return res.redirect('/')
        }
        let token = generateToken(user);
        res.cookie("token",token)
        res.redirect('/shop')
    })


   } catch (err) {
    res.send(err.message)
   }

  }



module.exports = loggingIn 