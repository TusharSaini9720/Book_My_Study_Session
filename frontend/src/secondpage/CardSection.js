import React from 'react';
 import './CardSection.css';
import Card from './Card';


function CardSection() {
    const sessions = [
        {
          topicName: 'Sets and Relations',
          price: 1500,
          image: 'https://img.freepik.com/premium-photo/green-book-with-green-cover-sits-green-background_842113-3213.jpg',
          class: '10',
          starRating: 4,
          tutorName: 'John Doe',
          bookings: 50,
          reviews: 20,
          studySessions: 15,
          description: 'An in-depth course on Sets and Relations.',
        },
        {
          topicName: 'Combinations',
          price: 2000,
          image: 'https://img.freepik.com/premium-photo/green-book-with-green-cover-sits-green-background_842113-3213.jpg',
          class: '12',
          starRating: 5,
          tutorName: 'Jane Smith',
          bookings: 75,
          reviews: 30,
          studySessions: 20,
          description: 'Comprehensive course on Combinations.',
        },
        {
            topicName: 'Combinations',
            price: 2000,
            image: 'https://img.freepik.com/premium-photo/green-book-with-green-cover-sits-green-background_842113-3213.jpg',
            class: '12',
            starRating: 5,
            tutorName: 'Jane Smith',
            bookings: 75,
            reviews: 30,
            studySessions: 20,
            description: 'Comprehensive course on Combinations.',
          },
          {
            topicName: 'Combinations',
            price: 2000,
            image: 'https://img.freepik.com/premium-photo/green-book-with-green-cover-sits-green-background_842113-3213.jpg',
            class: '12',
            starRating: 5,
            tutorName: 'Jane Smith',
            bookings: 75,
            reviews: 30,
            studySessions: 20,
            description: 'Comprehensive course on Combinations.',
          },
        // Add more sessions as needed
      ];
  return (
    <div className="card-section">
      {sessions.map((session, index) => (
        <Card key={index} session={session} />
      ))}
    </div>
  );
}


export default CardSection;
