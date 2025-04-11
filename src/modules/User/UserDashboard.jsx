import React from "react"
import { useAuth } from "../../services/AuthContext"
import SearchRecords from "./SearchRecords"
import UserDetails from "./UserDetails"

function UserDashboard() {
  const { logout } = useAuth()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UserDetails />
        <SearchRecords />
      </div>
    </div>
  )
}

export default UserDashboard

