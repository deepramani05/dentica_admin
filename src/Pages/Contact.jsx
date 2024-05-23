import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEye, FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import "../css/style.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Contact = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({key:null, direction:"asc"});
  const [rowsPerPage, setRowsPerPage] = useState(10); // New state for rows per page

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://denticadentalstudio.com/webapp/api/contactus`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data); // Log response data
        setData(res.data.data.contact);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  // Assuming 'id' is defined somewhere in your code or passed as an argument to handleDelete function
  const handleDelete = (id) => {
    if (!id) {
      console.error("ID is required for deleting the contact.");
      return;
    }

    // Show confirmation dialog
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
        // Proceed with the deletion
        axios
          .post(
            `https://denticadentalstudio.com/webapp/api/contactus/delete`,
            { id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          )
          .then((res) => {
            // Handle success response
            console.log("Contact deleted successfully:", res.data);
            // Optionally, you can perform additional actions here
            Swal.fire({
              title: "Deleted!",
              text: "Your contact has been deleted.",
              icon: "success",
              title: "Your contact has been deleted",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((err) => {
            // Handle error
            console.error("An error occurred while deleting the contact:", err);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the contact.",
              icon: "error",
            });
          });
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  };
  const handleSort = (key)=>{
    const direction = sortConfig.key === key && sortConfig.direction === 'asc'? 'desc': 'asc';
    setSortConfig({key, direction});
  }

  const sortedData = React.useMemo(()=>{
    let sortableData = [...data];
    if (sortConfig.key !== null){
      sortableData.sort((a,b)=>{
        if (a[sortConfig.key]< b[sortConfig.key]){
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        if (a[setSortConfig.key]> b[sortConfig.key]){
          return sortConfig.direction === "asc" ? -1: 1;
        }
        return 0;
      })
    }
    return sortableData;
  }, [data, sortConfig])

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const filteredData = sortedData.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.info &&
            item.info.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.sub &&
            item.sub.toLowerCase().includes(searchQuery.toLowerCase()))
      )

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);
  const getSortIcon = (key) =>{
    if (sortConfig.key === key){
      if (sortConfig.direction === 'asc'){
        return <FaSortUp />;
      } else if (sortConfig.direction === 'desc'){
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
                  <h1>Contacts</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li
                      className="breadcrumb-item"
                      style={{ color: "#ca629d" }}
                    >
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
                    <div className="d-flex align-items-center">
                      <div className="rows-per-page">
                        <span style={{margin:"0 20px",fontWeight:"600"}}>Rows per page :</span>
                        <input
                          type="number"
                          style={{width:"100px"}}
                          min="1"
                          value={rowsPerPage}
                          onChange={(e) => setRowsPerPage(e.target.value)}
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
                    <div className="table-container">
                      <div className="card-body">
                        <table
                          id="example2"
                          className="table table-bordered table-hover text-left"
                        >
                          <thead>
                            <tr>
                              <th style = {{width: "5%",cursor:"pointer"}} onClick = {() => handleSort("id")}>
                                SL {getSortIcon("id")}
                              </th>
                              <th style = {{width: "30%",cursor:"pointer"}} onClick = {() => handleSort("name")}>
                                Customer's Name {getSortIcon("name")}
                              </th>
                              <th style = {{width: "30%",cursor:"pointer"}} onClick = {() => handleSort("mobile_number")}>
                                Contact Info {getSortIcon("mobile_number")}
                              </th>
                              <th style = {{width: "25%",cursor:"pointer"}} onClick = {() => handleSort("subject")}>
                                Subject {getSortIcon("subject")}
                              </th>
                              <th style={{ width: "10%" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((ele, id) => (
                              <tr key={id}>
                                <td>
                                  {(currentPage - 1) * rowsPerPage + id + 1}
                                </td>
                                <td>{ele.name}</td>
                                <td>
                                  <p>
                                    Mo : - <span>{ele.mobile_number}</span>
                                  </p>
                                  <p>
                                    Email : - <span>{ele.email}</span>
                                  </p>
                                </td>
                                <td>{ele.subject}</td>
                                <td className="align-middle">
                                  <Link
                                    to={`/contact/${ele.id}`}
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
                                  </Link>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault(); // Prevent default form submission behavior
                                      handleDelete(ele.id);
                                    }}
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
                          Showing {currentPage * rowsPerPage - rowsPerPage + 1}{" "}
                          to {Math.min(currentPage * rowsPerPage, data.length)}{" "}
                          of {data.length} entries
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
                              <button
                                className="page-link"
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    prev === 1 ? prev : prev - 1
                                  )
                                }
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
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    prev === totalPages ? prev : prev + 1
                                  )
                                }
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

export default Contact;
