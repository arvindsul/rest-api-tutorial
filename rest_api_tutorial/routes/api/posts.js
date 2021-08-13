const express = require("express")
const router = express.Router();

const Posts = require("../../models/Posts");
//get APi

/** getting perticular post
 *  
 */
router.get('/:id',async(req, res)=>{
  const post = await Posts.findById(req.params.id);
  try{
    if(!post) throw Error("No items");
    res.status(200).json(post);
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
// router Update a Post api/posts/:id

router.patch('/:id',async(req, res)=>{
  try{
    const post = await Posts.findOneAndUpdate(req.params.id, req.body);
    if(!post) throw Error("something went wrong while update");
    res.status(200).json({success:true})
  }catch(err){
   res.status(400).json({msg:e})
  }
})


module.exports = router;