import React, { useState, useEffect } from 'react'
import TwitterLogo from './twitter-clone-logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { Route, Link } from 'react-router-dom'
import { login, getProfile, signUp } from './services/apiService'
import ProtectedRoute from './components/ProtectedRoute'
import authService from './services/authService'
import SignUp from './components/SignUp'

// Npm uninstall, npm install

// Npm audit

// ****Npm audit --force

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const signOutUser = () => {
    authService.signOut()
    setIsSignedIn(false);
    setUser({});
  }

  const loginUser = async (credentials) => {
    try {
      const fetchedUser = await login(credentials);
      setIsSignedIn(true);
      setUser(fetchedUser);
    } catch (e) {
      console.error("Error logging in:", e);
      throw e;
    }
  }

  const signUpUser = async (credentials) => {
    try {
      console.log('credentials in signUpUser', credentials)
      const newUser = await signUp(credentials);
      setIsSignedIn(true);
      setUser(newUser);
    } catch (e) {
      console.error("Error signing up:", e);
      throw e;
    }
  }

  useEffect(() => {
    const fetchedUserData = async () => {
      try {
        const fetchedUser = await getProfile();
        setIsSignedIn(authService.isAuthenticated());
        setUser(fetchedUser);
      } catch (e) {
        console.log('Issue fetching token')
      }
    };
    fetchedUserData();
  }, [])

  return (
      <div className='App'>
     <nav className='p-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <img className='w-20' src={TwitterLogo} alt='' />
        </div>
{/* <h2 className="font-bold bg-red-400 p-4 rounded">The application is currently undergoing maintenance</h2> */}
        <div className='flex items-center space-x-4'>
          {!isSignedIn && (
            <>
              <Link to='/login' className='text-xl font-bold text-blue-500'>
                Login
              </Link>
              <Link to='/signup' className='text-xl font-bold text-blue-500'>
                Sign Up
              </Link>
            </>
          )}

          {isSignedIn && (
            <button
            className='text-xl font-bold text-blue-500'
              onClick={signOutUser}
            >
              Sign out
            </button>
          )}
        </div>
      </nav>

        <main>
          <ProtectedRoute 
            path='/dashboard' 
            user={user}
            component={Dashboard} 
          />
          <Route
            path='/login'
            render={
              (props) =>
                <Login
                  {...props}
                  handleLogin={loginUser}
                  isSignedIn={isSignedIn}
                />
            }
          />
          <Route
            path='/signup'
            render={
              (props) =>
                <SignUp
                  {...props}
                  userId={user.id}
                  handleSignUp={signUpUser}
                  isSignedIn={isSignedIn}
                />
            }
          />
        </main>
      </div>
    )
}

export default App
