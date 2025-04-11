import React, { useState, useEffect } from "react"
import { db, auth } from "../../services/firebase"
import { collection, addDoc, doc, getDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { logEvent } from "../../utils/logger"
import { useAuth } from "../../services/AuthContext"

function MemberRegistration() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [membershipType, setMembershipType] = useState("basic")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [membershipDuration, setMembershipDuration] = useState(1)
  const [isAdmin, setIsAdmin] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        const userData = userDoc.data()
        setIsAdmin(userData?.role === "admin")
      }
    }
    checkAdminStatus()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAdmin) {
      setError("You don't have permission to register new members.")
      return
    }
    try {
      // Create user in Firebase Auth
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, Math.random().toString(36).slice(-8))

      // Add user to Firestore
      await addDoc(collection(db, "users"), {
        uid: newUser.uid,
        name,
        email,
        phone,
        address,
        membershipType,
        membershipDuration,
        role: "member",
        joinDate: new Date(),
      })

      // Send password reset email
      await sendPasswordResetEmail(auth, email)

      setMessage("Member registered successfully. A password reset email has been sent.")
      logEvent("Member registered", { email })
      setName("")
      setEmail("")
      setMembershipType("basic")
      setPhone("")
      setAddress("")
      setMembershipDuration(1)
    } catch (error) {
      setError("Failed to register member: " + error.message)
      logEvent("Member registration failed", { error: error.message })
    }
  }

  if (!isAdmin) {
    return <div>You don't have permission to access this page.</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Register New Member</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700">
            Membership Type
          </label>
          <select
            id="membershipType"
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </div>
        <div>
          <label htmlFor="membershipDuration" className="block text-sm font-medium text-gray-700">
            Membership Duration (months)
          </label>
          <input
            type="number"
            id="membershipDuration"
            value={membershipDuration}
            onChange={(e) => setMembershipDuration(Number.parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Register Member
        </button>
      </form>
    </div>
  )
}

export default MemberRegistration

