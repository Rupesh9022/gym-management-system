import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { logEvent } from "../../utils/logger"

function NotificationSystem() {
  const [message, setMessage] = useState("")
  const [selectedMember, setSelectedMember] = useState("")
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "member"))
      const querySnapshot = await getDocs(q)
      const memberList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setMembers(memberList)
    } catch (error) {
      console.error("Error fetching members:", error)
      logEvent("Error fetching members", { error: error.message })
    }
  }

  const handleSendNotification = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "notifications"), {
        message,
        memberId: selectedMember,
        date: new Date(),
      })
      logEvent("Notification sent", { message, memberId: selectedMember })
      setMessage("")
      setSelectedMember("")
    } catch (error) {
      console.error("Error sending notification:", error)
      logEvent("Error sending notification", { error: error.message })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
      <form onSubmit={handleSendNotification} className="space-y-4">
        <div>
          <label htmlFor="member" className="block text-sm font-medium text-gray-700">
            Select Member
          </label>
          <select
            id="member"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows="3"
            className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Send Notification
        </button>
      </form>
    </div>
  )
}

export default NotificationSystem

