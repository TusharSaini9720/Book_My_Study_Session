import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

function NNavbar(props) {
  const navigate = useNavigate();

  const signout = () => {
    axios.get("https://backend-of-book-study-session.onrender.com/api/v1/users/logout/");
    props.setsignedIn(false);
    props.sethistory([]);
    props.settoken("");

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("history");

    navigate("/");
  };

  const getUserInitials = () => {
    if (props.user?.name) {
      const nameParts = props.user.name.split(" ");
      const initials =
        (nameParts[0]?.[0] || "") + (nameParts[1]?.[0] || "");
      return initials.toUpperCase();
    }
    return "?";
  };

  return (
    <nav
      style={{
        backgroundColor: "#0d6efd",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          FuturMaker
        </Link>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <a
          href="/#footer"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          About Me
        </a>

        {!props.signedIn ? (
          <>
            <Link
              to="/register"
              style={{
                color: "whitesmoke",
                textDecoration: "none",
                marginRight: "15px",
              }}
            >
              Signup
            </Link>
            <Link
              to="/signin"
              style={{
                backgroundColor: "white",
                padding: "5px 20px",
                color: "rgb(13,110,253)",
                textDecoration: "none",
                fontWeight: "550",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaSignInAlt
                style={{
                  color: "blue",
                  fontSize: "large",
                  marginRight: "5px",
                }}
              />
              Sign-In
            </Link>
          </>
        ) : (
          <>
            {/* Profile Section */}
            <Link
        style={{ textDecoration: "inherit", color: "inherit" }}
        to={{
          pathname: "/user/profile",
        }}
      >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  color: "#0d6efd",
                  fontWeight: "bold",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // marginRight: "10px",
                  overflow: "hidden",
                  border: "2px solid #0d6efd",
                }}
              >
                {props.user?.image ? (
                  <img
                    src={props.user.image}
                    alt="User Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  getUserInitials()
                )}
              </div>
              <span style={{ color: "white", fontWeight: "500" }}>
                {props.user.name || "User"}
              </span>
            </div>
</Link>
            {/* Sign-Out Button */}
            <button
              style={{
                backgroundColor: "whitesmoke",
                padding: "5px 15px",
                color: "rgb(13,110,253)",
                textDecoration: "none",
                fontWeight: "550",
                borderRadius: "2px",
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
              onClick={signout}
            >
              <FaSignOutAlt
                style={{
                  color: "blue",
                  fontSize: "large",
                  marginRight: "5px",
                }}
              />
              Sign-out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NNavbar;
