import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
