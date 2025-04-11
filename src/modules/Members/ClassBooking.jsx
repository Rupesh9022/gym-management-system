import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from "firebase/firestore"
import { useAuth } from "../../services/AuthContext"
import { logEvent } from "../../utils/logger"

function ClassBooking() {
  const [classes, setClasses] = useState([])
  const [bookedClasses, setBookedClasses] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    fetchClasses()
    fetchBookedClasses()
  }, [user])

  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes"))
      const classList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setClasses(classList)
    } catch (error) {
      console.error("Error fetching classes:", error)
      logEvent("Error fetching classes", { error: error.message })
    }
  }

  const fetchBookedClasses = async () => {
    try {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid))
      const querySnapshot = await getDocs(q)
      const bookingList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setBookedClasses(bookingList)
    } catch (error) {
      console.error("Error fetching booked classes:", error)
      logEvent("Error fetching booked classes", { error: error.message })
    }
  }

  const bookClass = async (classId) => {
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        classId: classId,
        bookedAt: new Date(),
      })
      fetchBookedClasses()
      logEvent("Class booked", { classId })
    } catch (error) {
      console.error("Error booking class:", error)
      logEvent("Error booking class", { error: error.message })
    }
  }

  const cancelBooking = async (bookingId) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId))
      fetchBookedClasses()
      logEvent("Booking cancelled", { bookingId })
    } catch (error) {
      console.error("Error cancelling booking:", error)
      logEvent("Error cancelling booking", { error: error.message })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Class Booking</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Available Classes</h3>
        <ul className="space-y-2">
          {classes.map((cls) => (
            <li key={cls.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>
                {cls.name} - {cls.time}
              </span>
              <button
                onClick={() => bookClass(cls.id)}
                className="btn btn-sm btn-primary"
                disabled={bookedClasses.some((booking) => booking.classId === cls.id)}
              >
                Book
              </button>
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-medium mt-6">Your Booked Classes</h3>
        <ul className="space-y-2">
          {bookedClasses.map((booking) => {
            const bookedClass = classes.find((cls) => cls.id === booking.classId)
            return (
              <li key={booking.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>
                  {bookedClass?.name} - {bookedClass?.time}
                </span>
                <button onClick={() => cancelBooking(booking.id)} className="btn btn-sm btn-danger">
                  Cancel
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ClassBooking

