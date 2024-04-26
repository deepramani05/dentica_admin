import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/style.css";

const Contact = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/contacts`)
      .then((res) => {
        console.log(res.data); // Log response data
        setData(res.data);
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
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/contacts/${id}`)
          .then((res) => {
            console.log(res.data);
            // Reload data after deletion
            axios.get(`http://localhost:5000/contacts`)
              .then((res) => {
                setData(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
            Swal.fire("Deleted!", "Your contact has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error", "An error occurred while deleting the contact.", "error");
          });
      }
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.info.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Slice the data array to show only the relevant entries based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>Contacts</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item" style={{ color: "#ca629d" }}>
                      Contacts
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
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 className="card-title">User List</h3>
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
                          className="table table-bordered table-hover text-left"
                        >
                          <thead>
                            <tr>
                              <th>SL</th>
                              <th>Customer's Name</th>
                              <th>Contact Info</th>
                              <th>Subject</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((ele, id) => (
                              <tr key={id}>
                                <td>
                                  {(currentPage - 1) * itemsPerPage + id + 1}
                                </td>
                                <td>{ele.name}</td>
                                <td>{ele.info}</td>
                                <td>{ele.sub}</td>
                                <td className="align-middle">
                                  <button
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
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(ele.id)}
                                    className="form-btn-dlt"
                                    style={{
                                      border: "1px solid red",
                                      backgroundColor: "white",
                                      padding: "2px 5px",
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
                          {currentPage * itemsPerPage - itemsPerPage + 1} to{" "}
                          {Math.min(currentPage * itemsPerPage, data.length)} of{" "}
                          {data.length} entries
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
                                onClick={() => setCurrentPage(currentPage - 1)}
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
                                onClick={() => setCurrentPage(currentPage + 1)}
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

export default Contact;
