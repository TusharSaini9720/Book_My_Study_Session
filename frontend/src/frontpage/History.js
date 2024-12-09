import React from "react";
import Cardforpast from "../cards/Pastsearch";

function History(props) {


  return (
    <>
    <h3 style={{margin: "20px"}}>Continue your search</h3>
    {props.signedIn ? (
      props.history.length !== 0 ? (
        <div className="scrollforpast" style={{margin: "20px"}}>
          {props.history
            .slice(0)
            .reverse()
            .map((history) =>
              Createcardforhistory(history, props.sethistory,props.token)
            )}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "xx-large" }}>
          No visited course
        </p>
      )
    ) : (
      <p style={{ textAlign: "center", fontSize: "xx-large" }}>
        Sign-In to get your visited course
      </p>
    )}
  </>
  );
}

function Createcardforhistory(history, sethistory,token) {
  return <Cardforpast history={history} sethistory={sethistory} token={token}/>;
}

export default History;
