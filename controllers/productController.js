const Product = require("../models/Product");
const User = require("../models/User");

exports.createProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;

    const product = await Product.create({
      title,
      price,
      description,
      image: req.file ? req.file.filename : null
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};


exports.getProducts = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const limit = 5;

  const products = await Product.find({
    title: { $regex: search, $options: "i" }
  })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(products);
};
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    product.title = title || product.title;
    product.price = price || product.price;
    product.description = description || product.description;

    // If new image uploaded
    if (req.file) {
      product.image = req.file.filename;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

exports.toggleFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);

  const index = user.favorites.indexOf(req.params.id);

  if (index === -1) user.favorites.push(req.params.id);
  else user.favorites.splice(index, 1);

  await user.save();
  res.json(user.favorites);
};

