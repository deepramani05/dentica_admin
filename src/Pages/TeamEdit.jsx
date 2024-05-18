import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const TeamEdit = () => {
  const { id } = useParams();
  const [teamData, setTeamData] = useState({
    name: "",
    image: null,
    post: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `https://denticadentalstudio.com/api/show/team`,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.team);
        setTeamData(res.data.data.team);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teamData.name);
    formData.append("post", teamData.post);
    formData.append("id", id);
    if (teamData.image) {
      formData.append("image", teamData.image);
    }

    axios
      .post(`https://denticadentalstudio.com/api/team/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Updated!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.href = "/team";
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setTeamData({
        ...teamData,
        [name]: files[0],
      });
    } else {
      setTeamData({
        ...teamData,
        [name]: value,
      });
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
                  <h1>Doctor's Team</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/team">Team</Link>
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
                <div className="col-md-5">
                  <div className="card card-primary">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
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
                            name="name"
                            value={teamData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Image</label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleInputFile"
                            onChange={handleChange}
                            name="image"
                            accept="image/*"
                          />
                          {teamData.image &&
                            typeof teamData.image !== "string" && (
                              <img
                                src={URL.createObjectURL(teamData.image)}
                                alt="Preview"
                                style={{ marginTop: "10px", maxWidth: "200px" }}
                              />
                            )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPost">Post</label>
                          <textarea
                            className="form-control"
                            id="exampleInputPost"
                            rows="3"
                            placeholder="Enter Post"
                            name="post"
                            value={teamData.post}
                            onChange={handleChange}
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
