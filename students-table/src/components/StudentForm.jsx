import { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {

    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setAge(editingStudent.age);
    }

  }, [editingStudent]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !email || !age) {
      alert("All fields required");
      return;
    }

    const student = {
      name,
      email,
      age
    };

    if (editingStudent) {
      updateStudent({ ...student, id: editingStudent.id });
    } else {
      addStudent(student);
    }

    setName("");
    setEmail("");
    setAge("");

  };

  return (

    <form className="student-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button type="submit">

        {editingStudent ? "Update Student" : "Add Student"}

      </button>

    </form>

  );

}

export default StudentForm;