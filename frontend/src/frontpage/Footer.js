import React from "react";
import axios from "axios";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import './footer.css'

function Footer() {

    const [error, seterror] = React.useState("");
    const url = "/api/v1/users/sendEmail/";
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
            seterror("* " + errormessage);
          }
        })
        .catch((err) => {
          console.log(err);
          return seterror("* Message could not be send");
        });
    };
  return (
    <div className="footer" id="footer">
      

      <div className="aboutme">
      <p style={{ fontWeight: "550", fontSize: "x-large", marginLeft: "15px" }}>
        About Me
      </p>
      <img
        src={'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg'}
        alt="A"
        style={{
          borderRadius: "27px",
          display: "block",
          height: "80px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <p
        style={{
          fontWeight: "550",

          fontSize: "x-large",
          margin: "0",
          textAlign: "center",
          fontStyle: "oblique",
        }}
      >
        FuturMaker
      </p>
      <p style={{ fontStyle: "italic" }}>
        I am a Full Stack Web Developer. I have great passion for 
        Website designing or developing. And I love to do things as
        perfectly as I can.
      </p>
    </div>

  
 
    <div className="contact">
      <p
        style={{
          fontWeight: "550",
          fontSize: "x-large",

          gridColumnStart: "1",
          gridColumnEnd: "3",
        }}
      >
        Contact Me
      </p>
      <div className="personalData">
        <p>
        <FaRegAddressCard style={{ color: "white", fontSize: "large" }}/>&nbsp;&nbsp;Kachchi Garhi,Shamli,
          UttarPradesh, India
        </p>
        <p style={{ fontStyle: "italic" }}>
        <MdEmail style={{ color: "white", fontSize: "large" }}/>&nbsp;&nbsp;FuturMaker@gmail.com
        </p>
        <p>
        <FaPhoneAlt style={{ color: "white", fontSize: "large" }}/>&nbsp;&nbsp;9720556084
        </p>
      </div>
      <div className="contactform">
        <form onSubmit={(e) => sendData(e)}>
          <fieldset>
            <label for="name">Name</label>
            <input
              onChange={(e) => handle(e)}
              value={data.name}
              type="text"
              id="name"
              name="name"
              placeholder="enter your name..."
            />
            <label for="email">Email</label>
            <input
              onChange={(e) => handle(e)}
              value={data.email}
              type="text"
              id="email"
              name="email"
              placeholder="enter your email id..."
            />
            <label for="confirmNewPassword">Message</label>
            <textarea
              onChange={(e) => handle(e)}
              value={data.message}
              id="message"
              name="message"
              placeholder="enter your message here..."
              style={{ margin: "0" }}
            />
          </fieldset>
          <p style={{ color: "white", margin: "0" }}>{error}</p>
          <button style={{ margin: "0px 13px" }} type="submit">Send Message</button>
        </form>
      </div>
    </div>

      <p
        style={{
          textAlign: "center",
          gridColumnStart: 1,
          gridColumnEnd: 3,
          fontSize: "small",
        }}
      >
        © 2024 Tutor Booking. All rights reserved.
      </p>
    </div>
  );
}
export default Footer;
