import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';

import brain from './logo.png';

const Logo = () => (
  <div className="ma4 mt0">
    <Tilt
      className="Tilt shadow-2 br2 tc"
      options={{ max: 55 }}
      style={{ height: 100, width: 100 }}
    >
      <div className="Tilt-inner logo">
        <img src={brain} alt="brain" />
      </div>
    </Tilt>
  </div>
);

export default Logo;
