import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {FaSort, FaSortDown, FaSortUp} from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import "../css/style.css";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // State for rows per page
  const [sortConfig, setSortConfig] = useState({key:null, direction:"asc"});
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get("https://denticadentalstudio.com/webapp/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.data.users);
        // console.log(res.data.data.users);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch user data",
        });
      })
      .finally(() => {
        setLoading(false);
      });
      setEmail("")
      setPass("")
  };
  useEffect(()=>{
    fetchData();
  },[]);
  const handleUserSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password: pass };

    axios
      .post("https://denticadentalstudio.com/webapp/api/user/store", newUser, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User data saved successfully!",
        });
        fetchData();
        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to save user data",
        });
      });

    setName("");
    setEmail("");
    setPass("");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            "https://denticadentalstudio.com/webapp/api/user/delete",
            { id },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "User data deleted successfully!",
            });
            fetchData();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete user data",
            });
          });
      }
    });
  };

  const handleSort = (key) => {
    // If the same column is clicked again, toggle the direction
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(()=>{
    let sortableData = [...data];
    if (sortConfig.key !== null){
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });      
    }
    return sortableData;
  }, [data, sortConfig])
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value)); // Update rows per page
    setCurrentPage(1); // Reset current page when changing rows per page
  };

  const itemsPerPage = rowsPerPage;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      </li>
    );
  }
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        return <FaSortUp />;
      } else if (sortConfig.direction === "desc") {
        return <FaSortDown />;
      }
    }
    return <FaSort />;
  };

  return (
    <div>
      {loading && (
        <div className="preloaderContainer">
          <div className="preloaderBg">
            <div className="preloader"></div>
            <div className="preloader2"></div>
          </div>
        </div>
      )}
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2 text-left">
                <div className="col-sm-6">
                  <h1>General Form</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      User
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title text-white">Add User</h3>
                    </div>
                    <form onSubmit={handleUserSubmit}>
                      <div className="card-body text-left">
                        <div className="form-group">
                          <label htmlFor="exampleInputName">
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter your name ..."
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail">
                            Email <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter your email ..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword">
                            Password <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Password ..."
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            required
                          />
                        </div>
                      </div>
                      <div className="card-footer text-left">
                        <button
                          type="submit"
                          className="btn text-white form-dlt-btn"
                          style={{ backgroundColor: "#ca629d" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-8">
                  <div className="card">
                    <div
                      className="card-header text-light"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title">User List</h3>
                    </div>
                    <div className="search-bar"></div>
                    <div className="table-container">
                      <div className="card-body">
                        <div
                          className="form-group d-flex align-items-center"
                          style={{ gap: "10px" }}
                        >
                          <label htmlFor="rowsPerPage">Rows Per Page:</label>
                          <input
                            type="number"
                            className="form-control"
                            id="rowsPerPage"
                            min="1"
                            onChange={handleRowsPerPageChange}
                            value={rowsPerPage}
                            style={{ width: "100px" }}
                          />
                        </div>
                        <table
                          className="table table-bordered table-hover"
                          style={{ overflowX: "auto" }}
                        >
                          <thead>
                            <tr>
                              <th style={{ cursor: "pointer"}}
                                onClick = {()=> handleSort('id')}
                              >No {getSortIcon("id")}</th>
                              <th style={{ cursor: "pointer"}}
                                onClick = {()=> handleSort('name')}
                                >Name{getSortIcon("name")}</th>
                              <th>Email Address</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedData.slice(startIndex, endIndex).map((user, index) => (
                              <tr key={user.id}>  
                                <td>{startIndex + index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                  <Link
                                    to={`/users/edit/${user.id}`}
                                    className="form-btn"
                                    style={{
                                      border: "1px solid #17a2b8",
                                      padding: "5px",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <span style={{ color: "#17a2b8" }}>
                                      <BiSolidEdit />
                                    </span>
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(user.id)}
                                    className="form-btn-dlt"
                                    style={{
                                      border: "1px solid red",
                                      padding: "4px",
                                      backgroundColor: "white",
                                      color: "red",
                                    }}
                                  >
                                    <MdDelete />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row" style={{ display: "flex" }}>
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing {startIndex + 1} to{" "}
                          {Math.min(endIndex, data.length)} of {data.length}{" "}
                          entries
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-7">
                        <div className="dataTables_paginate paging_simple_numbers">
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() =>
                                  setCurrentPage((prev) => prev - 1)
                                }
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                            </li>
                            {paginationButtons.map((button) => button)}
                            <li
                              className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() =>
                                  setCurrentPage((prev) => prev + 1)
                                }
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default User;
