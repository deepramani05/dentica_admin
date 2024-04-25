import React, { useEffect, useState } from "react";
import '../css/style.css';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { OutlinedInput } from "@mui/material";

const Review = () => {
  let [name, setName] = useState("");
  let [num, setNum] = useState("");
  let [review, setReview] = useState("");
  let [image, setImage] = useState("");

  let [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  let obj = {
    name: name,
    num: num,
    review: review,
    image: image,
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/review`, obj)
      .then((res) => {
        console.log(res.data);
        alert("Review Saved Successfully !");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/review`)
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
      .delete(`http://localhost:5000/review/${id}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Review deleted successfully !",
          icon: "success",
        });
        setData(data.filter((post) => post.id !== id));
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting Review !");
      });
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

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

  return (
    <div>
      <div class="wrapper">
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6 text-left">
                  <h1>Review</h1>
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
                      Review
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-4">
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title">Review</h3>
                    </div>
                    <form className="text-left" onSubmit={handlesubmit}>
                      
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputTitle"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Number</label>
                          <input
                            type="number"
                            class="form-control"
                            id="exampleInputSubtitle"
                            placeholder="Enter Number"
                            onChange={(e) => setNum(e.target.value)}
                            value={num}
                          />
                        </div>
                        <div class="form-group">
                          <label>Review</label>
                          <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            onChange={(e) => setReview(e.target.value)}
                            value={review}
                          ></textarea>
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
                            <h3 class="card-title">Review List</h3>
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
                                      <th>No</th>
                                      <th>Name</th>
                                      <th>Review</th>
                                      <th>Image</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.map((ele, id) => (
                                      <tr>
                                        <td>{id + 1}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.review}</td>
                                        <td>
                                          <img src={ele.image} alt={ele.name} />
                                        </td>
                                        <td className="align-middle">
                                          <Link
                                            to={`/review/edit/${ele.id}`}
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
                                            onClick={() => handledelete(ele.id)}
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
                                {currentPage * itemsPerPage - itemsPerPage + 1}{" "}
                                to{" "}
                                {Math.min(
                                  currentPage * itemsPerPage,
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

export default Review;
