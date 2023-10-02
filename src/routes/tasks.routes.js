import { Router } from "express";
import {
  tasks,
  tasksAdd,
  tasksDelete,
  tasksFind,
  tasksUpdate,
} from "../controllers/task.controller.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { taskSchema } from "../schemas/task.schema.js";
import { authRequired } from "../middleware/validateToken.js";
const router = Router();

router.get("/tasks", authRequired, tasks);
router.post("/tasks/add", validateSchema(taskSchema), authRequired, tasksAdd);
router.delete("/tasks/delete/:id", authRequired, tasksDelete);
router.get("/tasks/find/:id", authRequired, tasksFind);
router.put(
  "/tasks/update/:id",
  validateSchema(taskSchema),
  authRequired,
  tasksUpdate
);

export default router;
