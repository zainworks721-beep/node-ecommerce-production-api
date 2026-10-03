import router from "express";
import refreshTokenController from "../../controllers/refreshTokenController.js";

const refreshTokenRoutes = router();

refreshTokenRoutes.post("/auth/refresh-token", refreshTokenController); 

export default refreshTokenRoutes;