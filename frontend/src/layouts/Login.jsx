import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../slices/authSlice';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/auth';

  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [oldPasswordReset, setOldPasswordReset] = useState('');
  const [newPasswordReset, setNewPasswordReset] = useState('');
  const [confirmPasswordReset, setConfirmPasswordReset] = useState('');
  const [resetStatus, setResetStatus] = useState('idle');
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(null);

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetError(null);
    setResetSuccess(null);
    if (newPasswordReset !== confirmPasswordReset) {
      setResetError('New passwords do not match');
      return;
    }
    setResetStatus('loading');
    try {
      const res = await axios.put(`${API_URL}/reset-password`, {
        email: resetEmail,
        oldPassword: oldPasswordReset,
        newPassword: newPasswordReset,
      });
      setResetStatus('succeeded');
      setResetSuccess(res.data.message || 'Password updated successfully');
      setResetEmail('');
      setOldPasswordReset('');
      setNewPasswordReset('');
      setConfirmPasswordReset('');
      setIsResetMode(false);
    } catch (err) {
      setResetStatus('failed');
      setResetError(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="auth-card">
      {!isResetMode ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password
              <input type="password" autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
          <p>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            <button type="button" onClick={() => setIsResetMode(true)}>Reset Password</button>
          </p>
        </>
      ) : (
        <>
          <h2>Reset Password</h2>
          <form onSubmit={handleResetSubmit}>
            <label>
              Email
              <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
            </label>
            <label>
              Old Password
              <input type="password" value={oldPasswordReset} onChange={(e) => setOldPasswordReset(e.target.value)} required />
            </label>
            <label>
              New Password
              <input type="password" value={newPasswordReset} onChange={(e) => setNewPasswordReset(e.target.value)} required />
            </label>
            <label>
              Confirm New Password
              <input type="password" value={confirmPasswordReset} onChange={(e) => setConfirmPasswordReset(e.target.value)} required />
            </label>
            <button type="submit" disabled={resetStatus === 'loading'}>
              {resetStatus === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
            {resetError && <p className="error">{resetError}</p>}
            {resetSuccess && <p className="success">{resetSuccess}</p>}
          </form>
          <p>
            <button type="button" onClick={() => { setIsResetMode(false); setResetError(null); setResetSuccess(null); }}>Back to Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
