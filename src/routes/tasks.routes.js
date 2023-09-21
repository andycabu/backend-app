import { Router } from "express";
import {
  tasks,
  tasksAdd,
  tasksDelete,
  tasksUpdate,
} from "../controllers/task.controller.js";
const router = Router();

router.get("/tasks", tasks);
router.post("/tasks/add", tasksAdd);
router.delete("/tasks/delete:id", tasksDelete);
router.put("/tasks/update:id", tasksUpdate);

export default router;
