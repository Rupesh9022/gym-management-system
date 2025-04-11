import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { logEvent } from "../../utils/logger"

function BillingSystem() {
  const [memberId, setMemberId] = useState("")
  const [amount, setAmount] = useState("")
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

  const handleCreateBill = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "bills"), {
        memberId,
        amount: Number.parseFloat(amount),
        date: new Date(),
      })
      logEvent("Bill created", { memberId, amount })
      setMemberId("")
      setAmount("")
    } catch (error) {
      console.error("Error creating bill:", error)
      logEvent("Error creating bill", { error: error.message })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Bill</h2>
      <form onSubmit={handleCreateBill} className="space-y-4">
        <div>
          <label htmlFor="member" className="block text-sm font-medium text-gray-700">
            Select Member
          </label>
          <select
            id="member"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
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
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Bill
        </button>
      </form>
    </div>
  )
}

export default BillingSystem

