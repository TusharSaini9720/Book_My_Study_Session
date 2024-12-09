import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [error, seterror] = React.useState("");
  const url = "/api/v1/users/forgotPassword/";
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
          let errormessage = res.data.message;
          seterror(errormessage);
        } else {
          let errormessage = res.data.message;
          seterror("*" + errormessage);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="register">
      <form onSubmit={(e) => sendData(e)}>
        <h2>Reset Password</h2>

        <fieldset>
          <p style={{ color: "crimson" }}>{error}</p>
          <label for="email">Email</label>
          <input
            onChange={(e) => handle(e)}
            value={data.name}
            type="email"
            id="email"
            name="email"
          />
          <p
            style={{ color: "#8d8894", fontSize: "small", marginTop: "-10px" }}
          >
            We'll email you a link to reset your password
          </p>
        </fieldset>
        <button type="submit">Send Request</button>

        <hr />
        <p>
          Don't have an account?<Link to="/register"> Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
