import { Router } from "express";
import {
  products,
  productsAdd,
  productsDelete,
  productsFind,
  productsUpdate,
} from "../controllers/product.controller.js";
import { authRequired } from "../middleware/validateToken.js";
const router = Router();

router.get("/products", products);
router.post("/products/add", productsAdd);
router.delete("/products/delete:id", productsDelete);
router.get("/products/find", productsFind);
router.put("/products/update:id", productsUpdate);

export default router;
