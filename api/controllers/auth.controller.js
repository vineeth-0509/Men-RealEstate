import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const signup=async (req,res,next)=>{
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
};

//import { errorHandler } from "../utils/error.js";
  /* 
Some cases in our application we need to have custom error.
    for custom error, we can use the 
        catch(err){
        next(errorHandler(500,'error from the function signup in auth.controller.js'));
        }
    */

        export const signin=async(req,res,next)=>{
          const {email,password}=req.body;
          try {
           const validUser= await User.findOne({
           email:email
           });
           if(!validUser){
            return (errorHandler(404,'user not found!'));
           }

           const validPassword=bcryptjs.compareSync(password,validUser.password);
           if(!validPassword){
            return next(errorHandler(404,'password is incorrect'));
           }
           const token= jwt.sign({id:validUser._id},process.env.JWT_SECRET);
           //all the things except the password will get return and also with the cookie.
           const {password: pass, ...rest}=validUser._doc;
           res
           .cookie('access-token',token,{httpOnly: true})
           .status(200)
           .json(rest);
          }
           catch (error) {
            next(error);
          }
        }