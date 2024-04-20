import React from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Stl = () => {
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
                  <h1>STL</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li class="breadcrumb-item active" style={{color:"#ca629d"}}>STL</li>
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
                      <h3 class="card-title">Stl Form List</h3>
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
                            <th>FullName</th>
                            <th>Phone Number</th>
                            <th>Message</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Ronak Mulani</td>
                            <td>8156050522</td>
                            <td>Accountant</td>
                            <td>
                              <button className="form-btn-dlt"
                                style={{
                                  backgroundColor: "white",
                                  border: "1px solid red",
                                }}
                              >
                                <span
                                  style={{
                                    color: "red",
                                    lineHeight: "30px",
                                    padding: "5px",
                                  }}
                                >
                                  <BsFileEarmarkPdfFill />
                                </span>
                              </button>
                              <button className="form-btn-dlt"
                                style={{
                                  backgroundColor: "white",
                                  border: "1px solid red",
                                }}
                              >
                                <span
                                  style={{
                                    color: "red",
                                    lineHeight: "30px",
                                    padding: "5px",
                                  }}
                                >
                                  <MdDelete />
                                </span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <!-- /.car//d-body --> */}
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!-- /.c/ol --> */}
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

export default Stl;
