import React, { useEffect, useState } from "react";
import '../css/style.css';
import { FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Try from "../images/Logo.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { OutlinedInput } from "@mui/material";

const Products = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { id } = useParams();

  const handleSearch = (query) => {
    setSearchQuery(query);
    // You can perform the search logic here, like filtering the data based on the query
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handledelete = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Product post deleted successfully !");
        // Remove the deleted blog post from the data array
        setData(data.filter((post) => post.id !== id));
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting Product post !");
      });
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate pagination buttons
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
                  <h1>Products</h1>
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
                      Products
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
                      style={{ textAlign: "end", backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">Products</h3>
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
                      <div class="card-body">
                        <table
                          id="example2"
                          class="table table-bordered table-hover"
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
                            {displayedData.map((ele, id) => (
                              <tr key={ele.id}>
                                <td>{id + 1}</td>
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
                                    onClick={() => handledelete(ele.id)}
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
                    {/* <!-- /.ca/rd-body --> */}
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
                {/* <!-- /.col --> */}
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

export default Products;
