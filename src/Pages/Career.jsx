import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import "../css/style.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Career = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({key:null, direction:"asc"});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://denticadentalstudio.com/webapp/api/career`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data.career);
        setData(res.data.data.career);
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
            `https://denticadentalstudio.com/webapp/api/career/delete`,
            { id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          )
          .then((res) => {
            // Update the state by filtering out the deleted item
            setData((prevData) => prevData.filter((item) => item.id !== id));
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your file has been deleted.",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  };

 const handleSort = (key) =>{
  const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
  setSortConfig({ key, direction})
 };

 const sortedData = React.useMemo(()=>{
  let sortableData = [...data];
  if (sortConfig.key !== null){
    sortableData.sort((a,b) =>{
      if (a[sortConfig.key] < b [sortConfig.key]){
        return sortConfig.direction === "asc" ? -1: 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]){
        return sortConfig.direction === "asc" ? 1: -1; 
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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset current page when items per page changes
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = sortedData
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    sortedData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / itemsPerPage
  );

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

  const downloadPDF = (fileUrl) => {
    const link = document.createElement("a");
    window.open(fileUrl, "_blank");
    link.download = "file.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
                  <h1>Career</h1>
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
                      Career
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
                    <div className="d-flex" style={{alignItems:"center"}}>
                      <div className="row mt-3 ml-2" style={{gap:"10px"}}>
                        <label htmlFor="rowsPerPage">Rows per Page : </label>
                        <input
                          id="rowsPerPage"
                          type="number"
                          min="1"
                          max={data.length}
                          value={itemsPerPage}
                          onChange={handleItemsPerPageChange}
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
                              <th style={{cursor:"pointer"}} onClick={()=> handleSort("id")}>
                                SL {getSortIcon("id")}
                              </th>
                              <th style={{cursor:"pointer"}} onClick={()=> handleSort("name")}>
                                Customer Name {getSortIcon("name")}
                              </th>
                              <th style={{cursor:"pointer"}} onClick={()=> handleSort("phone")}>
                                Contact Info {getSortIcon("phone")}
                              </th>
                              <th style={{cursor:"pointer"}} onClick={()=> handleSort("subject")}>
                                Subject {getSortIcon("subject")}
                              </th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((ele, id) => (
                              <tr key={id}>
                                <td>{startIndex + id + 1}</td>
                                <td>{ele.name}</td>
                                <td>
                                  <p className="m-0">Mo : - {ele.phone}</p>
                                  <p className="m-0">
                                    E-mail ID : - {ele.email}
                                  </p>
                                </td>
                                <td>{ele.subject}</td>
                                <td>
                                  <button
                                    className="form-btn-dlt"
                                    style={{
                                      backgroundColor: "white",
                                      border: "1px solid red",
                                    }}
                                    onClick={() => downloadPDF(ele.file)}
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
                                    onClick={() => handleDelete(ele.id)}
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
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing {startIndex + 1} to{" "}
                          {Math.min(endIndex, displayedData.length)} of{" "}
                          {displayedData.length} entries
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-7 text-right">
                        <div className="dataTables_paginate paging_simple_numbers">
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
                              className={`paginate_button page-item next ${
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

export default Career;
