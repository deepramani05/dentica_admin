import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import { OutlinedInput } from "@mui/material";
import Cookies from "js-cookie";

const Meta = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [desc, setDesc] = useState("");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const obj = {
    meta_url: url,
    meta_title: title,
    meta_keyword: keyword,
    meta_description: desc,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://denticadentalstudio.com/api/meta/store`, obj,{
          headers: { 
            "Content-Type":"application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          }
      })
      .then((res) => {
        console.log(res.data);
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
      setTimeout(() => window.location.reload(), 1000)
  };

  useEffect(() => {
    axios
      .get(`https://denticadentalstudio.com/api/meta`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        if (response.data.status === "success"){
          console.log(response.data.data.meta);
          setData(response.data.data.meta);
          // setFilteredData(response.data.data.meta);
        }
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
    }).then((result)=>{
      if(result.isConfirmed){
        axios
      .post(`https://denticadentalstudio.com/api/meta/delete`,{ id },
      {
        headers: { 
          "Content-Type":"application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        }
      })
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
      
    }) 
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  // Slice the filtered data array to show only the relevant entries based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);
//  console.log("data",data );
  return (
    <div>
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
                          <div className="search-bar">
                            <OutlinedInput
                              type="text"
                              variant="outlined"
                              placeholder="Search Meta Title Here ..."
                              value={searchQuery}
                              onChange={(e) => handleSearch(e.target.value)}
                              style={{ height: "30px", margin: "10px 0" }}
                            />
                          </div>
                          <div className="table-container">
                            <div className="card-body">
                              <table
                                id="example2"
                                className="table table-bordered table-hover"
                              >
                                <thead>
                                  <tr>
                                    <th>No</th>
                                    <th>Meta_url</th>
                                    <th>Meta Title</th>
                                    <th>Meta Keyword</th>
                                    <th>Meta Description</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data && data.length>0 ?(data.map((ele, id) => (
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
                                  ):( 
                                    <tr>
                                      <td colSpan="4">No data available</td>
                                    </tr>)
                                  }
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
