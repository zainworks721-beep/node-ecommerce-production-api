import User from "../model/user.model.js"

let refreshTokenController = async (req, res, next) => {
    try {
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

        const decode = Jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await User.findOne({ _id: decode.id }); 

        if (!user) {
            return res.status(404).json({ success: false, message: "User nahi mila" });
        }

        if (user.refreshToken !== token) {
            return res.status(403).json({ success: false, message: "Invalid ya expired refresh token" });
        }

  
        const newAccessToken = Jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_ACCESS_SECRET, 
            { expiresIn: '15m' }
        );

        const newRefreshToken = Jwt.sign(
            { id: user._id }, 
            process.env.JWT_REFRESH_SECRET, 
            { expiresIn: '7d' }
        );

        user.refreshToken = newRefreshToken;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            accessToken: newAccessToken,
            refreshToken: newRefreshToken 
        });

    } catch (error) {
        next(error);
    }
}

export default refreshTokenController