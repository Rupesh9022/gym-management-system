import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useAuth } from "../../services/AuthContext"
import { logEvent } from "../../utils/logger"

function BillReceipts() {
  const [receipts, setReceipts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchReceipts = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const q = query(collection(db, "bills"), where("memberId", "==", user.uid))
        const querySnapshot = await getDocs(q)
        const receiptList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setReceipts(receiptList)
        setError(null)
        logEvent("Bill receipts fetched", { count: receiptList.length })
      } catch (error) {
        console.error("Error fetching receipts:", error)
        setError("Failed to load bill receipts. Please try again later.")
        logEvent("Error fetching receipts", { error: error.message })
      } finally {
        setLoading(false)
      }
    }

    fetchReceipts()
  }, [user])

  if (loading) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading bill receipts...</div>
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Bill Receipts</h2>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Bill Receipts</h2>
      {receipts.length === 0 ? (
        <p>No bill receipts found.</p>
      ) : (
        <ul className="space-y-2">
          {receipts.map((receipt) => (
            <li key={receipt.id} className="p-2 bg-gray-100 rounded flex justify-between">
              <span>Date: {receipt.date.toDate().toLocaleDateString()}</span>
              <span>Amount: ${receipt.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BillReceipts

