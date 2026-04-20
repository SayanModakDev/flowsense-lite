import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="app-shell flex flex-col min-h-screen pb-24 px-4 pt-4">
      <main className="flex-1 max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
