
import express from "express";
import {register, login, logout, getUsers } from "../controllers/authControl.js";
import {userRegisterValidate, userLoginValidate} from "../middleware/authMiddleware.js";
import {isAuthenticated} from "../middleware/auth.js";
const authRoutes = express.Router();

authRoutes.post('/register', userRegisterValidate, register);
authRoutes.post('/login', userLoginValidate, login);
authRoutes.post('/logout', logout);
authRoutes.get('/users', isAuthenticated, getUsers);

export default authRoutes;
