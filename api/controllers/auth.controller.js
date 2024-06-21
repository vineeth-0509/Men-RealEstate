import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
export const signup=async (req,res)=>{
    const {userName, email,password}= req.body;
    const hashPassword=bcryptjs.hashSync(password,10);
    const newUser= new User({userName,email,password:hashPassword});
    try{
        await newUser.save()
    res.status(201).json({
        msg:"user created Successfully"
    });
    }catch(error){
        res.status(500).json(error.message)
    }

    /* 
Some cases in our application we need to have custom error.
    for custom error, we can use the 
        catch(err){
        next(errorHandler(300, error.message));
        }
    */
};
