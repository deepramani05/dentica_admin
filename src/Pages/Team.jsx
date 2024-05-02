import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { OutlinedInput } from "@mui/material";
import Cookies from "js-cookie";

const Team = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const obj = {
    name: name,
    image: image,
    post: post,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/team`, obj)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Saved !",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch((err) => {
        console.log(err);
      });
      setTimeout(() => window.location.reload(),1000);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/team`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/team/${id}`)
          .then((res) => {
            console.log(res.data);
            setData(data.filter((item) => item.id !== id));
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Data Deleted Successfully !",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li
        key={i}
        className={`page-item ${
          currentPage === i ? "active" : ""
        }`}
      >
        <button
          className="page-link"
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      </li>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.post.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(startIndex, endIndex);

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
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" style={{ color: "#ca629d" }}>
                      Team
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
                  <div className="card card-primary">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title">Add</h3>
                    </div>
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputTitle">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputTitle"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Image</label>
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                              />
                              <label className="custom-file-label">Choose file</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Post</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            onChange={(e) => setPost(e.target.value)}
                            value={post}
                          ></textarea>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-primary form-dlt-btn"
                          style={{ backgroundColor: "#ca629d", border: "0" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <section className="content col-md-8">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div
                            className="card-header text-light"
                            style={{ backgroundColor: "rgb(37, 111, 152)" }}
                          >
                            <h3 className="card-title">Doctor's List</h3>
                          </div>
                          <div className="search-bar">
                            <OutlinedInput
                              type="text"
                              variant="outlined"
                              placeholder="Search.."
                              value={searchQuery}
                              onChange={(e) => handleSearch(e.target.value)}
                              style={{ height: "30px", margin: "10px 0" }}
                            />
                          </div>
                          <div className="table-container">
                            <div className="card-body">
                              <table
                                id="example2"
                                className="table table-bordered table-hover"
                              >
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Post</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {displayedData.map((ele, id) => (
                                    <tr key={id}>
                                      <td>{startIndex + id + 1}</td>
                                      <td>{ele.name}</td>
                                      <td>{ele.post}</td>
                                      <td>
                                        <img
                                          src={ele.image}
                                          alt={ele.name}
                                          style={{ width: "100px", height: "auto" }}
                                        />
                                      </td>
                                      <td className="align-middle">
                                        <Link
                                          to={`/team/edit/${ele.id}`}
                                          className="form-btn"
                                          style={{
                                            border: "1px solid #17a2b8",
                                            backgroundColor: "white",
                                            padding: "2px 5px",
                                          }}
                                        >
                                          <span style={{ color: "#17a2b8" }}>
                                            <FiEdit />
                                          </span>
                                        </Link>
                                        <button
                                          onClick={() => handleDelete(ele.id)}
                                          className="form-btn-dlt"
                                          style={{
                                            border: "1px solid red",
                                            backgroundColor: "white",
                                            padding: "1px 5px",
                                          }}
                                        >
                                          <span style={{ color: "red" }}>
                                            <MdDelete />
                                          </span>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="row" style={{ display: "flex" }}>
                            <div className="col-sm-12 col-md-5">
                              <div
                                className="dataTables_info"
                                id="example1_info"
                                role="status"
                                aria-live="polite"
                              >
                                Showing{" "}
                                {startIndex + 1} to{" "}
                                {Math.min(
                                  endIndex,
                                  data.length
                                )}{" "}
                                of {data.length} entries
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="example1_paginate"
                              >
                                <ul
                                  className="pagination"
                                  style={{
                                    justifyContent: "right",
                                    marginRight: "20px",
                                  }}
                                >
                                  <li
                                    className={`page-item ${
                                      currentPage === 1 ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                      }
                                    >
                                      Previous
                                    </button>
                                  </li>
                                  {paginationButtons}
                                  <li
                                    className={`page-item ${
                                      currentPage === totalPages ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                      }
                                    >
                                      Next
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Team;
