import express from "express";
import TAskModel from "../model/task.model.js";
import authorisation from "../middleware/authorisation.js";

const taskROuter = express.Router();

taskROuter.get("/",authorisation(['admin','user']), async (req, res) => {
  let userId = req.user._id;
  let task = await TAskModel.find({ userId });
  
  res.send(task);
});
taskROuter.post("/new-task",authorisation(['admin','user']), async (req, res) => {
  const { task, status } = req.body;
  const userId = req.user._id;
  try {
    const newTask = new TAskModel({
      task,
      status,
      userId,
    });
    await newTask.save();
    res.status(200).json({ message: "successful" });
  } catch (error) {
    res.send(error);
  }
});
taskROuter.patch("/update/:id",authorisation(['admin','user']), async (req, res) => {
  const payload = req.body;
  const userId = req.user._id;
  const noteId = req.params.id;

  try {
    let task = await TAskModel.findOne({ _id: noteId });
    
    if (!task) {
      res.send("wrong id passed");
    } else {
      if (task.userId.toString() === userId.toString()) {
        await TAskModel.findByIdAndUpdate({_id: noteId}, payload, {new:true });
        res.send("hii");
      } else {
        res.send("unauthorised");
      }
    }
  } catch (error) {
    console.log(error)
  }
});
taskROuter.delete("/delete-task",authorisation(['admin']), (req, res) => {});

export default taskROuter;
