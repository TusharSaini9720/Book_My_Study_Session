import React from 'react';
 import './CardSection.css';
import Card from './Card';


function CardSection(props) {

  return (
    <div className="card-section1">
      {props.Sessions.map((session, index) => (
        <Card key={index} session={session} />
      ))}
    </div>
  );
}


export default CardSection;
