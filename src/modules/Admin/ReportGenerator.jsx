import React, { useState } from "react"
import { db } from "../../services/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { logEvent } from "../../utils/logger"

function ReportGenerator() {
  const [reportType, setReportType] = useState("membership")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reportData, setReportData] = useState(null)

  const generateReport = async (e) => {
    e.preventDefault()
    try {
      let data = []
      switch (reportType) {
        case "membership":
          const membersSnapshot = await getDocs(collection(db, "members"))
          data = membersSnapshot.docs.map((doc) => doc.data())
          break
        case "financial":
          const billsQuery = query(
            collection(db, "bills"),
            where("date", ">=", new Date(startDate)),
            where("date", "<=", new Date(endDate)),
          )
          const billsSnapshot = await getDocs(billsQuery)
          data = billsSnapshot.docs.map((doc) => doc.data())
          break
        // Add more report types as needed
      }
      setReportData(data)
      logEvent("Report generated", { type: reportType, startDate, endDate })
    } catch (error) {
      console.error("Error generating report:", error)
      logEvent("Error generating report", { error: error.message })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Generate Reports</h2>
      <form onSubmit={generateReport} className="space-y-4">
        <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="input w-full">
          <option value="membership">Membership Report</option>
          <option value="financial">Financial Report</option>
          <option value="attendance">Attendance Report</option>
        </select>
        {reportType === "financial" && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input w-full"
              required
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input w-full"
              required
            />
          </>
        )}
        <button type="submit" className="btn btn-primary w-full">
          Generate Report
        </button>
      </form>
      {reportData && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Report Results:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(reportData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default ReportGenerator

