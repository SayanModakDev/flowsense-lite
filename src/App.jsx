import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';

// 1. Lazy load your pages
const HomePage = lazy(() => import('./pages/HomePage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const RecommendPage = lazy(() => import('./pages/RecommendPage'));

function App() {
  return (
    // 2. Wrap routes in a Suspense boundary for seamless loading
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-slate-500">Loading map data...</div>}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
