
const mongoose=require('mongoose');
const express=require('express');

const router =express.Router();

//models
const Director =require('../models/director');

router.post('/',(req,res)=>{

    const director= new Director(req.body);
    const promise= director.save();

    promise.then((data)=>{

        res.json(data)
    }).catch((err)=>{

        res.json(err)
    })
    
});

//get all director

// router.get('/',(req,res)=>{

// const promise=Director.find({});

// promise.then((data)=>{

//     res.json(data);
// }).catch((err)=>{

//     res.json(err)
// })

// })

router.get('/',(req,res)=>{

    //join işlemi için kullanılır
    const promise=Director.aggregate([

        {
            $lookup :{
                from :'movies',
                localField: '_id',
                foreignField :'director_id',
                as :'movie'
            }
        },
        {
            $unwind :{
                path: '$movie',
             preserveNullAndEmptyArrays :true
            }
        },
        {

            $group :{

                _id :{
                    _id: '$_id',
                    name : '$name',
                    surname :'$surname',
                    bio :'$bio'
                },
                
                movie :{

                    $push :'$movie'

                }

            }
        },
        {
            $project :{

                _id: '$_id._id',
                name : '$_id.name',
                surname :'$_id.surname',
                movies : '$movie'
            }
            
        }


        
    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{

        res.json(err)
    })


})



router.get('/:director_id',(req,res)=>{

    //join işlemi için kullanılır
    const promise=Director.aggregate([
        {

            $match:{
                '_id': mongoose.Types.ObjectId( req.params.director_id)
            }

        },

        {
            $lookup :{
                from :'movies',
                localField: '_id',
                foreignField :'director_id',
                as :'movie'
            }
        },
        {
            $unwind :{
                path: '$movie',
             preserveNullAndEmptyArrays :true
            }
        },
        {

            $group :{

                _id :{
                    _id: '$_id',
                    name : '$name',
                    surname :'$surname',
                    bio :'$bio'
                },
                
                movie :{

                    $push :'$movie'

                }

            }
        },
        {
            $project :{

                _id: '$_id._id',
                name : '$_id.name',
                surname :'$_id.surname',
                movies : '$movie'
            }
            
        }


        
    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{

        res.json(err)
    })


})

module.exports=router;