import { Input, OutlinedInput } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const User = () => {
  let [name, setName] = useState("");
  let [uname, setUname] = useState("");
  let [email, setEmail] = useState("");
  let [roll, setRoll] = useState("");
  let [pass, setPass] = useState("");
  let [searchQuery, setSearchQuery] = useState("");
  let [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Check if token is available
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  let obj = {
    name: name,
    uname: uname,
    email: email,
    roll: roll,
    pass: pass,
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleUsersubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/userForm`, obj)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Saved Successfully !",
          showConfirmButton: false,
          timer: 1000,
        });
        fetchData();
        // setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error !",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:5000/userForm`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          .delete(`http://localhost:5000/userForm/${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              title: "Data Deleted Successfully !",
              icon: "success",
              confirmButtonText: "Close",
            });
            fetchData(); // Assuming you have a function named fetchData to fetch updated data
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error occurred while deleting !",
              icon: "error",
              confirmButtonText: "Close",
            });
          });
      }
    });
  };

  const itemsPerPage = 5;

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.uname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roll.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li
        key={i}
        className={`paginate_button page-item ${
          currentPage === i ? "active" : ""
        }`}
      >
        <a
          href="#"
          aria-controls="example1"
          data-dt-idx="0"
          tabIndex="0"
          className="page-link"
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </a>
      </li>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="wrapper">
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
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
            {/* /.container-fluid */}
          </section>

          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-4">
                  {/* general form elements */}
                  <div className="card">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title text-white">Add User</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form onSubmit={handleUsersubmit}>
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
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputUsername">
                            Username <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername"
                            placeholder="Enter your username ..."
                            onChange={(e) => setUname(e.target.value)}
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
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputRoll">
                            Role <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputRoll"
                            placeholder="Enter your Role ..."
                            onChange={(e) => setRoll(e.target.value)}
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
                          />
                        </div>
                      </div>
                      {/* /.card-body */}

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
                  {/* /.card */}
                </div>
                {/* /./</br>col (right) */}
                {/* <div> */}
                <section className="content col-8">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div
                            className="card-header text-light"
                            style={{ backgroundColor: "rgb(37, 111, 152)" }}
                          >
                            <h3 className="card-title">User List</h3>
                          </div>
                          <div className="search-bar">
                            <OutlinedInput
                              type="text"
                              variant="outlined"
                              placeholder="Search.."
                              value={searchQuery}
                              onChange={(e) => handleSearch(e.target.value)}
                              style={{ height: "30px", margin: "10px 0" }}
                            />
                          </div>
                          <div className="table-container">
                            <div className="card-body">
                              <table
                                id="example2"
                                className="table table-bordered table-hover"
                                style={{ overflowX: "auto" }}
                              >
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email Address</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {displayedData.map((ele, id) => (
                                    <tr key={id}>
                                      <td>
                                        {(currentPage - 1) * itemsPerPage +
                                          id +
                                          1}
                                      </td>
                                      <td>{ele.name}</td>
                                      <td>{ele.uname}</td>
                                      <td>{ele.email}</td>
                                      <td>{ele.roll}</td>
                                      <td>
                                        <button
                                          type="button"
                                          className="text-light form-dlt-btn"
                                          style={{
                                            border: "0",
                                            backgroundColor: "#ca629d",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                          }}
                                          onClick={() => {
                                            handleDelete(ele.id);
                                          }}
                                        >
                                          Delete
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
                                id="example1_info"
                                role="status"
                                aria-live="polite"
                              >
                                Showing{" "}
                                {currentPage * itemsPerPage - itemsPerPage + 1}{" "}
                                to{" "}
                                {Math.min(
                                  currentPage * itemsPerPage,
                                  filteredData.length
                                )}{" "}
                                of {filteredData.length} entries
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="example1_paginate"
                              >
                                <ul className="pagination">
                                  <li
                                    className={`paginate_button page-item previous ${
                                      currentPage === 1 ? "disabled" : ""
                                    }`}
                                    id="example1_previous"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="example1"
                                      data-dt-idx="10"
                                      tabIndex="0"
                                      className="page-link"
                                      onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                      }
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  {paginationButtons}
                                  <li
                                    className={`paginate_button page-item next ${
                                      currentPage === totalPages
                                        ? "disabled"
                                        : ""
                                    }`}
                                    id="example1_next"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="example1"
                                      data-dt-idx="0"
                                      tabIndex="0"
                                      className="page-link"
                                      onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                      }
                                    >
                                      Next
                                    </a>
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default User;
