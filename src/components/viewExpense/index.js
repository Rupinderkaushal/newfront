import React, { useEffect, useState } from "react";
import "../expenses/style.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewExpense = ({ user }) => {
  const [expenseList, setExpenseList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editHandler = async (data) => {
    navigate(`/edit-expenses/${data}`);
  };
  const delHandler = async (data) => {
    const resp = await axios.delete(
      `https://newback-vc3e.onrender.com/delete-expense/${data}`
    );
    if (resp.status === 200) {
      toast.success("Entry Deleted Successfully", {
        position: "top-right", // Define the position here
      });
      expenseHandler();
    } else {
      toast.error("Error Occurred during deletion", {
        position: "top-right", // Define the position here
      });
      alert("error occurred");
    }
  };
  const expenseHandler = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://newback-vc3e.onrender.com/list-expenses/${user}`
    );
    setExpenseList(resp.data);
    const total = resp.data.reduce(
      (acc, curr) => acc + parseFloat(curr.amount),
      0
    );
    setTotalAmount(total);
    setIsLoading(false);
  };
  useEffect(() => {
    if (user) {
      expenseHandler();
    }
  }, [user]);

  function getDayName(date = new Date(), locale = "en-US") {
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  function formatDate(dateString) {
    const [day, month, year] = dateString.split('/');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day}${getOrdinalSuffix(day)}${months[parseInt(month, 10) - 1]}${year}`;
  }

  function getOrdinalSuffix(day) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = parseInt(day, 10) % 100;
    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  return (
    <div>
      <div className="expense-list">
        <div className="btn-div">
          <h1>Expenses List</h1>
        </div>
        <div className="table-div-wrapper">
          <table className="table-wrapper">
            <thead>
              <tr style={{ color: "white" }}>
                <th>Title</th>
                <th>Amount</th>
                <th>Day</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {expenseList &&
                expenseList
                .sort((a, b) => new Date(b.date) - new Date(a.date)) 
                .map((val, index) => (
                  <tr style={{ color: "white" }} key={index}>
                    <td className="title-td">{val.title}</td>
                    <td>{val.amount}</td>
                    <td>{getDayName(new Date(val.date))}</td>
                    <td>{formatDate(val.date)}</td>
                    <td className="edit-wrapper">
                      <button
                        onClick={() => editHandler(val._id)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => delHandler(val._id)}
                        className="del-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="total-tr">
          <p>Grand Total</p>
          <p className="total-amount">{totalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewExpense;
