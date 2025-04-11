import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { logEvent } from "../../utils/logger"
import styles from "../../styles/BillNotifications.module.css"

function BillNotifications() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const q = query(collection(db, "notifications"), orderBy("date", "desc"), limit(5))
        const snapshot = await getDocs(q)
        const notificationList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setNotifications(notificationList)
        logEvent("Notifications fetched", { count: notificationList.length })
      } catch (error) {
        console.error("Error fetching notifications:", error)
        logEvent("Error fetching notifications", { error: error.message })
      }
    }

    fetchNotifications()
  }, [])

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li key={notification.id} className="p-2 bg-gray-100 rounded">
            <p>{notification.message}</p>
            <span className="text-sm text-gray-500">{notification.date.toDate().toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BillNotifications

