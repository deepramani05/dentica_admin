import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const EventCatEdit = () => {
  const { id } = useParams(); // Assuming you have an id parameter for the event category
  const [data, setData] = useState([]);
  // State variables to hold form data
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    video: null,
  });

  useEffect(() => {
    axios
      .post(`https://denticadentalstudio.com/api/show/event_category`,{id: id},
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
      )
      .then((res) => {
        console.log(res.data.data.event_category);
        setData(res.data.data.event_category)

        if (Array.isArray(res.data)){
          setData(res.data.data.event_category);
        }else if(typeof res.data === "object"){
          setData([res.data.data.event_category]);
        }
        setFormData({
          name: res.data.name,
          image: res.data.image,
          video: res.data.video,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  // Function to handle changes to form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "viseo"){
      setFormData((prevData)=>({
            ...prevData,
            [name]: files[0] ,
          }));
    } else{
      setFormData((prevData)=>({
       ...prevData,
        [name]: value,
      }));
    }
    
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post(`https://denticadentalstudio.com/api/event_category/update ${id}`, formData)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data updated successfully!",
          showConfirmButton: false,
          timer: 1000,
        })
        .then(() => {
          window.location.href = "/event-catagory";
        });
      })
      .catch((err) => {
        console.error("Error updating data:", err);
        alert("Error updating data:", err);
      });
  };

  return (
    <div>
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-left">
                  <h1>Event Category</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/event-catagory">Event Category</Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      Edit
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
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 className="card-title">Edit Event Category</h3>
                    </div>
                    {data.map((ele)=>(
                      <form onSubmit={handleSubmit} className="text-left" key={ele.id}>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputName">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputName"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputImage">Image</label>
                            <input
                              type="file"
                              className="form-control"
                              id="exampleInputImage"
                              name="image"
                              // value={ele.image}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputVideo">Video</label>
                            <input
                              type="file"
                              className="form-control"
                              id="exampleInputVideo"
                              name="video"
                              // value={ele.video}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="card-footer">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ backgroundColor: "#ca629d", border: "0" }}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    ))}
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

export default EventCatEdit;
