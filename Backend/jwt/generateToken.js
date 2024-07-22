import jwt from "jsonwebtoken"


const createTokenAndSaveCookie = (user_id,res)=>{
    const token = jwt.sign({user_id},process.env.JWT_TOKEN,{
        expiresIn:"14d"
    });

    res.cookie("jwt",token,{
        httpOnly : true,
        secure : true,
        sameSite :"strict"
})
}


export default createTokenAndSaveCookie