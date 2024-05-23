import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { OutlinedInput } from "@mui/material";
import Cookies from "js-cookie";

const Meta = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({key:null, direction:"asc"});
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

  const obj = {
    meta_url: url,
    meta_title: title,
    meta_keyword: keyword,
    meta_description: desc,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://denticadentalstudio.com/webapp/api/meta/store`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data Saved Successfully !",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error !",
          showConfirmButton: false,
          timer: 1000,
        });
      });
    setTimeout(() => window.location.reload(), 1000);
  };

  useEffect(() => {
    axios
      .get(`https://denticadentalstudio.com/webapp/api/meta`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setData(response.data.data.meta);
          setFilteredData(response.data.data.meta); // Ensure filteredData is also updated
          // console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
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
          .post(
            `https://denticadentalstudio.com/webapp/api/meta/delete`,
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
              position: "top-end",
              icon: "success",
              title: "Meta post deleted successfully !",
              showConfirmButton: false,
              timer: 1000,
            });
            // Remove the deleted meta post from both data arrays
            setData(data.filter((post) => post.id !== id));
            setFilteredData(filteredData.filter((post) => post.id !== id));
          })
          .catch((err) => {
            console.log(err);
            alert("Error deleting meta !");
          });
      }
    });
  };

  const handleSort = (key) => {
    // If the same column is clicked again, toggle the direction
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(()=>{
    let sortableData = [...data];
    if (sortConfig.key !== null){
      sortableData.sort((a,b)=>{
        if (a[sortConfig.key] < b[sortConfig.key]){
          return sortConfig.direction === "asc" ? -1:1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]){
          return sortConfig.direction === "asc"? 1:-1;
        }
        return 0;
      })
    }
    return sortableData;
  }, [data, sortConfig])

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        return <FaSortUp />;
      } else if (sortConfig.direction === "desc") {
        return <FaSortDown />;
      }
    }
    return <FaSort />;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.meta_title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset current page when rows per page changes
  };

  const itemsPerPage = rowsPerPage;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = sortedData.slice(startIndex, endIndex);

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
                  <h1>Meta Form</h1>
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
                      Meta
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
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 className="card-title">Add Meta data</h3>
                    </div>
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Meta Url</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Title"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Meta Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Meta Keyword
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Keyword"
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                          />
                        </div>
                        <div className="form-group">
                          <label>Meta Description</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                          ></textarea>
                        </div>
                      </div>

                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-primary text-light border-0 form-dlt-btn"
                          style={{ backgroundColor: "#ca629d" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <section className="content col-md-8">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div
                            className="card-header text-light"
                            style={{ backgroundColor: "rgb(37, 111, 152)" }}
                          >
                            <h3 className="card-title">Meta List</h3>
                          </div>
                          <div
                            className="d-flex"
                            style={{ alignItems: "center" }}
                          >
                            <div className="rows-per-page">
                              <span
                                style={{
                                  fontWeight: "600",
                                  textTransform: "capitalize",
                                  margin: "0 20px",
                                }}
                              >
                                rows per page :
                              </span>
                              <input
                                type="number"
                                min="1"
                                max={filteredData.length}
                                value={rowsPerPage}
                                onChange={handleRowsPerPageChange}
                                style={{ width: "60px", marginRight: "5px" }}
                              />
                            </div>
                            <div className="search-bar">
                              <OutlinedInput
                                type="text"
                                variant="outlined"
                                placeholder="Search Meta Title Here ..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)} // Ensure correct value is passed
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
                                    <th style={{cursor:"pointer"}} onClick={()=> handleSort("id")}>
                                      No {getSortIcon("id")}
                                    </th>
                                    <th style={{cursor:"pointer"}} onClick={()=> handleSort("meta_url")}>
                                      Meta_url{getSortIcon("meta_url")}
                                    </th>
                                    <th style={{cursor:"pointer"}} onClick={()=> handleSort("meta_title")}>
                                      Meta Title{getSortIcon("meta_title")}
                                    </th>
                                    <th style={{cursor:"pointer"}} onClick={()=> handleSort("meta_keyword")}>
                                      Meta Keyword{getSortIcon("meta_keyword")}
                                    </th>
                                    <th style={{cursor:"pointer"}} onClick={()=> handleSort("meta_description")}>
                                      Meta Description{getSortIcon("meta_description")}
                                    </th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {displayedData && displayedData.length > 0 ? (
                                    displayedData.map((ele, id) => (
                                      <tr key={id}>
                                        <td>{startIndex + id + 1}</td>
                                        <td>{ele.meta_url}</td>
                                        <td>{ele.meta_title}</td>
                                        <td>{ele.meta_keyword}</td>
                                        <td>{ele.meta_description}</td>
                                        <td className="align-middle d-flex">
                                          <Link
                                            to={`/meta/edit/${ele.id}`}
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
                                              padding: "2px 5px",
                                            }}
                                          >
                                            <span style={{ color: "red" }}>
                                              <MdDelete />
                                            </span>
                                          </button>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="4">No data available</td>
                                    </tr>
                                  )}
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

export default Meta;
