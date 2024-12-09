import React, { useState } from 'react';
import './Topics.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Topics({Session}) {

    const topics = [
        {
          name: 'Organic Chemistry',
          subtopics: ['Hydrocarbons', 'Alcohols and Phenols', 'Ethers', 'Aldehydes and Ketones', 'Carboxylic Acids']
        },
        {
          name: 'Thermodynamics',
          subtopics: ['Laws of Thermodynamics', 'Enthalpy', 'Entropy', 'Gibbs Free Energy']
        },
        {
          name: 'Electrostatics',
          subtopics: ['Electric Field', 'Gauss Law', 'Electric Potential', 'Capacitance']
        }
      ];
  const [expandedTopicIndex, setExpandedTopicIndex] = useState(null);

  const toggleTopic = (index) => {
    setExpandedTopicIndex(expandedTopicIndex === index ? null : index);
  };

  return (
    <div className="topics-covered-container">
      <h2 className="topics-heading">Topics Covered</h2>
      <div className="topics-list">
        {Session.topics.map((topic, index) => (
          <div className="topic-item" key={index}>
            <div className="topic-header" onClick={() => toggleTopic(index)}>
              <h3 className="topic-name">{topic.topicName}</h3>
              {expandedTopicIndex === index ? <FaChevronUp className="chevron-icon" /> : <FaChevronDown className="chevron-icon" />}
            </div>
            {expandedTopicIndex === index && (
              <ul className="subtopics-list">
                {topic.subTopics.map((subtopic, subIndex) => (
                  <li key={subIndex} className="subtopic-item">
                    {subtopic}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
