import React from "react";

const Footer = ({isDashboardPage}) => {
  // console.log(isDashboardPage);
  return (
    <div>
      <footer style={isDashboardPage ? { backgroundColor: "#fff", borderTop: "1px solid #dee2e6", color: "#869099", padding: "1rem", position: "fixed", zIndex: 111, bottom: 0, right: 0, left: 0 } :
       {backgroundColor: "#fff", borderTop: "1px solid #dee2e6", color: "#869099", padding: "1rem", zIndex: 111, bottom: 0, right: 0, left: 0 }
       }>
        <strong>
          Copyright &copy; 2014-2021{" "}
          <a href="https://adminlte.io">AdminLTE.io</a>.
        </strong>
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.2.0
        </div>
      </footer>
    </div>
  );
};

export default Footer;
