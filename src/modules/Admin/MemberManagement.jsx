import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"
import { logEvent } from "../../utils/logger"

function MemberManagement() {
  const [members, setMembers] = useState([])
  const [memberRequests, setMemberRequests] = useState([])
  const [newMember, setNewMember] = useState({ name: "", email: "", feePackage: "" })

  useEffect(() => {
    fetchMembers()
    fetchMemberRequests()
  }, [])

  const fetchMembers = async () => {
    const querySnapshot = await getDocs(collection(db, "members"))
    setMembers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  const fetchMemberRequests = async () => {
    const querySnapshot = await getDocs(collection(db, "memberRequests"))
    setMemberRequests(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  const addMember = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "members"), newMember)
      setNewMember({ name: "", email: "", feePackage: "" })
      fetchMembers()
      logEvent("Member added", { email: newMember.email })
    } catch (error) {
      console.error("Error adding member:", error)
      logEvent("Error adding member", { error: error.message })
    }
  }

  const deleteMember = async (id) => {
    try {
      await deleteDoc(doc(db, "members", id))
      fetchMembers()
      logEvent("Member deleted", { memberId: id })
    } catch (error) {
      console.error("Error deleting member:", error)
      logEvent("Error deleting member", { error: error.message })
    }
  }

  const approveMember = async (request) => {
    try {
      await addDoc(collection(db, "members"), {
        name: request.name,
        email: request.email,
        feePackage: "Basic", // Default package
      })
      await deleteDoc(doc(db, "memberRequests", request.id))
      fetchMembers()
      fetchMemberRequests()
      logEvent("Member request approved", { email: request.email })
    } catch (error) {
      console.error("Error approving member:", error)
      logEvent("Error approving member", { error: error.message })
    }
  }

  const rejectMember = async (id) => {
    try {
      await deleteDoc(doc(db, "memberRequests", id))
      fetchMemberRequests()
      logEvent("Member request rejected", { requestId: id })
    } catch (error) {
      console.error("Error rejecting member request:", error)
      logEvent("Error rejecting member request", { error: error.message })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Member Management</h2>

      {/* Add Member Form */}
      <form onSubmit={addMember} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className="input mb-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newMember.email}
          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          className="input mb-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Fee Package"
          value={newMember.feePackage}
          onChange={(e) => setNewMember({ ...newMember, feePackage: e.target.value })}
          className="input mb-2 w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Member
        </button>
      </form>

      {/* Member List */}
      <h3 className="font-semibold mb-2">Current Members</h3>
      <ul className="mb-6">
        {members.map((member) => (
          <li key={member.id} className="flex justify-between items-center mb-2">
            <span>
              {member.name} - {member.email} - {member.feePackage}
            </span>
            <button onClick={() => deleteMember(member.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Member Requests */}
      <h3 className="font-semibold mb-2">Member Requests</h3>
      <ul>
        {memberRequests.map((request) => (
          <li key={request.id} className="flex justify-between items-center mb-2">
            <span>
              {request.name} - {request.email}
            </span>
            <div>
              <button onClick={() => approveMember(request)} className="text-green-500 mr-2">
                Approve
              </button>
              <button onClick={() => rejectMember(request.id)} className="text-red-500">
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MemberManagement

