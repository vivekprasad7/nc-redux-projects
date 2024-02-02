import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addTeacher, editTeacher } from "../../redux/slices/Teacher"


export const TeacherForm = ({data =null, isClose}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialFormData = {
        name: "",
        subject:"",
        contact : { phoneNo: "", address: ""}
    }

    const [ form, setForm] = useState(data ? data : initialFormData)

    const changeHandler = (e) => {
        const { name, value} = e.target
        setForm((prevForm) => ({...prevForm, [name]: value}))
        console.log(form)
    }

    const newSubmitHandler = () => {
        if(
            form.name &&
            form.subject &&
            form.contact.phoneNo &&
            form.contact.address
        ) {
            dispatch(addTeacher(form))
            setForm(initial)
            navigate("/teacher-data")
        }
    }

    const editSubmitHandler = () => {
        if(
            form.name &&
            form.subject &&
            form.contact.phoneNo &&
            form.contact.address
        ) {
            dispatch(editTeacher(form))
            console.log(form)
        }
    }

    return(
        <div className="form">
            <h1>ADD TEACHER</h1>
            <input 
            name="name"
            type="text" 
            value={form.name}
            onChange={changeHandler}
            placeholder="Enter Name"
            />
             <input 
            name="subject"
            type="text" 
            value={form.subject}
            onChange={changeHandler}
            placeholder="Enter Subject"
            />
             <input 
            name="phoneNo"
            type="text" 
            value={form.contact.phoneNo}
            onChange={(e) => setForm({...form, contact: {...form.contact, phoneNo:e.target.value}})}
            placeholder="Enter Phone Number"
            />
              <input 
            name="address"
            type="text" 
            value={form.contact.address}
            onChange={(e) => setForm({...form, contact: {...form.contact, address:e.target.value}})}
            placeholder="Enter Address"
            />
            {
                data ? ( <button onClick={() => {editSubmitHandler(); isClose();}}>Edit Teacher</button>)
                : (<button onClick={() => {newSubmitHandler}}>Add Teacher</button>)
            }

        </div>
    )
}