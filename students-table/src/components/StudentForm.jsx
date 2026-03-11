import { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {

    if (editingStudent) {
      setForm(editingStudent);
    }

  }, [editingStudent]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!form.name || !form.email || !form.age) {
      alert("All fields required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(form.email)) {
      alert("Invalid Email");
      return;
    }

    if (editingStudent) {

      updateStudent(form);

    } else {

      addStudent(form);

    }

    setForm({
      name: "",
      email: "",
      age: ""
    });

  };

 return (
  <div className="form-card">

    <h2>Student Details</h2>

    <form className="form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={form.age}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="add-btn">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>

    </form>

  </div>
);
}

export default StudentForm;