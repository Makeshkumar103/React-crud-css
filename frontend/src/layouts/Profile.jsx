import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, logout } from '../slices/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="auth-card">
      <h2>Profile</h2>
      {status === 'loading' && <p>Loading profile...</p>}
      {error && <p className="error">{error}</p>}
      {user && (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button type="button" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
        

      )}
    </div>
  );
}

export default Profile;
