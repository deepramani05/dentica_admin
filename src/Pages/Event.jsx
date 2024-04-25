import React, { useEffect, useState } from "react";
import '../css/style.css';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { OutlinedInput } from "@mui/material";
import Swal from "sweetalert2";

const Event = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:5000/event`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/event/${id}`)
      .then((res) => {
        setData(data.filter((item) => item.id !== id));
        setFilteredData(filteredData.filter((item) => item.id !== id));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Deleted Successfully!",
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
      item.cat.toLowerCase().includes(query.toLowerCase())
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
  const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>Event</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      Event
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div
                      className="card-header text-light"
                      style={{
                        textAlign: "end",
                        backgroundColor: "rgb(37, 111, 152)",
                      }}
                    >
                      <h3 className="card-title">Event List</h3>
                      <div>
                        <Link
                          to="/event/add"
                          className="form-dlt-btn"
                          style={{
                            border: "0",
                            backgroundColor: "#ca629d",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Add
                        </Link>
                      </div>
                    </div>
<<<<<<< HEAD
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
                    <div className="card-body">
                      <table
                        id="example2"
                        className="table table-bordered table-hover text-center"
                      >
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {displayedData.map((ele, id) => (
                            <tr key={id}>
                              <td>{startIndex + id + 1}</td>
                              <td>{ele.cat}</td>
                              <td width={"200px"} height={"100px"}>
                                <img
                                  src={ele.image}
                                  alt=""
                                  width={"100%"}
                                  height={"100%"}
                                />
                              </td>
                              <td className="align-middle">
                                <Link
                                  to={`/event/edit/${ele.id}`}
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
=======
                    {/* <!-- /.card-header --> */}
                    <div className="table-container">
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
                            {data.map((ele, id) => {
                              return (
                                <tr key={id}>
                                  <td>{id + 1}</td>
                                  <td>{ele.cat}</td>
                                  <td width={"200px"} height={"100px"}>
                                    <img
                                      src={ele.image}
                                      alt=""
                                      width={"100%"}
                                      height={"100%"}
                                    />
                                  </td>
                                  <td className="align-middle">
                                    <Link
                                      to={`/event/edit/${ele.id}`}
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
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
>>>>>>> fe3ec8bce60f8e9b1c734515e59601761dbc28ae
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
                          {currentPage * itemsPerPage - itemsPerPage + 1} to{" "}
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
                                currentPage === totalPages ? "disabled" : ""
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
    </div>
  );
};

export default Event;
