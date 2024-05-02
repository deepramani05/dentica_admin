import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [stlFilesCount, setStlFilesCount] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/stl")
      .then(response => response.json())
      .then(data => {
        // Update the state with the number of STL files
        setStlFilesCount(data.length);
      })
      .catch(error => console.error("Error fetching STL files:", error));
  }, []);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6 text-left">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" style={{ color: "#ca629d" }}>Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row text-left">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{stlFilesCount}</h3>
                    <p>New STL Files</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag"></i>
                  </div>
                  <Link to="/stl" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>0</h3>
                    <p>Reviewed files</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars"></i>
                  </div>
                  <Link to="/stl" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Dashboard;
