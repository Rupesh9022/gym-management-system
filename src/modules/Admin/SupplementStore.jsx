import React, { useState, useEffect } from "react"
import { db } from "../../services/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { logEvent } from "../../utils/logger"

function SupplementStore() {
  const [supplements, setSupplements] = useState([])
  const [newSupplement, setNewSupplement] = useState({ name: "", price: "", stock: "" })

  useEffect(() => {
    fetchSupplements()
  }, [])

  const fetchSupplements = async () => {
    const querySnapshot = await getDocs(collection(db, "supplements"))
    setSupplements(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  const addSupplement = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "supplements"), {
        ...newSupplement,
        price: Number(newSupplement.price),
        stock: Number(newSupplement.stock),
      })
      setNewSupplement({ name: "", price: "", stock: "" })
      fetchSupplements()
      logEvent("Supplement added", { name: newSupplement.name })
    } catch (error) {
      console.error("Error adding supplement:", error)
      logEvent("Error adding supplement", { error: error.message })
    }
  }

  const deleteSupplement = async (id) => {
    try {
      await deleteDoc(doc(db, "supplements", id))
      fetchSupplements()
      logEvent("Supplement deleted", { supplementId: id })
    } catch (error) {
      console.error("Error deleting supplement:", error)
      logEvent("Error deleting supplement", { error: error.message })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Supplement Store</h2>
      <form onSubmit={addSupplement} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Supplement Name"
          value={newSupplement.name}
          onChange={(e) => setNewSupplement({ ...newSupplement, name: e.target.value })}
          className="input w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newSupplement.price}
          onChange={(e) => setNewSupplement({ ...newSupplement, price: e.target.value })}
          className="input w-full"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={newSupplement.stock}
          onChange={(e) => setNewSupplement({ ...newSupplement, stock: e.target.value })}
          className="input w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Supplement
        </button>
      </form>
      <h3 className="font-semibold mb-2">Current Inventory</h3>
      <ul>
        {supplements.map((supplement) => (
          <li key={supplement.id} className="flex justify-between items-center mb-2">
            <span>
              {supplement.name} - ${supplement.price} (Stock: {supplement.stock})
            </span>
            <button onClick={() => deleteSupplement(supplement.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SupplementStore

