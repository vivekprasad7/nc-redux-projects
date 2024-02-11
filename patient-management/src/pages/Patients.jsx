import { useDispatch, useSelector } from "react-redux";
import PatientForm from "../components/patientForm/patientForm";
import { useEffect, useState } from "react";
import { deletePatient, getPatients } from "../redux/slices/Patient";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxHeight: "100vh",
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const PatientPage = () => {
  const { status, patients } = useSelector((store) => store.patient);

  const [patientInfo, setPatientInfo] = useState({});

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = (patient) => {
    setOpenEditModal(true);
    setPatientInfo(patient);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(patients);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPatients());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h1>Patients</h1>
      <div className="add">
        <button onClick={() => navigate("/add-patient")}>Add Patient</button>
      </div>
      <table className="table">
        <thead>
          <th>Name</th>
          <th>Age</th>
          <th>Medical History</th>
          <th>Gender</th>
          <th>Contact</th>
          <th>Assigned Ward</th>
          <th>Add/Edit</th>
        </thead>
        <tbody>
          {patients.map((patient) => {
            return (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.medicalHistory}</td>
                <td>{patient.gender}</td>
                <td>{patient.contact}</td>
                <td>{patient.assignedWard}</td>
                <td>
                  <button onClick={() => handleOpenEditModal(patient)}>
                    Edit
                  </button>
                  <button onClick={() => dispatch(deletePatient(patient._id))}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <PatientForm data={patientInfo} isClosed={handleCloseEditModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default PatientPage;
