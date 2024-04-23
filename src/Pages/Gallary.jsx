  import React, { useEffect, useState } from "react";
  import { MdDelete } from "react-icons/md";
  import { FiEdit } from "react-icons/fi";
  import { FaRegEye } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import axios from "axios";

  const Gallary = () => {
    let [title, setTitle] = useState("");
    let [mtitle, setMtitle] = useState("");
    let [keyword, setKeyword] = useState("");
    let [desc, setDesc] = useState("");
    let [image, setImage] = useState("");
    let [cat, setCat] = useState("");

    let [data, setData] = useState([]);

    let obj = {
      title: title,
      mtitle: mtitle,
      keyword: keyword,
      desc: desc,
      image: image,
      cat: cat,
    };

    const handlegallarySubmit = (e) => {
      e.preventDefault();

      axios
        .post(`http://localhost:5000/gallaryImage`, obj)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload();
    };

    const fetchData = () => {
      axios
        .get(`http://localhost:5000/gallaryImage`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })

        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:5000/gallaryImage/${id}`)
        .then((res) => {
          console.log(res.data);
          alert("Deleted!");
          fetchData();
        })
        .catch((err) => {
          console.log(err);
          alert("Error occurred while deleting !");
        });
    };

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
                    <h1>General Form</h1>
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
                        Gallery
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
                        <h3 class="card-title">Add images</h3>
                      </div>
                      {/* <!-- /.card-header --> */}
                      {/* <!-- form start --> */}
                      <form className="text-left" onSubmit={handlegallarySubmit}>
                        <div class="card-body">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputtitle"
                              placeholder="Title"
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputPassword1">Meta Title</label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputMetaTitle"
                              placeholder="Meta Title"
                              onChange={(e) => setMtitle(e.target.value)}
                              value={mtitle}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputPassword1">
                              Meta Keyword
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputMetakeyword"
                              placeholder="Meta Keyword"
                              onChange={(e) => setKeyword(e.target.value)}
                              value={keyword}
                            />
                          </div>
                          <div class="form-group">
                            <label>Meta Description</label>
                            <input
                              type="text"
                              class="form-control"
                              rows="3"
                              placeholder="Enter ..."
                              onChange={(e) => setDesc(e.target.value)}
                              value={desc}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputFile">
                              Image <span style={{ color: "red" }}>*</span>
                            </label>
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
                          <div class="form-group">
                            <label for="exampleInputPassword1">
                              Catagory <span style={{ color: "red" }}>*</span>
                            </label>
                            <br />
                            <select
                              name=""
                              id=""
                              className="w-100 p-2"
                              onChange={(e) => setCat(e.target.value)}
                              value={cat}
                            >
                              <option value="Select Catagory">
                                Select Catagory
                              </option>
                              <option value="Before & After">
                                Before & After
                              </option>
                              <option value="Products">Products</option>
                              <option value="Team">Team</option>
                            </select>
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
                              <h3 class="card-title">Gallery List</h3>
                            </div>
                            {/* <!-- /.card-header --> */}
                            <div class="card-body">
                              <table
                                id="example2"
                                class="table table-bordered table-hover"
                              >
                                <thead>
                                  <tr>
                                    <th>SL</th>
                                    <th>Image</th>
                                    <th>Catagory</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((ele, id) => (
                                    <tr>
                                      <td>{id + 1}</td>
                                      <td style={{width:"150px"}}>
                                        <img src={ele.image} alt="" style={{width:"100%"}} />
                                      </td>
                                      <td>{ele.cat}</td>
                                      <td className="align-middle">
                                        <Link
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
                                        <Link
                                          to={`/gallary/edit/${id}`}
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
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {/* <!-- /.card-body --> */}
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

  export default Gallary;
