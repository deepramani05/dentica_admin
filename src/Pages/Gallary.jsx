import React from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";

const Gallary = () => {
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
                  <h1>General Form</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Gallary</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* <!-- /.cont/ainer-fluid --> */}
          </section>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                {/* <!-- left column --> */}
                <div class="col-md-4">
                  {/* <!-- general form elements --> */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">Add images</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form className="text-left">
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Title</label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="Title"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Meta Title</label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Title"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">
                            Meta Keyword
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Keyword"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">
                            Meta Description
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Description"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFile">
                            Image <span style={{ color: "red" }}>*</span>
                          </label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="exampleInputFile"
                              />
                              <label
                                class="custom-file-label"
                                for="exampleInputFile"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">
                            Catagory <span style={{ color: "red" }}>*</span>
                          </label>
                          <br />
                          <select name="" id="" className="w-100 p-2">
                            <option value="">Select Catagory</option>
                            <option value="">Before & After</option>
                            <option value="">Products</option>
                            <option value="">Team</option>
                          </select>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary text-light border-0"
                          style={{ backgroundColor: "#ca629d" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!--/.col (left) --> */}
                {/* <!-- Main content --> */}
                <section class="content col-md-8">
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
                                  <th style={{ width: "40%" }}>Image</th>
                                  <th style={{ width: "40%" }}>Catagory</th>
                                  <th style={{ width: "19%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>
                                    <img src="" alt="" />
                                  </td>
                                  <td>Win 95+</td>
                                  <td className="align-middle">
                                    <button
                                      style={{
                                        border: "1px solid #17a2b8",
                                        backgroundColor: "white",
                                        padding: "2px 5px",
                                      }}
                                    >
                                      <span>
                                        <FaRegEye />
                                      </span>
                                    </button>
                                    <button
                                      style={{
                                        border: "1px solid #17a2b8",
                                        backgroundColor: "white",
                                        padding: "2px 5px",
                                      }}
                                    >
                                      <span>
                                        <FiEdit />
                                      </span>
                                    </button>
                                    <button
                                      style={{
                                        border: "1px solid red",
                                        backgroundColor: "white",
                                        padding: "2px 5px",
                                      }}
                                    >
                                      <span>
                                        <MdDelete />
                                      </span>
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
                    {/* <!-- /.row --> */}
                  </div>
                  {/* <!-- /.container-fluid --> */}
                </section>
                {/* <!-- /.content --> */}
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

export default Gallary;
