import React from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const Career = () => {
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
                  <h1>Career</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Career</li>
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
                            <th>Customer Name</th>
                            <th>Contact Info</th>
                            <th>Subject</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Ronak Mulani</td>
                            <td>
                              <p className="m-0">8156050522</p>
                              <p className="m-0">ronakmulani1999@gmail.con</p>
                            </td>
                            <td>Accountant</td>
                            <td>
                              <button
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
                              <button
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

export default Career;
