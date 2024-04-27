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
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const location = useLocation();

  return (
    <div>
      <aside
        className="main-sidebar elevation-4 text-left"
        style={{ backgroundColor: "#256f98", height: "auto" }}
      >
        {/* Brand Logo */}
        <Link to="/" className="brand-link sidebar-light-primary">
          <img src={logo} alt="" style={{ width: "50%", margin: "10px 0" }} />
        </Link>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column side-ul"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
              <li className={`nav-item ${location.pathname === '/dashboard' ? 'menu-open' : ''}`}>
                <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/users' ? 'menu-open' : ''}`}>
                <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <FaUsers />
                  </i>
                  <p>Users</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/' ? 'menu-open' : ''}`}>
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <BiHome />
                  </i>
                  <p>Home</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/about-us' ? 'menu-open' : ''}`}>
                <Link to="/about-us" className={`nav-link ${location.pathname === '/about-us' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <BsInfoCircle />
                  </i>
                  <p>About Us</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/gallery' ? 'menu-open' : ''}`}>
                <Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <BsFillImageFill />
                  </i>
                  <p>Gallery</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/contact' ? 'menu-open' : ''}`}>
                <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <BsFillTelephoneFill />
                  </i>
                  <p>Contacts</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/career' ? 'menu-open' : ''}`}>
                <Link to="/career" className={`nav-link ${location.pathname === '/career' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <BsBagFill />
                  </i>
                  <p>Career</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/blog' ? 'menu-open' : ''}`}>
                <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <FaPencilAlt />
                  </i>
                  <p>Blog</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/product' ? 'menu-open' : ''}`}>
                <Link to="/product" className={`nav-link ${location.pathname === '/product' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <AiOutlineShoppingCart />
                  </i>
                  <p>Products</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/review' ? 'menu-open' : ''}`}>
                <Link to="/review" className={`nav-link ${location.pathname === '/review' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <AiFillStar />
                  </i>
                  <p>Review</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/meta' ? 'menu-open' : ''}`}>
                <Link to="/meta" className={`nav-link ${location.pathname === '/meta' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <TbCylinder />
                  </i>
                  <p>Meta</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/team' ? 'menu-open' : ''}`}>
                <Link to="/team" className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <FaUserDoctor />
                  </i>
                  <p>Team</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/stl' ? 'menu-open' : ''}`}>
                <Link to="/stl" className={`nav-link ${location.pathname === '/stl' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <BsBagDash />
                  </i>
                  <p>STL</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/event-catagory' ? 'menu-open' : ''}`}>
                <Link to="/event-catagory" className={`nav-link ${location.pathname === '/event-catagory' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <SlCalender />
                  </i>
                  <p>Event Category</p>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/event' ? 'menu-open' : ''}`}>
                <Link to="/event" className={`nav-link ${location.pathname === '/event' ? 'active' : ''}`}>
                  <i className="nav-icon">
                    <SlCalender />
                  </i>
                  <p>Event</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNav;
