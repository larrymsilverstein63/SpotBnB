import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter your username and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      login(username.trim(), password);
      navigate('/', { replace: true });
    } catch {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* Background image strip */}
      <div className="login-bg" />

      <div className="login-card">
        {/* Airbnb branding */}
        <div className="login-brand">
          <MapPin size={32} color="#FF385C" strokeWidth={2.5} />
          <span className="login-wordmark">airbnb</span>
        </div>

        <div className="login-divider" />

        <h2 className="login-title">Welcome to Airbnb</h2>
        <p className="login-subtitle">Sign in with your ThoughtSpot account to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="login-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Continue'}
          </button>
        </form>

        <p className="login-terms">
          By continuing, you agree to Airbnb's{' '}
          <span className="login-link">Terms of Service</span> and{' '}
          <span className="login-link">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
