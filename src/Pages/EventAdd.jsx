import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { TbArrowsVertical } from "react-icons/tb";
import { BiMoveHorizontal } from "react-icons/bi";

const EventAdd = () => {
  let [cat, setCat] = useState("");
  let [image, setImage] = useState("");

  let [data, setData] = useState([]);

  let obj = {
    cat: cat,
    image: image,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const layout = document.querySelector('input[name="layout"]:checked').value;
    axios
      .post(`http://localhost:5000/event`, {
        ...obj,
        layout: layout,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Saved !",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.href = "/event";
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/eventCatagory`)
      .then((res) => {
        console.log(res.data);
        setData(res.data); // Update the data state with the fetched data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  <h1>Events</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/event">Events</Link>
                    </li>
                    <li
                      class="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      Add
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
                <div class="col-md-12">
                  {/* <!-- general form elements --> */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">Edit Events</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div class="card-body">
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
                            <option value="Select a Option">
                              Select a Option
                            </option>
                            {data.map((item) => (
                              <option key={item._id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
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
                          <label for="exampleInputFile">
                            Image Type <span style={{ color: "red" }}>*</span>
                          </label>
                          <div class="input-group">
                            <div class="custom-file" style={{ gap: "20px" }}>
                              <div className="radio-1 d-flex">
                                <input
                                  type="radio"
                                  name="layout"
                                  value="Vertical"
                                  required
                                />
                                <label htmlFor="" style={{ marginLeft: "5px" }}>
                                  <span>
                                    <TbArrowsVertical />
                                  </span>{" "}
                                  Vertical
                                </label>
                              </div>
                              <div className="radio-2 d-flex">
                                <input
                                  type="radio"
                                  name="layout"
                                  value="Horizontal"
                                />
                                <label htmlFor="" style={{ marginLeft: "5px" }}>
                                  <span>
                                    <BiMoveHorizontal />
                                  </span>{" "}
                                  Horizontal
                                </label>
                              </div>
                            </div>
                          </div>
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

export default EventAdd;
