import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div class="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6 text-left">
                <h1 class="m-0">Dashboard</h1>
              </div>
              {/* <!-- /.col --> */}
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              {/* <!-- /.col --> */}
            </div>
            {/* <!-- /.row --> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </div>
        {/* <!-- /.content-header --> */}

        {/* <!-- Main content --> */}
        <section class="content">
          <div class="container-fluid">
            {/* <!-- Small boxes (Stat box) --> */}
            <div class="row text-left">
              <div class="col-lg-3 col-6">
                {/* <!-- small box --> */}
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>0</h3>

                    <p>New STL Files </p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-bag"></i>
                  </div>
                  <Link to="/stl" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              {/* <!-- ./col --> */}
              <div class="col-lg-3 col-6">
                {/* <!-- small box --> */}
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>
                      0
                    </h3>

                    <p>Reviewed files</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                  </div>
                  <Link to="/stl" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- /.ro/w --> */}

            {/* <!-- /.row (main row) --> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </section>
        {/* <!-- /.content --> */}
      </div>
    </div>
  );
};

export default Dashboard;
