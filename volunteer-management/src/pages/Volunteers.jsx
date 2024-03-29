import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import VolunteerForm from '../components/volunteerForm/volunteerForm'
import { useEffect } from 'react'
import { deleteVolunteer, getVolunteers } from '../redux/slices/Volunteer'
import { useState } from 'react'
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

const Volunteers = () => {
    const { status, volunteers } = useSelector((store) => store.volunteer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const [editData, setEditData] = useState({})

    const handleOpenEditModal = (data) => {
        setIsEditModalOpen(true)
        setEditData(data)
    }
    const handleCloseEditModal = () => setIsEditModalOpen(false)

    useEffect(() => {
        if (status === "idle") {
            dispatch(getVolunteers())
        }
    }, [status, dispatch])
    return (
        <div>
            <h1>Volunteers</h1>
            <div>
                <button onClick={() => navigate("add-volunteer")}>Add Volunteer</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>

                        <th>Name</th>
                        <th>Age</th>
                        <th>Skills</th>
                        <th>Availability</th>
                        <th>Event History</th>
                        <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            volunteers?.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.skills}</td>
                                        <td>{item.availability}</td>
                                        <td>{item.eventHistory}</td>
                                        <td>
                                            <button onClick={() => handleOpenEditModal(item)}>Edit</button>
                                            <button onClick={() => dispatch(deleteVolunteer(item._id))}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>


            <Modal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style}}>
                    <VolunteerForm data={editData} isClosed={handleCloseEditModal}/>
                </Box>
            </Modal>
        </div>
    )
}

export default Volunteers