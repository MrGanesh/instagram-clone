const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const router = express.Router();
const User = mongoose.model("User")



router.post('/signup',(req, res) => {
    const {name,email,password,pic} = req.body;
   if(!email || !password || !name ){
      return res.status(422).json({error:"Please add all the fields"})
   }
   
   User.findOne({email:email})
   .then((savedUser)=>{
       if(savedUser){
        return res.status(422).json({error:"User already exist"})
       }
       bcrypt.hash(password, 12).then(hashedPassword=>{
            const user = new User({
                name,
                password:hashedPassword,
                email, 
                pic:pic
            })
    
            user.save()
            .then(user =>{
                res.json({message:"Saved Successfully"})
            })
            .catch(error=>{
            console.log(error)
            })
       })
      

   }).catch(error =>{
       console.log(error)
   })

})

router.post('/signin',(req,res) => {
    const{email, password} = req.body;
    if(!email || !password) 
    return res.status(422).json({message:"Username / Password cannot be blank."})

    User.findOne({email:email}).then((savedUser) =>{
        if(!savedUser){
          return res.status(422).json({message:"Invalid Email or Password"})
        }
   
    bcrypt.compare(password, savedUser.password).then(doMatch =>{
        if(doMatch){
            // res.json({message:"Signed in Successfully"})
            const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
            const {_id, name,email, followers, following, pic} = savedUser
            res.json({token, user:{_id,name,email, followers, following, pic}})
        }
        else{
            return res.status(422).json({message:"Invalid Email or Password"})
        }
    }).catch(err => console.log(err))
}).catch(err => console.log(err))

})

module.exports = router;