import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MetaEdit = () => {
  const { id } = useParams(); // Extracting the id from URL parameters
  const [metaData, setMetaData] = useState({
    url: "",
    title: "",
    keyword: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetaData({
      ...metaData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:5000/meta/${id}`, metaData)
      .then((res) => {
        console.log(res.data);
        alert("Meta data saved successfully !");
      })
      .catch((err) => {
        console.log(err);
        alert("Error saving meta data !");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/meta/${id}`)
      .then((res) => {
        setMetaData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Fetching meta data when the id changes

  return (
    <div>
      <div class="wrapper">
        {/* Content Wrapper. Contains page content */}
        <div class="content-wrapper">
          {/* Content Header (Page header) */}
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6 text-left">
                  <h1>Meta Form</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/meta">Meta</Link>
                    </li>
                    <li
                      class="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      Edit
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>

          {/* Main content */}
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                {/* left column */}
                <div class="col-md-4">
                  {/* general form elements */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">Add Meta data</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Meta Url</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="Title"
                            name="url"
                            onChange={handleChange}
                            value={metaData.url}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Meta Title</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Title"
                            name="title"
                            onChange={handleChange}
                            value={metaData.title}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">
                            Meta Keyword
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Keyword"
                            name="keyword"
                            onChange={handleChange}
                            value={metaData.keyword}
                          />
                        </div>
                        <div class="form-group">
                          <label>Meta Description</label>
                          <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            name="description"
                            onChange={handleChange}
                            value={metaData.description}
                          ></textarea>
                        </div>
                      </div>
                      {/* /.card-body */}

                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary text-light border-0 form-dlt-btn"
                          style={{ backgroundColor: "#ca629d" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* /.card */}
                </div>
                {/* /.col (left) */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
      </div>
    </div>
  );
};

export default MetaEdit;
