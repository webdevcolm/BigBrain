import React from 'react'
import './FaceReg.css'

const FaceReg = ({imageUrl, box}) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img 
        id='inputimage'
        src={imageUrl} alt="" style={{width:'500px', height:"auto"}} />
         {box.map((boundingBox, index) => (
          <div
            key={index}
            className="boundingBox"
            style={{
              top: boundingBox.topRow,
              left: boundingBox.leftCol,
              right: boundingBox.rightCol,
              bottom: boundingBox.bottomRow,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default FaceReg
