import React, { useState } from "react"
import { db } from "../../services/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { logEvent } from "../../utils/logger"
import styles from "../../styles/SearchRecords.module.css"

function SearchRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const q = query(
        collection(db, "records"),
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
      )
      const snapshot = await getDocs(q)
      const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setSearchResults(results)
      logEvent("Records searched", { term: searchTerm, resultCount: results.length })
    } catch (error) {
      console.error("Error searching records:", error)
      logEvent("Error searching records", { error: error.message })
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Search Records</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search records..."
          className="input flex-grow"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <ul className="space-y-2">
        {searchResults.map((result) => (
          <li key={result.id} className="p-2 bg-gray-100 rounded">
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchRecords

