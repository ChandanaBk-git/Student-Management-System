const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [];

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const newStudent = {
    id: Date.now(),
    ...req.body
  };

  students.push(newStudent);

  res.json(newStudent);
});

app.put("/students/:id", (req, res) => {

  const id = parseInt(req.params.id);

  students = students.map(student =>
    student.id === id ? { ...student, ...req.body } : student
  );

  res.json({ message: "Student updated" });
});

app.delete("/students/:id", (req, res) => {

  const id = parseInt(req.params.id);

  students = students.filter(student => student.id !== id);

  res.json({ message: "Student deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});