import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const TeamEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [teamData, setTeamData] = useState({
    name: "",
    image: "",
    post: "",
  });

  useEffect(() => {
    axios
      .post(`https://denticadentalstudio.com/api/show/team`,{id},{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.team);
        setTeamData(res.data.data.team);
      })
      .catch((err) => {
        console.log(err); 
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTeamMember = {
      name: teamData.name,
      image: teamData.image,
      post: teamData.post,
      id: id,
    };

    axios
      .post(`https://denticadentalstudio.com/api/team/update`, updatedTeamMember,{
        headers: {
          "Content-Type": "application/json",
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
    const {name,value, files} = e.target;
    setTeamData({
     ...teamData,
      [name]: value,
    });
  };
  console.log("data",teamData);

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
                            // Note: File input value is not set directly
                          />
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
