
import './App.css'
import Header from './components/header/Header'
import Volunteers from './pages/Volunteers'
import { Routes, Route } from "react-router-dom"

function App() {

  return (

    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Volunteers />} />
      </Routes>

    </div>


  )
}

export default App
