import "../assets/css/login.css";
import logo from "../assets/logos/black.png";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

const LoginPage = () => {
  return (
    <>
      <div className="container-flude log-area">
        <div className="container row log-area-sub">
          <div className="log-sub1 col-md-6 col-sm-12">
            <img src={logo} alt="" />
          </div>
          <div className="log-sub2 col-md-6 col-sm-12">
            <div className="mb-4">
              <h1>
                Welcome To{" "}
                <span className="log-color">
                  {/* TRIGAS */}
                  <ReactTyped
                    loop
                    strings={["TRIGAS"]}
                    typeSpeed={100}
                    backSpeed={100}
                  />
                </span>
              </h1>
              {/* <p>Your Admin Dashboard</p> */}
            </div>
            <div className="mb-2">
              <label className="form-label">
                <h6>Username</h6>
              </label>
              <input
                type="text"
                style={{ width: "328px" }}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">
                <h6>Password</h6>
              </label>
              <input
                type="text"
                style={{ width: "328px" }}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <h6 className="mb-4" style={{ width: "328px" }}>
              Forgot Password ?
            </h6>
            <Link to="/dashboard">
              <button className="btn btn-dark" style={{ width: "328px" }}>
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
