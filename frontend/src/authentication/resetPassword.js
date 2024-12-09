import React from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword(props) {
  const [error, seterror] = React.useState("");
  const navigate = useNavigate ();
  const url = `https://backend-of-book-study-session.onrender.com/api/v1/users/resetPassword/${useParams().token}`;
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
    axios({ method: "PATCH", url: url, data: data, headers: header })
      .then((res) => {
        if (res.data.status === "success") {
          props.sethistory(res.data.data.user.history);

          props.setsignedIn(true);
          props.setuser(res.data.data.user);
          navigate("/");
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

          <label for="password">password</label>
          <input
            onChange={(e) => handle(e)}
            value={data.name}
            type="password"
            id="password"
            name="password"
          />
          <label for="confirmPassword">Confirm Password</label>
          <input
            onChange={(e) => handle(e)}
            value={data.name}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
        </fieldset>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
}

export default ResetPassword;
