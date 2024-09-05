import jwt from "jsonwebtoken";

const secureRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];
        console.log(`cookies is ${req.cookies.jwt}`);

        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded){
            return res.status(401).json({ error: "Invalid Token" });
        }
        
        req.user = decoded;

        next();
        
    } catch (err) {
        console.error("Error in secureRoute:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default secureRoute;
