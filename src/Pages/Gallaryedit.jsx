import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import img from "../images/home_about-center.png";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const GalleryEdit = () => {
  const { id } = useParams(); // Change from title to id
  const [formData, setFormData] = useState({
    title: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    image: null,
    categoery: "",
  });

  let [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(`https://denticadentalstudio.com/api/show/gallery`, { id: id })
      .then((res) => {
        console.log(res.data.data.gallery);
        if (Array.isArray(res.data)) {
          setData(res.data.data.gallery);
        } else if (typeof res.data === "object") {
          setData([res.data.data.gallery]); // Wrap object in an array
        }
        // Assuming res.data is an object
        setFormData({
          title: res.data.title,
          meta_title: res.data.mtitle,
          meta_keyword: res.data.keyword,
          meta_description: res.data.desc,
          image: null,
          categoery: res.data.cat,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to hold the updated data
    const updatedData = {};

    // Add only the changed data to updatedData
    for (const key in formData) {
      if (formData[key] !== data[key]) {
        // Only add if the value has changed
        updatedData[key] = formData[key];
      }
    }

    try {
      const res = await axios.post(
        "https://denticadentalstudio.com/api/gallery/update",
        { id: id, ...updatedData }, // Send the updated data along with the id
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data updated successfully!",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        setTimeout(() => (window.location.href = "/gallery"), 1000);
        // Redirect to the gallery page after successful update
      });
    } catch (err) {
      console.error("Error updating data:", err);
      // Handle error
    }
  };

  return (
    <div>
      <div className="wrapper">
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>General Form</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/gallery">Gallery</Link>
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
                <div className="col-md-6">
                  {/* general form elements */}
                  <div className="card card-primary">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title">Edit Data</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    {data.map((ele) => (
                      <form
                        onSubmit={handleSubmit}
                        className="text-left"
                        key={ele.id}
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputTitle">Title</label>
                            <input
                              onChange={handleChange}
                              value={ele.title}
                              type="text"
                              className="form-control"
                              id="exampleInputTitle"
                              name="title"
                              placeholder="Enter title"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputSubtitle">
                              Meta Title
                            </label>
                            <input
                              onChange={handleChange}
                              value={ele.meta_title}
                              type="text"
                              className="form-control"
                              id="exampleInputSubtitle"
                              name="meta_title"
                              placeholder="Enter SubTitle"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputKeyword">
                              Meta Keyword
                            </label>
                            <input
                              onChange={handleChange}
                              value={ele.meta_keyword}
                              type="text"
                              className="form-control"
                              id="exampleInputKeyword"
                              name="meta_keyword"
                              placeholder="Enter Keywords"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputDesc">
                              Meta Description
                            </label>
                            <textarea
                              onChange={handleChange}
                              value={ele.meta_description}
                              className="form-control"
                              rows="3"
                              name="meta_description"
                              placeholder="Enter ..."
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputFile">
                              Image <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="d-flex align-items-center">
                              <div className="input-group">
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    onChange={handleChange}
                                    name="image"
                                  />
                                </div>
                              </div>
                              <div style={{ width: "150px" }}>
                                <img
                                  src={img}
                                  alt=""
                                  style={{ width: "100%" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">
                              Category <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              onChange={handleChange}
                              value={ele.categoery}
                              className="form-control"
                              id="exampleFormControlSelect1"
                              name="categoery"
                            >
                              <option value="Select Category">
                                Select Category
                              </option>
                              <option value="Before & After">
                                Before & After
                              </option>
                              <option value="Products">Products</option>
                              <option value="Team">Team</option>
                            </select>
                          </div>
                        </div>
                        {/* /.card-body */}

                        <div className="card-footer">
                          <button
                            type="submit"
                            className="btn btn-primary form-dlt-btn"
                            style={{
                              backgroundColor: "#ca629d",
                              border: "0",
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    ))}
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

export default GalleryEdit;
