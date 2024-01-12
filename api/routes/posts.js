const router = require("express").Router()
const User = require("../models/user")
const Post = require("../models/Post")
const { Mongoose } = require("mongoose")

//Create Post
router.post("/" , async(req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

//Update Post
router.put('/:id' , async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                }, {new:true})
                res.status(200).json(updatedPost)
                console.log("in update post")
            }catch(err){
                res.status(500).json(err)
                console.log(err)
            }
        }else{
            res.status(401).json("You can only update your Post!")
            console.log("not same user")
        }
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

//Delete Post
router.delete('/:id', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("Post has been Deleted...")
            }catch(err){
                res.status(500).json(err)
                console.log(err)
            }
        }else{
            res.status(401).json("You can only delete your Post!")
        }
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

// Get Post
router.get("/:id" , async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){    
        res.status(500).json(err)
    }
})

//Get all posts.
router.get("/", async(req, res)=>{

    const username = req.query.user
    const catName = req.query.cat
    
    try{

        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories: {$in: [catName]} })
        }else{
            console.log("hello")
            posts = await Post.find({})
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})

// router.get("/all",async(req,res)=>{
//     try{
//         console.log("inside api");
//       const posts=await Post.find({});
//       res.send(posts);
//     }
//     catch(err){
//         console.log(err);
//       res.send(err).status(500)
//     }
// })

module.exports = router