const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/db')
const mongoose = require('mongoose')
const user = mongoose.model('User')


module.exports = (req,res,next)=> {
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            res.status(401).json({error:"you must be logged in"})
        }
        const {_id} = payload
        user.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
    })
}