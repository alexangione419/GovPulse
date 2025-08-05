import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SidePanel, Home } from './pages'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'


export default function App(): React.JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidePanel />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)