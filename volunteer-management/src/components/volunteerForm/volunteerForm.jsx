import React from 'react'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import {useNavigate} from "react-router-dom"
import { addVolunteer, updateVolunteer } from '../../redux/slices/Volunteer'

const VolunteerForm = ({data = null, isClosed}) => {

    const initialFormInput = {
        name: "",
        age: "",
        skills: "",
        availability: "",
        eventHistory: ""
    }
    const [formInput, setFormInput] = useState(data ? data : initialFormInput)

    const changeHandler = (e) => {
        const { name, value} = e.target
        setFormInput((prevForm) => ({...prevForm, [name] : value}))
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        if(
            formInput.name &&
            formInput.age &&
            formInput.skills &&
            formInput.availability &&
            formInput.eventHistory
            ) {

            dispatch(addVolunteer(formInput))
            setFormInput(initialFormInput)
            navigate("/")
            }
    }

    const updateHandler = () => {
        if(
            formInput.name &&
            formInput.age &&
            formInput.skills &&
            formInput.availability &&
            formInput.eventHistory
            ) {

            dispatch(updateVolunteer(formInput))
            setFormInput(initialFormInput)
            navigate("/")
            }
    }

    return (
        <div className='form'>
            <input
            name="name"
            type="text"
            placeholder='Enter Name'
            value={formInput.name}
            onChange={changeHandler}
            />
             <input
            name="age"
            type="text"
            placeholder='Enter Age'
            value={formInput.age}
            onChange={changeHandler}
            />
             <input
            name="skills"
            type="text"
            placeholder='Enter Skills'
            value={formInput.skills}
            onChange={changeHandler}
            />
            <select  name="availability"
            type="text"
            placeholder='Enter Availability'
            value={formInput.availability}
            onChange={changeHandler}>
                    <option >Select Availability</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>


            </select>
             
             <input
            name="eventHistory"
            type="text"
            placeholder='Enter Event History'
            value={formInput.eventHistory}
            onChange={changeHandler}
            />
            {
                data ? <button onClick={() => {updateHandler()}}>Edit Volunteer</button> :<button onClick={() => {submitHandler()}}>Add Volunteer</button> 
            }

        </div>
    )
}

export default VolunteerForm