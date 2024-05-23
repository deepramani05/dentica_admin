import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { OutlinedInput } from "@mui/material";
import Cookies from "js-cookie";

const Review = () => {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [sortConfig, setSortConfig] = useState({key:null, direction:"asc"});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset current page when rows per page changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile", num);
    formData.append("review", review);
    formData.append("image", image);
    axios
      .post(`https://denticadentalstudio.com/webapp/api/review/store`, formData)
      .then((res) => {
        // console.log(res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Review Saved Successfully !",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => window.location.reload(), 1000);
  };

  useEffect(() => {
    axios
      .get(`https://denticadentalstudio.com/webapp/api/review`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data.data.review);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
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
          .post(
            `https://denticadentalstudio.com/webapp/api/review/delete`,
            { id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Data Deleted Successfully !",
              showConfirmButton: false,
              timer: 1000,
            });
            setData(data.filter((post) => post.id !== id));
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error",
              text: "Error deleting Product post !",
              icon: "error",
            });
          });
         setTimeout(() => window.location.reload(), 1000);
      }
    });
  };

  const handleSort = (key) =>{
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({key, direction});
  }

  const sortedData = React.useMemo(()=>{
    let sortableData =[...data];
    if (sortConfig.key !== null){
      sortableData.sort((a,b)=>{
        if (a[sortConfig.key] < b[sortConfig.key]){
          return sortConfig.direction === "asc" ? -1:1;
        }
        if (a[sortConfig.key] > b [sortConfig.key]){
          return sortConfig.direction === "asc" ? 1:-1
        }
        return 0;
      })
    }
    return sortableData;
  }, [data,sortConfig])

  const filteredData = sortedData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === currentPage ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      paginationButtons.push(
        <li
          key={i}
          className={`paginate_button page-item ${
            currentPage === i ? "active" : ""
          }`}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationButtons.push(
        <li key={i} className={"page-item ellipsis"}>
          <span className="ellipsis">...</span>
        </li>
      );
    }
  }
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        return <FaSortUp />;
      } else if (sortConfig.direction === "desc") {
        return <FaSortDown />;
      }
    }
    return <FaSort />;
  }

  return (
    <div>
      {loading && (
        <div className="preloaderContainer">
          <div className="preloaderBg">
            <div className="preloader"></div>
            <div className="preloader2"></div>
          </div>
        </div>
      )}
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>Review</h1>
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
                      Review
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
                      <h3 className="card-title">Review</h3>
                    </div>
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputTitle"
                            placeholder="Enter Name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Number</label>
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputSubtitle"
                            placeholder="Enter Number"
                            name="mobile"
                            onChange={(e) => setNum(e.target.value)}
                            value={num}
                          />
                        </div>
                        <div className="form-group">
                          <label>Review</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            name="review"
                            onChange={(e) => setReview(e.target.value)}
                            value={review}
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Image</label>
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  setImage(file);
                                }}
                              />
                            </div>
                          </div>
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

                {/* Review List Section */}
                <section className="content col-md-8">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div
                            className="card-header text-light"
                            style={{ backgroundColor: "rgb(37, 111, 152)" }}
                          >
                            <h3 className="card-title">Review List</h3>
                          </div>
                          <div className="d-flex">
                            <div
                              className="rows-per-page d-flex"
                              style={{ alignItems: "center" }}
                            >
                              <span style={{ fontWeight: "600",margin:"0 20px" }}>
                                Rows Per Page :{" "}
                              </span>
                              <input
                                type="number"
                                min="1"
                                max={filteredData.length}
                                value={rowsPerPage}
                                onChange={handleRowsPerPageChange}
                                style={{ width: "60px" }}
                              />
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
                          </div>
                          <div className="card-body">
                            <table className="table table-bordered table-hover">
                              <thead>
                                <tr>
                                  <th style= {{ cursor :"pointer"}} onClick={()=>handleSort("id")}>
                                    No{getSortIcon("id")}
                                  </th>
                                  <th style= {{ cursor :"pointer"}} onClick={()=>handleSort("name")}>
                                    Name{getSortIcon("name")}
                                  </th>
                                  <th style= {{ cursor :"pointer"}} onClick={()=>handleSort("review")}>
                                    Review{getSortIcon('review')}
                                  </th>
                                  <th>Image</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {displayedData.map((ele, id) => (
                                  <tr key={id}>
                                    <td>{startIndex + id + 1}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.review}</td>
                                    <td>
                                      <img
                                        src={ele.image}
                                        alt={ele.name}
                                        style={{
                                          height: "100px",
                                          width: "100px",
                                        }}
                                      />
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
                          {/* Pagination */}
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
