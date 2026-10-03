import jwt from "jsonwebtoken"

export default  function verifyToken  (req, res, next) {

    let token = req.headers.authorization;
        
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied: No token provided."
        });
    }

    try {
        let checking = jwt.verify(token, process.env.JWT_SECRET);

        req.user = checking;
        

        next();
    } catch (error) {
        
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};
 
