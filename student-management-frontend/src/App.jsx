import Header from './components/header/Header'
import {Routes, Route} from 'react-router-dom'
import StudentsPage from './pages/studentsPage'
import ClassPage from './pages/classPage'
import TeachersPage from './pages/teachersPage'
import SchoolPage from './pages/schoolPage'
import AddStudent from './pages/addStudent'
import AddTeacher from './pages/addTeacher'

function App() {

  return (
    
      <div className='top'>
        <Header/>
        <Routes>
          <Route path="/" element={<StudentsPage/>}/>
          <Route path="/teacher" element={<TeachersPage/>}/>
          <Route path="/class" element={<ClassPage/>}/>
          <Route path="/school" element={<SchoolPage/>}/>
          <Route path="/add/student" element={<AddStudent/>}/>
          <Route path="/add/teacher" element={<AddTeacher/>}/>
        </Routes>

      </div>
    
  )
}

export default App
