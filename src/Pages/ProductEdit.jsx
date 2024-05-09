import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const ProductEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    sdescription: "",
    meta_title: "",
    meta_description: "",
    meta_keyword: "",
    product_type: "",
    headerimage: "",
    background_image: "",
    image: "",
    productimage: "",
    description: "",
  });

  const { id } = useParams("");

  useEffect(() => {
    axios
      .post(`https://denticadentalstudio.com/api/show/product`,{id},{
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.product);
        setFormData(res.data.data.product);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);


  const handleChange = (e) => {
    // 'content' contains the updated text from ReactQuill
    const { name, value, files} = e.target;
    if(files && files.length > 0){
       setFormData({
      ...formData,
      [name]: files[0], // Assuming 'desc' is the key for ReactQuill content in your state
    });
    } else{
      setFormData({
        ...formData,
        [name]: value,
      });
    }
   
  };

  const handleChange1 = (content, delta, source, editor) => {
    setFormData({
      ...formData,
      description: content, // Assuming 'description' is the key for ReactQuill content in your state
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProductData = {
      ...formData,
      id: id, // Include the id in the formData object
    }
    axios
      .post(`https://denticadentalstudio.com/api/product/update`,{id}, updatedProductData,{
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data has been Edited Successfully !",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/product";
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error !");
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
            {/* /.container-fluid */}
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
                      <h3 className="card-title">Add Product</h3>
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
                            placeholder="Enter Short Description"
                            name="sdescription"
                            onChange={handleChange}
                            value={formData.sdescription}
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
                            value={formData.meta_title}
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
                            value={formData.meta_description}
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
                            value={formData.meta_keyword}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">
                            Product Type
                          </label>
                          <br />
                          <select
                            className="w-100 p-2"
                            onChange={handleChange}
                            value={formData.product_type}
                            name="product_type"
                          >
                            <option value="">Select Type</option>
                            <option value="Digital Dentistry">
                              Digital Dentistry
                            </option>
                            <option value="Products">Products</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Header Image</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                              name="headerimage"
                              onChange={handleChange}
                              // value={formData.headerimage}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputFile"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">
                            Background Image
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                              name="background_image"
                              onChange={handleChange}
                              // value={formData.background_image}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputFile"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">
                            Featured Image
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                              name="image"
                              onChange={handleChange}
                              // value={formData.image}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputFile"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Images</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                              name="productimage"
                              onChange={handleChange}
                              // value={formData.productimage}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputFile"
                            >
                              Choose file
                            </label>
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
