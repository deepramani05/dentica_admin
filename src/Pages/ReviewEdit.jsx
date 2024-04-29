import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    num: "",
    review: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/review/${id}`)
      .then((res) => {
        console.log(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:5000/review/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review updated Successfully !",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.href = "/review";
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Error !");
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error !",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

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
                  <h1>Review</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/review">Review</Link>
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
                <div class="col-md-5">
                  {/* general form elements */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title">Review</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputTitle"
                            placeholder="Enter Name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                          />
                        </div>
                        <div class="form-group">
                          <label>Review</label>
                          <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            name="review"
                            onChange={handleChange}
                            value={formData.review}
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFile">Image</label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="exampleInputFile"
                                name="image"
                                onChange={handleChange}
                                value={formData.image}
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
                      {/* /.card-body */}

                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary form-dlt-btn"
                          style={{ backgroundColor: "#ca629d", border: "0" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* /.card */}
                </div>
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

export default ReviewEdit;
