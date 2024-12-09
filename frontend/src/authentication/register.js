import React from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

function Register(props) {
 
  const [error, seterror] = React.useState("");
  const url = "http://127.0.0.1:3000/api/v1/users/signup/";
  const header = {
    "Content-Type": "application/json",
  };
  const navigate=useNavigate();
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
       // console.log("res",res);
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          localStorage.setItem("history", JSON.stringify(res.data.data.user.history));
   
          props.setsignedIn(true);
          props.settoken(res.data.token);
       props.setuser(res.data.data.user);
       props.sethistory(res.data.data.user.history);
       navigate("/");
        } else {
          if (res.data.message.startsWith("ValidationError")) {
            let elementname = res.data.message.split(":")[1];
            let errormessage = res.data.message.split(":")[2];
            seterror("*" + errormessage);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="register">
      <form>
        <h2>Create Account</h2>

        <fieldset>
          <p style={{ color: "crimson" }}>{error}</p>
          <label for="name">Username</label>
          <input
            onChange={(e) => handle(e)}
            value={data.name}
            type="text"
            id="name"
            name="name"
          />

          <label for="email">Email</label>
          <input
            onChange={(e) => handle(e)}
            value={data.email}
            type="email"
            id="email"
            name="email"
          />

          <label for="password">Password</label>
          <input
            onChange={(e) => handle(e)}
            value={data.password}
            type="password"
            id="password"
            name="password"
          />
          <label for="confirmPassword">Confirm Password</label>
          <input
            onChange={(e) => handle(e)}
            value={data.confirmPassword}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
        </fieldset>
        <button type="submit" onClick={(e) => sendData(e)}>
          Create Account
        </button>
        <p style={{ fontSize: "small" }}>
          By creating an account or logging in, you agree to Hotel booking
          guide's terms and conditions and privacy policy.
        </p>
        <hr />
        <p>
          Already have an account?<Link to="/signin"> SignIn</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
