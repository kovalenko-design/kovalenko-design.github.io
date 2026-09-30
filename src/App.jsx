import { useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import { Agentation } from 'agentation'
import cases from './cases/index'
import { pageTitle } from './pageTitle'

// Keeps the tab title in step with the page as people move around the site.
function PageTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    const id = pathname.replace(/^\/|\/$/g, '')
    const openCase = cases.find((c) => c.id === id)
    document.title = pageTitle(id === 'about' ? 'About' : openCase ? openCase.title : 'Product Designer')
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <PageTitle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* A case address, like /panther: the home page with that case open */}
        <Route path="/:caseId" element={<Home />} />
        {/* Anything else goes to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
    </BrowserRouter>
  )
}
