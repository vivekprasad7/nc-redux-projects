import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStudents } from '../redux/slices/Student'

const SchoolPage = () => {

  const dispatch = useDispatch()
  const {status, students} = useSelector((state) => state.student)

  useEffect(() => {
    if(status === "idle"){
      dispatch(getStudents())
    }
  }, [dispatch, status])

  const averageAttendance = useMemo(() => {
    return (
      students?.reduce((acc, curr) => acc + +curr.attendance, 0) / students?.length
    )
  }, [dispatch, status])

  const averageMarks = useMemo(() => {
    return students?.reduce((acc, curr) => acc + +curr.marks, 0) / students?.length
  }, [dispatch, status])

  const topStudent = useMemo(() => {
    if(students) {
      return [...students].sort((a,b) =>b.marks - a.marks)
    }
  }, [dispatch, status])

  return (
    <div>
        <h3>Total Students</h3>
      {status === "loading" ? (
        <p>loading...</p>
      ) : (
        <p>{students?.length} students</p>
      )}
      <h3>Averge Attendance</h3>
      {status === "loading" ? (
        <p>loading...</p>
      ) : (
        <p>{averageAttendance}% attendance</p>
      )}
      <h3>Averge Marks</h3>
      {status === "loading" ? <p>loading...</p> : <p>{averageMarks} number</p>}
      <h3>Top Performing Student</h3>
      {status === "loading" ? <p>loading...</p> : <p>{topStudent[0]?.name}</p>}
    </div>
  )
}

export default SchoolPage