const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  toggleFavorite,
  updateProduct,   
  deleteProduct 
} = require("../controllers/productController");

// Create product with image
router.post(
  "/",
  upload.single("image"),
  createProduct
);

// Get products (search + pagination)
router.get("/", getProducts);

// ✅ IMPORTANT — GET single product
router.get("/:id", getSingleProduct);

// Update product (PUT)
router.put("/:id", auth, upload.single("image"), updateProduct);

// Delete product (DELETE)
router.delete("/:id", auth, deleteProduct);

// Toggle favorite (Protected route)
router.post("/:id/favorite", auth, toggleFavorite);

module.exports = router;
