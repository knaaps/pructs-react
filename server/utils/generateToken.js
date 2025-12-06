const jwt = require('jsonwebtoken')
const router = require('../routes/userRoutes')

const createToken =(id, role)=>{
    try{
        const token=jwt.sign({id:id, role:role}, process.env.
            JWT_SECRET_KEY,{expiresIn:'1h'}
        )
    }
    catch(error){
        console.log(error)

    }
}

module.exports = createToken