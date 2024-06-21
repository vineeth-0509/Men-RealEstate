import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
export const signup=async (req,res,next)=>{
    const {userName, email,password}= req.body;
    const hashPassword=bcryptjs.hashSync(password,10);
    const newUser= new User({userName,email,password:hashPassword});
    try{
        await newUser.save()
    res.status(201).json({
        msg:"user created Successfully"
    });
    }catch(error){
       // res.status(500).json(error.message)
        next(errorHandler(500,error.message))
    }

    /* 
Some cases in our application we need to have custom error.
    for custom error, we can use the 
        catch(err){
        next(errorHandler(500,'error from the function signup in auth.controller.js'));
        }
    */
};
