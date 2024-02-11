import React from 'react'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import {useNavigate} from "react-router-dom"
import { addEvent, updateEvent } from '../../redux/slices/Event'

const EventForm = ({data = null, isClosed}) => {

    const initialFormInput = {
        name: "",
        data: "",
        location: "",
        description: "",
        requirements: ""
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
            formInput.date &&
            formInput.location &&
            formInput.description &&
            formInput.requirements
            ) {

            dispatch(addEvent(formInput))
            setFormInput(initialFormInput)
            navigate("/")
            }
    }

    const updateHandler = () => {
        if(
            formInput.name &&
            formInput.date &&
            formInput.location &&
            formInput.description &&
            formInput.requirements
            ) {

            dispatch(updateEvent(formInput))
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
            name="date"
            type="date"
            placeholder='Enter Date'
            value={formInput.date}
            onChange={changeHandler}
            />
             <input
            name="location"
            type="text"
            placeholder='Enter Location'
            value={formInput.location}
            onChange={changeHandler}
            />
             <input
            name="description"
            type="text"
            placeholder='Enter Description'
            value={formInput.description}
            onChange={changeHandler}
            />
             <input
            name="requirements"
            type="text"
            placeholder='Enter Requirements'
            value={formInput.requirements}
            onChange={changeHandler}
            />
            {
                data ? <button onClick={() => {updateHandler()}}>Edit Event</button> :<button onClick={() => {submitHandler()}}>Add Event</button> 
            }

        </div>
    )
}

export default EventForm