import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import img from "../images/home_about-center.png";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import Cookies from "js-cookie";

const Edit = () => {
  const { id } = useParams("");
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    image: null,
    description: "",
    header_address: "",
    address: "",
    phone_number1: "",
    phone_number2: "",
    email: "",
    monday_saturday: "",
    sunday: "",
  });

  useEffect(() => {
    axios
      .post("https://denticadentalstudio.com/api/show/about",{ id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.about);
        // setData(res.data.data.about);
        // // Populate formData with fetched data
        // if (res.data.length > 0) {
        //   setFormData(res.data[0]); // Assuming the first item contains the data
        // }
        const{
          title,
          short_description,
          meta_title,
          meta_keyword,
          meta_description,
          image,
          description,
          header_address,
          address,
          phone_number1,
          phone_number2,
          email,
          monday_saturday,
          sunday
        } = res.data.data.about;

        setFormData({
          title,
          short_description,
          meta_title,
          meta_keyword,
          meta_description,
          image,
          description,
          header_address,
          address,
          phone_number1,
          phone_number2,
          email,
          monday_saturday,
          sunday
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const {name, value } = e.target;
    const file = e.target.files?e.target.files[0]: null;
    setFormData({
      ...formData,
      [name]: value,
      image: file,
      imageUrl: file ? URL.createObjectURL(file): null,
    });
  };

  const handleChange1 = (value)=>{
    setFormData({
     ...formData,
      description: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData ={
      ...formData,
      id: id
    }
   

    axios
      .post(`https://denticadentalstudio.com/api/about/update`, updatedFormData,{
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data has been Updated",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.href = "/about-us";
        });
         setTimeout(() => window.location.reload(), 1000)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="wrapper">
        <div className="content-wrapper">
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
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary text-left">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 className="card-title">About</h3>
                    </div>

                      <form
                        className="text-left"
                        onSubmit={handleSubmit}
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputTitle">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputTitle"
                              placeholder="About Lab"
                              name="title"
                              onChange={handleChange}
                              value={formData.title}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputShortDescription">
                              Short Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputShortDescription"
                              placeholder="Discover the finest in dental lab products"
                              name="short_description"
                              onChange={handleChange}
                              value={formData.short_description}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputMetaTitle">
                              Meta Title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputMetaTitle"
                              placeholder="about"
                              name="meta_title"
                              onChange={handleChange}
                              value={formData.meta_title}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputMetaKeyword">
                              Meta Keyword
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputMetaKeyword"
                              placeholder="about"
                              name="meta_keyword"
                              onChange={handleChange}
                              value={formData.meta_keyword}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputMetaDescription">
                              Meta Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputMetaDescription"
                              placeholder="about"
                              name="meta_description"
                              onChange={handleChange}
                              value={formData.meta_description}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputFile">Image</label>
                            <div
                              className="input-group d-flex"
                              style={{ alignItems: "center" }}
                            >
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="exampleInputFile"
                                  onChange={handleChange}
                                  name="image"
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="exampleInputFile"
                                >
                                  Choose file
                                </label>
                              </div>
                              <div style={{ width: "200px" }}>
                                <img src={img} alt="" width={"100%"} />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputDescription">
                              Description
                            </label>
                            <ReactQuill
                              id="exampleInputDescription"
                              rows="10"
                              placeholder="Place Some Text Here"
                              name="desc"
                              onChange={handleChange1}
                              value={formData.description}
                              modules={{
                                toolbar: [
                                  [
                                    { header: "1" },
                                    { header: "2" },
                                    { font: [] },
                                  ],
                                  [{ size: [] }],
                                  [
                                    "bold",
                                    "italic",
                                    "underline",
                                    "strike",
                                    "blockquote",
                                  ],
                                  [
                                    { list: "ordered" },
                                    { list: "bullet" },
                                    { indent: "-1" },
                                    { indent: "+1" },
                                  ],
                                  ["link", "image", "video"],
                                  ["clean"],
                                ],
                              }}
                              formats={[
                                "header",
                                "font",
                                "size",
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                                "list",
                                "bullet",
                                "indent",
                                "link",
                                "image",
                                "video",
                              ]}
                            />
                          </div>
                          <div
                            className="col-sm-6 text-left"
                            style={{ margin: "30px 0" }}
                          >
                            <h1>About Data</h1>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputHeaderAddress">
                              Header Address
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows="1"
                              placeholder="Enter ..."
                              name="header_address"
                              onChange={handleChange}
                              value={formData.header_address}
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputAddress">
                              Address <span style={{ color: "red" }}>*</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows="3"
                              placeholder="Enter ..."
                              name="address"
                              onChange={handleChange}
                              value={formData.address}
                            ></textarea>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPhoneNumber1">
                              Phone Number 1
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="exampleInputPhoneNumber1"
                              placeholder="Enter Number ..."
                              name=" phone_number1"
                              onChange={handleChange}
                              value={formData. phone_number1}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPhoneNumber2">
                              Phone Number 2
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="exampleInputPhoneNumber2"
                              placeholder="Enter Number ..."
                              name="phone_number2"
                              onChange={handleChange}
                              value={formData.phone_number2}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail"
                              placeholder="E-mail Address ..."
                              name="email"
                              onChange={handleChange}
                              value={formData.email}
                            />
                          </div>
                          <div
                            className="col-sm-6 text-left"
                            style={{ margin: "30px 0" }}
                          >
                            <h1>Lab Opening Hours</h1>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputMondayToSaturday">
                              Monday - Saturday
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputMondayToSaturday"
                              placeholder="Enter Time"
                              name=" monday_saturday"
                              onChange={handleChange}
                              value={formData. monday_saturday}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputSunday">Sunday</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputSunday"
                              placeholder="Enter Time."
                              name="sunday"
                              onChange={handleChange}
                              value={formData.sunday}
                            />
                          </div>
                        </div>
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Edit;
