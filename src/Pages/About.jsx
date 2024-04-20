import React from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
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
                  <h1>About - us</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li class="breadcrumb-item active" style={{color:"#ca629d"}}>About</li>
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
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title">About</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class="card-body">
                      <table
                        id="example2"
                        class="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "1%" }}>SL</th>
                            <th style={{ width: "19%" }}>Title</th>
                            <th style={{ width: "65%" }}>Description</th>
                            <th style={{ width: "15%" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Internet Explorer 4.0</td>
                            <td>Win 95+</td>
                            <td className="align-middle">
                              <Link className="form-btn"
                                style={{
                                  border: "1px solid #17a2b8",
                                  backgroundColor: "white",
                                  padding: "2px 5px",
                                }}
                              >
                                <span style={{color:"#17a2b8"}}>
                                  <FaRegEye />
                                </span>
                              </Link>
                              <Link to='/about/edit' className="form-btn"
                                style={{
                                  border: "1px solid #17a2b8",
                                  backgroundColor: "white",
                                  padding: "2px 5px",
                                }}
                              >
                                <span style={{color:"#17a2b8"}}>
                                  <FiEdit />
                                </span>
                              </Link>
                              <Link className="form-btn-dlt"
                                style={{
                                  border: "1px solid red",
                                  backgroundColor: "white",
                                  padding: "2px 5px",
                                }}
                              >
                                <span style={{color:"red"}}>
                                  <MdDelete />
                                </span>
                              </Link>
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
              {/* <!-- /.row --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
        </div>
        {/* <!-- /.content-wrapper --> */}
      </div>
    </div>
  );
};

export default About;
