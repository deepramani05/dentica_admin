import React from "react";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

const Header = () => {
  return (
    <div>
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button">
              <i class="fas fa-bars"></i>
            </a>
          </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul class="navbar-nav ml-auto">
          {/* <!-- Notifications Dropdown Menu --> */}
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="">
                <FaPowerOff />
              </i>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span class="dropdown-item dropdown-header">
                Confirm Log out !
              </span>
              {/* <div class="dropdown-divider"></div> */}
              <a href="#" class="dropdown-item dropdown-footer">
                Log Out !
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
