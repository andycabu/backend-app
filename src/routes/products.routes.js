import { Router } from "express";
import {
  products,
  productsAdd,
  productsDelete,
} from "../controllers/product.controller.js";
const router = Router();

router.get("/products", products);
router.post("/products/add", productsAdd);
router.delete("/products/delete:id", productsDelete);

export default router;
