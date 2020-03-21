import React from 'react';
import './facerecognition.css';
const imgAlt = '';
const FaceRecognition = ({ imgUrl, box }) => (
  <div className="face">
    <img id="inputImage" className="h-auto" alt={imgAlt} src={imgUrl} />
    {box.map(box => {
      return (
        <div
          key={box.topRow}
          className="bounding-box center"
          style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
        ></div>
      );
    })}
  </div>
);

export default FaceRecognition;
