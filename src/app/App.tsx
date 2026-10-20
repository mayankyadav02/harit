import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="min-h-screen bg-forest-green text-ivory">
      <Outlet />
    </div>
  );
}
