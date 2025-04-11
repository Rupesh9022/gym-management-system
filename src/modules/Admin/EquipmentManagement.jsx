import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { logEvent } from "../../utils/logger"
import { useAuth } from "../../services/AuthContext"

function EquipmentManagement() {
  const [equipments, setEquipments] = useState([])
  const [newEquipment, setNewEquipment] = useState({ name: "", quantity: "" })
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchEquipments()
    }
  }, [user])

  const fetchEquipments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "equipments"))
      const equipmentList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setEquipments(equipmentList)
    } catch (error) {
      console.error("Error fetching equipments:", error)
      logEvent("Error fetching equipments", { error: error.message })
    }
  }

  const handleAddEquipment = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "equipments"), newEquipment)
      setNewEquipment({ name: "", quantity: "" })
      fetchEquipments()
      logEvent("Equipment added", { name: newEquipment.name })
    } catch (error) {
      console.error("Error adding equipment:", error)
      logEvent("Error adding equipment", { error: error.message })
    }
  }

  const handleDeleteEquipment = async (id) => {
    try {
      await deleteDoc(doc(db, "equipments", id))
      fetchEquipments()
      logEvent("Equipment deleted", { id })
    } catch (error) {
      console.error("Error deleting equipment:", error)
      logEvent("Error deleting equipment", { error: error.message })
    }
  }

  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Equipment Management</h2>
      <form onSubmit={handleAddEquipment} className="mb-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Equipment Name"
            value={newEquipment.name}
            onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newEquipment.quantity}
            onChange={(e) => setNewEquipment({ ...newEquipment, quantity: e.target.value })}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Equipment
        </button>
      </form>
      <ul className="space-y-2">
        {equipments.map((equipment) => (
          <li key={equipment.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>
              {equipment.name} (Qty: {equipment.quantity})
            </span>
            <button
              onClick={() => handleDeleteEquipment(equipment.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EquipmentManagement

