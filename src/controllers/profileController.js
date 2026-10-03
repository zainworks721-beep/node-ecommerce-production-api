import User from "../model/user.model.js";

const ProfileFetchController = async (req, res, next) => {
    try {

        const { id } = req.user;
        const userProfile = await User.findById(id).select("-refreshToken");

        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: userProfile,
        });
        
    } catch (error) {
        next(error);
    }
};

export default ProfileFetchController;