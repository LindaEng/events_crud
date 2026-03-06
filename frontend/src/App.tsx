import { Routes, Route } from "react-router-dom";
import './App.css'
import Events from "./Events";
import Home from "./Home";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/events" element={<Events />}/>
        <Route path="/events/:id" />
      </Routes>
    </>
  )
}

export default App
