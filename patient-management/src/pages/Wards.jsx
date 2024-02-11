import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWard, getWards, updateWard } from "../redux/slices/Ward";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import WardForm from "../components/wardForm/wardForm";

const style = {
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

const WardsPage = () => {
  const { status, wards } = useSelector((store) => store.ward);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [wardInfo, setWardInfo] = useState({});
  const dispatch = useDispatch();

  const handleOpenEditModal = (wardData) => {
    setEditModalOpen(true);
    setWardInfo(wardData);
  };

  const handleCloseEditModal = () => setEditModalOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getWards());
    }
  }, [status, dispatch]);

  // console.log("wards", wards);

  return (
    <div>
      <h1>Wards</h1>
      <div>
        <button onClick={() => navigate("/add-ward")}>Add Ward</button>
        <table>
          <thead>
            <th>Ward Number</th>
            <th>Capacity</th>
            <th>Specialization</th>
            <th>Edit/Delete</th>
          </thead>
          <tbody>
            {wards.map((ward) => {
              return (
                <tr key={ward._id}>
                  <td>{ward.wardNumber}</td>
                  <td>{ward.capacity}</td>
                  <td>{ward.specialization}</td>
                  <td>
                    <button onClick={() => handleOpenEditModal(ward)}>
                      Edit
                    </button>
                    <button onClick={() => dispatch(deleteWard(ward._id))}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <WardForm data={wardInfo} isClosed={handleCloseEditModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default WardsPage;
