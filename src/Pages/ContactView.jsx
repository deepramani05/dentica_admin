import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ContactView = () => {
  const [contactDetail, setContectDetail] = useState({}); // Change initial state to object

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .post(
        `https://denticadentalstudio.com/webapp/api/show/contactus`,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data.contact);
        setContectDetail(res.data.data.contact);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

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
                  <h1>Contacts Information</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li
                      className="breadcrumb-item"
                      style={{ color: "#ca629d" }}
                    >
                      View
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="card card-primary">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#ca629d" }}
                    >
                      <h3 className="card-title">User Details</h3>
                    </div>
                    <div className="card-body">
                      <div className="table-data-main">
                        <div>
                          <h1>Customer Name:</h1>
                          <span>{contactDetail.name}</span>{" "}
                          {/* Accessing properties directly */}
                        </div>
                        <hr />
                        <div>
                          <h1>Contact No:</h1>
                          <span>{contactDetail.mobile_number}</span>
                        </div>
                        <hr />
                        <div>
                          <h1>Email:</h1>
                          <span>{contactDetail.email}</span>
                        </div>
                        <hr />
                        <div>
                          <h1>Subject:</h1>
                          <span>{contactDetail.subject}</span>
                        </div>
                        <hr />
                        <div>
                          <h1>Message:</h1>
                          <span>{contactDetail.message}</span>
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
    </div>
  );
};

export default ContactView;
