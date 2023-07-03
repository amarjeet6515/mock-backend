const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { EmpModel } = require("../models/Emp.model");
require("dotenv").config();

const empController = Router();

empController.get("/", async (req, res) => {
  const employee = await EmpModel.find({ userId: req.body.userId });
  res.json(employee);
});

// empController.get("/:noteId", async (req, res) => {
//   const {noteId} = req.params
//   const notes = await EmpModel.find({ _id: noteId });
//   res.json(notes);
// });

empController.post("/create", async (req, res) => {
  const { firstName, lastName, email, department, salary, userId } = req.body;
  console.log(req.body)
  const employee = new EmpModel({
    firstName,
    lastName,
    email,
    department,
    salary,
    userId
  });
  try {
    await employee.save();
    res.json({ message: "Employee Created" });
  } catch (error) {
    console.log(error);
  }
});

empController.delete("/delete/:empId", async (req, res) => {
  const { empId } = req.params;
  const deletedEmp = await EmpModel.findOneAndDelete({
    _id: empId,
    userId: req.body.userId,
  });
  if (deletedEmp) {
    res.json({ message: "Deleted Successfully" });
  } else {
    res.json({
      message:
        "You are not allow to delete this Employee because its belong to someone else",
    });
  }
});

empController.patch("/edit/:empId", async (req, res) => {
  const { empId } = req.params;
  const updatedEmp = await EmpModel.findOneAndUpdate(
    {
      _id: empId,
      userId: req.body.userId,
    },
    { ...req.body }
  );
  if (updatedEmp) {
    res.json({ message: "Updated Successfully" });
  } else {
    res.json({
      message:
        "You are not allow to update this employee.",
    });
  }
});

module.exports = { empController };
