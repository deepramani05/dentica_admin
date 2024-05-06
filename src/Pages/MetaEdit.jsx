import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const MetaEdit = () => {
  const { id } = useParams(); // Extracting the id from URL parameters
  const [metaData, setMetaData] = useState({
    meta_url: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
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
    const updatedMetaData = {
      ...metaData,
      id: id // Include the id in the metaData object
    };
    axios
      .post(`https://denticadentalstudio.com/api/meta/update/` ,
      updatedMetaData,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Meta data updated successfully !",
          showConfirmButton: false,
          timer: 1000,
        })
        .then(() => {
          window.location.href = "/meta";
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Error saving meta data !",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

  useEffect(() => {
    axios
      .post(`https://denticadentalstudio.com/api/show/meta`,{ id },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setMetaData(response.data.data.meta);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Fetching meta data when the id changes
  // console.log("meta data",metaData.meta_url);
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
                      <h3 class="card-title">Edit Meta data</h3>
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
                            name="meta_url"
                            onChange={handleChange}
                            value={metaData.meta_url}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Meta Title</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Title"
                            name="meta_title"
                            onChange={handleChange}
                            value={metaData.meta_title}
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
                            name="meta_keyword"
                            onChange={handleChange}
                            value={metaData.meta_keyword}
                          />
                        </div>
                        <div class="form-group">
                          <label>Meta Description</label>
                          <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            name="meta_description"
                            onChange={handleChange}
                            value={metaData.meta_description}
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
