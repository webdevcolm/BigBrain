import React from 'react'
import Tilt from 'react-parallax-tilt';
import Brian from './Brian.png'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <div style={{width: '200px', height: "200px"}}>
            <Tilt >
                <div 
                      className="br2 shadow-2"
                      style={{ height: '150px', width: '150px' ,
                      backgroundColor: 'linear-gradient(to left, #D9AFD9 0%, #97D9E1 100%)',
                        }}>
                  <img src={Brian} alt="brian"  />
                </div>
         </Tilt>
      </div>

    </div>
  )
}

export default Logo