import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className="f3 tc">
        {'This magic Brian will detect a face for you!'}
      </p>
      <div className="Form center shadow-5">
        <input 
          type="text" 
          className="pa2 input-reset ba b--black-20 br2 mr2 f4 w-60" 
          placeholder="Enter URL"
          onChange={onInputChange}
        />
        <button 
        className="pa2 br2 bg-light-purple white pointer f4 w-40"
        onClick={onButtonSubmit}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;