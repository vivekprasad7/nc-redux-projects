
import './App.css'
import Header from './components/header/Header'
import Events from './pages/Events'
import Volunteers from './pages/Volunteers'
import { Routes, Route } from "react-router-dom"
import AddEvent from './pages/addEvent'
import AddVolunteer from './pages/addVolunteer'

function App() {

  return (

    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Volunteers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/add-volunteer" element={<AddVolunteer />} />



      </Routes>

    </div>


  )
}

export default App
