import React, { useState, useEffect } from "react";
import "./ProductDetailPage.css";
import DetailSection from "./DetailSection";
import Smallcard from "./Smallcard";
import LearningSection from "./LearningSection";
import Reviews from "./Reviews";
import Description from "./Description";
import MoreCourses from "./MoreCourses";
import Topics from "./Topics";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ProductDetailPage(props) {
  let history=[];
  const location = useLocation();
  const { session, tutor } = location.state;
  const [Session, setSession] = useState({});
  const [Tutor, setTutor] = useState({});
  const [TutorAllCourses, setTutorAllCourses] = useState([]);
// console.log("props.token",props.token);
  var optionsforhistory = {
    method: "PATCH",
    url: "http://127.0.0.1:3000/api/v1/users/addHistory",
    headers: {
      "Authorization":`Bearer ${props.token}`,
      "Content-Type": "application/json",
    },
    data:JSON.stringify( {
      history: {
        sessionid: session,
        image: Session.image,
        name: Session.name,
        rating: Session.rating,
        price:Session.price,
        tutorid:tutor
      },
    }),
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch session data
        const sessionResponse = await axios.get(
          `/api/v1/courses/${session}`
        );
       // console.log("sessionResponse",sessionResponse);
        setSession(sessionResponse.data.data.course);

        // Fetch tutor data
        const tutorResponse = await axios.get(
          `/api/v1/tutors/${tutor}`
        );
       // console.log("tutorResponse",tutorResponse);
        const tutorData = tutorResponse.data.Tutor;
        setTutor(tutorData);

        // Fetch tutor's courses data if available
        if (tutorData.courses && tutorData.courses.length > 0) {
          const coursesData = await Promise.all(
            tutorData.courses.map(async (id) => {
              const courseResponse = await axios.get(
                `/api/v1/courses/${id}`
              );
              return courseResponse.data.data.course;
            })
          );
          setTutorAllCourses(coursesData);
        }

        // if (Session.name && Tutor.name) {
        //   console.log("INhis");
        //   createhistory();
        // }
        createhistory();
//         console.log("Session fetched:", Session);
// console.log("Tutor fetched:", Tutor);
// console.log("Tutor courses fetched:", TutorAllCourses);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session, tutor]);
  // React.useEffect(() => {
   
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session,tutor]);

  const createhistory = () => {
    if (props.signedIn && Session.name&&Tutor.name) {
      axios(optionsforhistory)
        .then((res) => {
           console.log("res",res);
          history = res.data.data.user.history;
         
        })
        .catch((err) => console.log("err",err));
    }
  };

  React.useEffect(() => {
    return () => {
      if (history.length > 0) props.sethistory(history);
      // componentwillunmount in functional component.
      // Anything in here is fired on component unmount.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCourseClick = () => {
    window.scrollTo(0, 0);
  };
 // console.log("TutorAllCourses",Tutor);
 if (!Session.name || !Tutor.name || TutorAllCourses.length === 0) {
  return (
    <div className="loaderforlist">
      {/* Add a loader or placeholder here */}
    </div>
  );
}



  return (
    <div className="product-detail-page">
       <DetailSection Session={Session} Tutor={Tutor} token={props.token} signedIn={props.signedIn}/>

     <div className="smallcard">
        <Smallcard Session={Session} />
      </div>

      <LearningSection Session={Session} />
      <Topics Session={Session} />
      <Reviews Session={Session} />
      <Description description={Session.description || "No description available."} />
      <MoreCourses
        TutorAllCourses={TutorAllCourses}
        Tutor={Tutor}
        onCourseClick={handleCourseClick}
      />
    </div>
  );
}

export default ProductDetailPage;
