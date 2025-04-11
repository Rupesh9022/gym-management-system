import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useAuth } from "../../services/AuthContext"
import { logEvent } from "../../utils/logger"

function WorkoutPlan() {
  const [workoutPlan, setWorkoutPlan] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchWorkoutPlan()
  }, [user])

  const fetchWorkoutPlan = async () => {
    try {
      const q = query(collection(db, "workoutPlans"), where("userId", "==", user.uid))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        setWorkoutPlan(querySnapshot.docs[0].data())
        logEvent("Workout plan fetched", { userId: user.uid })
      }
    } catch (error) {
      console.error("Error fetching workout plan:", error)
      logEvent("Error fetching workout plan", { error: error.message })
    }
  }

  if (!workoutPlan) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Workout Plan</h2>
        <p>No workout plan available. Please contact a trainer.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Workout Plan</h2>
      <div className="space-y-4">
        {Object.entries(workoutPlan.exercises).map(([day, exercises]) => (
          <div key={day}>
            <h3 className="text-lg font-medium">{day}</h3>
            <ul className="list-disc list-inside">
              {exercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutPlan

