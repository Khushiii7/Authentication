import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) =>{
    if(!req.headers['authorization'])
        {
            return res.status(403).send("Token is required...");
        }
    try
    {
        const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET);            
        return next();
    }
    catch(err)
    {
        return res.status(403).send("Token is not Valid or Expired!");
    }
};
