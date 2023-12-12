import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

function NavTabs() {
  const currentPage = useLocation().pathname;
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // Function to handle logout
  const logout = () => {
    // Your logout logic here
    Auth.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">BreadCrumbs</Link>
      <button className="navbar-toggler" type="button" onClick={handleNavCollapse} aria-expanded={!isNavCollapsed} aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={currentPage === '/about' ? 'nav-link active' : 'nav-link'}>About</Link>
          </li>

          {Auth.loggedIn() ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/me">
                  View My Profile
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/signup" className={currentPage === '/signup' ? 'nav-link active' : 'nav-link'}>Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}>Login</Link>
              </li>
            </>
          )}

          <li className="nav-item">
            <Link to="/map" className={currentPage === '/map' ? 'nav-link active' : 'nav-link'}>Map</Link>
          </li>
          <li className="nav-item">
            <Link to="/friends" className={currentPage === '/friends' ? 'nav-link active' : 'nav-link'}>Friends</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavTabs;