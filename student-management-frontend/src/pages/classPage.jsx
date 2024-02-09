import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStudents } from '../redux/slices/Student'
import { classReset, classSetter, genderSetter, sortSetter } from '../redux/slices/Class'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'

import "../App.css"

const style = {
    cursor: "pointer",
    "&:hover": {
        color: "#666"
    }
}

const ClassPage = () => {
    const dispatch = useDispatch()
    const { students, status } = useSelector((state) => state.student)
    const { gender, standard, sortBy } = useSelector((state) => state.class)
    

    useEffect(() => {
        dispatch(getStudents())
    }, [dispatch])

    const classHandler = (e) => {
        console.log(e.target.value)
        dispatch(classSetter(e.target.value))
    }

    const classFilter = useMemo(() => {
        return standard === "all" ? students : students.filter(item => item.class === standard)
    }, [standard, students])

    const genderFilter = useMemo(() => {
        return gender ? classFilter.filter(item => item.gender === gender) : classFilter
    }, [classFilter, gender])

    const sortFilter = useMemo(() => {
        if (sortBy === "none") {
            return genderFilter;
        } else if (sortBy === "name") {
            return [...genderFilter].sort((a, b) => a.name.localeCompare(b.name))
        } else {
            return [...genderFilter].sort((a, b) => a[sortBy] - b[sortBy])
        }
    }, [genderFilter, sortBy])


    return (
        <div>
            <div className='class-sort-filters'>
                <select onChange={classHandler} value={standard}>
                    <option value="all">All</option>
                    <option value="6">6th Class</option>
                    <option value="7">7th Class</option>
                    <option value="8">8th Class</option>
                    <option value="9">9th Class</option>
                    <option value="10">10th Class</option>
                    <option value="11">11th Class</option>
                    <option value="12">12th Class</option>
                </select>
                <label htmlFor="gender-male">
                    <input type="radio" name="gender" checked={gender === "male"} onChange={() => dispatch(genderSetter("male"))} id="gender-male" /> Male
                </label>
                <label htmlFor="gender-female">
                    <input type="radio" name="gender" checked={gender === "female"} onChange={() => dispatch(genderSetter("female"))} id="gender-female" /> Female
                </label>
                <button onClick={() => dispatch(classReset())}>Reset</button>
                {
                    <table className='table-class'>
                        <thead>

                        <tr>
                            <td style={style} className='table-head-sort'><b>Name</b><SortByAlphaIcon style={{color:"blue"}} onClick={() => dispatch(sortSetter("name"))} /> </td>
                            <td><b>Class</b></td>
                            <td style={style} className='table-head-sort'><b>Age</b><SortByAlphaIcon style={{color:"blue"}} onClick={() => dispatch(sortSetter("age"))} /> </td>
                            <td><b>Gender</b></td>
                            <td style={style} className='table-head-sort'><b>Attendance</b><SortByAlphaIcon style={{color:"blue"}} onClick={() => dispatch(sortSetter("attendance"))} /> </td>
                            <td><b>Grade</b></td>
                            <td style={style} className='table-head-sort'><b>Marks</b><SortByAlphaIcon style={{color:"blue"}} onClick={() => dispatch(sortSetter("marks"))} /> </td>
                        </tr>
                        </thead>
                        <tbody>

                        {sortFilter?.map((row, index) => <tr key={index}>
                            <td>{row?.name}</td>
                            <td>{row?.class}</td>
                            <td>{row?.age}</td>
                            <td>{row?.gender}</td>
                            <td>{row?.attendance}</td>
                            <td>{row?.grade}</td>
                            <td>{row?.marks}</td>
                        </tr>)}
                        </tbody>

                    </table>
                }


            </div>



        </div>
    )
}

export default ClassPage