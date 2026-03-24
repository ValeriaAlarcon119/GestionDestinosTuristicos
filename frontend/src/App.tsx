import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { DestinationsPage } from './features/destinations/DestinationsPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/destinations" replace />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="*" element={<Navigate to="/destinations" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
