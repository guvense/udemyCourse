
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({

    userName:{
        type:  String,
        required: true,
        unique :true
    },
    password :{
        type:String,
        required :true,
        minlength:5
    }
})

module.exports=mongoose.model('user',userSchema);