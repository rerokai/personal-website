import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useLocation } from 'react-router-dom';
import './App.css'
import { Header } from './header/Header'
import { Routes, Route } from "react-router-dom"
import { Me } from './me/Me'
import { Projects} from './prj/Projects'
import { Dashboard } from './hehe/Dashboard'
import { MineDashboard } from './hehe/Mine-Dashboard';
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
        <Route path="/minecraft-dashboard" element={<MineDashboard/>}/>
        <Route path="/hosting-dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App