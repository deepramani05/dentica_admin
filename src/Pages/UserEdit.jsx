import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const UserEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { id } = useParams();
  let [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `https://denticadentalstudio.com/webapp/api/show/user`,
        { id },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        const userData = res.data.data.user;
        setName(userData.name);
        setEmail(userData.email);
        // Assuming you don't want to populate password field with fetched data
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("id", id);
    userData.append("name", name);
    userData.append("email", email);
    userData.append("password", pass);

    axios
      .post(`https://denticadentalstudio.com/api/user/update`, userData, {
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
          title: "Data Updated Successfully !",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => (window.location.href = "/users"), 1000);
      })
      .catch((err) => {
        console.log(err);
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
              <div className="row mb-2 text-left">
                <div className="col-sm-6">
                  <h1>General Form Edit</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/users">Users</Link>
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
                <div className="col-md-4">
                  <div className="card">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title text-white">Edit User</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="card-body text-left">
                        <div className="form-group">
                          <label htmlFor="exampleInputName">
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter your name ..."
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail">
                            Email <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter your email ..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword">
                            Password <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Password ..."
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                          />
                        </div>
                      </div>
                      <div className="card-footer text-left">
                        <button
                          type="submit"
                          className="btn text-white form-dlt-btn"
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

export default UserEdit;
