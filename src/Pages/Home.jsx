import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
                  <h1>Home Page</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li class="breadcrumb-item active">Home</li>
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
                <div class="col-md-6">
                  {/* <!-- general form elements --> */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title">Add Home Data</h3>
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
                            id="exampleInputTitle"
                            placeholder="Enter title"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Sub Title</label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputSubtitle"
                            placeholder="Enter SubTitle"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail1">Description</label>
                          <div>
                            <textarea
                              name=""
                              id=""
                              cols="58"
                              rows="5"
                              style={{ border: "1px solid #ced4da" }}
                            ></textarea>
                          </div>
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
                                required
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
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary"
                          style={{ backgroundColor: "#ca629d", border: "0" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!--/.col (left) --> */}
                <div class="col-md-6">
                  {/* <!-- general form elements --> */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title">Social Media Links</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form className="text-left">
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputWhatsappLink">Whatsapp</label>
                          <input
                            type="url"
                            class="form-control"
                            id="exampleInputWhatsappLink"
                            placeholder="Enter Whatsapp Link"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputInstagramLink">
                            Instagram
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputInstagramLink"
                            placeholder="Enter Instagram Link"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFacebookLink">Facebook</label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputFacebookLink"
                            placeholder="Enter Facebook Link"
                          />
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary"
                          style={{ backgroundColor: "#ca629d", border: "0" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <!-- /.card --> */}
                </div>
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

export default Home;
