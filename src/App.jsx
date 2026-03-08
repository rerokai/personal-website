import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './header/Header'
import { Routes, Route } from "react-router-dom"
import { Me } from './Me'



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Me />} />
        <Route path="/projects" element={<div>Проекты</div>} />
        <Route path="/blog" element={<div>Блог</div>} />
      </Routes>
    </>
  )
}

export default App