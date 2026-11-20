import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './App.css'
import { Header } from './header/Header'
import { Routes, Route } from "react-router-dom"
import { Me } from './me/Me'
import { Projects} from './prj/Projects'
import { NotFound } from './NotFound'


function App() {

    const location = useLocation();
      const showHeader = ['/', '/projects', ''].includes(location.pathname);
  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Me />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App