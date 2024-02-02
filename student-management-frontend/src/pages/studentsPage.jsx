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


const StudentsPage = () => {
    const dispatch = useDispatch()
    const { students, status} = useSelector((store) => store.student)


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
                                        <button className='table-btn' onClick={()=> { isStudentOpen(); setStudentDetails(row)}}>View</button>
                                        <button className='table-btn' onClick={()=> { isOpen(); setStudentDetails(row)}}>Edit</button>
                                        <button className='table-btn' onClick={() => dispatch(deleteStudent(row?._id))}>Delete</button>
                                    </TableCell>



                                </TableRow>
                            ))
                        }
                    </TableBody>


                </Table>

            </TableContainer>
        }

    </div>
  )
}

export default StudentsPage