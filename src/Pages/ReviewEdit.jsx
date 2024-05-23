import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const ReviewEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    moblie: "",
    review: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `https://denticadentalstudio.com/webapp/api/show/review`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setFormData(res.data.data.review);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {...formData,id: id}
    axios
      .post(`https://denticadentalstudio.com/webapp/api/review/update`, updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review updated Successfully !",
          showConfirmButton: false,
          timer: 1000,
        })
        .then(() => {
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
      // console.log("payload",updatedFormData);
  };

  return (
    <div>
      {loading && (
        <div className="preloaderContainer">
          <div className="preloaderBg">
            <div className="preloader"></div>
            <div className="preloader2"></div>
          </div>
        </div>
      )}
      <div className="wrapper">
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>Review</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/review">Review</Link>
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
            {/* /.container-fluid */}
          </section>

          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-5">
                  {/* general form elements */}
                  <div className="card card-primary">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title">Review</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputTitle"
                            placeholder="Enter Name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                          />
                        </div>
                        <div className="form-group">
                          <label>Review</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            name="review"
                            onChange={handleChange}
                            value={formData.review}
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Image</label>
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="exampleInputFile"
                                name="image"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="exampleInputFile"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.card-body */}

                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-primary form-dlt-btn"
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
