import React from "react";
import logo from "../images/Logo.png";
import "../css/style.css";
import { FaUsers } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsBagFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { TbCylinder } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { BsBagDash } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div>
      <aside
        class="main-sidebar elevation-4 text-left"
        style={{ backgroundColor: "#256f98", height: "auto" }}
      >
        {/* <!-- Brand Logo --> */}
        <Link to="/" class="brand-link sidebar-light-primary">
          <img src={logo} alt="" style={{ width: "50%", margin: "10px 0" }} />
        </Link>

        {/* <!-- Sidebar --> */}
        <div class="sidebar">
          {/* <!-- Sidebar Menu --> */}
          <nav class="mt-2">
            <ul
              class="nav nav-pills nav-sidebar flex-column side-ul"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
              <li class="nav-item menu-open">
                <Link to="/dashboard" class="nav-link">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/users" class="nav-link">
                  <i class="nav-icon">
                    <FaUsers />
                  </i>
                  <p>Users</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/" class="nav-link">
                  <i class="nav-icon">
                    <BiHome />
                  </i>
                  <p>Home</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/about-us" class="nav-link">
                  <i class="nav-icon">
                    <BsInfoCircle />
                  </i>
                  <p>About Us</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/gallary" class="nav-link">
                  <i class="nav-icon">
                    <BsFillImageFill />
                  </i>
                  <p>Gallary</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/contact" class="nav-link">
                  <i class="nav-icon">
                    <BsFillTelephoneFill />
                  </i>
                  <p>Contacts</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/career" class="nav-link">
                  <i class="nav-icon">
                    <BsBagFill />
                  </i>
                  <p>Career</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/blog" class="nav-link">
                  <i class="nav-icon">
                    <FaPencilAlt />
                  </i>
                  <p>Blog</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/product" class="nav-link">
                  <i class="nav-icon">
                    <AiOutlineShoppingCart />
                  </i>
                  <p>Products</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/review" class="nav-link">
                  <i class="nav-icon">
                    <AiFillStar />
                  </i>
                  <p>Review</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/meta" class="nav-link">
                  <i class="nav-icon">
                    <TbCylinder />
                  </i>
                  <p>Meta</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/team" class="nav-link">
                  <i class="nav-icon">
                    <FaUserDoctor />
                  </i>
                  <p>Team</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/stl" class="nav-link">
                  <i class="nav-icon">
                    <BsBagDash />
                  </i>
                  <p>STL</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/event-catagory" class="nav-link">
                  <i class="nav-icon">
                    <SlCalender />
                  </i>
                  <p>Event Catagory</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/event" class="nav-link">
                  <i class="nav-icon">
                    <SlCalender />
                  </i>
                  <p>Event</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </div>
  );
};

export default SideNav;
