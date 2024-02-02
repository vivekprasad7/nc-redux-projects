import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux"
import { addStudent, editStudent } from "../../redux/slices/Student"

const StudentForm = ({data =null, isClose}) => {

    const navigate = useNavigate()

    const initialFormData = {
        name:"",
        age:"",
        grade:"",
        attendance:"",
        marks:"",
        gender:"",
        class:""
    }

    const dispatch = useDispatch()
    const [form, setForm] = useState(data? data : initialFormData)

    const changeHandler = (e) => {
        const {name, value} = e.target
        setForm((prevForm)=> ({...prevForm, [name]: value}))
        console.log(form)
    }

    const newSubmitHandler = () => {
        console.log(form)
        if (
            form.name && 
            form.age && 
            form.grade && 
            form.attendance &&
            form.gender &&
            form.class 
        ) {
            dispatch(addStudent(form))
            navigate("/")
            setForm(initialFormData)
        }
    }

    const editSubmitHandler = () => {
        if(
            form.name && 
            form.age && 
            form.grade && 
            form.attendance &&
            form.gender &&
            form.class 
        ) {
            dispatch(editStudent(form))
            console.log(form)
        }
    }


    return(
        <div className="form">
            <h1>Form</h1>
            <input
            name="name" 
            type="text" 
            onChange={changeHandler}
            value={form.name}
            placeholder="Enter name"
            />
             <input
            name="age" 
            type="text" 
            onChange={changeHandler}
            value={form.age}
            placeholder="Enter Age"
            />
             <input
            name="grade" 
            type="text" 
            onChange={changeHandler}
            value={form.grade}
            placeholder="Enter grade"
            />
             <input
            name="attendance" 
            type="number" 
            onChange={changeHandler}
            value={form.attendance}
            placeholder="Enter Attendance"
            />
             <input
            name="marks" 
            type="text" 
            onChange={changeHandler}
            value={form.marks}
            placeholder="Enter Marks"
            />
            <select name="gender" onChange={changeHandler} value={form.gender}>
                <option>
                    Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <select name="class" onChange={changeHandler} value={form.class} id="">
                <option selected>
                    Select Class
                </option>
                {
                    [6,7,8,9,10,11,12].map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))
                }

            </select>

            {
                data ?
                 (<button onClick={() => {editSubmitHandler(); isClose();}}>Edit Student</button>) 
                 : (<button onClick={() => {newSubmitHandler}}>Add Student</button>) 

            }
            


        </div>
    )
}

export default StudentForm