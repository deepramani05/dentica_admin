import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const ProductAdd = () => {
  const [title, setTitle] = useState("");
  const [sdesc, setSdesc] = useState("");
  const [mtitle, setMtitle] = useState("");
  const [mdesc, setMdesc] = useState("");
  const [keyword, setKeyword] = useState("");
  const [cat, setCat] = useState("");
  const [headerimage, setHeaderimage] = useState(null);
  const [bgimage, setBgimage] = useState(null);
  const [featuredimage, setFeaturedimage] = useState(null);
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState("");

  const [loading, setLoading] = useState(true);

  const handleImageChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setImages([...images, ...filesArray]);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("sdescription", sdesc);
    formData.append("meta_title", mtitle);
    formData.append("meta_description", mdesc);
    formData.append("meta_keyword", keyword);
    formData.append("product_type", cat);
    formData.append("headerimage", headerimage);
    formData.append("background_image", bgimage);
    formData.append("image", featuredimage);
    formData.append("description", desc);
    images.forEach((image, index) => {
      formData.append(`productimage${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        `https://denticadentalstudio.com/api/product/store`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Added Successfully !",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        window.location.href = "/product";
      });
    } catch (error) {
      console.error(error);
    }
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
                      Add
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
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
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
                            onChange={(e) => setSdesc(e.target.value)}
                            value={sdesc}
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
                            onChange={(e) => setMtitle(e.target.value)}
                            value={mtitle}
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
                            onChange={(e) => setMdesc(e.target.value)}
                            value={mdesc}
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
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputProductType">
                            Product Type
                          </label>
                          <select
                            className="form-control"
                            id="exampleInputProductType"
                            name="product_type"
                            onChange={(e) => setCat(e.target.value)}
                            value={cat}
                          >
                            <option>Select Type</option>
                            <option value="1">
                              Digital Dentistry
                            </option>
                            <option value="2">Products</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputHeaderImage">
                            Header Image
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputHeaderImage"
                              name="headerimage"
                              onChange={(e) =>
                                setHeaderimage(e.target.files[0])
                              }
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputHeaderImage"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputBackgroundImage">
                            Background Image
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputBackgroundImage"
                              name="background_image"
                              onChange={(e) => setBgimage(e.target.files[0])}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputBackgroundImage"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFeaturedImage">
                            Featured Image
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFeaturedImage"
                              name="image"
                              onChange={(e) =>
                                setFeaturedimage(e.target.files[0])
                              }
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputFeaturedImage"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputImages">Images</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputImages"
                              name="productimage"
                              onChange={handleImageChange}
                              multiple
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="exampleInputImages"
                            >
                              Choose file
                            </label>
                          </div>
                          {/* Render newly uploaded images */}
                          {images.length > 0 && (
                            <div className="mt-3">
                              <h5>Uploaded Images:</h5>
                              <div className="row">
                                {images.map((image, index) => (
                                  <div className="col-md-3" key={index}>
                                    <img
                                      src={URL.createObjectURL(image)}
                                      alt={`newly-uploaded-${index}`}
                                      className="img-fluid mb-3"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputDescription">
                            Description
                          </label>
                          <ReactQuill
                            id="exampleInputDescription"
                            rows="10"
                            placeholder="Place Some Text Here"
                            name="description"
                            onChange={setDesc}
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
                                [{ list: "ordered" }, { list: "bullet" }],
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

export default ProductAdd;
