import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { logEvent } from "../../utils/logger"

function MemberList() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "member"))
        const querySnapshot = await getDocs(q)
        const memberList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setMembers(memberList)
        logEvent("Members fetched", { count: memberList.length })
      } catch (error) {
        console.error("Error fetching members:", error)
        logEvent("Error fetching members", { error: error.message })
      }
    }

    fetchMembers()
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Member List</h2>
      {members.length === 0 ? (
        <p>No approved members found.</p>
      ) : (
        <ul className="space-y-2">
          {members.map((member) => (
            <li key={member.id} className="p-2 bg-gray-100 rounded">
              {member.name} ({member.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MemberList

