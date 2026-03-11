import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/students";

  // READ (GET students)

  useEffect(() => {

    setTimeout(() => {

      axios.get(API)
        .then((res) => {
          setStudents(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching students:", err);
          setLoading(false);
        });

    }, 1200);

  }, []);

  // CREATE (Add Student)

  const addStudent = async (student) => {

    try {

      const res = await axios.post(API, student);

      setStudents([...students, res.data]);

    } catch (error) {

      console.error("Error adding student:", error);

    }

  };

  // UPDATE

  const updateStudent = async (student) => {

    try {

      await axios.put(`${API}/${student.id}`, student);

      setStudents(
        students.map((s) =>
          s.id === student.id ? student : s
        )
      );

      setEditingStudent(null);

    } catch (error) {

      console.error("Error updating student:", error);

    }

  };

  // DELETE

  const deleteStudent = async (id) => {

    if (!window.confirm("Delete this student?")) return;

    try {

      await axios.delete(`${API}/${id}`);

      setStudents(
        students.filter((s) => s.id !== id)
      );

    } catch (error) {

      console.error("Error deleting student:", error);

    }

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

  // LOADING UI

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