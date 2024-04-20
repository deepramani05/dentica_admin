import React from "react";
import { Link } from "react-router-dom";

const Edit = () => {
  return (
    <div>
      <div className="wrapper">
        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>About - us</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/about-us">About</Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      Edit
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>

          {/* <!-- Main content --> */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  {/* <!-- general form elements --> */}
                  <div className="card card-primary text-left">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 className="card-title">About</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form classNameName="text-left">
                      <div className="card-body">
                        <div className="form-group">
                          <label for="exampleInputEmail1">Title</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="About Lab"
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputPassword1">
                            Short Description
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Discover the finest in dental lab products"
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputPassword1">Meta Title</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="about"
                          />
                        </div>
                        <div className="form-group">
                          <label>Meta Keyword</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="about"
                          />
                        </div>
                        <div className="form-group">
                          <label>Meta Description</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="about"
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputFile">Image</label>
                          <div className="input-group">
                            <div className="custom-file">
                              <input type="file" />
                            </div>
                          </div>
                        </div>
                        <section className="content">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="card card-outline card-info">
                                <div className="card-header">
                                  <h3 className="card-title">Summernote</h3>
                                </div>
                                {/* <!-- /.card-header --> */}
                                <div className="card-body">
                                  <textarea id="summernote" className="col-md-12">
                                    Place Some Text Here
                                  </textarea>
                                </div>
                                <div className="card-footer">
                                  Visit{" "}
                                  <a href="https://github.com/summernote/summernote/">
                                    Summernote
                                  </a>{" "}
                                  documentation for more examples and
                                  information about the plugin.
                                </div>
                              </div>
                            </div>
                            {/* <!-- /.col--> */}
                          </div>
                          {/* <!-- ./row --> */}
                        </section>
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-primary text-light border-0 form-dlt-btn"
                          style={{ backgroundColor: "#ca629d" }}
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

export default Edit;
