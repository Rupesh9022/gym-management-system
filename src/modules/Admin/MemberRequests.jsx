import React, { useState, useEffect } from "react"
import { getPendingMemberRequests, approveMemberRequest, rejectMemberRequest } from "../../services/firestore"
import { logEvent } from "../../utils/logger"

function MemberRequests() {
  const [pendingRequests, setPendingRequests] = useState([])

  useEffect(() => {
    fetchPendingRequests()
  }, [])

  const fetchPendingRequests = async () => {
    try {
      const requests = await getPendingMemberRequests()
      setPendingRequests(requests)
    } catch (error) {
      console.error("Error fetching pending requests:", error)
      logEvent("Error fetching pending requests", { error: error.message })
    }
  }

  const handleApprove = async (requestId, userId, name, email) => {
    try {
      await approveMemberRequest(requestId, userId, name, email)
      logEvent("Member request approved", { requestId, userId, name, email })
      fetchPendingRequests()
    } catch (error) {
      console.error("Error approving member request:", error)
      logEvent("Error approving member request", { error: error.message })
    }
  }

  const handleReject = async (requestId) => {
    try {
      await rejectMemberRequest(requestId)
      logEvent("Member request rejected", { requestId })
      fetchPendingRequests()
    } catch (error) {
      console.error("Error rejecting member request:", error)
      logEvent("Error rejecting member request", { error: error.message })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pending Member Requests</h2>
      {pendingRequests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul className="space-y-4">
          {pendingRequests.map((request) => (
            <li key={request.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
              <span>
                {request.name} ({request.email})
              </span>
              <div>
                <button
                  onClick={() => handleApprove(request.id, request.userId, request.name, request.email)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MemberRequests

