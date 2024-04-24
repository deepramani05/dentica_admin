import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blogadd = () => {
  let [title, setTitle] = useState("");
  let [image, setImage] = useState("");
  let [desc, setDesc] = useState("");
  let [sdesc, setSdesc] = useState("");
  let [mdesc, setMdesc] = useState("");
  let [mtitle, setMtitle] = useState("");
  let [keyword, setKeyword] = useState("");
  let [tag, setTag] = useState("");

  let obj = {
    title: title,
    image: image,
    desc: desc,
    sdesc: sdesc,
    mdesc: mdesc,
    mtitle: mtitle,
    keyword: keyword,
    tag: tag,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/blog`, obj)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
                      Add
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
                      <h3 className="card-title">About</h3>
                    </div>

                    {/* {data.map((item, index) => ( */}
                    <form
                      // key={index}
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
                            placeholder="Enter title"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Image</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                              name="image"
                              onChange={(e) => setImage(e.target.value)}
                              value={image}
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
                          <textarea
                            className="form-control"
                            id="exampleInputDescription"
                            rows="3"
                            placeholder="Place Some Text Here"
                            name="desc"
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                          ></textarea>
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
                            onChange={(e) => setSdesc(e.target.value)}
                            value={sdesc}
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
                            onChange={(e) => setMdesc(e.target.value)}
                            value={mdesc}
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
                            onChange={(e) => setMtitle(e.target.value)}
                            value={mtitle}
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
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputMetaKeyword">Tag</label>
                          <input
                            type=""
                            className="form-control"
                            id="exampleInputMetaKeyword"
                            placeholder="Enter meta keyword"
                            name="keyword"
                            onChange={(e) => setTag(e.target.value)}
                            value={tag}
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
                    {/* ))} */}
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

export default Blogadd;
