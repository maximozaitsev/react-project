import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Main from './components/Main/Main'
import UncontrolledForm from './components/UnconrtolledForm/UncontrolledForm'
import ReactHookForm from './components/ControlledForm/ReactHookForm'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/react-hook-form">React Hook Form</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
      </Routes>
    </Router>
  )
}

export default App
