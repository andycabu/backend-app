import { Router } from "express";
import {
  products,
  productsAdd,
  productsDelete,
  productsFind,
  productsUpdate,
} from "../controllers/product.controller.js";
import { authRequired } from "../middleware/validateToken.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { productSchema } from "../schemas/product.schema.js";
const router = Router();

router.get("/products", authRequired, products);
router.post(
  "/products/add",
  validateSchema(productSchema),
  authRequired,
  productsAdd
);
router.delete("/products/delete/:id", authRequired, productsDelete);
router.get("/products/find", authRequired, productsFind);
router.put("/products/update/:id", authRequired, productsUpdate);

export default router;
