import React, { useEffect, useState } from "react";
import {
    deleteTeacher,
    getTeachers,
    teacherSlice,
} from "../redux/slices/Teacher";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TeacherForm } from "../components/teacherForm/teacherForm";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

const TeachersPage = () => {
    const { teachers, status } = useSelector((store) => store?.teacher);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState([]);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const isOpen = () => setOpen(true);
    const isClose = () => setOpen(false);

    console.log(teachers, "teacher");

    useEffect(() => {
        if (status === "idle") {
            dispatch(getTeachers());
        }
    }, [dispatch, teachers]);
    return (
        <div>
            <button className="add-btn" onClick={() => navigate("/add/teacher")}>
                Add Teacher
            </button>
            {status === "loading" ? (
                <p>Data may take some time to load, please wait..</p>
            ) : (
                <TableContainer component={Paper}>
                    <Table
                        sx={{ maxWidth: 650, margin: "auto", border: "1px solid black" }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Name</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Subject</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Phone Number</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Address</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Actions</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teachers?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row?.name}
                                    </TableCell>
                                    <TableCell align="right">{row?.subject}</TableCell>
                                    <TableCell align="right">{row?.contact.phoneNo}</TableCell>
                                    <TableCell align="right">{row?.contact.address}</TableCell>
                                    <TableCell align="right">
                                        <button
                                            className="btn-edit"
                                            onClick={() => {
                                                isOpen();
                                                setFormData(row);
                                                console.log(row);
                                            }}
                                        >
                                            {" "}
                                            Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => dispatch(deleteTeacher(row?._id))}
                                        >
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Modal
            open={open}
            onClose={isClose}
            aria-labelledby = "modal-modal-title"
            aria-describedby ="modal-modal-description"
            >
                <Box sx={style}>
                        <TeacherForm data={formData} isClose={isClose}/>
                </Box>

            </Modal>
        </div>
    );
};

export default TeachersPage;
