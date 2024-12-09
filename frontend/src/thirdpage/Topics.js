import React, { useState } from 'react';
import './Topics.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Topics({Session}) {

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
