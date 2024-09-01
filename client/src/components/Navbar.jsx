import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className='sticky top-0 bg-white shadow-md z-50 w-full'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-mono font-bold'>Book Barter</h1>
          </div>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
              <NavLink to="/RecommendedBooks" currentPath={location.pathname} >Recommended Books</NavLink>
              <NavLink to="/exchange-requests" currentPath={location.pathname}>Exchange Requests</NavLink>
              <NavLink to="/library" currentPath={location.pathname}>Your Library</NavLink>
            </div>
          </div>
          <div className='hidden md:block'>
            <button onClick={handleLogout}
              className='px-4 py-2 text-sm rounded font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>
              Logout
            </button>
          </div>
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
              <span className='sr-only'>Open main menu</span>
              {isMenuOpen ? (
                <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <NavLink to="/" currentPath={location.pathname} mobile>Home</NavLink>
            <NavLink to="/RecommendedBooks" currentPath={location.pathname} mobile>Recommended Books</NavLink>
            <NavLink to="/exchange-requests" currentPath={location.pathname} mobile>Exchange Requests</NavLink>
            <NavLink to="/library" currentPath={location.pathname} mobile>Your Library</NavLink>
            <button onClick={handleLogout}
              className='w-full text-left px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, currentPath, children, mobile }) => {
  const baseClasses = 'text-sm font-medium';
  const desktopClasses = `${baseClasses} hover:text-[#007bff]`;
  const mobileClasses = `${baseClasses} block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white`;
  const activeClasses = 'text-[#007bff]';
  const inactiveClasses = 'text-gray-700';

  const classes = mobile ? mobileClasses : desktopClasses;
  const activeState = currentPath === to ? activeClasses : inactiveClasses;

  return (
    <Link to={to} className={`${classes} ${activeState}`}>
      {children}
    </Link>
  );
};

export default NavBar;
