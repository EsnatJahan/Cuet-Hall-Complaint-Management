import userModel from "./models/users.js"
import bcrypt from 'bcrypt'
import connectToDatabase from "./database/db.js"
const userRegister = async () => {
    connectToDatabase()
    try{
        const hashPassword = await bcrypt.hash("admin" , 10)
        const newUser = new User({
               name: "Admin",
               email: "admin@gmail.com",
               password:"1234" ,
               role: "admin"
        })
        await newUser.save()
    } catch(error) {
            console.log(error)
    }
}

userRegister()