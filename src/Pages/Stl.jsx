import axios from "axios";
import "../css/style.css";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { OutlinedInput } from "@mui/material";

const Stl = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter the data based on the search query
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset pagination to the first page
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/stl`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setFilteredData(res.data); // Set filtered data initially with all data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/stl/${id}`)
          .then((res) => {
            console.log(res.data);
            // After successful deletion, update the state to remove the deleted item
            setData(data.filter((item) => item.id !== id));
            setFilteredData(filteredData.filter((item) => item.id !== id)); // Also update filtered data
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
            Swal.fire({
              title: "Error",
              text: "Error deleting data",
              icon: "error",
            });
          });
          setTimeout(() => window.location.reload(),1000)
      }
    });
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Slice the data array to show only the relevant entries based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Generate pagination buttons
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
        <button className="page-link" onClick={() => setCurrentPage(i)}>
          {i}
        </button>
      </li>
    );
  }

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
                  <h1>STL</h1>
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
                      STL
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>

          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div
                      className="card-header text-light"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 className="card-title">Stl Form List</h3>
                    </div>
                    <div className="search-bar">
                      <OutlinedInput
                        type="text"
                        variant="outlined"
                        placeholder="Search Name Here ..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ height: "30px", margin: "10px 0" }}
                      />
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="table-container">
                      <div className="card-body">
                        <table
                          id="example2"
                          className="table table-bordered table-hover text-left"
                        >
                          <thead>
                            <tr>
                              <th>SL</th>
                              <th>FullName</th>
                              <th>Phone Number</th>
                              <th>Message</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((ele, index) => (
                              <tr key={index}>
                                <td>{startIndex + index + 1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.num}</td>
                                <td>{ele.msg}</td>
                                <td>
                                  <button
                                    className="form-btn-dlt"
                                    style={{
                                      backgroundColor: "white",
                                      border: "1px solid red",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "red",
                                        lineHeight: "30px",
                                        padding: "5px",
                                      }}
                                    >
                                      <BsFileEarmarkPdfFill />
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(ele.id)}
                                    className="form-btn-dlt"
                                    style={{
                                      backgroundColor: "white",
                                      border: "1px solid red",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "red",
                                        lineHeight: "30px",
                                        padding: "5px",
                                      }}
                                    >
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
                    {/* /.card-body */}
                    {/* pagination started */}
                    <div className="row" style={{ display: "flex" }}>
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          id="example1_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing {startIndex + 1} to{" "}
                          {Math.min(endIndex, filteredData.length)} of{" "}
                          {filteredData.length} entries
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
                              className={`page-item previous ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                            </li>
                            {paginationButtons}
                            <li
                              className={`page-item next ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.card */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
      </div>
    </div>
  );
};

export default Stl;
