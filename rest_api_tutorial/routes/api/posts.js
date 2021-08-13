const express = require("express")
const router = express.Router();

const Posts = require("../../models/Posts");
//get APi


router.get('/',async(req, res)=>{
  const posts = await Posts.find();
  try{
    if(!posts) throw Error("No items");
    res.status(200).json(posts);
  }catch(e){
    res.status(400).json({msg:e})
  }
});

//post data api
router.post('/',async(req, res)=>{
  const newPost = new Posts(req.body);
  const post = await newPost.save();
  try{
    if(!post) throw Error("some thing went wrong when making post request");
    res.status(200).json(post);
  }catch(e){
    res.status(400).json({msg:e})
  }
});

// router DELETE post/api/:id
router.delete('/:id',async(req, res)=>{
  const post = await Posts.findByIdAndDelete(req.params.id);
  try{
     if(!post) throw Error('No items found');
     res.status(200).json({success: true})
  }catch(e){
    res.status(400).json({msg:e})
  }
});

module.exports = router;