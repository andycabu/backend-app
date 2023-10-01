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
const router = Router();

router.get("/tasks", tasks);
router.post("/tasks/add", validateSchema(taskSchema), tasksAdd);
router.delete("/tasks/delete:id", tasksDelete);
router.get("/tasks/find/:id", tasksFind);
router.put("/tasks/update:id", tasksUpdate);

export default router;
