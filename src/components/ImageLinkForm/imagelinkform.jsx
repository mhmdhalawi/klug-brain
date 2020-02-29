import React from 'react';
import './imagelinkform.css';
const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => (
  <div className="center">
    <p className="f4 tc ">{'This magic brain will detect your faces. Give it a try.'}</p>

    <div className="form-parent shadow-5">
      <div className="form w-100">
        <input className="f5  pa2" type="text" onChange={onInputChange} />
        <button onClick={onBtnSubmit} className=" grow tc f5 link pv2 ph3 dib white pointer">
          Detect
        </button>
      </div>
    </div>
  </div>
);

export default ImageLinkForm;
