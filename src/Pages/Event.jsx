import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const Event = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/event`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
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
                  <h1>Event</h1>
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
                      Event
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div
                      class="card-header text-light"
                      style={{
                        textAlign: "end",
                        backgroundColor: "rgb(37, 111, 152)",
                      }}
                    >
                      <h3 class="card-title">Event List</h3>
                      <div>
                        <Link
                          to='/event/add'
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
                    {/* <!-- /.card-header --> */}
                    <div class="card-body">
                      <table
                        id="example2"
                        class="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Catagory</th>
                            <th>Image</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((ele, id) => {
                            return (
                              <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{ele.cat}</td>
                                <td width={"200px"} height={"100px"}>
                                  <img
                                    src={ele.image}
                                    alt=""
                                    width={"100%"}
                                    height={"100%"}
                                  />
                                </td>
                                <td className="align-middle">
                                  <Link
                                    to={`/event/edit/${ele.id}`}
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
                            );
                          })}
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
        {/* <!-- /.content-wrapper --> */}
      </div>
    </div>
  );
};

export default Event;
