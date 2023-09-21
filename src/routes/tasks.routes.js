import { Router } from "express";
import {
  tasks,
  tasksAdd,
  tasksDelete,
  tasksFind,
  tasksUpdate,
} from "../controllers/task.controller.js";
const router = Router();

router.get("/tasks", tasks);
router.post("/tasks/add", tasksAdd);
router.delete("/tasks/delete:id", tasksDelete);
router.get("/tasks/find:id", tasksFind);
router.put("/tasks/update:id", tasksUpdate);

export default router;
