import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { OutlinedInput } from "@mui/material";

const EventCat = () => {
  let [name, setName] = useState("");
  let [image, setImage] = useState("");
  let [video, setVideo] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let [data, setData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);

  let obj = {
    name: name,
    image: image,
    video: video,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/eventCatagory`, obj)
      .then((res) => {
        console.log(res.data);
        alert("Data Saved Successfully !");
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/eventCatagory`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/eventCatagory/${id}`)
      .then((res) => {
        console.log(res.data);
        // After successful deletion, update the state to remove the deleted item
        setData(data.filter((item) => item.id !== id));
        setFilteredData(filteredData.filter((item) => item.id !== id));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Deleted Successfully !",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li
        key={i}
        className={`paginate_button page-item ${
          currentPage === i ? "active" : ""
        }`}
      >
        <a
          href="#"
          aria-controls="example1"
          data-dt-idx="0"
          tabIndex="0"
          className="page-link"
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </a>
      </li>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div class="wrapper">
        {/* Content Wrapper. Contains page content */}
        <div class="content-wrapper">
          {/* Content Header (Page header) */}
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6 text-left">
                  <h1>Event Catagory</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li
                      class="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      Event Catagory
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>

          {/* Main content */}
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-4">
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title">Add Event Catagory</h3>
                    </div>
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputTitle"
                            placeholder="Enter title"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFile">Image</label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFile">Video</label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                onChange={(e) => setVideo(e.target.value)}
                                value={video}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary form-dlt-btn"
                          style={{ backgroundColor: "#ca629d", border: "0" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <section class="content col-md-8">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div
                            class="card-header text-light"
                            style={{ backgroundColor: "rgb(37, 111, 152)" }}
                          >
                            <h3 class="card-title">Event Catagory List</h3>
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
                          <div class="card-body">
                            <table
                              id="example2"
                              class="table table-bordered table-hover"
                            >
                              <thead>
                                <tr>
                                  <th>SL</th>
                                  <th>Catagory</th>
                                  <th>Image</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {displayedData.map((ele, id) => (
                                  <tr key={ele.id}>
                                    <td>{id + 1}</td>
                                    <td>{ele.name}</td>
                                    <td>
                                      <img src={ele.image} alt="" />
                                    </td>
                                    <td className="align-middle">
                                      <Link
                                        className="form-btn"
                                        style={{
                                          border: "1px solid #17a2b8",
                                          backgroundColor: "white",
                                          padding: "2px 5px",
                                        }}
                                      >
                                        <span style={{ color: "#17a2b8" }}>
                                          <FaRegEye />
                                        </span>
                                      </Link>
                                      <Link
                                        to={`/event-catagory/edit/${ele.id}`}
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
                          <div className="row" style={{ display: "flex" }}>
                            <div className="col-sm-12 col-md-5">
                              <div
                                className="dataTables_info"
                                id="example1_info"
                                role="status"
                                aria-live="polite"
                              >
                                Showing{" "}
                                {currentPage * itemsPerPage - itemsPerPage + 1}{" "}
                                to{" "}
                                {Math.min(
                                  currentPage * itemsPerPage,
                                  filteredData.length
                                )}{" "}
                                of {filteredData.length} entries
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="example1_paginate"
                              >
                                <ul className="pagination">
                                  <li
                                    className={`paginate_button page-item previous ${
                                      currentPage === 1 ? "disabled" : ""
                                    }`}
                                    id="example1_previous"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="example1"
                                      data-dt-idx="10"
                                      tabIndex="0"
                                      className="page-link"
                                      onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                      }
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  {paginationButtons}
                                  <li
                                    className={`paginate_button page-item next ${
                                      currentPage === totalPages
                                        ? "disabled"
                                        : ""
                                    }`}
                                    id="example1_next"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="example1"
                                      data-dt-idx="0"
                                      tabIndex="0"
                                      className="page-link"
                                      onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                      }
                                    >
                                      Next
                                    </a>
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

export default EventCat;
