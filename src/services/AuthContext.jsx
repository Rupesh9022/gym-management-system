import React, { createContext, useContext, useState, useEffect } from "react"
import { auth } from "./firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { logEvent } from "../utils/logger"
import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
      if (user) {
        logEvent("User authenticated", { userId: user.uid })
      }
    })

    return unsubscribe
  }, [])

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    logEvent("User logged out", { userId: user?.uid })
    return signOut(auth).then(() => {
      // Redirect to the landing page after logout
      window.location.href = "/"
    })
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const checkUserRole = async (uid) => {
    const userRef = doc(db, "users", uid)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      return userSnap.data().role
    }
    return null
  }

  const value = {
    user,
    signup,
    login,
    logout,
    resetPassword,
    checkUserRole,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

