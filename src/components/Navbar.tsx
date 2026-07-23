import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Globe,
  AlignJustify,
  UserCircle,
  BarChart2,
  Bot,
  Search,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, username } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div
        className="navbar-logo"
        onClick={() => navigate('/')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
      >
        <MapPin size={28} color="#FF385C" strokeWidth={2.5} />
        <span className="airbnb-wordmark">airbnb</span>
      </div>

      {/* Center: Search pill */}
      <div className="navbar-search">
        <button className="search-pill" onClick={() => navigate('/')}>
          <span className="search-section">Anywhere</span>
          <span className="search-divider" />
          <span className="search-section">Any week</span>
          <span className="search-divider" />
          <span className="search-section search-guests-text">Add guests</span>
          <span className="search-btn-circle">
            <Search size={14} color="white" strokeWidth={3} />
          </span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="navbar-actions">
        {/* Existing Airbnb nav items */}
        <button className="nav-text-btn">Airbnb your home</button>

        <button className="nav-icon-round" title="Language and currency">
          <Globe size={16} strokeWidth={1.5} />
        </button>

        {/* Analytics — NEW */}
        <button
          className={`nav-feature-btn${isActive('/analytics') ? ' nav-feature-btn--active' : ''}`}
          onClick={() => navigate('/analytics')}
          title="Analytics Dashboard"
        >
          <BarChart2 size={17} />
          <span>Analytics</span>
        </button>

        {/* AI — NEW */}
        <button
          className={`nav-feature-btn nav-feature-btn--ai${isActive('/ai') ? ' nav-feature-btn--active' : ''}`}
          onClick={() => navigate('/ai')}
          title="AI — Powered by ThoughtSpot Spotter"
        >
          <Bot size={17} />
          <span>AI-rbnb</span>
        </button>

        {/* Profile pill */}
        <div
          className="profile-pill"
          onClick={() => setMenuOpen((o) => !o)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setMenuOpen((o) => !o)}
        >
          <AlignJustify size={16} strokeWidth={1.5} />
          <UserCircle size={28} color="#717171" strokeWidth={1} />
        </div>

        {menuOpen && (
          <>
            <div
              className="dropdown-backdrop"
              onClick={() => setMenuOpen(false)}
            />
            <div className="profile-dropdown">
              <div className="dropdown-username">{username}</div>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
              >
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
