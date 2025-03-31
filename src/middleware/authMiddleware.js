import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        // ✅ 1. Extract Authorization Header
        const authHeader = req.headers["authorization"];
        // ✅ 2. Check if token is present
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        // ✅ 4. Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ 5. Check if user exists in DB
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User Not Found" });
        }

        // ✅ 6. Attach user info to the request object
        req.user = user;
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;
