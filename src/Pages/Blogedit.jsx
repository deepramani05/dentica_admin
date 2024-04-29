import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Blogedit = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    desc: "",
    sdesc: "",
    mdesc: "",
    mtitle: "",
    keyword: "",
    tag: "",
  });
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const { id } = useParams("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blog/${id}`)
      .then((res) => {
        const {title, image, desc, sdesc, medesc, mtitle, keyword, tag} = res.data;

        setFormData({title, image, desc, sdesc, medesc, mtitle, keyword, tag});
        setTags(res.data.tags || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChange1 = (value) => {
    setFormData({
      ...formData,
      desc: value, // Assuming 'desc' is the field for description in your form data
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/blog/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Changed !",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.href = "/blog";
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error !");
      });
  };
  const handleTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = currentTag.trim();
      if (trimmedTag) {
        setTags([...tags, trimmedTag]);
        setCurrentTag("");
      }
    }
  };

  const handleRemoveTag = (id) => {
    setTags(tags.filter((_, index) => index !== id));
  };
  return (
    <div>
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
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Image</label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleInputFile"
                            name="image"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                image: e.target.files[0],
                              })
                            }
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
                            name="desc"
                            onChange={handleChange1}
                            value={formData.desc}
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
                        <div className="form-group">
                          <label htmlFor="exampleInputShortDescription">
                            Short Description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputShortDescription"
                            placeholder="Enter Short Description"
                            name="sdesc"
                            onChange={handleChange}
                            value={formData.sdesc}
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
                            name="mdesc"
                            onChange={handleChange}
                            value={formData.mdesc}
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
                            placeholder="Enter meta keyword"
                            name="keyword"
                            onChange={handleChange}
                            value={formData.keyword}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputMetaKeyword">Tag</label>
                          <input
                            type=""
                            className="form-control"
                            id="exampleInputMetaKeyword"
                            placeholder="Enter meta keyword"
                            name="tag"
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleTag}
                            value={currentTag}
                          />
                        </div>
                        <div className="form-group">
                          <div>
                            {tags.map((tag, id) => (
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
                          // onClick={handleSubmit}
                          // onKeyDown={(e)=>{if(e.key === 'enter'){
                          //   e.preventDefault();
                          // }}
                          // }
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
