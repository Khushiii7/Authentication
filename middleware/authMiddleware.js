
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

export const userRegisterValidate = (req, res, next) => {
    const {username, email, password } = req.body;
    console.log("Received userName:", username); 
    if(!username || typeof username != 'string' || username.length < 3 || username.length >100 || !/^[a-zA-Z0-9\s]+$/.test(username))
    {
        return res.status(400).send("Invalid Username!");
    }
    if (!email || typeof email != 'string' || !validateEmail(email)) {
        return res.status(400).send("Invalid Email!");
    }
    if(!password || typeof password != 'string' || password.length < 4 || !/^[a-zA-Z0-9]+$/.test(password)) 
    {
        return res.status(400).send("Invalid Password!");
    }
    
    next();
};
export const userLoginValidate =(req, res, next) => {
    const {email, password } = req.body;
    
    if (!email || typeof email != 'string' || !validateEmail(email)) {
        return res.status(400).send("Invalid Email!");
    }
    if(!password || typeof password != 'string' || password.length < 4 || !/^[a-zA-Z0-9]+$/.test(password)) 
    {
        return res.status(400).send("Invalid Password!");
    }
    
    next();
};