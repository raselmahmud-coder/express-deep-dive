const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const router = express.Router();

const Todo = new mongoose.model("Todo", todoSchema);
router.get("/", async (req, res) => {
  const result = await Todo.find({});
  res.send(result);
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Todo.findOne({ _id: id })
    .select({ _id: 0, __v: 0 })//hide some column using select
    .then((data) => res.send(data));
});
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "there was a server side error" });
    } else {
      res.status(200).json({ message: "successfully added a record" });
    }
  });
});
router.post("/all", async (req, res) => {
  console.log(req.body);
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).jsonp({ error: err });
    } else {
      res.status(200).jsonp({ message: Todo });
    }
  });
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // const title = req.body;
  //  const data = await Todo.updateOne(
  //     { _id: req.params.id },
  //     {
  //       $set: {
  //         title: "title should be change",
  //       },
  //     }
  //     )
  //     // console.log("hey data",data);
  //     if (data.acknowledged) {
  //         res.status(200).json({message:"successfully updated"})
  //     } else {
  //         res.status(500).json({error:"there was an error"})
  //     }

  // if need new value show after update
  const response = Todo.findByIdAndUpdate(
    { _id: id },
    { title: "hello there" },
    { new: true },
    (err, data) => {
      if (err) {
        console.log("error", err);
      } else {
        console.log("got data", data);
      }
    }
  );
  // console.log("response",response);
});
router.delete("/:id", async (req, res) => {});

module.exports = router;
