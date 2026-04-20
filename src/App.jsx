import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import RecommendPage from './pages/RecommendPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="recommend" element={<RecommendPage />} />
      </Route>
    </Routes>
  )
}

export default App
