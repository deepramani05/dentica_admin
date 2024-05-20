import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import logo from "../images/Logo.png";

const ProductEdit = () => {
  const [formData, setFormData] = useState({
    header_image: [],
    background_image: [],
    image: [],
    product_images: [],
    title: "",
    sdescription: "",
    meta_title: "",
    meta_description: "",
    meta_keyword: "",
    product_type: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .post(
        `https://denticadentalstudio.com/api/show/product`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.product);
        const data = res.data.data.product;
        const productData = {
          title: data.title,
          sdescription: data.short_description,
          meta_title: data.meta_title,
          meta_description: data.meta_description,
          meta_keyword: data.meta_keyword,
          product_type: data.product_type,
          description: data.description,
        };
        setFormData(productData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const preloader = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(preloader);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      // Handle multiple files
      const fileList = Array.from(files);
      setFormData({
        ...formData,
        [name]: fileList,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChange1 = (content) => {
    setFormData({
      ...formData,
      description: content,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProductData = new FormData();

    const appendFileData = (formDataArray, key, formDataObject) => {
      if (formDataArray && formDataArray.length > 0) {
        formDataObject.append(key, formDataArray[0]);
      }
    };

    appendFileData(formData.header_image, "header_image", updatedProductData);
    appendFileData(
      formData.background_image,
      "background_image",
      updatedProductData
    );
    appendFileData(formData.image, "image", updatedProductData);
    appendFileData(
      formData.product_images,
      "product_images",
      updatedProductData
    );

    // Append other form data fields
    updatedProductData.append("title", formData.title);
    updatedProductData.append("sdescription", formData.sdescription);
    updatedProductData.append("meta_title", formData.meta_title);
    updatedProductData.append("meta_description", formData.meta_description);
    updatedProductData.append("meta_keyword", formData.meta_keyword);
    updatedProductData.append("product_type", formData.product_type);
    updatedProductData.append("description", formData.description);
    updatedProductData.append("id", id);

    axios
      .post(
        `https://denticadentalstudio.com/api/product/update`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data has been Edited Successfully !",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // window.location.href = "/product";
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error !");
      });
  };

  if (loading) {
    return (
      <div className="preloaderContainer">
        <div className="preloaderBg">
          <div className="preloader"></div>
          <div className="preloader2"></div>
          {/* <img src={logo} alt="Logo" className="loaderLogo" /> */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>Product</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/product">Products</Link>
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

          <section className="content col-md-12">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary text-left">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 className="card-title">Edit Product</h3>
                    </div>
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputTitle">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputTitle"
                            placeholder="Enter title"
                            name="title"
                            onChange={handleChange}
                            value={formData.title || ""}
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
                            placeholder="Enter Short Description"
                            name="sdescription"
                            onChange={handleChange}
                            value={formData.sdescription || ""}
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
                            placeholder="Enter meta title"
                            name="meta_title"
                            onChange={handleChange}
                            value={formData.meta_title || ""}
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
                            placeholder="Enter meta Description"
                            name="meta_description"
                            onChange={handleChange}
                            value={formData.meta_description || ""}
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
                            placeholder="Enter meta keyword"
                            name="meta_keyword"
                            onChange={handleChange}
                            value={formData.meta_keyword || ""}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputProductType">
                            Product Type
                          </label>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            value={formData.product_type || ""}
                            name="product_type"
                          >
                            <option value="">Select Type</option>
                            <option value="1">Digital Dentistry</option>
                            <option value="2">Products</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputHeaderImage">
                            Header Image
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleInputHeaderImage"
                            name="header_image"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputBackgroundImage">
                            Background Image
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleInputBackgroundImage"
                            name="background_image"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFeaturedImage">
                            Featured Image
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleInputFeaturedImage"
                            name="image"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputImages">Images</label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleInputImages"
                            name="product_images"
                            onChange={handleChange}
                            multiple // Add this line to allow multiple file selection
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputDescription">
                            Description
                          </label>
                          <ReactQuill
                            id="exampleInputDescription"
                            rows="10"
                            placeholder="Place Some Text Here"
                            onChange={handleChange1}
                            value={formData.description || ""}
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

export default ProductEdit;
