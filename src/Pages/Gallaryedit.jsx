import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import img from '../images/home_about-center.png'
import axios from "axios";

const GalleryEdit = () => {
    const { title } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        desc: "",
        image: "",
        cat: ""
    });

    useEffect(() => {
        // Fetch data for editing based on the title parameter
        axios.get(`http://localhost:5000/gallaryImage/${title}`)
            .then((res) => {
                const data = res.data;
                setFormData({
                    title: data.title,
                    subtitle: data.subtitle,
                    desc: data.desc,
                    image: data.image,
                    cat: data.cat
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [title]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <div>
            <div className="wrapper">
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6 text-left">
                                    <h1>General Form</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item">
                                            <Link to="/dashboard">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" style={{ color: "#ca629d" }}>
                                            User
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>

                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                {/* left column */}
                                <div className="col-md-6">
                                    {/* general form elements */}
                                    <div className="card card-primary">
                                        <div className="card-header" style={{ backgroundColor: "rgb(37, 111, 152)" }}>
                                            <h3 className="card-title">Edit Data</h3>
                                        </div>
                                        {/* /.card-header */}
                                        {/* form start */}
                                        <form onSubmit={handleSubmit} className="text-left">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputTitle">Title</label>
                                                    <input
                                                        onChange={handleChange}
                                                        value={formData.title}
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputTitle"
                                                        name="title"
                                                        placeholder="Enter title"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputSubtitle">Meta Title</label>
                                                    <input
                                                        onChange={handleChange}
                                                        value={formData.subtitle}
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputSubtitle"
                                                        name="subtitle"
                                                        placeholder="Enter SubTitle"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputKeyword">Meta Keyword</label>
                                                    <input
                                                        onChange={handleChange}
                                                        value={formData.keyword}
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputKeyword"
                                                        name="keyword"
                                                        placeholder="Enter Keywords"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputDesc">Meta Description</label>
                                                    <textarea
                                                        onChange={handleChange}
                                                        value={formData.desc}
                                                        className="form-control"
                                                        rows="3"
                                                        name="desc"
                                                        placeholder="Enter ..."
                                                    ></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">Image <span style={{ color: "red" }}>*</span></label>
                                                    <div className="d-flex align-items-center">
                                                        <div className="input-group">
                                                            <div className="custom-file">
                                                                <input
                                                                    type="file"
                                                                    onChange={handleChange}
                                                                    value={formData.image}
                                                                    name="image"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div style={{ width: "150px" }}>
                                                            <img src={img} alt="" style={{ width: "100%" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlSelect1">Category <span style={{ color: "red" }}>*</span></label>
                                                    <select
                                                        onChange={handleChange}
                                                        value={formData.cat}
                                                        className="form-control"
                                                        id="exampleFormControlSelect1"
                                                        name="cat"
                                                    >
                                                        <option value="Select Category">Select Category</option>
                                                        <option value="Before & After">Before & After</option>
                                                        <option value="Products">Products</option>
                                                        <option value="Team">Team</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* /.card-body */}

                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary form-dlt-btn" style={{ backgroundColor: "#ca629d", border: "0" }}>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* /.card */}
                                </div>
                                {/* /.col (left) */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}
            </div>
        </div>
    );
};

export default GalleryEdit;
