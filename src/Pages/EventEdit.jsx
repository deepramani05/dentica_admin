import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EventEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    cat: "",
    image: "",
  });

  useEffect(() => {
    // Fetch event categories
    axios.get(`http://localhost:5000/eventCatagory`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch event data for the specified ID
    axios.get(`http://localhost:5000/event/${id}`)
      .then((res) => {
        const eventData = res.data;
        setFormData({
          cat: eventData.cat,
          image: eventData.image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send PUT request to update the event data
    axios.put(`http://localhost:5000/event/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Updated Successfully !",
          showConfirmButton: false,
          timer: 1000
        });
        // Handle success, maybe redirect or show a success message
      })
      .catch((err) => {
        console.log(err);
        // Handle error, show an error message maybe
      });
  };

  return (
    <div>
      <div class="wrapper">
        <div class="content-wrapper">
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
                      Edit
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "#256f98" }}
                    >
                      <h3 class="card-title">Edit Events</h3>
                    </div>
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputPassword1">
                            Category <span style={{ color: "red" }}>*</span>
                          </label>
                          <br />
                          <select
                            name="cat"
                            className="w-100 p-2"
                            onChange={handleChange}
                            value={formData.cat}
                          >
                            <option value="">
                              Select a Option
                            </option>
                            {data.map((ele) => (
                              <option key={ele.id} value={ele.name}>
                                {ele.name}
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
                                name="image"
                                onChange={handleChange}
                                value={formData.image}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

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
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;
