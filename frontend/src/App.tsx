import { Route, Routes } from 'react-router-dom'
import './App.css'
import Todos from './Todos'
import Home from './Home'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<Todos />} />
      </Routes>
    </>
  )
}

export default App
