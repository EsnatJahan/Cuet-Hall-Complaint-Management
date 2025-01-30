import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt;
import bcrypt from 'bcrypt'
import User from '../models/users.js'
export const login = async(req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({success: false , error: "User Not Found"})
        }
        const isMatch = password == user.password || await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(404).json({success: false , error: "User Not Found"})
        }    

        const token = jwt.sign({_id: user.id,_role: user.role},
             process.env.JWT_KEY, {expiresIn: "10d"}
        )
        

        res.status(200).json({success:true,token, user: {_id: user.id,_role: user.role,_name:user.name}});
    }catch(error){

    }
}
