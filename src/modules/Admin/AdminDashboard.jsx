import React, { useState } from "react"
import { useAuth } from "../../services/AuthContext"
import MemberList from "./MemberList"
import BillingSystem from "./BillingSystem"
import NotificationSystem from "./NotificationSystem"
import ReportGenerator from "./ReportGenerator"
import EquipmentManagement from "./EquipmentManagement"
import MemberRequests from "./MemberRequests"
import { Users, DollarSign, Bell, FileText, Dumbbell, UserPlus } from "lucide-react"

function AdminDashboard() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("memberRequests")

  const renderSection = () => {
    switch (activeSection) {
      case "memberRequests":
        return <MemberRequests />
      case "memberList":
        return <MemberList />
      case "billing":
        return <BillingSystem />
      case "notifications":
        return <NotificationSystem />
      case "reports":
        return <ReportGenerator />
      case "equipment":
        return <EquipmentManagement />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-700">
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-blue-400">Admin Dashboard</h2>
        </div>
        <nav className="mt-4">
          <NavItem
            icon={<UserPlus />}
            label="Member Requests"
            active={activeSection === "memberRequests"}
            onClick={() => setActiveSection("memberRequests")}
          />
          <NavItem
            icon={<Users />}
            label="Member List"
            active={activeSection === "memberList"}
            onClick={() => setActiveSection("memberList")}
          />
          <NavItem
            icon={<DollarSign />}
            label="Billing"
            active={activeSection === "billing"}
            onClick={() => setActiveSection("billing")}
          />
          <NavItem
            icon={<Bell />}
            label="Notifications"
            active={activeSection === "notifications"}
            onClick={() => setActiveSection("notifications")}
          />
          <NavItem
            icon={<FileText />}
            label="Reports"
            active={activeSection === "reports"}
            onClick={() => setActiveSection("reports")}
          />
          <NavItem
            icon={<Dumbbell />}
            label="Equipment"
            active={activeSection === "equipment"}
            onClick={() => setActiveSection("equipment")}
          />
        </nav>
      </div>
      <div className="flex-1 p-10 overflow-y-auto bg-white">{renderSection()}</div>
    </div>
  )
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <a
      href="#"
      className={`flex items-center py-2 px-4 text-sm ${
        active ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </a>
  )
}

export default AdminDashboard

