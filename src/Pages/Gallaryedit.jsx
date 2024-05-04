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



  useEffect(() => {
    axios
      .post(`https://denticadentalstudio.com/api/show/gallery`,{id: id})
      .then((res) => {
        const data = res.data;
        console.log("data",data); 
        setFormData({
          title: data.title,
          meta_title: data.mtitle,
          meta_keyword: data.keyword,
          meta_description: data.desc,
          image: null,
          categoery: data.cat,
        });
      })
      .catch((err) => {
        console.log(err);
      });
     
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]: files ? files[0]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('id', id);
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    
    try {
      const res = await axios.post(
        "https://denticadentalstudio.com/api/gallery/update", 
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
        setTimeout(()=>  window.location.href="/gallery" , 1000)
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
                    <form onSubmit={handleSubmit} className="text-left">
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputTitle">Title</label>
                          <input
                            onChange={handleChange}
                            value={formData.title}
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
                            value={formData.mtitle}
                            type="text"
                            className="form-control"
                            id="exampleInputSubtitle"
                            name="subtitle"
                            placeholder="Enter SubTitle"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputKeyword">
                            Meta Keyword
                          </label>
                          <input
                            onChange={handleChange}
                            value={formData.keyword}
                            type="text"
                            className="form-control"
                            id="exampleInputKeyword"
                            name="keyword"
                            placeholder="Enter Keywords"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputDesc">
                            Meta Description
                          </label>
                          <textarea
                            onChange={handleChange}
                            value={formData.desc}
                            className="form-control"
                            rows="3"
                            name="desc"
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
                                  value={formData.image}
                                  name="image"
                                />
                              </div>
                            </div>
                            <div style={{ width: "150px" }}>
                              <img src={img} alt="" style={{ width: "100%" }} />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Category <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            onChange={handleChange}
                            value={formData.cat}
                            className="form-control"
                            id="exampleFormControlSelect1"
                            name="cat"
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
                          style={{ backgroundColor: "#ca629d", border: "0" }}
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

export default GalleryEdit;
