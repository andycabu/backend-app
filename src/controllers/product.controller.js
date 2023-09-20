import Product from "../models/product.models.js";

export const products = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const productsAdd = async (req, res) => {
  const data = req.body;
  const { nombre, referencia } = data;
  try {
    const productFound = await Product.findOne({ nombre });
    const productFound2 = await Product.findOne({ referencia });
    if (productFound || productFound2) {
      return res.status(400).json({ message: "El producto ya existe" });
    }
    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();
    console.log("savedProduct", savedProduct);
    return res.json(savedProduct);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json(err);
  }
};

export const productsDelete = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const productFound = await Product.findById(id);
    if (!productFound) {
      return res.status(400).json({ message: "El producto no existe" });
    }
    const productDelete = await Product.findByIdAndDelete(id);
    console.log("productDelete", productDelete);
    return res.json(productDelete);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json(err);
  }
};
