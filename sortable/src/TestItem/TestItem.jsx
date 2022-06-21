import React from 'react';
import './TestItem.css';

const TestItem = ({ data, index }) => {
  return (
    <div className="test-item">
      <div>
        <p>constent: {data.content}</p>
        <p>index: {index}</p>
      </div>
    </div>
  );
};

export default TestItem;
