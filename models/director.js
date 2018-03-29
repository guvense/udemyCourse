

const mongoose=require('mongoose');

const Schema= mongoose.Schema;

const directorSchema=new Schema({

    name :String,
    surname: String,
    bio :String,
    creatAt :{

        type: Date,
        default :Date.now
    }




})

module.exports=mongoose.model('director',directorSchema)