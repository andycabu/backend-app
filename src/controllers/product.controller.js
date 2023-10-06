import Product from "../models/product.models.js";

export const products = async (req, res) => {
  const products = await Product.find({ user: req.user.id }).populate("user");
  res.json(products);
};

export const productAdd = async (req, res) => {
  const { nombre, referencia, fechaCaducidad, categoria, stock } = req.body;

  try {
    const existingName = await Product.findOne({
      user: req.user.id,
      nombre,
    });
    const existingRef = await Product.findOne({
      user: req.user.id,
      referencia,
    });

    if (existingName) {
      return res.status(400).json({ error: ["El producto ya existe "] });
    }
    if (existingRef) {
      return res.status(400).json({ error: ["La referencia ya existe "] });
    }
    const newProduct = new Product({
      user: req.user.id,
      nombre,
      referencia,
      fechaCaducidad,
      categoria,
      stock,
    });
    const savedProduct = await newProduct.save();

    return res.json(savedProduct);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json(err);
  }
};

export const productDelete = async (req, res) => {
  const { id } = req.params;

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

export const productFind = async (req, res) => {
  const { nombre } = req.query;

  try {
    const findProduct = await Product.find({
      nombre: { $regex: nombre, $options: "i" },
    }).lean();
    if (findProduct.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron productos con ese nombre." });
    }

    res.status(200).json(findProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const productUpdate = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  console.log(data, id);
  try {
    const productUpdate = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.json(productUpdate);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
