
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import PatientPage from './pages/Patients'
import WardsPage from './pages/Wards'
import AddPatients from './pages/addPatients'
import AddWards from './pages/addWards'
import Hospital from './pages/Hospital'

function App() {

  return (
    <>
      <div>
      <Header />
      <Routes>
        <Route path="/" element={<PatientPage />} />
        <Route path="/wards" element={<WardsPage />} />
        <Route path="/add-patient" element={<AddPatients />} />
        <Route path="/add-ward" element={<AddWards />} />
        <Route path="/hospital" element={<Hospital />} />
      </Routes>
      </div>
      
    </>
  )
}

export default App
