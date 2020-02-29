import React from 'react';
import './imagelinkform.css';
const ImageLinkForm = () => (
  <div className="center">
    <p className="f4 tc ">{'This magic brain will detect your faces. Give it a try.'}</p>

    <div className="form-parent shadow-5">
      <div className="form w-90">
        <input className="f5 w-70 pa2" type="text" />
        <button className="w-20 grow f5 link pv2 ph3 dib white pointer">Detect</button>
      </div>
    </div>
  </div>
);

export default ImageLinkForm;
