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

  let [data, setData] = useState([]);

  let obj = {
    name: name,
    uname: uname,
    email: email,
    roll: roll,
    pass: pass,
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
                            Roll <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputRoll"
                            placeholder="Enter your Roll ..."
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
                                  <th>Roll</th>
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
                        </div>
                        {/* <!-- /.card --> */}
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
