import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const TeamEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/team/${id}`)
      .then((res) => {
        const { name, image, post } = res.data;
        setName(name);
        setImage(image);
        setPost(post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTeamMember = {
      name: name,
      image: image,
      post: post,
    };

    axios
      .put(`http://localhost:5000/team/${id}`, updatedTeamMember)
      .then((res) => {
        console.log(res.data);
        alert("Data Updated!");
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
                  <h1>Doctor's Team</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/team">Team</Link>
                    </li>
                    <li className="breadcrumb-item active" style={{ color: "#ca629d" }}>
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
                <div className="col-md-5">
                  <div className="card card-primary">
                    <div className="card-header" style={{ backgroundColor: "rgb(37, 111, 152)" }}>
                      <h3 className="card-title">Edit Team Member</h3>
                    </div>
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputName">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Image</label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleInputFile"
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPost">Post</label>
                          <textarea
                            className="form-control"
                            id="exampleInputPost"
                            rows="3"
                            placeholder="Enter Post"
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ backgroundColor: "#ca629d", border: "0" }}
                        >
                          Update
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

export default TeamEdit;
