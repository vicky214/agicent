const express = require('express');
const router = express.Router();
const User = require('../models/data');
const Task = require('../models/task')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/db')
const requireLogin = require('../middleware/requireLogin')

router.post('/register',(req,res)=>{
    const {email,password} = req.body ;
    if(!email || !password){
       return res.status(422).json({error:"Please Fill All The Fields"})
    }
    const userData = {
        email,
        password,
    }
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            bcrypt.hash(password, 10, (err,hash)=>{
                userData.password = hash
                User.create(userData)
                    .then(user=>{
                        res.json({message: 'User Registered Succesfully'})
                    })
                    .catch(err=>{
                        res.send('error: ' + err)
                    })
            })
        }
        else{
            res.json({error: 'User Already Exists'})
        }
    })
    .catch(err=>{
        res.send('error: ' + err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"Please Fill Email Or Password"})
    }
    User.findOne({email:email})
    .then(user=>{
        if (!user){
            return res.json({error:"Invalid Email Or Password"})
        }
        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(doMatch){
                const token=jwt.sign({_id:user._id},JWT_SECRET)
                const {_id,email} = user
                res.json({token,user:{_id,email}})
            }
            else{
                return res.json({error:"Invalid Email Or Password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })

    })
    .catch(err=>{
        return res.json({error:"Invalid Email Or Password"})
    })
})

router.post('/task',requireLogin,(req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(422).json({error:"Please Add Name"})
     }
    const task = new Task({
        name,
        postedBy:req.user
    })
    Task.create(task)
    .then(data=>{
        return res.json({message:"Your Task has Saved"})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/taskdata/:id',(req,res)=>{
    Task.find({postedBy:req.params.id})
    .populate("PostedBy","_id name") 
    .then(data=>{
        return res.json({data})
    })
})

router.get('/delete/:id',(req,res)=>{
    var id = req.params.id;
    Task.findByIdAndDelete(id)
    .then((deletedata)=>{
        res.json({message: 'Task Has Deleted '})
    }).catch(err=>{
        res.json(
            {error:'error'}
        )
    })
   
  });

router.get('/tasks/:id',(req, res) => {
    Task.findById(req.params.id)
      .then((task) => {
          res.status(200).json(task.name)
      })
      .catch((err) =>{
          console.log(err)
      }
      );
  })  

router.post('/tasks/edit/:id',(req, res) => {
    var id = req.params.id
    const {name} = req.body
    Task.findByIdAndUpdate(id,{name:name})
    .then(data=>{
        return res.json({message:"Your Task Has Updated"})
    })
    .catch(err=>{
        return res.json({error:"Something Wrong"})
    })
  })

module.exports=router;