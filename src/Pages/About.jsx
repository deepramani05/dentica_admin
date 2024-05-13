import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { OutlinedInput } from "@mui/material";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const About = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page

  let { id } = useParams();

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  const fetchData = () => {
    axios
      .get(`https://denticadentalstudio.com/api/abouts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("API Response Data:", res.data.data.about); // Log the fetched data
        setData(res.data.data.about || []); // Update data with response if available, or empty array
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  };

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
          .post(
            `https://denticadentalstudio.com/api/about/delete`,
            { id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            fetchData(); // Refresh data after deletion
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the file.",
              "error"
            );
          });
      }
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // This function should correctly update the searchQuery state
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value)); // Update rows per page
    setCurrentPage(1); // Reset current page when changing rows per page
  };

  const filteredData = data
    ? data.filter(
        (item) =>
          (item.title &&
            item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.desc &&
            item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const itemsPerPage = rowsPerPage;
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
                  <h1>About - us</h1>
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
                      About
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
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title">About</h3>
                    </div>
                    <div className="d-flex">
                      <div
                        className="form-group d-flex align-items-center"
                        style={{ margin: "10px", width: "auto", gap: "10px" }}
                      >
                        <label htmlFor="rowsPerPage" style={{ width: "100%" }}>
                          Rows Per Page:
                        </label>
                        <select
                          className="form-control"
                          id="rowsPerPage"
                          onChange={handleRowsPerPageChange}
                          value={rowsPerPage}
                          style={{ width: "auto" }}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                        </select>
                      </div>
                      <div className="search-bar">
                        <OutlinedInput
                          type="text"
                          variant="outlined"
                          placeholder="Search title ..."
                          value={searchQuery} // Value should be bound to searchQuery
                          onChange={(e) => handleSearch(e.target.value)} // onChange should update the searchQuery state
                          style={{ height: "30px", margin: "10px 0" }}
                        />
                      </div>
                    </div>
                    <div className="table-container">
                      <div className="card-body">
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th style={{ width: "1%" }}>SL</th>
                              <th style={{ width: "19%" }}>Title</th>
                              <th style={{ width: "65%" }}>Description</th>
                              <th style={{ width: "15%" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((ele, index) => (
                              <tr key={ele.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{ele.title}</td>
                                <td
                                  dangerouslySetInnerHTML={{
                                    __html: ele.description,
                                  }}
                                ></td>

                                <td className="align-middle">
                                  <Link
                                    to = "https://denticadentalstudio.com/about"
                                    className="form-btn"
                                    style={{
                                      border: "1px solid #17a2b8",
                                      backgroundColor: "white",
                                      padding: "2px 5px",
                                    }}
                                    target="_blank"
                                  >
                                    <span style={{ color: "#17a2b8" }}>
                                      <FaRegEye />
                                    </span>
                                  </Link>
                                  <Link
                                    to="/about/edit"
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
                          <ul className="pagination">
                            <li
                              className={`paginate_button page-item previous ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
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

export default About;
