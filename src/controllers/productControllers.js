import Product from '../model/productSchema.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 200,
      total: products.length,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ status: 404, message: 'Product not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};




const createProduct = async (req, res, next) => {
  try {

    const { title, description, price, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ status: 400, message: 'Product image is required' });
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResponse) {
      return res.status(500).json({ status: 500, message: 'Failed to upload image to Cloudinary' });
    }

    const product = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      image: cloudinaryResponse.secure_url,
    });

    res.status(201).json({
      status: 201,
      message: 'Product created successfully',
      data: product,
    });

  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { title, description, price, category, stock } = req.body;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ status: 404, message: 'Product not found' });
    }

    let imageUrl = existingProduct.image;

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

      if (cloudinaryResponse?.secure_url) {
        if (existingProduct.image) {
          await deleteFromCloudinary(existingProduct.image);
        }
        imageUrl = cloudinaryResponse.secure_url;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        image: imageUrl,
      },
      {returnDocument: 'after' , runValidators: true }
    );

    res.status(200).json({
      status: 200,
      message: 'Product replaced/updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const updatebyFieldsProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ status: 404, message: 'Product not found' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        updateData.image = cloudinaryResponse.secure_url;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { returnDocument: 'after', runValidators: true }
    );

    res.status(200).json({
      status: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const delProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ status: 404, message: 'Product not found' });
    }

    res.status(200).json({ status: 200, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  delProduct,
  updatebyFieldsProduct
};