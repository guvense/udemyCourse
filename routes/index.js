const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});


router.post('/register',(req,res,next)=>{

  const {userName, password}=req.body;

  bcrypt.hash(password, 10).then((hash) =>{
    
  const user= new User({

    userName,
    password:hash

  });

  const promise=user.save();

  promise.then((data)=>{

    res.json(data)
  }).catch((err)=>{

    res.json(err)
  });
    
});
  
  

})

router.post('/auth',(req,res)=>{

const {userName ,password}=req.body;

User.findOne({

  userName

},(err,user)=>{

  
  if(!user){
    res.json({
      status:false,
      message : 'Authentication  failed, user not found'
    })
  }
  else{

    bcrypt.compare(password,user.password).then((result)=>{
      if(!result){
        res.json({
          status:false,
          message:'Authentication  failed'
        })
      }
      else{

        const payload={
          userName

        };
        const token=jwt.sign(payload, req.app.get('api_secret_key'),{
          expiresIn :720 // 12 saat
        });

        res.json({
          status:true,
          token
        })
      

      }

    });

  }
})

});
module.exports = router;
