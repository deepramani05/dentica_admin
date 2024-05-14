import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Home = () => {

  let [title, setTitle] = useState("");
  let [subtitle, setSubtitle] = useState("");
  let [desc, setDesc] = useState("");
  let [image, setImage] = useState(null);
  let [wp, setWp] = useState("");
  let [insta, setInsta] = useState("");
  let [fb, setFb] = useState("");

  const handleFormsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", desc);
    formData.append("image", image); 
    axios
      .post(`https://denticadentalstudio.com/api/home/store`, formData,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Form Submited !",
          showConfirmButton: false,
          timer: 1000,
        });
        setTitle("")
        setSubtitle("")
        setDesc("")
        setImage("")
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error !",
          showConfirmButton: false,
          timer: 1000,
        });
      });
    // setTimeout(() => window.location.reload(), 1000);
  };

  const handleSocialsubmit = (e) => {
    e.preventDefault();
    const formData = {
      whatsapp: wp || undefined,
      instagram: insta || undefined,
      facebook: fb || undefined,
    };


    axios
      .post(`https://denticadentalstudio.com/api/socialmedia/store`, formData,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Link Saved !",
          showConfirmButton: false,
          timer: 1000,
        });
        // Clear the state variables after successful submission
        setWp("");
        setInsta("");
        setFb("");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error !",
          showConfirmButton: false,
          timer: 1000,
        });
      });
    // setTimeout(() => window.location.reload(), 1000);
  };

  const fetchData = async () =>{
    try{
      const response = await axios.get(
        `https://denticadentalstudio.com/api/home`
      );
      if (response.data.status === "success") {
        console.log(response.data);
        const homeData = response.data.data.home;
        setTitle(homeData.title);
        setSubtitle(homeData.subtitle);
        setDesc(homeData.description);
        setImage(homeData.image);  
        setWp(response.data.data.whatsapp_url);
        setInsta(response.data.data.instagram_url);
        setFb(response.data.data.facebook_url);

      } 
    } catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
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
                  <h1>Home Page</h1>
                </div>
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li
                      class="breadcrumb-item active"
                      style={{ color: "#ca629d" }}
                    >
                      Home
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
                {/* <!-- left column --> */}
                <div class="col-md-6">
                  {/* <!-- general form elements --> */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title">Add Home Data</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form className="text-left" onSubmit={handleFormsubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Title</label>
                          <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            class="form-control"
                            id="exampleInputTitle"
                            placeholder="Enter title"
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Sub Title</label>
                          <input
                            onChange={(e) => setSubtitle(e.target.value)}
                            value={subtitle}
                            type="text"
                            class="form-control"
                            id="exampleInputSubtitle"
                            placeholder="Enter SubTitle"
                          />
                        </div>
                        <div class="form-group">
                          <label>Description</label>
                          <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            class="form-control"
                            rows="3"
                            placeholder="Enter ..."
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFile">
                            Image <span style={{ color: "red" }}>*</span>
                          </label>
                          <div class="input-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  setImage(file);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary form-dlt-btn"
                          style={{ backgroundColor: "#ca629d", border: "0" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!--/.col (left) --> */}
                <div class="col-md-6">
                  {/* <!-- general form elements --> */}
                  <div class="card card-primary">
                    <div
                      class="card-header"
                      style={{ backgroundColor: "rgb(37, 111, 152)" }}
                    >
                      <h3 class="card-title">Social Media Links</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    {/* <!-- form start --> */}
                    <form className="text-left" onSubmit={handleSocialsubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputWhatsappLink">Whatsapp</label>
                          <input
                            type="url"
                            class="form-control"
                            id="exampleInputWhatsappLink"
                            placeholder="Enter Whatsapp Link"
                            onChange={(e) => setWp(e.target.value)}
                            value={wp}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputInstagramLink">
                            Instagram
                          </label>
                          <input
                            type="url"
                            class="form-control"
                            id="exampleInputInstagramLink"
                            placeholder="Enter Instagram Link"
                            onChange={(e) => setInsta(e.target.value)}
                            value={insta}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFacebookLink">Facebook</label>
                          <input
                            type="url"
                            class="form-control"
                            id="exampleInputFacebookLink"
                            placeholder="Enter Facebook Link"
                            onChange={(e) => setFb(e.target.value)}
                            value={fb}
                          />
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}

                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary form-dlt-btn"
                          style={{ backgroundColor: "#ca629d", border: "0" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <!-- /.card --> */}
                </div>
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

export default Home;
