import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Blogadd = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [sdesc, setSdesc] = useState("");
  const [mdesc, setMdesc] = useState("");
  const [mtitle, setMtitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("")


  const obj = {
    title: title,
    image: image,
    desc: desc,
    sdesc: sdesc,
    mdesc: mdesc,
    mtitle: mtitle,
    keyword: keyword,
    tags: tags,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/blog`, obj)
      .then((res) => {
        console.log(res.data);
        alert("Added Successfully ! ")
      })
      .catch((err) => {
        console.log(err);
      });
      window.location.reload();
  };

  const handleTag = (e) =>{
    if (e.key === "Enter"){
      e.preventDefault();
      const trimmedTag = currentTag.trim();
      if (trimmedTag){
        setTags([...tags,trimmedTag]);
        setCurrentTag("");
      }
    }
  }

  const handleRemoveTag = (id) =>{
    setTags(tags.filter(( _ , index)=> index !== id));
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
                          <ReactQuill
                            value={desc}
                            onChange={(value) => setDesc(value)}
                            placeholder="Place Some Text Here"
                            modules={{
                              toolbar: [
                                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                [{size: []}],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{'list': 'ordered'}, {'list': 'bullet'}, 
                                {'indent': '-1'}, {'indent': '+1'}],
                                ['link', 'image', 'video'],
                                ['clean']
                              ],
                            }}
                            formats={[
                              'header', 'font', 'size',
                              'bold', 'italic', 'underline', 'strike', 'blockquote',
                              'list', 'bullet', 'indent',
                              'link', 'image', 'video'
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
                            type="text"
                            className="form-control"
                            id="exampleInputTags"
                            placeholder="Enter tags"
                            name="tags"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleTag}
                          />
                        </div>
                        <div className="form-group">
                          <div>
                            {tags.map((tag,id)=>(
                              <span key={id} 
                                className="badge-secondary mr-1"
                                style={{display: 'inline-flex', alignItems: 'center', padding: '2px 7px', backgroundColor: '#ca629d', borderRadius: "5px"}}>
                                  {tag}
                                <span 
                                  className="remove-tag"
                                  style={{ cursor: 'pointer', marginLeft: '5px', color: "#12448b", paddingBottom: '2px' }}
                                  onClick={()=> handleRemoveTag(id)}
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
