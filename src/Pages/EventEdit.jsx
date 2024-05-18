import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { TbArrowsVertical } from "react-icons/tb";
import { BiMoveHorizontal } from "react-icons/bi";
import Cookies from "js-cookie";


const EventEdit = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    cat: "",
    image: "",
  });

  useEffect(() => {
    // Fetch event categories
    axios
      .get(`https://denticadentalstudio.com/api/event_category`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.event_category);
        setData(res.data.data.event_category);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })

    // Fetch event data for the specified ID
    axios
      .post(`https://denticadentalstudio.com/api/show/event`,{id},{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        const eventData = res.data;
        setFormData({
          cat: eventData.cat,
          image: eventData.image,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  const handleChange = (e) => {
    const { name, value,files } = e.target;
    if (name === "image"){
       setFormData({
        ...formData,
         [name]: files[0],
       }) 
    } else{
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.cat);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("id", id);
    // Send PUT request to update the event data
    axios
      .post(`https://denticadentalstudio.com/api/event/update`, formDataToSend,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Updated Successfully !",
          showConfirmButton: false,
          timer: 1000,
        })
          // Handle success, maybe redirect or show a success message
          .then(() => {
             window.location.href = "/event";
          });
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
                            name="category"
                            className="w-100 p-2"
                            onChange={handleChange}
                            value={formData.cat}
                          >
                            <option value="">Select a Option</option>
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
                                // value={formData.image}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFile">
                            Image Dimention <span style={{ color: "red" }}>*</span>
                          </label>
                          <div class="input-group">
                            <div class="custom-file" style={{ gap: "20px" }}>
                              <div className="radio-1 d-flex">
                                <input
                                  type="radio"
                                  name="layout"
                                  value="1"
                                  onChange={handleChange}
                                  checked={formData.layout === "1"}
                                  required
                                />
                                <label htmlFor="" style={{ marginLeft: "5px" }}>
                                 <span><TbArrowsVertical /></span> Vertical
                                </label>
                              </div>
                              <div className="radio-2 d-flex">
                                <input
                                  type="radio"
                                  name="layout"
                                  value="0"
                                  onChange={handleChange}
                                  checked={formData.layout === "0"}
                                />
                                <label htmlFor="" style={{ marginLeft: "5px" }}>
                                  <span><BiMoveHorizontal /></span> Horizontal
                                </label>
                              </div>
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
