import { Input, OutlinedInput } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

const User = () => {
  let [name, setName] = useState("");
  let [uname, setUname] = useState("");
  let [email, setEmail] = useState("");
  let [roll, setRoll] = useState("");
  let [pass, setPass] = useState("");
  let [searchQuery, setSearchQuery] = useState("");
  let [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  

  let obj = {
    name: name,
    uname: uname,
    email: email,
    roll: roll,
    pass: pass,
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // You can perform the search logic here, like filtering the data based on the query
  };
  const handleUsersubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/userForm`, obj)
      .then((res) => {
        // console.log(res);
        Swal.fire({
          title: "Data Saved Successfully !",
          icon: "success",
          confirmButtonText: "Close",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:5000/userForm`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/userForm/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Deleted !");
        fetchData(); // Fetch data again after successful deletion
      })
      .catch((err) => {
        console.log(err);
        alert("Error occurred while deleting !");
      });
  };


  return (
    <div>
      <div class="wrapper">
        {/* <!-- Content Wrapper. Contains page content --> */}
        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2 text-left">
                <div class="col-sm-6">
                  <h1>General Form</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li
                      class="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      User
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                {/* <!-- left column --> */}
                <div class="col-md-4">
                  {/* <!-- general form elements --> */}
                  <div class="card">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title text-white">Add User</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form onSubmit={handleUsersubmit}>
                      <div class="card-body text-left">
                        <div class="form-group">
                          <label for="exampleInputName">
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputName"
                            placeholder="Enter your name ..."
                            // required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputUsername">
                            Username <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername"
                            placeholder="Enter your username ..."
                            onChange={(e) => setUname(e.target.value)}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail">
                            Email <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter  your email ..."
                            // required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputRoll">
                            Role <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputRoll"
                            placeholder="Enter your Role ..."
                            onChange={(e) => setRoll(e.target.value)}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword">
                            Password <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword"
                            placeholder="Password ..."
                            // required
                            onChange={(e) => setPass(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div class="card-footer text-left">
                        <button
                          type="submit"
                          class="btn text-white form-dlt-btn"
                          style={{ backgroundColor: "#ca629d" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!--/./</br>col (right) --> */}
                {/* <div> */}
                <section class="content col-8">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div
                            class="card-header text-light"
                            style={{ backgroundColor: "rgb(37, 111, 152)" }}
                          >
                            <h3 class="card-title">User List</h3>
                            </div>  
                              <div class="search-bar">
                                {/* <label>Search: </label> */}
                                <OutlinedInput
                                  type="text"
                                  variant="outlined"
                                  placeholder="Search.."
                                  value={searchQuery}
                                  onChange={(e) => handleSearch(e.target.value)}
                                  style={{ height:"30px", margin:"10px 0"}}
                                />
                              </div>
                          {/* <!-- /.card-header --> */}
                          <div class="card-body">
                            <table
                              id="example2"
                              class="table table-bordered table-hover"
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
                                {data.map((ele, id) => (
                                  <tr key={id}>
                                    <td>{id + 1}</td>
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
                          {/* <!-- /.card-body --> */}
                       
                        {/* <!-- /.card --> */}
                        {/* pagination started */}
                       <div class="row" style={{ display:"flex"}}>
                       <div className="col-sm-12 col-md-5">
                            <div
                              className="dataTables_info"
                              id="example1_info"
                              role="status"
                              aria-live="polite"
                            >
                              Showing {currentPage * itemsPerPage - itemsPerPage + 1} to{' '}
                              {currentPage * itemsPerPage} of {data.length} entries
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
                                    currentPage === 1 ? 'disabled' : ''
                                  }`}
                                  id="example1_previous"
                                >
                                  <a
                                    href="#"
                                    aria-controls="example1"
                                    data-dt-idx="0"
                                    tabIndex="0"
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                  >
                                    Previous
                                  </a>
                                </li>
                                {paginationButtons}
                                <li
                                  className={`paginate_button page-item next ${
                                    currentPage === totalPages ? 'disabled' : ''
                                  }`}
                                  id="example1_next"
                                >
                                  <a
                                    href="#"
                                    aria-controls="example1"
                                    data-dt-idx="0"
                                    tabIndex="0"
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage + 1)}
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
                      {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- //.row --> */}
                  </div>
                  {/* <!-- /.container-fluid --> */}
                </section>
                {/* </div> */}
              </div>
              {/* <!-- /.row --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
        </div>
      </div>
    </div>
  );
};

export default User;
