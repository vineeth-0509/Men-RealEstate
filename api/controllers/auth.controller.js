import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';


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