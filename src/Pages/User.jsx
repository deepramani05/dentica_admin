import React from "react";
import { Link } from "react-router-dom";

const User = () => {
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
                    <li class="breadcrumb-item active">User</li>
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
                    <form>
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
                            required
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
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputRoll">
                            Roll <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter your Roll ..."
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
                            required
                          />
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div class="card-footer text-left">
                        <button
                          type="submit"
                          class="btn text-white"
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
                          <div class="card-header text-light" style={{backgroundColor:"rgb(37, 111, 152)"}}>
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
                                <tr>
                                  <td>1</td>
                                  <td>Admin</td>
                                  <td></td>
                                  <td>admin@gmail.com</td>
                                  <td></td>
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
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
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
