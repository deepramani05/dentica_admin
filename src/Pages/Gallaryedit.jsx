  import React, { useState, useEffect } from "react";
  import { Link, useParams } from "react-router-dom";
  import img from "../images/home_about-center.png";
  import axios from "axios";
  import Swal from "sweetalert2";
  import Cookies from "js-cookie";

  const GalleryEdit = () => {
    const { id } = useParams(); 
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState([]);


    useEffect(() => {
      axios
        .post(`https://denticadentalstudio.com/api/show/gallery`, { id: id },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.data.gallery);
          setData(res.data.data.gallery);
          

          const formData = res.data.data.gallery.map((galleryItem)=>({
            tile: galleryItem.tile,
            meta_title: galleryItem.mtile,
            meta_keyword: galleryItem.keyword,
            meta_description: galleryItem.desc,
            image: null,
            categoery: res.data.data.gallery.cat,
          }));
          setFormData(formData);
          // Assuming res.data is an object
          // setFormData({
          //   title: res.data.data.gallery.title,
          //   meta_title: res.data.data.gallery.mtitle,
          //   meta_keyword: res.data.data.gallery.keyword,
          //   meta_description: res.data.data.gallery.desc,
          //   image: null,
          //   categoery: res.data.data.gallery.cat,
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);

    const handleChange = (e, index) => {
      const { name, value, files } = e.target;
      const updatedFormData = [...formData];
    if (files) {
      updatedFormData[index][name] = files[0];
    } else {
      updatedFormData[index][name] = value;
    }
    setFormData(updatedFormData);
  };


    const handleSubmit = async (e, index) => {
      e.preventDefault();
      const formDataToUpdate = new FormData();
      // formDataToUpdate.append("id", id);
      // formDataToUpdate.append("title", formData.title);
      // formDataToUpdate.append("meta_title", formData.meta_title);
      // formDataToUpdate.append("meta_keyword", formData.meta_keyword);
      // formDataToUpdate.append("meta_description", formData.meta_description);
      // formDataToUpdate.append("image", formData.image); 
      // formDataToUpdate.append("categoery", formData.categoery);

      for (const key in formData[index]) {
        if (formData[index][key] instanceof File) {
          formDataToUpdate.append(key, formData[index][key]);
        } else {
          formDataToUpdate.append(key, formData[index][key]);
        }
      }
      formDataToUpdate.append("id", id);

        axios.post(
          "https://denticadentalstudio.com/api/gallery/update",formDataToUpdate,
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
        .then((res)=>{
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
        })
        .catch((error) =>{
          console.error("Error updating data:", error);
          alert("Error updating data:", error);
        });
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
                      {formData.map((fdata,index)=>(
                        <form
                          onSubmit={(e) => handleSubmit(e,index)}
                          className="text-left"
                          key={index}
                        >
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputTitle">Title</label>
                              <input
                                onChange={(e) => handleChange(e, index)}
                                value={fdata.title}
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
                                onChange={(e) => handleChange(e, index)}
                                value={fdata.meta_title}
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
                                onChange={(e) => handleChange(e, index)}
                                value={fdata.meta_keyword}
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
                                onChange={(e) => handleChange(e, index)}
                                value={fdata.meta_description}
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
                                onChange={(e) => handleChange(e, index)}
                                value={fdata.categoery}
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
