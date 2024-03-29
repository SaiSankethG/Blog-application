const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const { createJWT } = require("./jwt")

//Register
router.post("/register" , async(req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const existUser=await User.findOne({username:req.body.username})
        if(existUser){ 
            res.send("user already exists");
        }
        else{
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:hashPassword
            })
    
            const user = await newUser.save()
            res.status(200).json(user)
        }
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }

    
})

//Login
router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");
    
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");
        
        if(user && validated){
            const { password , ...others} = user._doc;
            console.log(others)
            const accessToken = createJWT(others)
            res.status(200).json({others , accessToken})
        }
        else{
            // res.status(400).json("Wrong Credentials!")
        }
        
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }

})

module.exports = router