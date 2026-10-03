import routes from 'express';
import { registerSchema, loginSchema } from '../../validators/auth.schema.js';
import validate from '../../middleware/validation.js';
import { registerController, loginController } from '../../controllers/authControllers.js';

const authRoutes = routes()

authRoutes.post("/auth/register", validate(registerSchema), registerController)
authRoutes.post("/auth/login", validate(loginSchema), loginController)

export default authRoutes