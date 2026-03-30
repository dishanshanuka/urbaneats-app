import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // get token from request headers
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        // decode the token to get user information
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Token Verification" });
    }
}

export default authMiddleware;