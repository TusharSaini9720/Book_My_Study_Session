import React from 'react';
import './Description.css';

function Description({description}) {


    const descriptions = [
        {
          type: 'paragraph',
          content: [
            { text: 'This session provides an ', format: 'plain' },
            { text: 'in-depth understanding', format: 'bold' },
            { text: ' of key topics. It is designed for learners who want to ', format: 'plain' },
            { text: 'master the subject.', format: 'italic' }
          ]
        },
        {
          type: 'heading',
          content: [{ text: 'What You Will Learn', format: 'plain' }]
        },
        {
          type: 'bulletList',
          content: [
            [{ text: 'Comprehensive understanding of key concepts', format: 'plain' }],
            [{ text: 'Hands-on practice with real-world examples', format: 'plain' }],
            [{ text: 'Interactive quizzes and assignments', format: 'plain' }]
          ]
        },
        {
          type: 'paragraph',
          content: [
            { text: 'Join us for an engaging and informative session that will help you ', format: 'plain' },
            { text: 'achieve your learning goals!', format: 'bold' }
          ]
        },
        {
          type: 'paragraph',
          content: [
            { text: 'For more details, visit our ', format: 'plain' },
            { text: 'website.', format: 'link', href: 'https://example.com' }
          ]
        }
      ];
  return (
    <div className="session-description-container">
      <h2 className="description-heading">Session Description</h2>
      <div className="description-content">
        {description.map((item, index) => {
          switch (item.type) {
            case 'paragraph':
              return <p key={index} className="description-paragraph">{renderText(item.content)}</p>;
            case 'bulletList':
              // return (
              //   <ul key={index} className="description-bullet-list">
              //     {item.content.map((bullet, bulletIndex) => (
              //       <li key={bulletIndex} className="description-bullet">{renderText(bullet)}</li>
              //     ))}
              //   </ul>
              // );
              return <li key={index} className="description-bullet">{renderText(item.content)}</li>
            case 'heading':
              return <h3 key={index} className="description-subheading">{renderText(item.content)}</h3>;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

// Helper function to render formatted text
function renderText(textArray) {
  return textArray.map((textItem, index) => {
    switch (textItem.format) {
      case 'bold':
        return <strong key={index}>{textItem.text}</strong>;
      case 'italic':
        return <em key={index}>{textItem.text}</em>;
      case 'link':
        return <a key={index} href={textItem.href} className="description-link">{textItem.text}</a>;
      default:
        return <span key={index}>{textItem.text}</span>;
    }
  });
}

export default Description;
