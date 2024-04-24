import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Input, OutlinedInput } from "@mui/material";
import "../css/style.css"

const Career = () => {
  let [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/career`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <div class="wrapper">
        {/* <!-- Content Wrapper. Contains page content --> */}
        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6 text-left">
                  <h1>Career</h1>
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
                      Career
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div
                      class="card-header text-light"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">User List</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="table-container">
                      <div class="card-body">
                        <table
                          id="example2"
                          class="table table-bordered table-hover text-left"
                        >
                          <thead>
                            <tr>
                              <th>SL</th>
                              <th>Customer Name</th>
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
                                <td>
                                  <p className="m-0">Mo : - {ele.num}</p>
                                  <p className="m-0">E-mail ID : - {ele.mail}</p>
                                </td>
                                <td>{ele.subject}</td>
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
                    {/* <!-- /.car//d-body --> */}
                    {/* pagination started */}
                    <div className="row">
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
                      <div className="col-sm-12 col-md-7 text-right">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example1_paginate"
                        >
                          <ul
                            className="pagination"
                            style={{
                              justifyContent: "end",
                              marginRight: "10px",
                            }}
                          >
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
                  {/* <!-- /.card --> */}
                </div>
                {/* <!-- /.c/ol --> */}
              </div>
              {/* <!-- /.row --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
        </div>
      </div>
    </div>
  );
};

export default Career;
