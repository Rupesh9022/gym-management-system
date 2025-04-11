import React from "react"
import { useAuth } from "../../services/AuthContext"
import BillReceipts from "./BillReceipts"
import BillNotifications from "./BillNotifications"
import ChangePassword from "../../components/ChangePassword"

function MemberDashboard() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Member Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BillReceipts />
        <BillNotifications />
        <ChangePassword />
      </div>
    </div>
  )
}

export default MemberDashboard

