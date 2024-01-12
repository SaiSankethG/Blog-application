const jwt = require("jsonwebtoken")

const createJWT = (user)=>{
    const token = jwt.sign({
        id:user.id, username:user.username
    },
    process.env.JWT_SECRET)

    return token
}

const protect = (req, res , next)=>{
    const bearer = req.headers.authorization

    if(!bearer){
        res.status(401).send('not authorized')
        return
    }

    const [, token] = bearer.split(' ')
    if(!token){
        res.status(401).send('not authorized')
        return
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    }catch(e){
        res.status(401).json({message: 'Invalid Token'})
        console.log(e)
        return
    }
}

module.exports = {
    createJWT,
    protect
}