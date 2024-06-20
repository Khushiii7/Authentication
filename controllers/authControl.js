import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    const { username, email, password } = req.body; 
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).send('User already exists!!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).send('User Registered successfully!!');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//Login
//user, if password==true, token, response
export const login = async (req, res) =>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user)
            {
                return res.status(401).send("Invalid Email or Password!");
            }
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isPassword)
            {
                return res.status(401).send("Invalid Email or Password!");
            }
        const tokenObject = {
            id: user._id,
            username: user.username,
            email: user.email
        } 
        const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {expiresIn: '5h'});
        return res.status(200).json({token: jwtToken, user: tokenObject});  
    }
    catch (err){
        res.status(500).send(err.message);
    }
};
//display all users
export const getUsers = async (req, res) =>{
    try
    {
        const users = await User.find({}, {password:0});
        return res.status(200).json({data: users});

    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

//Logout
export const logout = async (req, res) =>{
    res.send("Logout");
};
