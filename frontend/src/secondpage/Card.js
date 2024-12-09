
import React,{useState,useEffect}from 'react';
import './Card.css';
import { FaStar, FaRegStar, FaUserGraduate ,FaCalendarAlt} from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineBook, AiFillStar } from 'react-icons/ai';
import axios from 'axios';
import { Link } from "react-router-dom";
import image from '../data/images/11042383.jpg'

function Card({ session }) {
   //console.log("card",session);
   const [Tutor,setTutor]=useState({});
   const Tutorurl=`/api/v1/tutors/${session.tutor}`;
 // console.log(Tutorurl);
  useEffect(() => {
    const fetchtutor = async () => {
      try {
        const response = await axios.get(Tutorurl);
        const data = response;
        // console.log("data",data);
        setTutor(data.data.Tutor);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchtutor();
  }, [session]);
//console.log(Tutor);
  return (
    <Link
     style={{ textDecoration: "inherit", color: "inherit" }}
    to="/detail"
    state={{
      session: session._id,
      tutor: session.tutor
    }}
    
  >
    <div className="card1">
      <img className="card-image1" src={image} alt={session.name} />
      <div className="card-content1">
        <div className="card-header1">
          <h3 className="topic-name1">{session.name}</h3>
          <p className="price1">{`₹${session.price}`}</p>
        </div>
        <div className='classdur'>
        <p className="class-info1"><FaUserGraduate /> Class: {session.class}th {session.subject} </p>
        {/* <span className="class-info1"><FaCalendarAlt/> Duration: {session.duration} days</span> */}
        </div>
       <div className="topicstar">
       <div className="topic-tags-session-card">
          {session.topics.map((topic, index) => (
            <span key={index} className="tag-session-card">
              {topic.topicName}
            </span>
          ))}
        </div>
          <div className="rating1">
            {[...Array(5)].map((star, index) =>
              index < session.rating ? (
                <AiFillStar key={index} className="star-icon1" />
              ) : (
                <FaRegStar key={index} className="star-icon1" />
              )
            )}
            <span style={{color: '#4caf50', fontWeight:'bold'}}>{session.rating}-Star</span>
          </div>
          </div>
          {/* <p className="description1">{session.description[2].content[0].text}</p> */}
          <div className="card-footer1">
          {/* <p className="tutor-name1">{session.subject}</p> */}
          <div className="tutor-info1">
          {/* <img src="https://imgs.search.brave.com/Wi_S-eS9Fyhs59meQiE056OIWGS1kkdxBQZnctaMfb4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQwLzY3/L2U5LzQwNjdlOWI0/ZWUwNzM0M2Y3ZWUx/MWRjZTg2Y2MzYTRh/LmpwZw" alt="Hanumanji" className="tutor-image" /> */}
          <div className="tutor-details1">
            <span className="tutor-name1">{Tutor.name}</span>
            <p className="tutor-bio1">{Tutor.qualifications}</p>
          </div>
        </div>
          <div className="icons1">
            <span><FiUsers /> {session.bookings} Bookings</span>
            <span><AiOutlineBook /> {session.ratingsQuantity} ratingsQuantity</span>
            <span><FaCalendarAlt/> Duration: {session.duration} days</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Card;
