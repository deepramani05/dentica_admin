import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../images/home_about-center.png";

const Edit = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    sdesc: "",
    mtitle: "",
    keyword: "",
    mdesc: "",
    image: "",
    desc: "",
    haddress: "",
    address: "",
    num1: "",
    num2: "",
    mail: "",
    mon: "",
    sun: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/aboutEdit")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        // Populate formData with fetched data
        if (res.data.length > 0) {
          setFormData(res.data[0]); // Assuming the first item contains the data
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      .patch(`http://localhost:5000/aboutEdit/${data[0].id}`, formData)
      .then((res) => {
        console.log(res.data);
        alert("Updated!");
        window.location.reload();
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

                    {data.map((item, index) => (
                      <form
                        key={index}
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
                              name="sdesc"
                              onChange={handleChange}
                              value={formData.sdesc}
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
                              name="mtitle"
                              onChange={handleChange}
                              value={formData.mtitle}
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
                              name="keyword"
                              onChange={handleChange}
                              value={formData.keyword}
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
                              name="mdesc"
                              onChange={handleChange}
                              value={formData.mdesc}
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
                            <textarea
                              className="form-control"
                              id="exampleInputDescription"
                              rows="3"
                              placeholder="Place Some Text Here"
                              name="desc"
                              onChange={handleChange}
                              value={formData.desc}
                            ></textarea>
                          </div>
                          <div
                            className="col-sm-6 text-left"
                            style={{ margin: "30px 0" }}
                          >
                            <h1>About Data</h1>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputHeaderAddress">
                              Header Address{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows="1"
                              placeholder="Enter ..."
                              name="haddress"
                              onChange={handleChange}
                              value={formData.haddress}
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
                              name="num1"
                              onChange={handleChange}
                              value={formData.num1}
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
                              name="num2"
                              onChange={handleChange}
                              value={formData.num2}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail"
                              placeholder="E-mail Address ..."
                              name="mail"
                              onChange={handleChange}
                              value={formData.mail}
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
                              name="mon"
                              onChange={handleChange}
                              value={formData.mon}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputSunday">Sunday</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputSunday"
                              placeholder="Enter Time."
                              name="sun"
                              onChange={handleChange}
                              value={formData.sun}
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
                    ))}
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
