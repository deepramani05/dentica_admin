import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Products = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { id } = useParams();

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when search query changes
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
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
          .delete(`http://localhost:5000/products/${id}`)
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000
            });
            setData(data.filter((post) => post.id !== id));
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error",
              text: "Error deleting Product post !",
              icon: "error"
            });
          });
          setTimeout(() => window.location.reload(),1000)
      }
    });
  };
  

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li
        key={i}
        className={`page-item ${currentPage === i ? "active" : ""}`}
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

  return (
    <div>
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>Products</h1>
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
                      Products
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
                      style={{ textAlign: "end", backgroundColor: "#256f98" }}
                    >
                      <h3 className="card-title">Products</h3>
                      <div>
                        <Link
                          to="/product/add"
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
                    {/* <!-- /.card-header --> */}
                    <div className="table-container">
                      <div className="card-body">
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th>SL</th>
                              <th>Title</th>
                              <th>Image</th>
                              <th>Description</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((ele, index) => (
                              <tr key={ele.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{ele.title}</td>
                                <td style={{ width: "200px", height: "150px" }}>
                                  <img
                                    src={ele.images}
                                    alt={ele.title}
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </td>
                                <td style={{ overflowY: "scroll" }}>
                                  {ele.desc}
                                </td>
                                <td>
                                  <Link
                                    className="form-btn"
                                    style={{
                                      border: "1px solid #17a2b8",
                                      padding: "5px",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <span style={{ color: "#17a2b8" }}>
                                      <FaEye />
                                    </span>
                                  </Link>
                                  <Link
                                    to={`/product/edit/${ele.id}`}
                                    className="form-btn"
                                    style={{
                                      border: "1px solid #17a2b8",
                                      padding: "5px",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <span style={{ color: "#17a2b8" }}>
                                      <BiSolidEdit />
                                    </span>
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(ele.id)}
                                    className="form-btn-dlt"
                                    style={{
                                      border: "1px solid red",
                                      padding: "4px",
                                      backgroundColor: "white",
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
                    {/* <!-- /.card-body --> */}
                    {/* pagination started */}
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
                              className={`paginate_button page-item previous ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                              id="example1_previous"
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
                              className={`paginate_button page-item next ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                              id="example1_next"
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products;
