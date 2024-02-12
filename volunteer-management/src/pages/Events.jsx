import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { deleteEvent, getEvents } from '../redux/slices/Event';
import EventForm from '../components/eventsForm/eventsForm';

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

const Events = () => {
    const { status, events } = useSelector((store) => store.event)
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
            dispatch(getEvents())
        }
    }, [status, dispatch])
    return (
        <div>
            <h1>Events</h1>
            <div>
                <button onClick={() => navigate("/add-event")}>Add Event</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>

                        <th>Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Requirements</th>
                        <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events?.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.date}</td>
                                        <td>{item.location}</td>
                                        <td>{item.description}</td>
                                        <td>{item.requirements}</td>
                                        <td>
                                            <button onClick={() => handleOpenEditModal(item)}>Edit</button>
                                            <button onClick={() => dispatch(deleteEvent(item._id))}>Delete</button>
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
                    <EventForm data={editData} isClosed={handleCloseEditModal}/>
                </Box>
            </Modal>
        </div>
    )
}

export default Events