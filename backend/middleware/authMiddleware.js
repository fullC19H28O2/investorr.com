const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req,res,next)=>
{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({error : "Access Denied"});
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({error : "Invalid token"});
    }
};

module.exports = authMiddleware;