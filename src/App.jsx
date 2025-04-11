import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import AdminDashboard from "./modules/Admin/AdminDashboard"
import MemberDashboard from "./modules/Members/MemberDashboard"
import UserDashboard from "./modules/User/UserDashboard"
import LandingPage from "./components/LandingPage"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import ForgotPassword from "./components/ForgotPassword"
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./services/AuthContext"
import Navbar from "./components/Navbar"
import PendingApproval from "./components/PendingApproval"
import About from "./components/About"
import Services from "./components/Services"
import Contact from "./components/Contact"

function App() {
  const location = useLocation()
  const isLandingPage = location.pathname === "/"

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        {!isLandingPage && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/member"
            element={
              <PrivateRoute>
                <MemberDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App

