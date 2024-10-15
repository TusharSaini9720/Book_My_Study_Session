import React from "react";
import Cardforpast from "../cards/Pastsearch";

function History(props) {
  const mockHistory = [
    {
      _id: "1",
      subjectName: "Mathematics",
      tutorName: "John Doe",
      rating: "4.5",
      badge: "Top Tutor",
      reviews: "150",
      image: "https://img.freepik.com/premium-photo/green-book-with-green-cover-sits-green-background_842113-3213.jpg?w=740",
      starRating: 5,
    },
    {
      _id: "2",
      subjectName: "Physics",
      tutorName: "Jane Smith",
      rating: "4.0",
      badge: "Highly Rated",
      reviews: "120",
      image: "https://img.freepik.com/premium-photo/green-book-with-green-cover-sits-green-background_842113-3213.jpg?w=740",
      starRating: 4,
    },
  ];

  return (
    <>
      <h3 style={{backgroundColor:" #e5f5e0"}}>Continue your search</h3>
      {props.signedIn ? (
        mockHistory.length !== 0 ? (
          <div className="scrollforpast" style={{display:"flex",backgroundColor:" #e5f5e0"}}>
            {mockHistory
              .slice(0)
              .reverse()
              .map((history) =>
                Createcardforhistory(history)
              )}
          </div>
        ) : (
          <p style={{ textAlign: "center", fontSize: "xx-large" }}>
            No visited subjects
          </p>
        )
      ) : (
        <p style={{ textAlign: "center", fontSize: "xx-large" }}>
          Sign-In to get your visited subjects
        </p>
      )}
    </>
  );
}

function Createcardforhistory(history) {
  return <Cardforpast history={history} />;
}

export default History;
