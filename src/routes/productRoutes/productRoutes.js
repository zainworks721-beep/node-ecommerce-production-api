import { Router } from 'express';

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  delProduct,
  updatebyFieldsProduct
} from '../../controllers/productControllers.js';

import { 
  productJoiSchema, 
  productPatchJoiSchema 
} from '../../validators/product.schema.js';

import validate from '../../middleware/validation.js';
import { upload } from '../../middleware/multer.middleware.js';
import verifyToken from '../../middleware/jwtVerficationMiddleware.js';

const productRoutes = Router();

productRoutes.get('/products', getProducts);

productRoutes.get('/products/:id', getProductById);


productRoutes.post(
  '/products', 
  verifyToken, 
  upload.single('image'), 
  validate(productJoiSchema), 
  createProduct
);

productRoutes.put(
  '/products/:id', 
  verifyToken, 
  upload.single('image'), 
  validate(productJoiSchema), 
  updateProduct
);

productRoutes.patch(
  '/products/:id', 
  verifyToken, 
  upload.single('image'), 
  validate(productPatchJoiSchema), 
  updatebyFieldsProduct
);

productRoutes.delete(
  '/products/:id', 
  verifyToken, 
  delProduct
);

export default productRoutes;