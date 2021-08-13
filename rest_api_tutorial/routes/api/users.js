const express = require('express')
const router = express.Router();
const ensureToken = require('../../auth/check_token');
const Users = require('../../models/Users');
const jwt       = require('jsonwebtoken');
//create new user data
//post data api
router.post('/',async(req, res)=>{
    const newUser = new Users(req.body);
    const user = await newUser.save();
    try{
      if(!user) throw Error("some thing went wrong when creating new user");
      res.status(200).json(user);
    }catch(e){
      res.status(400).json({msg:e})
    }
  });

  //check user exist or not and generate token
  router.post('/signin', async(req,res)=>{
        const user = await Users.findOne({email:req.body.email,password:req.body.password}).then((result)=>{ 
        const token = jwt.sign({result}, 'secret_key');
        res.status(200).json({'accessToken': token});
      }).catch((e)=>{res.status(400).json({'msg': e});});
});

//check user exist or not and generate token
 router.get('/info',ensureToken, (req,res)=>{
     console.log('we are inn in protected data');
    jwt.verify(req.token, 'secret_key',async(err, data)=>{
        if(err){
          res.sendStatus(403);
        }else{
            const user = await Users.find().then((result)=>{ 
             res.status(200).json({user: result});
              }).catch((e)=>{res.status(400).json({'msg': e});
            });   
       }
       });
    }); 
//update user api if have token
router.patch('/:id',ensureToken, async(req, res)=>{
    jwt.verify(req.token, 'secret_key',async(err, data)=>{
    try{
      const user = await Users.findOneAndUpdate(req.params.id, req.body);
      if(!user) throw Error("something went wrong while update");
      res.status(200).json({success:true})
    }catch(err){
     res.status(400).json({msg:e})
    }
});
  })
    
module.exports = router;
