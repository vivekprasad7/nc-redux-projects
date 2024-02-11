import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPatient, updatePatient } from "../../redux/slices/Patient";

const PatientForm = ({ data = null, isClosed }) => {
  const initialFormData = {
    name: "",
    age: "",
    medicalHistory: "",
    gender: "",
    contact: "",
    assignedWard: ""
  };

  const [formData, setFormData] = useState(data ? data : initialFormData);

  const changeHandler = (e) => {
    // console.log("e", e.target);
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    console.log("submitHandler", formData);
    if (
      formData.name &&
      formData.age &&
      formData.medicalHistory &&
      formData.gender &&
      formData.contact &&
      formData.assignedWard
    ) {
      dispatch(addPatient(formData));
      setFormData(initialFormData);
      navigate("/");
    }
  };

  const updateHandler = () => {
    console.log("submitHandler", formData);
    if (
      formData.name &&
      formData.age &&
      formData.medicalHistory &&
      formData.gender &&
      formData.contact &&
      formData.assignedWard
    ) {
      dispatch(updatePatient(formData));
      setFormData(initialFormData);
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Add Patient Form</h1>
      <div
        className="form"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Add Name"
          value={formData.name}
          onChange={changeHandler}
        />
        <input
          type="number"
          name="age"
          placeholder="Add Age"
          onChange={changeHandler}
          value={formData.age}
        />
        <input
          type="text"
          name="medicalHistory"
          placeholder="Add Medical History, Ex. Diabetes"
          onChange={changeHandler}
          value={formData.medicalHistory}
        />
        <select name="gender" onChange={changeHandler} value={formData.gender}>
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="contact"
          placeholder="Add Contact Number"
          onChange={changeHandler}
          value={formData.contact}
        />
        <select
          name="assignedWard"
          onChange={changeHandler}
          value={formData.assignedWard}
        >
          <option>Select Ward</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
          <option value="Fifth">Fifth</option>
        </select>
        {data ? (
          <button
            onClick={() => {
              updateHandler();
              isClosed();
            }}
          >
            {" "}
            Edit Patient
          </button>
        ) : (
          <button onClick={() => submitHandler()}>Add Patient </button>
        )}
      </div>
    </div>
  );
};

export default PatientForm;
