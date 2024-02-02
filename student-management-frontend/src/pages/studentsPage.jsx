import React, { useEffect } from 'react'
import { deleteStudent, getStudents } from '../redux/slices/Student'
import { useDispatch, useSelector } from 'react-redux'

import TableContainer from "@mui/material/TableContainer";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/studentForm/studentForm';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const StudentsPage = () => {
    const dispatch = useDispatch()
    const { students, status} = useSelector((store) => store.student)

    const [studentDetailsOpen, setStudentDetailsOpen] = useState(false)
    const [editStudentOpen, setEditStudentOpen] = useState(false)

    const [studentDetails, setStudentDetails] = useState({})

    const isStudentDetailsOpen = () => setStudentDetailsOpen(true)
    const isStudentDetailsClose = () => setStudentDetailsOpen(false)

    const isEditStudentOpen = () => setEditStudentOpen(true)
    const isEditStudentClose = () => setEditStudentOpen(false)

    const navigate = useNavigate()
    const [formData, setFormData] = useState([])

 
    console.log(students, "students")


    useEffect(() => {
        if(status === "idle"){
            dispatch(getStudents())
        }
    },[dispatch, status])

    console.log(students)


  return (
    <div>
        <button className='add-btn' onClick={() => navigate("/add/student")}>Add Student</button>
        {
            status === "loading" ? (<p>Data may take some time to load, Please wait...</p>) :
            <TableContainer component={Paper}>
                <Table sx={{maxWidth:650, margin:"auto", border:"1px solid black"}}  aria-label="simple-table">

                    <TableHead>
                        <TableRow>
                            <TableCell align='right'><b>Name</b></TableCell>
                            <TableCell align='right'><b>Class</b></TableCell>
                            <TableCell align='right'><b>Grade</b></TableCell>
                            <TableCell align='right'><b>Gender</b></TableCell>
                            <TableCell align='right'><b>Marks</b></TableCell>
                            <TableCell align='right'><b>Attendance</b></TableCell>
                            <TableCell align='right'><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            students?.map((row, index) => (
                                <TableRow key={index} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        {row?.name}
                                    </TableCell>
                                    <TableCell align='right'>{row?.class}</TableCell>
                                    <TableCell align='right'>{row?.grade}</TableCell>
                                    <TableCell align='right'>{row?.gender}</TableCell>
                                    <TableCell align='right'>{row?.marks}</TableCell>
                                    <TableCell align='right'>{row?.attendance}</TableCell>
                                    <TableCell align='right'>
                                        <button className='table-btn' onClick={()=> { isStudentDetailsOpen(); setStudentDetails(row)}}>View</button>
                                        <button className='table-btn' onClick={()=> { isEditStudentOpen(); setStudentDetails(row)}}>Edit</button>
                                        <button className='table-btn' onClick={() => dispatch(deleteStudent(row?._id))}>Delete</button>
                                    </TableCell>



                                </TableRow>
                            ))
                        }
                    </TableBody>


                </Table>

            </TableContainer>
        }
        <Modal
        open={editStudentOpen}
        onClose={isEditStudentClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                    <StudentForm data={formData} isClose={isEditStudentClose}/>
            </Box>

        </Modal>
        <Modal
        open={studentDetailsOpen}
        onClose={isStudentDetailsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h1>{studentDetails?.name}</h1>
                <p>Age: {studentDetails?.age}</p>
                <p>Marks: {studentDetails?.marks}</p>
                <p>Attendance: {studentDetails?.attendance}</p>
                <p>Gender: {studentDetails?.gender}</p>
                <p>Grade: {studentDetails?.grade}</p>
            </Box>

        </Modal>

    </div>
  )
}

export default StudentsPage