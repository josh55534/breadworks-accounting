import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
const token = localStorage.getItem("token");

function JournalEntry() {
  // TODO: ADD JOURNAL ENTRY FILE DOWNLOAD
  const { journalEntryID } = useParams();
  const [debitAccountID, setDebitID] = useState([]);
  const [debitAccountName, setDebitName] = useState([]);
  const [creditAccountID, setCreditID] = useState([]);
  const [creditAccountName, setCreditName] = useState([]);
  const [creditAmount, setcredit] = useState([]);
  const [debitAmount, setDebit] = useState([]);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const [journalStatus, setStatus] = useState("");
  const [toBeVerified, setToBeVerified] = useState(false);
  const [isManager, setManager] = useState("");

  const navigate = useNavigate();

  if (token) {
    var decoded = jwt_decode(token);
  }

  useEffect(() => {
    // TODO: GET ACTUAL JOURNAL ENTRY DATA
    setDebitID(["1-001", "1-002"]);
    setDebitName(["Cash", "Test"]);
    setCreditID(["2-001"]);
    setCreditName(["Debt"]);
    setDebit([200.00, 2.99]);
    setcredit([202.99]);
    setDesc("This is a journal entry");
    setDate("2/23/2023");
    setStatus("pending");

    if (journalStatus === "pending") setToBeVerified(true);
    if (decoded.user.role === "manager") setManager(true);
  })

  const handleVerify = () => {

  }

  const statusColor = (status) => {
    if (status === "approved") {
      return ("text-green-500")
    }
    else if (status === "pending") {
      return ("text-yellow-500")
    }
    else if (status === "rejected") {
      return ("text-red-500")
    }
  }

  return (
    <>
      <div className="window-primary max-w-3xl">
        <div className="flex justify-between">
          <h2>Journal Entry: {journalEntryID}</h2>
          <div className="flex flex-row gap-2 text-lg">
            <p>Status:</p>
            <p className={statusColor(journalStatus)}><strong>{journalStatus}</strong></p>
          </div>
        </div>
        <div className="form-primary">
          <table className="user-table">
            <thead>
              <tr>
                <th className="user-table-header text-left">
                  Date
                </th>
                <th className="user-table-header text-left">
                  Account
                </th>
                <th className="user-table-header text-center">
                  Debit
                </th>
                <th className="user-table-header text-center">
                  Credit
                </th>
              </tr>
            </thead>
            <tbody>
              {debitAccountID.map((d, index) => (
                <tr className="user-table-body">
                  <td>
                    {index === 0 && date}
                  </td>
                  <td>
                    {debitAccountID[index] + ": " + debitAccountName[index]}
                  </td>
                  <td className="text-center">
                    {debitAmount[index]}
                  </td>
                </tr>
              ))}
              {creditAccountID.map((d, index) => (
                <tr className="user-table-body">
                  <td>
                  </td>
                  <td className="pl-10">
                    {creditAccountID[index] + ": " + creditAccountName[index]}
                  </td>
                  <td className="text-center">
                  </td>
                  <td className="text-center">
                    {creditAmount[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-lg"><strong>Description:</strong> {desc}</p>
          <div className="flex justify-between">
            <button className="btn-primary btn-color-red" onClick={() => navigate(-1)}>
              Back
            </button>
            {toBeVerified && isManager && (
              <button className="btn-primary"
                onClick={handleVerify}
              >
                Update Status
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export { JournalEntry };