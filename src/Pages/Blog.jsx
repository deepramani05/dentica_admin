import React from "react";
import { FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Blog = () => {
  return (
    <div>
      <div class="wrapper">
        {/* <!-- Content Wrapper. Contains page content --> */}
        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Blog</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Blog</li>
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
                      style={{ textAlign: "end", backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">Blog List</h3>
                      <div>
                        <button
                          style={{
                            border: "0",
                            backgroundColor: "#ca629d",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class="card-body">
                      <table
                        id="example2"
                        class="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Internet Explorer 4.0</td>
                            <td>Win 95+</td>
                            <td>
                              <button style={{border:"1px solid #17a2b8",padding:"5px",backgroundColor:"white"}}>
                                <span style={{color:"#17a2b8"}}><FaEye /></span>
                              </button>
                              <button style={{border:"1px solid #17a2b8",padding:"5px",backgroundColor:"white"}}>
                                <span style={{color:"#17a2b8"}}><BiSolidEdit /></span>
                              </button>
                              <button style={{border:"1px solid red",padding:"5px",backgroundColor:"white"}}>
                                <span style={{color:"red"}}><MdDelete /></span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <!-- /.ca/rd-body --> */}
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

export default Blog;
