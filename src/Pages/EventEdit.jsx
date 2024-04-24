import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventEdit = () => {
  const [cat, setCat] = useState("");
  const [image, setImage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item for editing
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedItem) {
        // If an item is selected, update its data
        const updatedData = [...data];
        const selectedIndex = data.findIndex((item) => item._id === selectedItem._id);
        if (selectedIndex !== -1) {
          updatedData[selectedIndex] = { ...selectedItem, cat, image };
          setData(updatedData);
        }
      } else {
        // If no item is selected, add a new item
        const response = await axios.post("http://localhost:5000/event", { cat, image });
        setData([...data, response.data]);
      }
      alert("Data Saved !");
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setCat(item.cat);
    setImage(item.image);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/eventCatagory")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching event categories. Please try again.");
      });
  }, []);

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
                    <li class="breadcrumb-item active" style={{ color: "#ca629d" }}>
                      Add/Edit
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
                    <div class="card-header" style={{ backgroundColor: "#256f98" }}>
                      <h3 class="card-title">Edit Events</h3>
                    </div>
                    <form className="text-left" onSubmit={handleSubmit}>
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputPassword1">Category <span style={{ color: "red" }}>*</span></label>
                          <br />
                          <select
                            name=""
                            id=""
                            className="w-100 p-2"
                            onChange={(e) => setCat(e.target.value)}
                            value={cat}
                          >
                            {data.map((item) => (
                              <option key={item._id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFile">Image <span style={{ color: "red" }}>*</span></label>
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
                      </div>
                      <div class="card-footer">
                        <button
                          type="submit"
                          class="btn btn-primary text-light border-0 form-dlt-btn"
                          style={{ backgroundColor: "#ca629d" }}
                        >
                          {selectedItem ? "Update" : "Submit"}
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
