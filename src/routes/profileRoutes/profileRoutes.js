import routes from "express";
import ProfileFetchController from '../../controllers/profileController.js'
import verifyToken from "../../middleware/jwtVerficationMiddleware.js";

const profileRoutes = routes()

profileRoutes.get("/profile", verifyToken, ProfileFetchController)

export default profileRoutes