const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
     }
})
module.exports = mongoose.model('Task',taskSchema);