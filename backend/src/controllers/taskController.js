const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  const task = await Task.create({
    userId: req.user._id,
    ...req.body,
  });

  res.status(201).json({ success: true, data: task });
};

// GET ALL
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });

  res.json({ success: true, data: tasks });
};

// UPDATE
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Not found" });

  if (task.userId.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  Object.assign(task, req.body);
  await task.save();

  res.json({ success: true, data: task });
};

// DELETE
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Not found" });

  if (task.userId.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await task.deleteOne();

  res.json({ success: true });
};