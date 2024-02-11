import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWard, updateWard } from "../../redux/slices/Ward";

const WardForm = ({ data = null, isClosed }) => {
  const initialFormData = {
    wardNumber: "",
    capacity: "",
    specialization: ""
  };

  const [formData, setFormData] = useState(data ? data : initialFormData);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    console.log("formData", formData);
    if (formData.wardNumber && formData.capacity && formData.specialization) {
      dispatch(addWard(formData));
      setFormData(initialFormData);
      navigate("/wards");
    }
  };

  const updateHandler = () => {
    console.log("formData", formData);
    if (formData.wardNumber && formData.capacity && formData.specialization) {
      dispatch(updateWard(formData));
      setFormData(initialFormData);
      navigate("/wards");
    }
  };

  return (
    <div>
      <h1>Ward Form</h1>
      <div>
        <input
          name="wardNumber"
          type="text"
          placeholder="Add Ward Number"
          value={formData.wardNumber}
          onChange={changeHandler}
        />
        <input
          name="capacity"
          type="number"
          placeholder="Add Ward Capacity"
          value={formData.capacity}
          onChange={changeHandler}
        />
        <select
          name="specialization"
          type="text"
          value={formData.specialization}
          onChange={changeHandler}
        >
          <option>Select Specialization</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Surgery">Surgery</option>
          <option value="ICU">ICU</option>
        </select>

        {data ? (
          <button
            onClick={() => {
              updateHandler();
              isClosed();
            }}
          >
            Edit Ward{" "}
          </button>
        ) : (
          <button
            onClick={() => {
              submitHandler();
            }}
          >
            Add Ward{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default WardForm;
