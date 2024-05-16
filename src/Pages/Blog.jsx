import React, { useEffect, useState } from "react";
import "../css/style.css";
import { FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { OutlinedInput } from "@mui/material";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Blog = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5); // State for rows per page

  const { id } = useParams();

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1); // Reset current page when search query changes
  };

  useEffect(() => {
    axios
      .get("https://denticadentalstudio.com/api/blogs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data.blog);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handledelete = (id) => {
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
            `https://denticadentalstudio.com/api/blog/delete`,
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your file has been deleted.",
              showConfirmButton: false,
              timer: 1000,
            });
            // Remove the deleted blog post from the data array
            setData(data.filter((post) => post.id !== id));
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error",
              text: "Error deleting blog post!",
              icon: "error",
            });
          });
      }
    });
  };

  const stripHtmlTags = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  // Logic for pagination buttons
  const totalPages = Math.ceil(data.length / rowsPerPage);
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
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationButtons.push(
        <li key={i} className={"page-item ellipsis"}>
          <span className="ellipsis">...</span>
        </li>
      );
    }
  }

  // Slice the data array to show only the relevant entries based on pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchQuery)
  );
  const displayedData = filteredData.slice(startIndex, endIndex);
  console.log("data", displayedData);

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
                  <h1>Blog</h1>
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
                      Blog
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
                      style={{
                        textAlign: "end",
                        backgroundColor: "#256f98",
                      }}
                    >
                      <h3 className="card-title">Blog List</h3>
                      <div>
                        <Link
                          to="/blog/add"
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
                    <div className="d-flex" style={{alignItems:"center"}}>
                      <div className="rows-per-page d-flex align-items-center">
                        <label htmlFor="rowsPerPage" style={{margin:"0 20px"}}>Rows per Page : </label>
                        <input
                          id="rowsPerPage"
                          className="p-0"
                          type="number"
                          value={rowsPerPage}
                          onChange={(e) =>
                            setRowsPerPage(parseInt(e.target.value))
                          }
                          style={{ width: "60px", marginLeft: "5px" }}
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
                            <th>SL</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {displayedData.map((ele, id) => (
                            <tr key={ele.id}>
                              <td>{startIndex + id + 1}</td>
                              <td>{ele.title}</td>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: ele.description,
                                }}
                              ></td>
                              <td width={"15%"}>
                                <Link
                                  to={`https://denticadentalstudio.com/blog/${ele.title.replace(
                                    /\s+/g,
                                    "-"
                                  )}`}
                                  className="form-btn"
                                  style={{
                                    border: "1px solid #17a2b8",
                                    padding: "5px",
                                    backgroundColor: "white",
                                  }}
                                  target="_blank"
                                >
                                  <span style={{ color: "#17a2b8" }}>
                                    <FaEye />
                                  </span>
                                </Link>
                                <Link
                                  to={`/blog/edit/${ele.id}`}
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
                      <div className="pagination-container">
                        <ul
                          className="pagination"
                          style={{
                            display: "flex",
                            listStyle: "none",
                            justifyContent: "end",
                            marginTop: "20px",
                          }}
                        >
                          <li
                            className={`paginate_button page-item previous ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <a
                              href="#"
                              aria-controls="example1"
                              data-dt-idx="0"
                              tabIndex="0"
                              className="page-link"
                              onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
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
                          >
                            <a
                              href="#"
                              aria-controls="example1"
                              data-dt-idx="7"
                              tabIndex="0"
                              className="page-link"
                              onClick={() =>
                                setCurrentPage((prev) =>
                                  Math.min(prev + 1, totalPages)
                                )
                              }
                            >
                              Next
                            </a>
                          </li>
                        </ul>
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
        {/* /.content-wrapper */}
      </div>
    </div>
  );
};

export default Blog;
