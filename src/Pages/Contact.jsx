import React from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <div class="wrapper">
        {/* <!-- Content Wrapper. Contains page content --> */}
        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6 text-left">
                  <h1>Contacts</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li
                      class="breadcrumb-item"
                      style={{ color: "#ca629d" }}
                    >
                      Contacts
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
                <div class="col-12">
                  <div class="card">
                    <div
                      class="card-header text-light"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">User List</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class="card-body">
                      <table
                        id="example2"
                        class="table table-bordered table-hover text-left"
                      >
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Customer's Name</th>
                            <th>Contact Info</th>
                            <th>Subject</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                              <img src="" alt="" />
                            </td>
                            <td>Win 95+</td>
                            <td>Win 95+</td>
                            <td className="align-middle">
                              <button
                                className="form-btn"
                                style={{
                                  border: "1px solid #17a2b8",
                                  backgroundColor: "white",
                                  padding: "2px 5px",
                                }}
                              >
                                <span style={{ color: "#17a2b8" }}>
                                  <FaRegEye />
                                </span>
                              </button>
                              <button
                                className="form-btn-dlt"
                                style={{
                                  border: "1px solid red",
                                  backgroundColor: "white",
                                  padding: "2px 5px",
                                }}
                              >
                                <span style={{ color: "red" }}>
                                  <MdDelete />
                                </span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <!-- //.card-body --> */}
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!-- /.col --> */}
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

export default Contact;
