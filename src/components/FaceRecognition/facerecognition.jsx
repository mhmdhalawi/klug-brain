import React from 'react';
import './facerecognition.css';
const imgAlt = '';
const FaceRecognition = ({ imgUrl }) => (
  <div className="face">
    <img className="w-30 h-auto" alt={imgAlt} src={imgUrl} />
  </div>
);

export default FaceRecognition;
