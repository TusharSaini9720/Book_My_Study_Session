import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin(props) {
  const [error, seterror] = React.useState("");
  const navigate = useNavigate(); // Updated name to reflect the hook purpose
  const url = "https://backend-of-book-study-session.onrender.com/api/v1/users/login/";
  const header = {
    "Content-Type": "application/json",
  };
  const [data, setdata] = React.useState({});

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setdata(newData);
  };

  const sendData = (e) => {
    e.preventDefault();
    axios({ method: "POST", url: url, data: data, headers: header })
      .then((res) => {
        if (res.data.status === "success") {
        
      
          // Save to localStorage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          localStorage.setItem("history", JSON.stringify(res.data.data.user.history));

          
          props.sethistory(res.data.data.user.history);
          props.settoken(res.data.token);
          props.setsignedIn(true);
          props.setuser(res.data.data.user);
          navigate("/"); // Updated to use navigate()
        } else {
          let errormessage = res.data.message;
          seterror("*" + errormessage);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register">
      <form>
        <h2>Sign-In</h2>

        <fieldset>
          <p style={{ color: "crimson" }}>{error}</p>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handle(e)}
            value={data.email || ""}
            type="email"
            id="email"
            name="email"
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handle(e)}
            value={data.password || ""}
            type="password"
            id="password"
            name="password"
          />
          <p>
            <Link to="/forgotPassword">Forgot your password?</Link>
          </p>
        </fieldset>

        <button type="submit" onClick={(e) => sendData(e)}>
          Sign-In
        </button>

        <hr />
        <p>
          Don't have an account?<Link to="/register"> Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
