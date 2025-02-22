import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        // console.log("opened",isMenuOpen);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    Cookies.remove("token");
    axios.post("https://denticadentalstudio.com/api/logout", null, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          window.location.href = "/login";

        } else {
          throw new Error("LogOut failed");
        }
      })
      .catch((error) => {
        console.error("LogOut error:", error);
      });

  };
  return (
    <div>
      <nav class="main-header navbar navbar-expand navbar-white navbar-light"
        style={{ zIndex: 1000 }}
      >

        {/* <!-- Left navbar links --> */}
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
              onClick={toggleMenu}
            >
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
              <a
                href="/login"
                class="dropdown-item dropdown-footer"
                onClick={handleLogout}>
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
