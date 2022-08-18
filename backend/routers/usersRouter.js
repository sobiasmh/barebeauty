const express = require('express');
const router = express.Router();
const {Users} = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler= require("express-async-handler")


router.post(`/register`, async (req, res)=>{
    const {userName,userEmail,userPassword,userPhoneNumber,Role}=req.body

    if(!userName || !userEmail || !userPassword || !userEmail){
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists=await Users.findOne({userEmail})
    if(userExists){
        res.status(400)
        throw new Error("Already Registered")
    }

    //Hash password

    const hashedPassword = await bcrypt.hashSync(userPassword.toString(),10)

    const user=await Users.create({
        userName,
        Role,
        userEmail,
        userPassword:hashedPassword,
        userPhoneNumber
    })

    

    if(user){
        res.status(201).json({
            _id:user.id,
            userName:user.userName,
            userEmail:user.userEmail,
    
        })
    }
    else{
        res.status(400)
        throw new Error("invalid user data")
    }
})

router.post(`/login`, async (req,res)=>{

    const user = await Users.findOne({getuseremail: req.body.getuseremail})
    const secret = process.env.JWT_SECRET;

    if(!user){
        return res.status(400).send('The user not found');
    }
    if(user && ( bcrypt.compareSync(req.body.getuserPassword, user.userPassword))){
       const token = jwt.sign(
        {
            userId : user.id,

        },
        secret,
        {expiresIn: '1d'}
       )
       res.status(200).send({user:user.userEmail, token: token})
    }
    else{
        res.status(400).send("Password is wrong!")
        
    }

})

router.get(`/:id`, async (req,res)=>{
    const user=await Users.find(req.body.id).select('userName userEmail userPhoneNumber');
    if(!user){
        res.status(500).json({message:"user with given id not found"})
    }
    res.status(200).send(user);
})





module.exports = router;