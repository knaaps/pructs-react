const express = require('express')
const router = express.Router()
const User = require('../models/user')

const bcrypt= require('bcrypt')
const mongoose= require('mongoose')
const createToken=require('../utils/generateToken')

router.post('/', async(req,res)=>{
    try{
        const{name,email,password,image}=req.body||{}
        console.log(name,email,password,image)

        const userExists = await User.findOne({email})
    
        if(userExists){
            return res.status(400).json({message:"user exists already"})
        }

        //hashing the password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        //check
        console.log(hashedPassword)

        const newUser = new User ({name,email,password:hashedPassword,image})
        const savedUser =await newUser.save()
        
        return res.status(201).json({message:"user created :",savedUser})
    }
    catch(error){
        console.error(error)
        res.status(error.status||500).json({error:error.message||"internal server error:)"})
    }
})

//login means post- u will be sending credentials right?
router.post('/login', async(req,res)=>{
    try{
        const {email,password}=req.body || {}
        const userExists = await User.findOne({email})
    
        if(!userExists){
            return res.status(400).json({message:"user doesnt already"})
        }
        const passwordMatch = await bcrypt.compare(password, userExists.password)
        if(!passwordMatch){
            return res.status(400).json({message:"invalid user credentials"})
        }

        //create token, here to simplify, we use 'user' directly
        const token= createToken(userExists._id, 'user')
        // res.cookie('token', token)
        return res.status(200).json({message:"Login success :"})
    }
    catch(error){
        console.error(error)
        res.status(error.status||500).json({error:error.message||"internal server error:)"})
    }
})


module.exports = router