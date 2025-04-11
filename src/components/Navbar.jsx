import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../services/AuthContext"

function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  // Don't render the navbar on the landing page
  if (location.pathname === "/") {
    return null
  }
  if (location.pathname === "/about") {
    return null
  }
  if (location.pathname === "/services") {
    return null
  }
  if (location.pathname === "/contact") {
    return null
  }


  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          GymPro
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/member" className="hover:text-blue-200">
                Dashboard
              </Link>
              <button onClick={logout} className="hover:text-blue-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-blue-200">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-blue-200">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

