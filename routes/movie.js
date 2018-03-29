const express = require('express');
const router = express.Router();


//Models
const Movie=require('../models/movie');

//get top10 movies
router.get('/top10',(req,res)=>{


  const promise=Movie.find({}).limit(10).sort({imdb:-1});

  promise.then((data)=>{

    res.json(data);
  }).catch((err)=>{
    res.json(err)
  })

})

//get movie from id
router.get('/:movie_id',(req,res,next)=>{

  const promise=Movie.findById(req.params.movie_id);

  promise.then((data)=>{

    if(!data)
      next({ message: 'The movie was not found!' , code :1});
    
    res.json(data);
  }).catch((err)=>{

    res.json(err)
  })


});


//update movie from id
router.put('/:movie_id',(req,res,next)=>{

  const promise=Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new :true});

  promise.then((data)=>{

    if(!data)
      next({ message: 'The movie was not found!' , code :1});
    
    res.json(data);
  }).catch((err)=>{

    res.json(err)
  })


});

//delete movie from id
router.delete('/:movie_id',(req,res,next)=>{

  const promise=Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((data)=>{

    if(!data)
      next({ message: 'The movie was not found!' , code :1});
    
    res.json({status:1});
  }).catch((err)=>{

    res.json(err)
  })


});





//get all movies
router.get('/',(req,res)=>{


  const promise=Movie.aggregate([

    {
      $lookup :{
        from : 'directors',
        localField :'director_id',
        foreignField  : '_id',
        as :'director'
      }
    },
    {
      $unwind: '$director'
    }


  ]);

  promise.then((data)=>{

    res.json(data);
  }).catch((err)=>{
    res.json(err)
  })

})

//add movie 
router.post('/', (req, res, next) => {
  const {title, imdb, category, country,year,director_id}=req.body;

  const movie= new Movie({

    title: title,
    imdb: imdb,
    category:category,
    country:country,
    year:year,
    director_id:director_id

  })

  const promise=movie.save();
  
  promise.then((data)=>{
    res.json({status:1});
    

  } ).catch((err)=>{

    res.json(err);
  })
});


//between 
router.get('/between/:start_year/:end_year',(req,res)=>{

const {start_year, end_year }=req.params;

  const promise=Movie.find(
  {
      year:{ "$gte": parseInt(start_year) ,"$lte": parseInt(end_year)}
  }
);

  promise.then((data)=>{

    res.json(data);
  }).catch((err)=>{
    res.json(err)
  })

})

module.exports = router;
