import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import studentsData from "./data/students.json";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // READ (Load local JSON)

  useEffect(() => {

    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1200);

  }, []);

  // CREATE

  const addStudent = (student) => {

    const newStudent = {
      id: Date.now(),
      ...student
    };

    setStudents([...students, newStudent]);
  };

  // UPDATE

  const updateStudent = (student) => {

    setStudents(
      students.map((s) =>
        s.id === student.id ? student : s
      )
    );

    setEditingStudent(null);
  };

  // DELETE

  const deleteStudent = (id) => {

    if (!window.confirm("Delete this student?")) return;

    setStudents(
      students.filter((s) => s.id !== id)
    );
  };

  // EDIT

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  // EXCEL EXPORT

  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([buffer], {
      type: "application/octet-stream"
    });

    saveAs(file, "students.xlsx");

  };

  if (loading) {

    return (
      <div className="loading">
        Loading Students...
      </div>
    );

  }

  return (

    <div className="container">

      <div className="header">
        <h1>Students Management System</h1>
      </div>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editingStudent={editingStudent}
      />

      <div className="table-actions">

        <button
          onClick={exportExcel}
          className="download-btn"
        >
          Download Excel
        </button>

      </div>

      <StudentTable
        students={students}
        deleteStudent={deleteStudent}
        editStudent={editStudent}
      />

    </div>

  );

}

export default App;