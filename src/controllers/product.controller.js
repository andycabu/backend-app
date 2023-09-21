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
    return res.json(productDelete);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json(err);
  }
};

export const productsFind = async (req, res) => {
  const { nombre } = req.query;

  try {
    const findProduct = await Product.find({
      nombre: { $regex: nombre, $options: "i" },
    }).lean();
    if (findProduct.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos con ese nombre." });
    }
    res.status(200).json(findProduct);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const productsUpdate = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const productUpdate = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.json(productUpdate);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};