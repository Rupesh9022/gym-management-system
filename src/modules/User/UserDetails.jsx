import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useAuth } from "../../services/AuthContext"
import { logEvent } from "../../utils/logger"
import styles from "../../styles/UserDetails.module.css"

function UserDetails() {
  const [userDetails, setUserDetails] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserDetails(docSnap.data())
          logEvent("User details fetched", { userId: user.uid })
        }
      } catch (error) {
        console.error("Error fetching user details:", error)
        logEvent("Error fetching user details", { error: error.message })
      }
    }

    fetchUserDetails()
  }, [user])

  if (!userDetails) {
    return <div className="card">Loading...</div>
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {userDetails.name}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
        <p>
          <strong>Membership Type:</strong> {userDetails.membershipType}
        </p>
        <p>
          <strong>Join Date:</strong> {userDetails.joinDate.toDate().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default UserDetails

