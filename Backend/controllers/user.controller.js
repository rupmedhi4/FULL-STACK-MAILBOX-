import createTokenAndSaveCookie from '../jwt/generateToken.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const signup = async (req, res) => {
    try {
        const { email, fullname, password } = req.body

        const user = await User.findOne({email})
        if(user){
            return res.status(201).json({message: "User already exists!"})
        }

        //hash password
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            email,
            fullname,
            password:hashPassword
        })
        newUser.save()
        createTokenAndSaveCookie(newUser._id,res)
        res.status(200).json({message:"User created successfully",user:req.body})
    } catch (error) {
        res.status(400).send(`error in sign up something went wrong`);

    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        // Create token and save it in a cookie
        createTokenAndSaveCookie(user._id, res);

        // Remove password from user object
        const { password: pwd, ...userWithoutPassword } = user.toObject();

        // Send response without the password
        res.status(200).json({
            message: "User logged in successfully",
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).send(`Error in login: something went wrong`);
    }
};



const logOut = (req,res)=>{
    try {
        res.clearCookie('jwt')
        res.status(201).json({message:"logout successfull",user:req.user})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error in logout Internal server error"})
    }
}






export { signup,login,logOut }