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

const Products = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  useEffect(() => {
    axios
      .get("https://denticadentalstudio.com/api/product", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data.product);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handledelete = (id) => {
    axios
      .post(
        `https://denticadentalstudio.com/api/product/delete`,
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
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              showConfirmButton: false,
              icon: "success",
              timer: "1000",
            });
            setData(data.filter((post) => post.id !== id));
          }
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting Product post !");
      });
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  // pagination buttons start
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
                    <div className="d-flex" style={{ alignItems: "center" }}>
                      <div className="rows-per-page d-flex">
                        <label
                          htmlFor="rowsPerPage"
                          style={{ margin: "0 20px" }}
                        >
                          Rows per Page :
                        </label>
                        <input
                          type="number"
                          id="rowsPerPage"
                          value={rowsPerPage}
                          onChange={handleRowsPerPageChange}
                          min="1"
                          style={{ width: "50px" }}
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
                    {/* <!-- /.card-header --> */}
                    <div className="table-container">
                      <div class="card-body">
                        <table
                          id="example2"
                          class="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th style={{ width: "2%" }}>SL</th>
                              <th style={{ width: "13%" }}>Title</th>
                              <th style={{ width: "25%" }}>Image</th>
                              <th style={{ width: "45%" }}>Description</th>
                              <th style={{ width: "15%" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((ele, index) => (
                              <tr key={ele.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{ele.title}</td>
                                <td style={{ width: "200px", height: "150px" }}>
                                  <img
                                    src={ele.image}
                                    alt={ele.title}
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </td>
                                <td
                                  style={{ overflowY: "scroll" }}
                                  dangerouslySetInnerHTML={{
                                    __html: ele.description,
                                  }}
                                ></td>
                                <td>
                                  <Link
                                    to={
                                      ele.title === "Digital Dentristry"
                                        ? `https://denticadentalstudio.com/digital-dentistry/${ele.title.replace(
                                            /\s+/g,
                                            "-"
                                          )}`
                                        : `https://denticadentalstudio.com/product/${ele.title.replace(
                                            /\s+/g,
                                            "-"
                                          )}`
                                    }
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
                      <div className="pagination-container">
                        <ul className="pagination">
                          <li
                            className={`paginate_button page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage - 1)}
                            >
                              Previous
                            </button>
                          </li>
                          {paginationButtons}
                          <li
                            className={`paginate_button page-item ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <!-- /.card-body --> */}
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
