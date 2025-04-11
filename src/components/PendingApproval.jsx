import React from "react"
import { Link } from "react-router-dom"

function PendingApproval() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Registration Pending</h2>
        <p className="text-gray-600 mb-6">
          Your registration is currently under review. Please wait for admin approval before signing in.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

export default PendingApproval

