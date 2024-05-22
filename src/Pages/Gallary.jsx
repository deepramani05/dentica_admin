import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Cookies from "js-cookie";

const Gallery = () => {
  let [title, setTitle] = useState("");
  let [mtitle, setMtitle] = useState("");
  let [keyword, setKeyword] = useState("");
  let [desc, setDesc] = useState("");
  let [image, setImage] = useState(null);
  let [category, setCat] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({key:null, direction:"asc"});
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  const handlegallerySubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("meta_title", mtitle);
      formData.append("meta_keyword", keyword);
      formData.append("meta_description", desc);
      formData.append("image", image);
      formData.append("categoery", category);

      const res = await axios.post(
        `https://denticadentalstudio.com/api/gallery/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Saved Successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error",
        text: err.message || "An error occurred.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://denticadentalstudio.com/api/gallery`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.data.status === "success") {
        setData(response.data.data.gallery);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
      setDataFetched(true);
    }

    setLoading(false)
  }, []);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.post(
            `https://denticadentalstudio.com/api/gallery/delete`,
            { id: id },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          );
          console.log(res.data);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            fetchData();
          });
        }
      });
    } catch (err) {
      console.log(err);
      alert("Error occurred while deleting !");
    }
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
        if (a[setSortConfig.key] > b[sortConfig.key]){
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
  };

  const filteredData = sortedData.filter((item) => {
    const category = item.category
      ? item.category.toString().toLowerCase()
      : "";
    const searchQueryLower = searchQuery.toLowerCase();

    return (
      title.includes(searchQueryLower) || category.includes(searchQueryLower)
    );
  });
  
  // Calculate startIndex and endIndex for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  // Slice the data array to show only the relevant entries based on pagination
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Generate pagination buttons
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
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
                  <h1>General Form</h1>
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
                      Gallery
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
                      <h3 className="card-title">Add images</h3>
                    </div>
                    <form className="text-left" onSubmit={handlegallerySubmit}>
                      <div className="card-body">
                        <div className="form-group">
                          <label>Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          />
                        </div>
                        <div className="form-group">
                          <label>Meta Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Meta Title"
                            onChange={(e) => setMtitle(e.target.value)}
                            value={mtitle}
                          />
                        </div>
                        <div className="form-group">
                          <label>Meta Keyword</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Meta Keyword"
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                          />
                        </div>
                        <div className="form-group">
                          <label>Meta Description</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Meta Description"
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                          />
                        </div>
                        <div className="form-group">
                          <label>Image</label>
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
                        <div className="form-group">
                          <label>Category</label>
                          <select
                            className="form-control"
                            onChange={(e) => setCat(e.target.value)}
                            value={category}
                          >
                            <option value="">Select Category</option>
                            <option value="Before & After">
                              Before & After
                            </option>
                            <option value="Products">Products</option>
                            <option value="Team">Team</option>
                          </select>
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
                            <h3 className="card-title">Gallery List</h3>
                          </div>
                          <div className="d-flex align-items-center">
                            <div
                              className="d-flex"
                              style={{
                                alignItems: "center",
                                gap: "10px",
                                margin: "0 20px",
                              }}
                            >
                              <label htmlFor="rowsPerPage">
                                Rows per Page:{" "}
                              </label>
                              <input
                                id="rowsPerPage"
                                type="number"
                                min="1"
                                max={filteredData.length}
                                value={itemsPerPage}
                                onChange={(e) => {
                                  setCurrentPage(1);
                                  setItemsPerPage(parseInt(e.target.value));
                                }}
                              />
                            </div>
                            <div className="search-bar">
                              <OutlinedInput
                                type="text"
                                variant="outlined"
                                placeholder="Search category ..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                style={{ height: "30px", margin: "10px 0" }}
                              />
                            </div>
                          </div>
                          <div className="table-container">
                            <div className="card-body table-reponsive">
                              <table className="table table-bordered table-hover">
                                <thead>
                                  <tr>
                                    <th style={{ cursor:"pointer"}}
                                      onClick={() => handleSort("id")}>
                                        SL{getSortIcon("id")}
                                    </th>
                                    <th>Image</th>
                                    <th style={{ cursor:"pointer"}}
                                      onClick={() => handleSort("id")}>
                                        Category {getSortIcon("category")}
                                    </th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {displayedData && displayedData.length > 0 ? (
                                    displayedData.map((ele, id) => (
                                      <tr key={id}>
                                        <td>{startIndex + id + 1}</td>
                                        <td style={{ width: "150px" }}>
                                          <img
                                            src={ele.image}
                                            alt=""
                                            style={{ width: "100%" }}
                                          />
                                        </td>
                                        <td>{ele.category}</td>
                                        <td className="align-middle">
                                          <Link
                                            to={`/gallery/edit/${ele.id}`}
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
                                          <Link
                                            className="form-btn-dlt"
                                            style={{
                                              border: "1px solid red",
                                              backgroundColor: "white",
                                              padding: "2px 5px",
                                            }}
                                            onClick={() => {
                                              handleDelete(ele.id);
                                            }}
                                          >
                                            <span style={{ color: "red" }}>
                                              <MdDelete />
                                            </span>
                                          </Link>
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
                          {/* Pagination */}
                          <div className="row mt-3">
                            <div className="col-sm-12 col-md-5">
                              <div
                                className="dataTables_info"
                                id="example1_info"
                                role="status"
                                aria-live="polite"
                              >
                                Showing{" "}
                                {startIndex + 1 > filteredData.length
                                  ? filteredData.length
                                  : startIndex + 1}{" "}
                                to{" "}
                                {endIndex > filteredData.length
                                  ? filteredData.length
                                  : endIndex}{" "}
                                of {filteredData.length} entries
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="example1_paginate"
                              >
                                <ul className="pagination">
                                  <li
                                    className={`paginate_button page-item ${
                                      currentPage === 1 ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        setCurrentPage((prev) => prev - 1 || 1)
                                      }
                                    >
                                      Previous
                                    </button>
                                  </li>
                                  {paginationButtons}
                                  <li>
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        setCurrentPage((prev) =>
                                          prev < totalPages
                                            ? prev + 1
                                            : totalPages
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
