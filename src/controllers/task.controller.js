import Task from "../models/task.models.js";

export const tasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};
export const tasksAdd = async (req, res) => {
  const newTask = new Task(req.body);

  try {
    const savedTask = await newTask.save();
    console.log(savedTask);
    res.json(savedTask);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json(err);
  }
};
export const tasksDelete = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const taskFound = await Task.findById(id);
    if (!taskFound) {
      return res.status(400).json({ message: "La tarea no existe" });
    }
    const taskDelete = await Task.findByIdAndDelete(id);
    return res.json(taskDelete);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json(err);
  }
};

export const tasksFind = async (req, res) => {
  const { id } = req.params;
  try {
    const taskFind = await Task.findById(id);
    res.json(taskFind);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json(err);
  }
};

export const tasksUpdate = async (req, res) => {
  const { id } = req.params;
  const taskChange = req.body;

  try {
    const newTask = await Task.findByIdAndUpdate(id, taskChange, { new: true });
    res.json(newTask);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json(err);
  }
};
