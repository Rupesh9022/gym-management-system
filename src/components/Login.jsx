import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../services/AuthContext"
import { logEvent } from "../utils/logger"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("member")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      logEvent("User logged in", { email, role })
      navigate(role === "admin" ? "/admin" : "/member")
    } catch (error) {
      console.error("Login failed:", error)
      logEvent("Login failed", { email, error: error.message })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <div className="flex justify-around">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="member"
                checked={role === "member"}
                onChange={() => setRole("member")}
                className="form-radio"
              />
              <span className="ml-2">Member</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="form-radio"
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login