import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { OutlinedInput } from "@mui/material";
import Swal from "sweetalert2";

const Meta = () => {
  let [url, setUrl] = useState("");
  let [title, setTitle] = useState("");
  let [keyword, setKeyword] = useState("");
  let [desc, setDesc] = useState("");

  let [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // You can perform the search logic here, like filtering the data based on the query
  };

  let obj = {
    url: url,
    title: title,
    keyword: keyword,
    desc: desc,
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/meta`, obj)
      .then((res) => {
        console.log(res.data);
        alert("data savaed successfully !");
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/meta`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const handledelete = (id) => {
    axios
      .delete(`http://localhost:5000/meta/${id}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Meta post deleted successfully !",
          showConfirmButton: false,
          timer: 1000,
        });
        // Remove the deleted blog post from the data array
        setData(data.filter((post) => post.id !== id));
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting meta !");
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
                  <h1>Meta Form</h1>
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
                      Meta
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* <!-- /.cont/ainer-fluid --> */}
          </section>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                {/* <!-- left column --> */}
                <div class="col-md-4">
                  {/* <!-- general form elements --> */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">Add Meta data</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form className="text-left" onSubmit={handlesubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Meta Url</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="Title"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Meta Title</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">
                            Meta Keyword
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Meta Keyword"
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                          />
                        </div>
                        <div class="form-group">
                          <label>Meta Description</label>
                          <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Enter ..."
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                          ></textarea>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary text-light border-0 form-dlt-btn"
                          style={{ backgroundColor: "#ca629d" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!--/.col (left) --> */}
                {/* <!-- Main content --> */}
                <section class="content col-md-8">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div
                            class="card-header text-light"
                            style={{ backgroundColor: "rgb(37, 111, 152)" }}
                          >
                            <h3 class="card-title">Meta List</h3>
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
                          <div class="card-body">
                            <table
                              id="example2"
                              class="table table-bordered table-hover"
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
                                {data.map((ele, id) => (
                                  <tr>
                                    <td>{id + 1}</td>
                                    <td>{ele.url}</td>
                                    <td>{ele.title}</td>
                                    <td>{ele.keyword}</td>
                                    <td>{ele.desc}</td>
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
                                        onClick={(e) => handledelete(ele.id)}
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
                                ))}
                              </tbody>
                            </table>
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

export default Meta;
