const mongoose=require('mongoose');

module.exports=() =>{

    mongoose.connect('mongodb://guvense:100545460@ds121289.mlab.com:21289/udemy_project');

    mongoose.connection.on('open',()=>{
        console.log('mongo db connectted');
        
    });

    mongoose.connection.on('error',(err)=>{

        console.log("mongo db error",err);
        

    });

    mongoose.Promise=global.Promise;
}