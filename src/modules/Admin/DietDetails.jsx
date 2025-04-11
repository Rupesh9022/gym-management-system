import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { logEvent } from "../../utils/logger"

function DietDetails() {
  const [dietPlans, setDietPlans] = useState([])
  const [newDietPlan, setNewDietPlan] = useState({ name: "", description: "" })
  const [members, setMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState("")

  useEffect(() => {
    fetchDietPlans()
    fetchMembers()
  }, [])

  const fetchDietPlans = async () => {
    const querySnapshot = await getDocs(collection(db, "dietPlans"))
    setDietPlans(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  const fetchMembers = async () => {
    const querySnapshot = await getDocs(collection(db, "members"))
    setMembers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  const addDietPlan = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "dietPlans"), newDietPlan)
      setNewDietPlan({ name: "", description: "" })
      fetchDietPlans()
      logEvent("Diet plan added", { name: newDietPlan.name })
    } catch (error) {
      console.error("Error adding diet plan:", error)
      logEvent("Error adding diet plan", { error: error.message })
    }
  }

  const deleteDietPlan = async (id) => {
    try {
      await deleteDoc(doc(db, "dietPlans", id))
      fetchDietPlans()
      logEvent("Diet plan deleted", { dietPlanId: id })
    } catch (error) {
      console.error("Error deleting diet plan:", error)
      logEvent("Error deleting diet plan", { error: error.message })
    }
  }

  const assignDietPlan = async (e) => {
    e.preventDefault()
    try {
      const memberRef = doc(db, "members", selectedMember)
      await updateDoc(memberRef, {
        dietPlanId: e.target.dietPlan.value,
      })
      logEvent("Diet plan assigned", { memberId: selectedMember, dietPlanId: e.target.dietPlan.value })
      setSelectedMember("")
    } catch (error) {
      console.error("Error assigning diet plan:", error)
      logEvent("Error assigning diet plan", { error: error.message })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Diet Details</h2>
      <form onSubmit={addDietPlan} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Diet Plan Name"
          value={newDietPlan.name}
          onChange={(e) => setNewDietPlan({ ...newDietPlan, name: e.target.value })}
          className="input w-full"
          required
        />
        <textarea
          placeholder="Diet Plan Description"
          value={newDietPlan.description}
          onChange={(e) => setNewDietPlan({ ...newDietPlan, description: e.target.value })}
          className="input w-full h-32 resize-none"
          required
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">
          Add Diet Plan
        </button>
      </form>
      <h3 className="font-semibold mb-2">Current Diet Plans</h3>
      <ul className="mb-6">
        {dietPlans.map((plan) => (
          <li key={plan.id} className="flex justify-between items-center mb-2">
            <span>{plan.name}</span>
            <button onClick={() => deleteDietPlan(plan.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold mb-2">Assign Diet Plan to Member</h3>
      <form onSubmit={assignDietPlan} className="space-y-4">
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="input w-full"
          required
        >
          <option value="">Select Member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        <select name="dietPlan" className="input w-full" required>
          <option value="">Select Diet Plan</option>
          {dietPlans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary w-full">
          Assign Diet Plan
        </button>
      </form>
    </div>
  )
}

export default DietDetails

