import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Blogedit = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    short_description: "",
    meta_description: "",
    meta_title: "",
    meta_keyword: "",
    meta_tag: [],
  });
  const [tags, setTags] = useState([]); // Initialize tags as an empty array
  const [currentTag, setCurrentTag] = useState("");

  const { id } = useParams("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `https://denticadentalstudio.com/api/show/blog`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data.data.blog);
        const {
          title,
          image,
          description,
          short_description,
          meta_description,
          meta_title,
          meta_keyword,
          meta_tag,
        } = res.data.data.blog;

        setFormData({
          title,
          image,
          description,
          short_description,
          meta_description,
          meta_title,
          meta_keyword,
          meta_tag,
        });
        setTags(meta_tag || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      [name]: value,
      image: file,
      imageUrl: file ? URL.createObjectURL(file) : null,
    });
  };

  const handleChange1 = (value) => {
    setFormData({
      ...formData,
      description: value, // Assuming 'description' is the field for description in your form data
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    for (const key in formData) {
      updatedFormData.append(key, formData[key]);
    }
    updatedFormData.append("tags", tags);
    updatedFormData.append("id", id);

    axios
      .post(
        `https://denticadentalstudio.com/api/blog/update`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Updated Successfully !",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.href = "/blog";
        });
      })
      .catch((err) => {
        console.error(err);
        // Handle error, show an error message maybe
      });
  };

  const handleTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = currentTag.trim();
      if (trimmedTag) {
        setTags([...tags, trimmedTag]);
        setCurrentTag("");
        setFormData({
          ...formData,
          meta_tag: [...formData.meta_tag, trimmedTag],
        });
      }
    }
  };

  const handleRemoveTag = (id) => {
    setTags(tags.filter((_, index) => index !== id));
    const updatedTags = formData.meta_tag.filter((_, index) => index !== id);
    setFormData({
      ...formData,
      meta_tag: updatedTags,
    });
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
                  <h1>Blog</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/blog">Blog</Link>
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
                      <h3 className="card-title">About</h3>
                    </div>

                    <form
                      className="text-left"
                      onSubmit={handleSubmit}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                    >
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
                        <div
                          className="form-group"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <label htmlFor="exampleInputFile">Image</label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleInputFile"
                            name="image"
                            onChange={handleChange}
                          />
                          {formData.imageUrl && (
                            <div style={{ width: "150px", height: "100px" }}>
                              <img
                                src={URL.createObjectURL(formData.image)}
                                alt=""
                                style={{ width: "100%", height: "100%" }}
                              />
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
                            onChange={handleChange1}
                            value={formData.description}
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
                            name="short_description"
                            onChange={handleChange}
                            value={formData.short_description}
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
                        <div className="form-group">
                          <label htmlFor="exampleInputTag">Tag</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputTag"
                            placeholder="Enter tag"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleTag}
                          />
                        </div>
                        <div className="form-group">
                          <div>
                            {Array.isArray(tags) &&
                              tags.map((tag, id) => (
                                <span
                                  key={id}
                                  className="badge-secondary mr-1"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "2px 7px",
                                    backgroundColor: "#ca629d",
                                    borderRadius: "5px",
                                  }}
                                >
                                  {tag}
                                  <span
                                    className="remove-tag"
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: "5px",
                                      color: "#12448b",
                                      paddingBottom: "2px",
                                    }}
                                    onClick={() => handleRemoveTag(id)}
                                  >
                                    <HighlightOffIcon fontSize="15px" />
                                  </span>
                                </span>
                              ))}
                          </div>
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

export default Blogedit;
