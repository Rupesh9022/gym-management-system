import { db } from "./firebase"
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore"

export const createPendingMemberRequest = async (userId, name, email) => {
  await addDoc(collection(db, "pendingMembers"), {
    userId,
    name,
    email,
    status: "pending",
    createdAt: new Date(),
  })
}

export const getPendingMemberRequests = async () => {
  const q = query(collection(db, "pendingMembers"), where("status", "==", "pending"))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const approveMemberRequest = async (requestId, userId, name, email) => {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)
  
    if (!userSnap.exists()) {
      // Create the user document if it doesn't exist
      await setDoc(userRef, { role: "member", name, email })
    } else {
      // Update the existing user document
      await updateDoc(userRef, { role: "member", name, email })
    }
  
    // Update the pending member request
    await updateDoc(doc(db, "pendingMembers", requestId), { status: "approved" })
  
    // Add the user to the members collection
    await setDoc(doc(db, "members", userId), { name, email })
}

export const rejectMemberRequest = async (requestId) => {
    await deleteDoc(doc(db, "pendingMembers", requestId))
}
  

